import { create } from "zustand";
import { initialSearchState } from "../types/search";
import type { SearchState } from "../types/search";

interface SearchStore {
  searchState: SearchState;
  setSearchState: (state: SearchState) => void;
  updateSearchState: (updates: Partial<SearchState>) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchState: initialSearchState,
  setSearchState: (state) => set({ searchState: state }),
  updateSearchState: (updates) =>
    set((prevState) => ({
      searchState: { ...prevState.searchState, ...updates },
    })),
}));
