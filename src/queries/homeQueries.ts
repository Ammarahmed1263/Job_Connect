import homeService from "@api/services/homeService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Filters } from "@type/filterTypes";
import { JobCategory } from "@type/jobTypes";

export interface SearchJobsParams extends Filters {
  page?: number;
  size?: number;
  category?: JobCategory;
}

export const useSearchJobs = (filters?: SearchJobsParams) => {
  const page = filters?.page ?? 1;
  const size = filters?.size ?? 10;
  
  const getCategoryFilters = (category?: JobCategory): Filters | undefined => {
    if (!category) return undefined;
    
    switch (category) {
      case 'remote': return { workplace: 'Remote' };
      case 'fullTime': return { jobType: 'Full-time' };
      default: return undefined;
    }
  };

  return useInfiniteQuery({
    queryKey: ["getSearchJobs", { ...filters, page, size, category: filters?.category }],
    queryFn: async ({ pageParam }) => {
      const categoryFilters = getCategoryFilters(filters?.category);
      const requestFilters = {
        ...filters,
        ...categoryFilters,
        page: pageParam.page,
        size: pageParam.size,
      };
      
      const response = await homeService.fetchSearchJobs(requestFilters);
      return response;
    },
    getNextPageParam: (lastPage) => {
      const { pageNumber, totalPages } = lastPage;
      return pageNumber < totalPages
        ? { page: pageNumber + 1, size }
        : undefined;
    },
    initialPageParam: { page, size },
  });
};
