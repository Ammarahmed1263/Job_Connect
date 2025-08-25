import { useSaveJob, useUnsaveJob } from "@queries/jobQueries";
import { useFetchSavedJobs } from "@queries/userQueries";
import useAuthStore from "@store/authStore";
import { useSavedJobsStore } from "@store/savedJobsStore";
import { jobSummary } from "@type/jobTypes";
import { useEffect } from "react";

const useSavedJobs = () => {
  const { savedJobs, addSavedJob, removeSavedJob, isSavedJob, setSavedJobs } =
  useSavedJobsStore();
  const { mutateAsync: saveMutation } = useSaveJob();
  const { mutateAsync: unsaveMutation } = useUnsaveJob();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { data, isPending } = useFetchSavedJobs(isAuthenticated);

  useEffect(() => {
    if (data?.data && isAuthenticated && savedJobs.length === 0) {
      setSavedJobs(data.data);
    }
  }, [data, isAuthenticated, savedJobs.length, setSavedJobs]);

  const saveJob = async (job: jobSummary) => {
    if (isSavedJob(job.id)) return;

    const prevJobs = [...savedJobs];
    try {
      addSavedJob(job);
      await saveMutation(job);
    } catch (error) {
      setSavedJobs(prevJobs);
      console.error("Error saving job:", error);
      throw error;
    }
  };

  const unsaveJob = async (jobId: number) => {
    if (!isSavedJob(jobId)) return;
    const prevJobs = [...savedJobs];
    try {
      removeSavedJob(jobId);
      await unsaveMutation(jobId);
    } catch (error) {
      setSavedJobs(prevJobs);
      console.error("Error unsaving job:", error);
      throw error;
    }
  };
  return {
    savedJobs,
    isSaved: (jobId: number) => isSavedJob(jobId),
    saveJob,
    unsaveJob,
    isSavedJob,
    setSavedJobs,
    isLoading: isPending,
  };
};

export default useSavedJobs;
