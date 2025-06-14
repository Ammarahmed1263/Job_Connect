import apiClient from "./apiClient";
import { secureStorage } from "lib/storage/secureStorage";
import { endpoints, publicEndpoints } from "./endpoints";
import authService from "./services/authService";
import useAuthStore from "@store/authStore";

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token!);
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  async (config) => {
    const isPublic = publicEndpoints.some((path) => config?.url?.includes(path));
    const token = await secureStorage.getToken("auth_token");

    console.log('endpoint called: ', config?.url)

    if (!isPublic && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isRefreshCall = originalRequest.url?.includes(endpoints.accounts.refreshToken);
    const isUnauthorized = error.response?.status === 401;
    
    console.log('response here: ', isRefreshCall, isUnauthorized);
    // Already retried, or it's the refresh call itself → logout
    if (isUnauthorized && isRefreshCall && originalRequest._retry) {
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    if (isUnauthorized && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      // Queue requests during refresh
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = await secureStorage.getToken("refresh_token");
        const oldToken = await secureStorage.getToken("auth_token");
        console.log(`old access ${oldToken} and refresh ${refreshToken}`)

        if (!refreshToken || !oldToken) {
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }

        const {tokens} = await authService.refreshToken(oldToken, refreshToken);
        await secureStorage.setToken("auth_token", tokens.accessToken);
        await secureStorage.setToken("refresh_token", tokens.refreshToken);

        processQueue(null, tokens.accessToken);

        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
