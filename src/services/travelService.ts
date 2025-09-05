import ApiFactory from "./api";
import type { Airport } from "../types/common";
import type { FlightResult } from "../context/FlightSearchContext";

interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  cabinClass: string;
  flightType: "round-trip" | "one-way";
}

interface KiwiFlightResult {
  id: string;
  airlines: string[];
  flight_number: string;
  flyFrom: string;
  flyTo: string;
  local_departure: string;
  local_arrival: string;
  price: number;
}

interface SkyscannerPlaceResult {
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
    id: string;
    skyId: string;
  };
  navigation: {
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      flightPlaceType: string;
      localizedName: string;
    };
    relevantHotelParams: {
      entityType: string;
      localizedName: string;
    };
  };
}

const KIWI_API_KEY = import.meta.env.VITE_KIWI_API_KEY;
const KIWI_BASE_URL = "https://kiwi-com-cheap-flights.p.rapidapi.com";
const KIWI_API_HOST = "kiwi-com-cheap-flights.p.rapidapi.com";

const FLIGHTS_SKY_API_KEY = import.meta.env.VITE_FLIGHTS_SKY_API_KEY;
const FLIGHTS_SKY_BASE_URL = "https://flights-sky.p.rapidapi.com";
const FLIGHTS_SKY_API_HOST = "flights-sky.p.rapidapi.com";

const kiwiApiClient = ApiFactory({
  baseURL: KIWI_BASE_URL,
  headers: {
    "X-RapidAPI-Key": KIWI_API_KEY,
    "X-RapidAPI-Host": KIWI_API_HOST,
    "Content-Type": "application/json",
  },
});

const skyscannerApiClient = ApiFactory({
  baseURL: FLIGHTS_SKY_BASE_URL,
  headers: {
    "X-RapidAPI-Key": FLIGHTS_SKY_API_KEY,
    "X-RapidAPI-Host": FLIGHTS_SKY_API_HOST,
    "Content-Type": "application/json",
  },
});

export const travelService = {
  searchFlights: async (params: FlightSearchParams) => {
    if (!KIWI_API_KEY) {
      console.error("Kiwi API key is not defined.");
      return [];
    }

    try {
      const endpoint =
        params.flightType === "round-trip" ? "/round-trip" : "/one-way";

      const requestParams = {
        source: `airport:${params.origin}`,
        destination: `airport:${params.destination}`,
        currency: "usd",
        locale: "en",
        adults: params.adults,
        children: params.children,
        infants: params.infants,
        cabinClass: params.cabinClass.toUpperCase(),

        limit: 20,
      };

      const dateFrom = params.departureDate;
      const dateTo = params.returnDate || params.departureDate;

      const kiwiParams = {
        ...requestParams,
        dateFrom: dateFrom,
        ...(params.flightType === "round-trip" && { dateTo: dateTo }),
      };

      const response = await kiwiApiClient.get(endpoint, {
        params: kiwiParams,
      });

      const mappedResults: FlightResult[] = response.data.data.map(
        (flight: KiwiFlightResult) => ({
          id: flight.id,
          airline: flight.airlines[0] || "Unknown Airline",
          flightNumber: flight.flight_number,
          departureAirport: flight.flyFrom,
          arrivalAirport: flight.flyTo,
          departureTime: flight.local_departure,
          arrivalTime: flight.local_arrival,
          price: flight.price,
        })
      );
      return mappedResults;
    } catch (error) {
      console.error("Failed to fetch flights from Kiwi:", error);
      return [];
    }
  },

  searchAirports: async (query: string): Promise<Airport[]> => {
    if (!FLIGHTS_SKY_API_KEY) {
      console.error("Flights Sky API key is not defined.");
      return [];
    }

    try {
      const endpoint = "/flights/auto-complete";
      const response = await skyscannerApiClient.get(endpoint, {
        params: { query },
      });

      const places = response.data.data || [];
      return places.map((place: SkyscannerPlaceResult) => {
        const name = place.presentation.title;
        const code = place.presentation.skyId;
        const country = place.presentation.subtitle;
        const city =
          place.navigation.relevantHotelParams.localizedName ||
          place.presentation.title;

        return {
          code: code,
          name: name,
          city: city,
          country: country,
        };
      });
    } catch (error) {
      console.error("Failed to fetch airports:", error);
      return [];
    }
  },
};
