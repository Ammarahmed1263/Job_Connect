import jobService from "@api/services/jobService";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { JobDetails } from "@type/jobTypes";

export const useJobs = (size: number = 10, enabled: boolean = true) => {
  return useInfiniteQuery({
    queryKey: ["getAllJobs", size],
    queryFn: async ({
      pageParam,
    }): Promise<{
      pageNumber: number;
      totalPages: number;
      data: JobDetails;
      message: string;
      pageSize: number;
      totalCount: number;
    }> => {
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
    enabled
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
    mutationFn: (id: number) => jobService.saveJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSavedJobs"] });
    },
  });
};

export const useUnsaveJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => jobService.unsaveJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSavedJobs"] });
    },
  });
};

export const useApplyForJob = () => {};
