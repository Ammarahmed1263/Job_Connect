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
      hasCompletedOnboarding: false,
      isLoading: false,
      error: null,
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const data = await authService.login(credentials);
          await secureStorage.setToken(data.user.token);
          set({
            user: {...data.user, refreshToken: data.refreshToken},
            isAuthenticated: true,
            isLoading: false,
          });
          return data;
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Login failed - please try later",
            isLoading: false,
          });
          throw error;
        }
      },
      setOnboarding: (status: boolean) => {
        set({ hasCompletedOnboarding: status });
      },
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const data = await authService.register(userData);
          await secureStorage.setToken(data.token);
          set({
            user: data,
            isAuthenticated: true,
            isLoading: false,
          })
          return data;
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Register failed - please try later",
            isLoading: false,
          });
          throw error;
        }
      },

      initializeAuth: async () => {
        const token = await secureStorage.getToken();
        if (token) {
          set({
            isAuthenticated: true,
            isLoading: false,
          });
        }
      },

      logout: async () => {
        await secureStorage.removeToken();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },
      clearError: () => set({ error: null }),
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
    }
  )
);

export default useAuthStore;

// initializeAuth: async () => {
//   const token = await secureStorage.getToken();
//   if (token) {
//     try {
//       const user = await authService.validateToken(token);
//       set({ user, isAuthenticated: true });
//     } catch {
//       await secureStorage.removeToken();
//       set({ user: null, isAuthenticated: false });
//     }
//   }
//   return !!token;
// },
