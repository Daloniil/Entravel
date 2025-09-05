import type { Airport } from "./common";
import type { FlightResult } from "../context/FlightSearchContext";
import type { SearchState } from "./search";

export interface AppConfig {
  appName: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  features: {
    extraSearchOptions: boolean;
    bannerText: string;
  };
  apiEndpoints: {
    airportSearch: string;
    flightSearch: string;
  };
  services: {
    searchAirports: (query: string) => Promise<Airport[]>;
    searchFlights: (searchState: SearchState) => Promise<FlightResult[]>;
  };
}
