import userService from "@api/services/userService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserProfile } from "@type/userTypes";

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
    enabled
  })
};

export const useUpdateSeekerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profile: Partial<Omit<UserProfile, 'id'>>) => userService.updateSeekerProfile(profile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSeekerProfile"] });
    },
    onError: (error) => {
      console.log('update query failed', error);
    }
  })
}

export const useDeleteSeekerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => userService.deleteSeekerProfile(),
    onSuccess: () => {
      console.log("profile deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getSeekerProfile"] });
    }
  })
}
