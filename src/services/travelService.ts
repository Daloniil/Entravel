import ApiFactory from "./api";
import type { Airport } from "../types/common";
import type { FlightResult } from "../context/FlightSearchContext";
import { FlightType } from "../types/search";

interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  cabinClass: string;
  flightType: FlightType;
}

interface KiwiStation {
  name: string;
  station: { name: string; city: { name: string } };
  localTime: string;
}

interface KiwiCarrier {
  name: string;
}

interface KiwiSegment {
  carrier: KiwiCarrier;
  code: string;
  source: KiwiStation;
  destination: KiwiStation;
  localTime: string;
  duration: number;
}

interface KiwiSectorSegment {
  segment: KiwiSegment;
}

interface KiwiFlightResult {
  id: string;
  outbound: {
    sectorSegments: KiwiSectorSegment[];
  };
  inbound: {
    sectorSegments: KiwiSectorSegment[];
  };
  price: {
    amount: string;
  };
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
        params.flightType === FlightType.ROUND_TRIP
          ? FlightType.ROUND_TRIP
          : FlightType.ONE_WAY;

      const requestParams = {
        source: `${params.origin}`,
        destination: `${params.destination}`,
        currency: "usd",
        locale: "en",
        adults: params.adults,
        children: params.children,
        infants: params.infants,
        cabinClass: params.cabinClass.toUpperCase(),
        limit: 20,
        handbags: 1,
        holdbags: 1,
        sortBy: "DURATION",
        sortOrder: "ASCENDING",
        applyMixedClasses: false,
        allowReturnFromDifferentCity: false,
        allowChangeInboundDestination: false,
        allowDifferentStationConnection: false,
        enableSelfTransfer: false,
        allowOvernightStopover: true,
        enableThrowAwayTicketing: false,
        transportTypes: "FLIGHT",
        contentProviders: "FLIXBUS_DIRECTS,FRESH,KAYAK,KIWI",
      };

      const dateFrom = params.departureDate;
      const dateTo = params.returnDate || params.departureDate;

      const kiwiParams = {
        ...requestParams,
        dateFrom: dateFrom,
        ...(params.flightType === FlightType.ROUND_TRIP && { dateTo: dateTo }),
      };

      const response = await kiwiApiClient.get(endpoint, {
        params: kiwiParams,
      });

      const mappedResults: FlightResult[] = response.data.itineraries.map(
        (itinerary: KiwiFlightResult) => ({
          id: itinerary.id,
          outbound: {
            airline: itinerary.outbound.sectorSegments[0].segment.carrier.name,
            flightNumber: itinerary.outbound.sectorSegments[0].segment.code,
            departureAirport: `${itinerary.outbound.sectorSegments[0].segment.source.station.city.name} – ${itinerary.outbound.sectorSegments[0].segment.source.station.name}`,
            arrivalAirport: `${itinerary.outbound.sectorSegments[0].segment.destination.station.city.name} - ${itinerary.outbound.sectorSegments[0].segment.destination.station.name}`,
            departureTime:
              itinerary.outbound.sectorSegments[0].segment.source.localTime,
            arrivalTime:
              itinerary.outbound.sectorSegments[0].segment.destination
                .localTime,
            duration: itinerary.outbound.sectorSegments[0].segment.duration,
          },
          inbound: {
            airline: itinerary.inbound.sectorSegments[0].segment.carrier.name,
            flightNumber: itinerary.inbound.sectorSegments[0].segment.code,
            departureAirport: `${itinerary.inbound.sectorSegments[0].segment.source.station.city.name} – ${itinerary.inbound.sectorSegments[0].segment.source.station.name}`,
            arrivalAirport: `${itinerary.inbound.sectorSegments[0].segment.destination.station.city.name} - ${itinerary.inbound.sectorSegments[0].segment.destination.station.name}`,
            departureTime:
              itinerary.inbound.sectorSegments[0].segment.source.localTime,
            arrivalTime:
              itinerary.inbound.sectorSegments[0].segment.destination.localTime,
            duration: itinerary.inbound.sectorSegments[0].segment.duration,
          },
          price: parseFloat(itinerary.price.amount),
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
