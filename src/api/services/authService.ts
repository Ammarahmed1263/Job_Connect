import { LoginFormData, RegisterFormData } from "@type/authTypes";
import { handleApiError } from "@utils";
import apiClient from "api/apiClient";
import { endpoints } from "api/endpoints";

const authService = {
  async login(credentials: LoginFormData) {
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

  async register(userInfo: RegisterFormData) {
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
};

export default authService;
