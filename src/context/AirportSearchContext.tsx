import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Airport } from "../types/common";
import { travelService } from "../services/travelService";

interface AirportSearchContextType {
  airports: Airport[];
  loading: boolean;
  error: string | null;
  searchAirports: (query: string) => Promise<Airport[]>;
}

const AirportSearchContext = createContext<
  AirportSearchContextType | undefined
>(undefined);

interface AirportSearchProviderProps {
  children?: ReactNode;
}

export const AirportSearchProvider: React.FC<AirportSearchProviderProps> = ({
  children,
}) => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAirports = useCallback(
    async (query: string): Promise<Airport[]> => {
      setLoading(true);
      setError(null);
      try {
        const results = await travelService.searchAirports(query);
        setAirports(results);
        return results;
      } catch (err) {
        console.error("Failed to fetch airports:", err);
        setError("Failed to fetch airports. Please try again.");
        setAirports([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const value = {
    airports,
    loading,
    error,
    searchAirports: fetchAirports,
  };

  return (
    <AirportSearchContext.Provider value={value}>
      {children}
    </AirportSearchContext.Provider>
  );
};

export const useAirportSearch = () => {
  const context = useContext(AirportSearchContext);
  if (context === undefined) {
    throw new Error(
      "useAirportSearch must be used within an AirportSearchProvider"
    );
  }
  return context;
};
