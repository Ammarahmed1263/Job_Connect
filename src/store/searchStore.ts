import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchStore } from "@type/searchTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      searchText: "",
      searchHistory: [],
      barState: "idle",
      setSearchText: (search) => set({ searchText: search }),
      setSearchHistory: (search) => {
        const history = get().searchHistory;
        const exists = history.find((h) => h === search);
        if (exists) return;
        set((state) => ({ searchHistory: [search, ...state.searchHistory] }))
      },
      deleteHistoryItem: (index) =>
        set((state) => ({
          searchHistory: state.searchHistory.filter((_, i) => i !== index),
        })),
      clearSearchHistory: () => set({ searchHistory: [] }),
      clearSearchText: () => set({ searchText: "" }),
      setBarState: (state) => set({ barState: state }),
    }),
    {
      name: "search-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        searchHistory: state.searchHistory,
      }),
    }
  )
);
