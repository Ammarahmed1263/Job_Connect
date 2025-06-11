import { JobDetails, JobsApiResponse } from "@type/jobTypes";
import apiClient from "api/apiClient";
import { endpoints } from "api/endpoints";
import { AxiosError } from "axios";

const jobsBase = endpoints.jobs;

const jobService = {
  fetchAllJobs: async (
    page: number = 1,
    size: number = 10
  ): Promise<JobsApiResponse> => {
    try {
      const { data } = await apiClient.get(jobsBase.getAllJobs(page, size));
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("error fetching all jobs: ", axiosError);
      throw error;
    }
  },
  fetchJobById: async (id: number): Promise<JobDetails> => {
    try {
      const { data } = await apiClient.get(jobsBase.getJobById(id));
      console.log("fetch jobs responded: ", data);
      return data.data;
    } catch (error) {
      throw error;
    }
  },
  saveJob: async (jobId: number) => {
    try {
      const { data } = await apiClient.post(jobsBase.saveJob, {
        jobId,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  unsaveJob: async (jobId: number) => {
    try {
      const { data } = await apiClient.post(jobsBase.unsaveJob, {
        jobId,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  applyForJob: async (jobDetails: any) => {
    try {
      const { data } = await apiClient.postForm(jobsBase.applyForJob, {
        jobId: 1,
        coverLetter: "",
        resume: "",
        selectedResumePath: "",
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default jobService;
