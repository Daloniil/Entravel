import { useMemo } from "react";
import { FlightClass, FlightType, type SearchState } from "../../types/search";

export const useSearchBar = ({
  filter,
  updateFilter,
  fetchFlights,
}: {
  filter: SearchState;
  updateFilter: (updates: Partial<SearchState>) => void;
  fetchFlights: () => void;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    updateFilter({ [id]: value });
  };

  const handleChangeFilter = (type: string, value: string) => {
    updateFilter({ [type]: value });
  };

  const handleClearFilters = () => {
    updateFilter({
      from: "",
      fromCode: "",
      to: "",
      toCode: "",
      departureDate: "",
      returnDate: "",
      adults: 1,
      children: 0,
      infants: 0,
      flightType: FlightType.ONE_WAY,
      flightClass: FlightClass.ECONOMY,
    });
  };

  const handleSearch = () => fetchFlights();

  const isSearchDisabled = useMemo(() => {
    const { from, fromCode, to, toCode, departureDate, returnDate } = filter;

    if (!from || !fromCode || !to || !toCode || !departureDate) {
      return true;
    }

    if (filter.flightType === FlightType.ROUND_TRIP && !returnDate) {
      return true;
    }

    return false;
  }, [filter]);

  return {
    isSearchDisabled,
    handleInputChange,
    handleChangeFilter,
    handleSearch,
    handleClearFilters,
  };
};
