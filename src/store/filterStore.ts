import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Filters } from "@type/filterTypes";

interface FilterStoreState {
  filters: Filters;
  activeFilterCount: number;
  setFilters: (newFilters: Partial<Filters>) => void;
  resetFilters: () => void;
}

const initialFilters: Filters = {
  location: "",
  jobType: "",
  workplace: "",
  minSalary: "",
  maxSalary: "",
  experience: "",
  education: "",
};

const countActiveFilters = (filters: Filters): number => {
  return Object.values(filters).filter(value => value !== undefined && value !== '').length;
};

export const useFilterStore = create<FilterStoreState>()(
  persist(
    (set) => ({
      filters: initialFilters,
      activeFilterCount: 0,
      setFilters: (newFilters) =>
        set((state) => {
          const updatedFilters = { ...state.filters, ...newFilters };
          return {
            filters: updatedFilters,
            activeFilterCount: countActiveFilters(updatedFilters),
          };
        }),
      resetFilters: () => 
        set(() => ({
          filters: initialFilters,
          activeFilterCount: 0,
        })),
    }),
    {
      name: "filter-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);