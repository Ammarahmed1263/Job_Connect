import apiClient from "@api/apiClient";
import { UserProfile } from "@type/userTypes";
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
      console.log("get applied jobs called: ", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  fetchAllEmployers: async () => {
    try {
      const { data } = await apiClient.get(userBase.getAllEmployers);
      console.log("get all employers responded: ", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  fetchSeekerProfile: async () => {
    try {
      const { data } = await apiClient.get(userBase.getSeekerProfile);
      console.log("get seeker Profile responded: ", JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      throw error;
    }
  },
  updateSeekerProfile: async (profile: Omit<UserProfile, 'id'>) => {
    try {
      const { data } = await apiClient.post(userBase.getSeekerProfile, profile);
      console.log("updated seeker profile: ", JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      throw error;
    }
  },
  deleteSeekerProfile: async () => {
    try {
      const { data } = await apiClient.delete(userBase.getSeekerProfile);
      console.log("delete seeker profile: ");
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
