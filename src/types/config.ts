// Define the type for the configuration
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
    searchAirports: (
      query: string
    ) => Promise<import("../services/airportService").Airport[]>;
    searchFlights: (
      searchState: import("../types/search").SearchState
    ) => Promise<import("../services/flightService").FlightResult[]>;
  };
}
