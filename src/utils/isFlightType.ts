import { FlightType } from "../types/search";

export const isFlightType = (value: string): boolean => {
  return value === FlightType.ROUND_TRIP || value === FlightType.ONE_WAY;
};
