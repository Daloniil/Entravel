import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { SearchState } from "../types/search";
import { initialSearchState } from "../types/search";
import { travelService } from "../services/travelService";

export interface FlightResult {
  id: string;
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}

interface FlightSearchContextType {
  flights: FlightResult[];
  loading: boolean;
  error: string | null;
  filter: SearchState;
  setFilter: React.Dispatch<React.SetStateAction<SearchState>>;
  updateFilter: (updates: Partial<SearchState>) => void;
  fetchFlights: () => Promise<void>;
}

const FlightSearchContext = createContext<FlightSearchContextType | undefined>(
  undefined
);

interface FlightSearchProviderProps {
  children?: ReactNode;
}

export const FlightSearchProvider: React.FC<FlightSearchProviderProps> = ({
  children,
}) => {
  const [flights, setFlights] = useState<FlightResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<SearchState>(initialSearchState);

  const updateFilter = useCallback((updates: Partial<SearchState>) => {
    setFilter((prevFilter) => ({ ...prevFilter, ...updates }));
  }, []);

  const fetchFlights = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const kiwiParams = {
        origin: filter.from || "",
        destination: filter.to || "",
        departureDate: filter.departureDate || "",
        returnDate:
          filter.flightType === "round-trip" ? filter.returnDate : undefined,
        adults: filter.adults,
        children: filter.children,
        infants: filter.infants,
        cabinClass: filter.flightClass,
        flightType: filter.flightType,
      };

      const kiwiResults = await travelService.searchFlights(kiwiParams);

      interface KiwiFlightResult {
        id?: string;
        airlines?: string[];
        flight_number?: string;
        flyFrom?: string;
        flyTo?: string;
        local_departure?: string;
        local_arrival?: string;
        price?: number;
      }

      const mappedResults: FlightResult[] = kiwiResults.map(
        (flight: KiwiFlightResult) => ({
          id: flight.id || Math.random().toString(36).substring(7),
          airline: flight.airlines?.[0] || "Unknown Airline",
          flightNumber: flight.flight_number || "N/A",
          departureAirport: flight.flyFrom || kiwiParams.origin,
          arrivalAirport: flight.flyTo || kiwiParams.destination,
          departureTime: flight.local_departure || kiwiParams.departureDate,
          arrivalTime: flight.local_arrival || "N/A",
          price: flight.price || 0,
        })
      );
      setFlights(mappedResults);
    } catch (err) {
      console.error("Failed to fetch flights:", err);
      setError("Failed to fetch flights. Please try again.");
      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const value = {
    flights,
    loading,
    error,
    filter,
    setFilter,
    updateFilter,
    fetchFlights,
  };

  return (
    <FlightSearchContext.Provider value={value}>
      {children}
    </FlightSearchContext.Provider>
  );
};

export const useFlightSearch = () => {
  const context = useContext(FlightSearchContext);
  if (context === undefined) {
    throw new Error(
      "useFlightSearch must be used within a FlightSearchProvider"
    );
  }
  return context;
};
