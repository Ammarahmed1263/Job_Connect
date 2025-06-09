import { jobSummary } from "./jobTypes";

export interface RecentJobsTypes {
  recentJobs: jobSummary[];
  clearRecentJobs: () => void;
  addRecentJob: (job: jobSummary) => void;
}