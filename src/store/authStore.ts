import AsyncStorage from "@react-native-async-storage/async-storage";
import { authStore } from "@type/authTypes";
import authService from "api/services/authService";
import { secureStorage } from "lib/storage/secureStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create<authStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (credentials) => {
        console.log("credentials here: ", credentials);
        set({ isLoading: true, error: null });
        try {
          const data = await authService.login(credentials);
          console.log("data here: ", data);
          await secureStorage.setToken("auth_token", data.token);
          await secureStorage.setToken("refresh_token", data.refreshToken);

          if (data.role !== "jobseeker") {
            throw new Error("JobSeeker account is required");
          }

          set({
            user: data,
            isAuthenticated: true,
            isLoading: false,
          });
          return data;
        } catch (error: any) {
          set({
            error: error?.message || "Login failed - please try later",
            isLoading: false,
          });
          throw error;
        }
      },
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const data = await authService.register(userData);
          await secureStorage.setToken("auth_token", data.token);
          await secureStorage.setToken("refresh_token", data.refreshToken);
          set({
            user: data,
            isAuthenticated: true,
            isLoading: false,
          });
          return data;
        } catch (error: any) {
          set({
            error: error?.message || "Register failed - please try later",
            isLoading: false,
          });
          throw error;
        }
      },
      initializeAuth: async () => {
        const token = await secureStorage.getToken("auth_token");
        const refreshToken = await secureStorage.getToken("refresh_token");

        if (token && refreshToken) {
          set({
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } else {
          set({
            isAuthenticated: false,
            isLoading: false,
            user: null,
          });
          return false;
        }
      },
      logout: async () => {
        try {
          const token = await secureStorage.getToken("auth_token");
          const refreshToken = await secureStorage.getToken("refresh_token");
          if (token && refreshToken) {
            await authService.logout(token, refreshToken);

            await secureStorage.removeToken("auth_token");
            await secureStorage.removeToken("refresh_token");

            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
          }
        } catch (error) {
          console.log("Error logging out: ", error);
          throw new Error(`error logging out: ${error}`);
        }
      },
      clearError: () => set({ error: null }),
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
