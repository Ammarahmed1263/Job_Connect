import userService from "@api/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useSavedJobs = () => {
  return useQuery({
    queryKey: ["getSavedJobs"],
    queryFn: () => userService.fetchSavedJobs(),
  })
};

export const useAppliedJobs = () => {
  return useQuery({
    queryKey: ["getAppliedJobs"],
    queryFn: () => userService.fetchAppliedJobs(),
  })
};

export const useAllEmployers = () => {
  return useQuery({
    queryKey: ["getAllEmployers"],
    queryFn: () => userService.fetchAllEmployers(),
  })
};
