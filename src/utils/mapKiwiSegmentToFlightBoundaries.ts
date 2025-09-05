import type { KiwiSegment } from "../services/types";
import type { FlightBoundaries } from "../store/flightSearchStore";

export const mapKiwiSegmentToFlightBoundaries = (
  segment: KiwiSegment
): FlightBoundaries => ({
  airline: segment.carrier.name,
  flightNumber: segment.code,
  departureAirport: `${segment.source.station.city.name} – ${segment.source.station.name}`,
  arrivalAirport: `${segment.destination.station.city.name} - ${segment.destination.station.name}`,
  departureTime: segment.source.localTime,
  arrivalTime: segment.destination.localTime,
  duration: segment.duration,
});
