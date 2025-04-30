import { secureStorage } from "lib/storage/secureStorage";
import apiClient from "./apiClient";
import { publicEndpoints } from "./endpoints";


apiClient.interceptors.request.use(async (config) => {
  const isPublic = publicEndpoints.some((path) => config.url?.includes(path));

  if (!isPublic) {
    const token = await secureStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}, (error) => {
  console.error('error with axios interceptor: ', error);
  return Promise.reject(error);
});

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