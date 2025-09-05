import { create } from "zustand";
import type { Airport } from "../types/common";
import { travelService } from "../services/travelService";

interface AirportSearchStoreState {
  airports: Airport[];
  loading: boolean;
  error: string | null;
  searchAirports: (query: string) => Promise<Airport[]>;
}

export const useAirportSearchStore = create<AirportSearchStoreState>()(
  (set) => ({
    airports: [],
    loading: false,
    error: null,
    searchAirports: async (query: string) => {
      set({ loading: true, error: null });
      try {
        const results = await travelService.searchAirports(query);
        set({ airports: results });
        return results;
      } catch (err) {
        console.error("Failed to fetch airports:", err);
        set({
          error: "Failed to fetch airports. Please try again.",
          airports: [],
        });
        return [];
      } finally {
        set({ loading: false });
      }
    },
  })
);
