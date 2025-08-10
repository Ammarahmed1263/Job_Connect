import AsyncStorage from "@react-native-async-storage/async-storage";
import { SavedJobsTypes } from "@type/savedJobsTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useSavedJobsStore = create<SavedJobsTypes>()(
  persist(
    (set, get) => ({
      savedJobs: [],
      savedJobIds: new Set<number>(),
      isSavedJob: (jobId) => {
        const savedJobIds = get().savedJobIds;
        return savedJobIds instanceof Set ? savedJobIds.has(jobId) : false;
      },

      setSavedJobs: (jobs) =>
        set({
          savedJobs: jobs,
          savedJobIds: new Set(jobs.map((job) => job.id)),
        }),

      addSavedJob: (job) =>
        set((state) => {
          const updatedIds = new Set(state.savedJobIds);
          updatedIds.add(job.id);
          return {
            savedJobs: [job, ...state.savedJobs],
            savedJobIds: updatedIds,
          };
        }),

      removeSavedJob: (jobId) =>
        set((state) => {
          const updatedJobs = state.savedJobs.filter((job) => job.id !== jobId);
          const updatedIds = new Set(state.savedJobIds);
          updatedIds.delete(jobId);

          return {
            savedJobs: updatedJobs,
            savedJobIds: updatedIds,
          };
        }),
    }),
    {
      name: "saved-jobs",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.savedJobIds = new Set(state.savedJobIds);
        }
      },
    }
  )
);
