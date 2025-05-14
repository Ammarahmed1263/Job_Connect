import AsyncStorage from "@react-native-async-storage/async-storage";
import { authStore } from "@type/authTypes";
import authService from "api/services/authService";
import { secureStorage } from "lib/storage/secureStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState: authStore = {
  user: null,
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  isLoading: false,
  error: null,
  login: async (credentials) => {
    {
      throw new Error("Method not implemented.");
    }
  },
  register: async (userData) => {
    throw new Error("Method not implemented.");
  },
  setOnboarding: (status) => {
    throw new Error("Method not implemented.");
  },
  initializeAuth: async () => {
    throw new Error("Method not implemented.");
  },
  logout: async () => {
    throw new Error("Method not implemented.");
  },
  clearError: () => {
    throw new Error("Method not implemented.");
  },
};

const useAuthStore = create<authStore>()(
  persist(
    (set) => ({
      ...initialState,
      login: async (credentials) => {
        console.log("credentials here: ", credentials);
        set({ isLoading: true, error: null });
        try {
          const data = await authService.login(credentials);
          console.log("data here: ", data);
          await secureStorage.setToken("auth_token", data.token);
          await secureStorage.setToken("refresh_token", data.refreshToken);
          set({
            user: data,
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
      setOnboarding: (status: boolean) => {
        set({ hasCompletedOnboarding: status });
      },
      initializeAuth: async () => {
        const token = await secureStorage.getToken("auth_token");
        const refreshToken = await secureStorage.getToken("refresh_token");
        
        if (token && refreshToken) {
          try {
            set({
              isAuthenticated: true,
              isLoading: false
            });
            return true;
          } catch (error) {
            await secureStorage.removeToken("auth_token");
            await secureStorage.removeToken("refresh_token");
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false
            });
            return false;
          }
        }
        
        set({
          isAuthenticated: false,
          isLoading: false
        });
        return false;
      },
      logout: async () => {
        await secureStorage.removeToken("auth_token");
        await secureStorage.removeToken("refresh_token");
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
