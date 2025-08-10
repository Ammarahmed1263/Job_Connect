import { jobSummary } from "./jobTypes";

export interface SavedJobsTypes {
    savedJobs: jobSummary[],
    savedJobIds: Set<number>,
    setSavedJobs: (ids: jobSummary[]) => void,
    isSavedJob: (id: number) => boolean,
    addSavedJob(job: jobSummary): void,
    removeSavedJob(jobId: number): void,
}