import { LoginFormData, RefreshTokenResponse, RegisterFormData } from "@type/authTypes";
import { AuthUser } from "@type/userTypes";
import { handleApiError } from "@utils";
import apiClient from "api/apiClient";
import { endpoints } from "api/endpoints";

const authService = {
  async login(credentials: LoginFormData): Promise<AuthUser> {
    const payload = {
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password,
    };
    
    try {
      const { data } = await apiClient.post(endpoints.accounts.login, payload);
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async register(userInfo: RegisterFormData): Promise<AuthUser> {
    const payload = {
      firstName: userInfo.personal.firstName.trim(),
      lastName: userInfo.personal.lastName.trim(),
      email: userInfo.contact.email.trim().toLowerCase(),
      phoneNumber: userInfo.contact.phone.replace(/\s+/g, ""),
      password: userInfo.account.password,
      address: userInfo.contact.address.trim(),
      yearsOfExperience: Number(userInfo.professional.experience),
      degree: userInfo.professional.degree.trim(),
      currentOrDesiredJob: userInfo.professional.jobTitle.trim(),
    };

    try {
      const { data } = await apiClient.post(
        endpoints.accounts.register,
        payload
      );
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async refreshToken(token: string, refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const { data } = await apiClient.post(
        endpoints.accounts.refreshToken,
        { accessToken: token, refreshToken }
      );
      console.log('tokens refreshed here: ', data)
      return data;
    } catch (error) {
      console.log('error refreshing token here: ', error, token, refreshToken);
      throw handleApiError(error);
    }
  },

  logout: async (accessToken: string, refreshToken: string) => {
    try {
      await apiClient.post(endpoints.accounts.logout, {
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log("Error logging out: ", error);
      throw error;
    }
  }
};

export default authService;
