import apiClient from "@api/apiClient";
import { endpoints } from "api/endpoints";

const userBase = endpoints.user;

const userService = {
  fetchSavedJobs: async () => {
    try {
      const { data } = await apiClient.get(userBase.getSavedJobs);
      console.log("get saved jobs responded: ", JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      throw error;
    }
  },
  fetchAppliedJobs: async () => {
    try {
      const { data } = await apiClient.get(userBase.getAppliedJobs);
      console.log("get applied jobs responded: ", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  fetchAllEmployers: async () => {
    try {
      const { data } = await apiClient.get(userBase.getAllEmployers);
      console.log("get saved jobs responded: ", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
