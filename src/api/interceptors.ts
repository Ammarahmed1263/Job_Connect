import { secureStorage } from "lib/storage/secureStorage";
import apiClient from "./apiClient";
import { publicEndpoints } from "./endpoints";
import authService from "./services/authService";

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const isPublic = publicEndpoints.some((path) => config.url?.includes(path));
      const token = await secureStorage.getToken('auth_token');
      const refreshToken = await secureStorage.getToken('refresh_token');
      
      // console.log(`Request to ${config.url}`);
      // console.log(`Is public endpoint: ${isPublic}`);
      console.log(`Token exists: ${!!token}`);
      console.log(`Refresh exists: ${!!refreshToken}`);

      if (!isPublic && token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Added auth header');
      }

      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
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
    console.log('origin request: ', originalRequest);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('request retry happened: ', originalRequest._retry);

      try {
        const token = await secureStorage.getToken('auth_token');
        const refreshToken = await secureStorage.getToken('refresh_token');
        console.log('old token: ', token)
        console.log('refresh token: ', refreshToken)
        if (!token || !refreshToken) {
          return Promise.reject(error);
        }
        const Tokens = await authService.refreshToken(token, refreshToken);
        secureStorage.setToken('auth_token', Tokens.accessToken);
        secureStorage.setToken('refresh_token', Tokens.refreshToken);
        console.log('new token: ', Tokens.accessToken)
        console.log('refresh token: ', Tokens.refreshToken)
        originalRequest.headers.Authorization = `Bearer ${Tokens.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        secureStorage.removeToken('auth_token');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);