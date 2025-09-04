// 1. Define the types for the search state
export type FlightType = "round-trip" | "one-way";
export type FlightClass = "economy" | "business" | "first";

export interface SearchState {
  flightType: FlightType;
  flightClass: FlightClass;
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
}

export interface SearchContextType {
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
  updateSearchState: (updates: Partial<SearchState>) => void;
}

// Initial state for the search form
export const initialSearchState: SearchState = {
  flightType: "round-trip",
  flightClass: "economy",
  from: "",
  to: "",
  departureDate: "",
  returnDate: "",
  adults: 1,
  children: 0,
  infants: 0,
};
