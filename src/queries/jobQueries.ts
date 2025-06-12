import jobService from "@api/services/jobService";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { jobSummary } from "@type/jobTypes";

export const useJobs = (size: number = 10, enabled: boolean = true) => {
  return useInfiniteQuery({
    queryKey: ["getAllJobs", size],
    queryFn: async ({
      pageParam,
    }) => {
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
    onMutate: async (job) => {
      const jobSummary = {
        id: job.id,
        title: job.title,
        location: job.location,
        jobType: job.jobType,
        postedDate: job.postedDate,
        applicationsCount: job.applicationsCount,
      };
      console.log("save job: ", jobSummary);

      await queryClient.cancelQueries({ queryKey: ["getSavedJobs"] });
      const previousJobs = queryClient.getQueryData(["getSavedJobs"]);
      queryClient.setQueryData(
        ["getSavedJobs"],
        ({ message, data }: { message: string; data: jobSummary[] }) => ({
          message,
          data: [
            ...(data || []),
            {
              id: job.id,
              title: job.title,
              location: job.location,
              jobType: job.jobType,
              postedDate: job.postedDate,
              applicationsCount: job.applicationsCount,
            },
          ],
        })
      );
      return { previousJobs };
    },
    onError: (err, jobId, context) => {
      console.log("save error: ", err);
      if (context?.previousJobs) {
        queryClient.setQueryData(["getSavedJobs"], context.previousJobs);
      }
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
    onMutate: async (jobId) => {
      await queryClient.cancelQueries({ queryKey: ["getSavedJobs"] });
      const previousJobs = queryClient.getQueryData(["getSavedJobs"]);
      queryClient.setQueryData(
        ["getSavedJobs"],
        ({ message, data }: { message: string; data: jobSummary[] }) => ({
          message: message,
          data: data.filter((job) => job.id !== jobId),
        })
      );

      console.log("unsave mutation: ", jobId, previousJobs);
      return { previousJobs };
    },
    onError: (err, jobId, context) => {
      console.error("unsave error: ", err);
      if (context?.previousJobs) {
        queryClient.setQueryData(["getSavedJobs"], context.previousJobs);
      }
    },
    onSettled: () => {
      console.log("unsave settled");
      queryClient.invalidateQueries({ queryKey: ["getSavedJobs"] });
    },
  });
};

export const useApplyForJob = () => {};
