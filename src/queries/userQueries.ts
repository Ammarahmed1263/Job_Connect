import userService from "@api/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useSavedJobs = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["getSavedJobs"],
    queryFn: () => userService.fetchSavedJobs(),
    enabled
  })
};

export const useAppliedJobs = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["getAppliedJobs"],
    queryFn: () => userService.fetchAppliedJobs(),
    enabled
  })
};

export const useAllEmployers = () => {
  return useQuery({
    queryKey: ["getAllEmployers"],
    queryFn: () => userService.fetchAllEmployers(),
  })
};
