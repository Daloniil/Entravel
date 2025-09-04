import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "./useSearch";
import type { SearchState } from "../types/search";

const parseSearchParams = (params: URLSearchParams): Partial<SearchState> => {
  const state: Partial<SearchState> = {};

  const flightType = params.get("flightType");
  if (flightType === "round-trip" || flightType === "one-way") {
    state.flightType = flightType;
  }

  const flightClass = params.get("flightClass");
  if (
    flightClass === "economy" ||
    flightClass === "business" ||
    flightClass === "first"
  ) {
    state.flightClass = flightClass;
  }

  const adults = params.get("adults");
  if (adults) state.adults = parseInt(adults, 10);
  const children = params.get("children");
  if (children) state.children = parseInt(children, 10);
  const infants = params.get("infants");
  if (infants) state.infants = parseInt(infants, 10);

  state.from = params.get("from") || "";
  state.to = params.get("to") || "";
  state.departureDate = params.get("departureDate") || "";
  state.returnDate = params.get("returnDate") || "";

  return state;
};

const serializeSearchState = (state: SearchState): URLSearchParams => {
  const params = new URLSearchParams();
  if (state.flightType) params.set("flightType", state.flightType);
  if (state.flightClass) params.set("flightClass", state.flightClass);
  if (state.from) params.set("from", state.from);
  if (state.to) params.set("to", state.to);
  if (state.departureDate) params.set("departureDate", state.departureDate);
  if (state.returnDate && state.flightType === "round-trip")
    params.set("returnDate", state.returnDate);
  if (state.adults > 0) params.set("adults", state.adults.toString());
  if (state.children > 0) params.set("children", state.children.toString());
  if (state.infants > 0) params.set("infants", state.infants.toString());
  return params;
};

export const useSearchParamsSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchState, updateSearchState } = useSearch();

  // Effect to update internal state from URL on initial load or URL change
  useEffect(() => {
    const urlState = parseSearchParams(searchParams);
    updateSearchState(urlState);
  }, [searchParams]); // Depend on searchParams to re-run when URL changes

  // Effect to update URL from internal state changes
  useEffect(() => {
    const newSearchParams = serializeSearchState(searchState);
    // Only update URL if it's different to avoid unnecessary history entries
    if (newSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(newSearchParams);
    }
  }, [searchState, setSearchParams, searchParams]); // Depend on searchState to re-run when internal state changes
};
