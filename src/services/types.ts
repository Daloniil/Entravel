import type { FlightType } from "../types/search";

export interface FlightSearchParams {
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

export interface KiwiStation {
  name: string;
  station: { name: string; city: { name: string } };
  localTime: string;
}

export interface KiwiCarrier {
  name: string;
}

export interface KiwiSegment {
  carrier: KiwiCarrier;
  code: string;
  source: KiwiStation;
  destination: KiwiStation;
  localTime: string;
  duration: number;
}

export interface KiwiSectorSegment {
  segment: KiwiSegment;
}

export interface KiwiFlightResult {
  id: string;
  outbound: {
    sectorSegments: KiwiSectorSegment[];
  };
  inbound: {
    sectorSegments: KiwiSectorSegment[];
    sector: {
      sectorSegments: KiwiSectorSegment[];
    };
  };
  sector: {
    sectorSegments: KiwiSectorSegment[];
  };
  price: {
    amount: string;
  };
}

export interface SkyscannerPlaceResult {
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
