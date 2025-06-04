import apiClient from "api/apiClient";
import { endpoints } from "api/endpoints";

const jobsBase = endpoints.jobs;

const jobService = {
  fetchAllJobs: async (page: number = 1, size: number = 10) => {
    try {
      const {data} = await apiClient.get(jobsBase.getAllJobs(page, size));
      // console.log('get all jobs called here: ', data.data.length);
      return data;
    } catch (error) {
      console.error('error fetching all jobs: ', error);
      throw error;
    }
  },
  fetchJobById: async (id: number) => {
    try {
      const {data} = await apiClient.get(jobsBase.getJobById(id));
      console.log('api responded', data);
      return data.data;
    } catch (error) {
      throw error;
    }
  },
  saveJob: async (jobId: number) => {
    try {
      const {data} = await apiClient.post(jobsBase.saveJob, {
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
      const {data} = await apiClient.post(jobsBase.unsaveJob, {
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
      const {data} = await apiClient.postForm(jobsBase.applyForJob, {
        jobId: 1,
        coverLetter: '',
        resume: '',
        selectedResumePath: ''
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
