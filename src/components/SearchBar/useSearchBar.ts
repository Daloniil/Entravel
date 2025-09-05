import { useMemo } from "react";
import { FlightType, type SearchState } from "../../types/search";

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

  const handleSearch = () => fetchFlights();

  const isSearchDisabled = useMemo(() => {
    const {
      from,
      fromCode,
      to,
      toCode,
      departureDate,
      returnDate,
      adults,
      children,
      infants,
    } = filter;

    if (!from || !fromCode || !to || !toCode || !departureDate) {
      return true;
    }

    if (adults || children || infants) {
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
  };
};
