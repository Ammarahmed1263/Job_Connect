type searchBarState = 'idle' | 'focused' | 'submitted'

export interface SearchStore {
  searchText: string;
  searchHistory: string[];
  barState: searchBarState;
  setSearchHistory: (query: string) => void;
  deleteHistoryItem: (index: number) => void;
  clearSearchHistory: () => void;
  setSearchText: (text: string) => void;
  clearSearchText: () => void;
  setBarState: (state: searchBarState) => void;
}