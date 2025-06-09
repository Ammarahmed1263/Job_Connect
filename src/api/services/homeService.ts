import apiClient from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import { JobsApiResponse } from "@type/jobTypes";
import { AxiosError } from "axios";

const homeBase = endpoints.home;

const homeService = {
  fetchSearchJobs: async (
    filters?: {},
    page: number = 1,
    size: number = 10,
  ): Promise<JobsApiResponse> => {
    try {
      console.log('filters passed: ', filters);
      const { data } = await apiClient.get(homeBase.getAllJobs, {
        params: {
          page,
          size,
          ...filters,
        },
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("error fetching search jobs: ", axiosError.response?.data);
      throw error;
    }
  },
};

export default homeService;
