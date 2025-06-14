import apiClient from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import { SearchJobsParams } from "@queries/homeQueries";
import { JobsApiResponse } from "@type/jobTypes";
import { AxiosError } from "axios";

const homeBase = endpoints.home;

const homeService = {
  fetchSearchJobs: async (filters: SearchJobsParams): Promise<JobsApiResponse> => {
    try {
      const { data } = await apiClient.get(homeBase.getAllJobs, {
        params: {
          ...filters,
          pageSize: filters.size,
          pageNumber: filters.page,
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
