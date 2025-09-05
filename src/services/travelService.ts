import ApiFactory from "./api";
import type { Airport } from "../types/common";
import type { FlightResult } from "../store/flightSearchStore";
import { FlightType } from "../types/search";

import type { FlightSearchParams, KiwiFlightResult } from "./types";
import type { SkyscannerPlaceResult } from "./types";

import { KIWI_API_KEY, KIWI_BASE_URL, KIWI_API_HOST } from "../utils/constants";
import {
  FLIGHTS_SKY_API_KEY,
  FLIGHTS_SKY_BASE_URL,
  FLIGHTS_SKY_API_HOST,
} from "../utils/constants";
import { mapKiwiSegmentToFlightBoundaries } from "../utils/mapKiwiSegmentToFlightBoundaries";

const kiwiApiClient = ApiFactory({
  baseURL: KIWI_BASE_URL,
  headers: {
    "X-RapidAPI-Key": KIWI_API_KEY,
    "X-RapidAPI-Host": KIWI_API_HOST,
    "Content-Type": "application/json",
  },
});

const flightsSkyApiClient = ApiFactory({
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
        handbags: params.adults,
        holdbags: params.adults,
        adultsHoldBags: 1,
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

      const response = await kiwiApiClient.get(endpoint, {
        params: requestParams,
      });

      const mappedResults: FlightResult[] = response.data.itineraries.map(
        (itinerary: KiwiFlightResult) => {
          const outboundSegment =
            itinerary.outbound?.sectorSegments[0]?.segment ||
            itinerary.sector.sectorSegments[0].segment;
          const inboundSegment = itinerary.inbound?.sectorSegments[0]?.segment;

          return {
            id: itinerary.id,
            outbound: mapKiwiSegmentToFlightBoundaries(outboundSegment),
            inbound: inboundSegment
              ? mapKiwiSegmentToFlightBoundaries(inboundSegment)
              : undefined,
            price: parseFloat(itinerary.price.amount),
          };
        }
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
      const response = await flightsSkyApiClient.get(endpoint, {
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
