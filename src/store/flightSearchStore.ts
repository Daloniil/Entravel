import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  initialSearchState,
  type SearchState,
  FlightType,
} from "../types/search";
import { travelService } from "../services/travelService";

export interface FlightBoundaries {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
}

export interface FlightResult {
  id: string;
  inbound?: FlightBoundaries;
  outbound: FlightBoundaries;
  price: number;
}

interface FlightSearchStoreState {
  flights: FlightResult[];
  loading: boolean;
  error: string | null;
  filter: SearchState;
  updateFilter: (updates: Partial<SearchState>) => void;
  fetchFlights: () => Promise<void>;
}

export const useFlightSearchStore = create<FlightSearchStoreState>()(
  persist(
    (set, get) => ({
      flights: [],
      loading: false,
      error: null,
      filter: initialSearchState,
      updateFilter: (updates) => {
        set((state) => ({ filter: { ...state.filter, ...updates } }));
      },
      fetchFlights: async () => {
        set({ loading: true, error: null });
        try {
          const currentFilter = get().filter;
          const kiwiParams = {
            origin: currentFilter.fromCode || "",
            destination: currentFilter.toCode || "",
            departureDate: currentFilter.departureDate || "",
            returnDate:
              currentFilter.flightType === FlightType.ROUND_TRIP
                ? currentFilter.returnDate
                : undefined,
            adults: currentFilter.adults,
            children: currentFilter.children,
            infants: currentFilter.infants,
            cabinClass: currentFilter.flightClass,
            flightType: currentFilter.flightType,
          };

          const kiwiResults = await travelService.searchFlights(kiwiParams);
          set({ flights: kiwiResults });
        } catch (err) {
          console.error("Failed to fetch flights:", err);
          set({
            error: "Failed to fetch flights. Please try again.",
            flights: [],
          });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "flight-search-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ filter: state.filter }),
    }
  )
);
