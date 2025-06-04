import { secureStorage } from "lib/storage/secureStorage";
import apiClient from "./apiClient";
import { endpoints, publicEndpoints } from "./endpoints";
import authService from "./services/authService";
import useAuthStore from "@store/authStore";

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const isPublic = publicEndpoints.some((path) =>
        config.url?.includes(path)
      );
      const token = await secureStorage.getToken("auth_token");
      const refreshToken = await secureStorage.getToken("refresh_token");

      if ((!token || !refreshToken) && !isPublic) {
        useAuthStore.getState().logout();
        throw new Error("No tokens found");
      }

      console.log(`Request to ${config}`);
      // console.log(`Is public endpoint: ${isPublic}`);
      console.log(`----> Token exists: ${!!token} with value ${token}`);
      console.log(
        `Refresh exists: ${!!refreshToken} with value ${refreshToken}`
      );

      if (!isPublic && token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Added auth header");
      }

      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes(endpoints.accounts.refreshToken)) {
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("request retry happened: ", originalRequest._retry);

      try {
        const token = await secureStorage.getToken("auth_token");
        const refreshToken = await secureStorage.getToken("refresh_token");
        console.log("tokens: ", !!token, !!refreshToken);

        if (!token || !refreshToken) {
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }

        const Tokens = await authService.refreshToken(token, refreshToken);
        await secureStorage.setToken("auth_token", Tokens.accessToken);
        await secureStorage.setToken("refresh_token", Tokens.refreshToken);

        console.log("new token: ", Tokens.accessToken);
        console.log("refresh token: ", Tokens.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${Tokens.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
