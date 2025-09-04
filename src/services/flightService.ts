import type { SearchState } from "../types/search";

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

const mockFlights: FlightResult[] = [
  {
    id: "FL001",
    airline: "Example Air",
    flightNumber: "EA101",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    departureTime: "2025-10-26T08:00:00Z",
    arrivalTime: "2025-10-26T11:00:00Z",
    price: 250,
  },
  {
    id: "FL002",
    airline: "Global Airlines",
    flightNumber: "GA202",
    departureAirport: "LAX",
    arrivalAirport: "JFK",
    departureTime: "2025-10-27T10:00:00Z",
    arrivalTime: "2025-10-27T13:00:00Z",
    price: 300,
  },
  {
    id: "FL003",
    airline: "Example Air",
    flightNumber: "EA103",
    departureAirport: "JFK",
    arrivalAirport: "MIA",
    departureTime: "2025-11-01T14:00:00Z",
    arrivalTime: "2025-11-01T17:00:00Z",
    price: 180,
  },
  {
    id: "FL004",
    airline: "Global Airlines",
    flightNumber: "GA204",
    departureAirport: "MIA",
    arrivalAirport: "JFK",
    departureTime: "2025-11-02T09:00:00Z",
    arrivalTime: "2025-11-02T12:00:00Z",
    price: 220,
  },
];

export const searchFlights = async (
  searchState: SearchState
): Promise<FlightResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const filteredFlights = mockFlights.filter((flight) => {
    const matchesFrom =
      !searchState.from ||
      flight.departureAirport
        .toLowerCase()
        .includes(searchState.from.toLowerCase());
    const matchesTo =
      !searchState.to ||
      flight.arrivalAirport
        .toLowerCase()
        .includes(searchState.to.toLowerCase());
    const matchesDepartureDate =
      !searchState.departureDate ||
      flight.departureTime.startsWith(searchState.departureDate);

    return matchesFrom && matchesTo && matchesDepartureDate;
  });

  return filteredFlights;
};
