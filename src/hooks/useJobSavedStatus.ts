import { useMemo } from 'react';
import { useSavedJobs } from '@queries/userQueries';
import { jobSummary } from '@type/jobTypes';

export const useJobSavedStatus = (jobId: number, enabled: boolean = true) => {
  const { data: savedJobs, isLoading } = useSavedJobs(enabled);

  const isSaved = useMemo(() => {
    if (!savedJobs?.data || savedJobs.data.length === 0) return false;
    return savedJobs.data.some((job: jobSummary) => job.id === jobId);
  }, [savedJobs?.data, jobId]);

  return {
    isSaved,
    savedJobs,
    isLoading
  };
};

export default useJobSavedStatus;