import { AuthUser } from "./userTypes";

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  personal: {
    firstName: string;
    lastName: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  professional: {
    jobTitle: string;
    degree: string;
    experience: string;
  };
  account: {
    password: string;
    confirmPassword: string;
  };
};

export interface authStore {
  user: Partial<AuthUser> | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginFormData) => Promise<AuthUser>;
  setOnboarding: (status: boolean) => void;
  register: (formData: RegisterFormData) => Promise<AuthUser>;
  initializeAuth: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}