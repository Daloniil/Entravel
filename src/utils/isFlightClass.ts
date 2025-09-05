import { FlightClass } from "../types/search";

export const isFlightClass = (value: string): boolean => {
  return (
    value === FlightClass.ECONOMY ||
    value === FlightClass.BUSINESS ||
    value === FlightClass.FIRST
  );
};
