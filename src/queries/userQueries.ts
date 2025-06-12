import userService from "@api/services/userService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserProfile } from "@type/userTypes";
import queryClient from "./queryClient";

export const useSavedJobs = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["getSavedJobs"],
    queryFn: () => userService.fetchSavedJobs(),
    staleTime: 1000 * 60 * 5,
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

export const useSeekerProfile = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["getSeekerProfile"],
    queryFn: () => userService.fetchSeekerProfile(),
  })
};

export const updateSeekerProfile = (profile: Omit<UserProfile, 'id'>) => {
  return useMutation({
    mutationFn: () => userService.updateSeekerProfile(profile),
    onSuccess: () => {
      console.log("updated seeker profile");
      queryClient.invalidateQueries({ queryKey: ["getSeekerProfile"] });
    }
  })
}

export const deleteSeekerProfile = () => {
  return useMutation({
    mutationFn: () => userService.deleteSeekerProfile(),
    onSuccess: () => {
      console.log("profile deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getSeekerProfile"] });
    }
  })
}
