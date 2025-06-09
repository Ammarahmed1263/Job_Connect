import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { RecentJobsTypes } from "@type/recentJobsTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useRecentJobsStore = create<RecentJobsTypes>()(
  persist(
    (set, get) => ({
      recentJobs: [],
      addRecentJob: (job) => {
        const jobs = get().recentJobs;
        const exists = jobs.find((j) => j.id === job.id);
        const updated = exists ? jobs.filter((j) => j.id !== job.id) : jobs;
        set({ recentJobs: [job, ...updated].slice(0, 10) }); // max 10
      },
      clearRecentJobs: () => {
        set({ recentJobs: [] });
      },
    }),
    {
      name: "recent-viewed-jobs",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
