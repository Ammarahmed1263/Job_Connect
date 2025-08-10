import jobService from "@api/services/jobService";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { JobApplicationParams, jobSummary } from "@type/jobTypes";

export const useJobs = (size: number = 10, enabled: boolean = true) => {
  return useInfiniteQuery({
    queryKey: ["getAllJobs", size],
    queryFn: async ({ pageParam }) => {
      console.log("page param: ", pageParam);
      const response = await jobService.fetchAllJobs(
        pageParam.page,
        pageParam.size
      );
      return response;
    },
    initialPageParam: { page: 1, size },
    getNextPageParam: (lastPage) => {
      const { pageNumber, totalPages } = lastPage;
      return pageNumber < totalPages
        ? { page: pageNumber + 1, size }
        : undefined;
    },
    enabled,
  });
};

export const useJobById = (id: number) => {
  return useQuery({
    queryKey: ["getJobById", id],
    queryFn: () => jobService.fetchJobById(id),
  });
};

export const useSaveJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (job: jobSummary) => jobService.saveJob(job.id),
    onError: (error) => {
      console.error("Error saving job:", error);
    },
    onSettled: () => {
      console.log("save settled");
      queryClient.invalidateQueries({ queryKey: ["getSavedJobs"] });
    },
  });
};

export const useUnsaveJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => jobService.unsaveJob(id),
    onError: (error) => {
      console.error("Error unsaving job:", error);
    },
    onSettled: () => {
      console.log("unsave settled");
      queryClient.invalidateQueries({ queryKey: ["getSavedJobs"] });
    },
  });
};

export const useApplyForJobById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (applicationData: JobApplicationParams) =>
      jobService.applyForJobById(applicationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAppliedJobs"] });
    },
    onError: (error) => {
      console.error("Error applying for job:", error);
    },
  });
};
