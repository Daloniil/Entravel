import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFlightSearchStore } from "../store/flightSearchStore";
import { FlightType, FlightClass, type SearchState } from "../types/search";

const parseSearchParams = (params: URLSearchParams): Partial<SearchState> => {
  const state: Partial<SearchState> = {};

  const flightType = params.get("flightType");
  if (
    flightType &&
    Object.values(FlightType).includes(flightType as FlightType)
  ) {
    state.flightType = flightType as FlightType;
  }

  const flightClass = params.get("flightClass");
  if (
    flightClass &&
    Object.values(FlightClass).includes(flightClass as FlightClass)
  ) {
    state.flightClass = flightClass as FlightClass;
  }

  const adults = params.get("adults");
  if (adults) state.adults = parseInt(adults, 10);
  const children = params.get("children");
  if (children) state.children = parseInt(children, 10);
  const infants = params.get("infants");
  if (infants) state.infants = parseInt(infants, 10);

  state.from = params.get("from") || "";
  state.fromCode = params.get("fromCode") || "";
  state.to = params.get("to") || "";
  state.toCode = params.get("toCode") || "";
  state.departureDate = params.get("departureDate") || "";
  state.returnDate = params.get("returnDate") || "";

  return state;
};

const serializeSearchState = (state: SearchState): URLSearchParams => {
  const params = new URLSearchParams();
  if (state.flightType) params.set("flightType", state.flightType);
  if (state.flightClass) params.set("flightClass", state.flightClass);
  if (state.from) params.set("from", state.from);
  if (state.fromCode) params.set("fromCode", state.fromCode);
  if (state.to) params.set("to", state.to);
  if (state.toCode) params.set("toCode", state.toCode);
  if (state.departureDate) params.set("departureDate", state.departureDate);
  if (state.returnDate && state.flightType === FlightType.ROUND_TRIP)
    params.set("returnDate", state.returnDate);
  if (state.adults > 0) params.set("adults", state.adults.toString());
  if (state.children > 0) params.set("children", state.children.toString());
  if (state.infants > 0) params.set("infants", state.infants.toString());
  return params;
};

export const useFlightSearchUrlSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filter, updateFilter } = useFlightSearchStore();

  useEffect(() => {
    const urlState = parseSearchParams(searchParams);
    if (Object.keys(urlState).length > 0) {
      updateFilter(urlState);
    }
  }, [searchParams, updateFilter]);

  useEffect(() => {
    const newSearchParams = serializeSearchState(filter);
    if (newSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(newSearchParams);
    }
  }, [filter, setSearchParams, searchParams]);
};
