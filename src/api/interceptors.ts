import { secureStorage } from "lib/storage/secureStorage";
import apiClient from "./apiClient";
import { publicEndpoints } from "./endpoints";

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const isPublic = publicEndpoints.some((path) => config.url?.includes(path));
      const token = await secureStorage.getToken();
      
      console.log(`Request to ${config.url}`);
      console.log(`Is public endpoint: ${isPublic}`);
      console.log(`Token exists: ${!!token}`);

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

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const token = await secureStorage.getToken();
//         if (!token) {
//           return Promise.reject(error);
//         }
//         const newToken = await authService.refreshToken(token);
//         secureStorage.setToken(newToken);

//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         secureStorage.removeToken();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
