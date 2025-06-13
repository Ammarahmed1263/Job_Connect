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

export type RefreshTokenResponse = {
  success: boolean;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export interface authStore {
  user: Partial<AuthUser> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginFormData) => Promise<AuthUser>;
  register: (formData: RegisterFormData) => Promise<AuthUser>;
  initializeAuth: () => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}
