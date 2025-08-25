import {
  JobApplicationParams,
  JobDetails,
  JobsApiResponse,
} from "@type/jobTypes";
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
  applyForJobById: async (jobDetails: JobApplicationParams) => {
    try {
      const queryParams = {
        CoverLetter: jobDetails.CoverLetter,
      };

      const PathParams = {
        jobId: jobDetails.jobId,
        resumeId: jobDetails.resumeId,
      };

      const { data } = await apiClient.post(
        jobsBase.applyForJobByResumeId(PathParams),
        null,
        { params: queryParams }
      );
      console.log("Job application submitted successfully:", data);
      return data;
    } catch (error) {
      console.error(
        "Error applying for job:",
        (error as AxiosError)?.response?.data
      );
      throw (error as AxiosError)?.response?.data;
    }
  },
};

export default jobService;
