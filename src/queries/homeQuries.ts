import homeService from "@api/services/homeService";
import { useQuery } from "@tanstack/react-query";

export const useSearchJobs = (filters: {}) => {
  return useQuery({
    queryKey: ["getSearchJobs", filters],
    queryFn: () => homeService.fetchSearchJobs(filters),
  });
};