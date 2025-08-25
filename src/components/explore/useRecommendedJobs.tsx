import { useCallback, useEffect, useState } from "react";
import { JobDetails } from "@type/jobTypes";
import axios from "axios";
import { endpoints } from "@api/endpoints";
import useAuthStore from "@store/authStore";

const useRecommendedJobs = (jobsCount?: number) => {
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const userId = useAuthStore((state) => state.user?.id);

  const fetchRecommendedJobs = useCallback(
    async (userId: string | undefined, jobsCount: number) => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      try {
        const { data } = await axios.post(endpoints.machine.getRecomendedJobs, {
          seeker_id: userId,
          top_n: jobsCount,
        });
        const normalizedData = data.recommendations.map((item: any) => ({
          ...item,
          id: item.Id,
        }));
        setJobs(normalizedData);
      } catch (error) {
        console.log("ML error: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      await fetchRecommendedJobs(userId, jobsCount ?? 6);
    })();
  }, [userId, fetchRecommendedJobs, jobsCount]);
  

  const finalData = userId ? jobs : [];
  

  return {
    data: finalData,
    isLoading,
    error,
  };
};

export default useRecommendedJobs;
