import { LoginFormData } from "@type/authTypes";
import apiClient from "api/apiClient";
import { endpoints } from "api/endpoints";
import { AxiosError } from "axios";

const authService = {
  async login(credentials: LoginFormData) {
    console.log("credentials passed: ", credentials);
    try {
      const { data } = await apiClient.post(endpoints.accounts.login, credentials);
      console.log('data here: ', data);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        throw new Error((axiosError.response?.data as { message?: string })?.message || "Unauthorized");
      } else {
        throw new Error(`Login failed - please try later: ${error}`);
      }
    }
  }
};

export default authService;
