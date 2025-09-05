export enum FlightType {
  ROUND_TRIP = "round-trip",
  ONE_WAY = "one-way",
}
export enum FlightClass {
  ECONOMY = "economy",
  BUSINESS = "business",
  FIRST = "first",
}

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

export const initialSearchState: SearchState = {
  flightType: FlightType.ROUND_TRIP,
  flightClass: FlightClass.ECONOMY,
  from: "",
  to: "",
  departureDate: "",
  returnDate: "",
  adults: 1,
  children: 0,
  infants: 0,
};
