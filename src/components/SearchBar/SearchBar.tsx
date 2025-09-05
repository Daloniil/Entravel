import React from "react";
import { FlightType } from "../../types/search";
import { useAirportSearchStore } from "../../store/airportSearchStore";
import type { Airport } from "../../types/common";
import Dropdown from "../Dropdown/Dropdown";
import DatePicker from "../DatePicker/DatePicker";
import {
  SearchBarContainer,
  InputGroup,
  Label,
  Button,
  SearchButtonContainer,
} from "./SearchBarStyle";
import PassengerInput from "../PassengerInput/PassengerInput";
import { useFlightSearchStore } from "../../store/flightSearchStore";
import { FLIGHT_TYPE_OPTIONS } from "../../utils/constants";
import { FLIGHT_CLASS_OPTIONS } from "../../utils/constants";
import AutoCompleteInput from "../AutoCompleteInput/AutoCompleteInput";
import { useSearchBar } from "./useSearchBar";

const SearchBar: React.FC = () => {
  const { searchAirports } = useAirportSearchStore();
  const { filter, updateFilter, fetchFlights } = useFlightSearchStore();

  const {
    handleInputChange,
    handleChangeFilter,
    handleSearch,
    isSearchDisabled,
  } = useSearchBar({
    filter,
    updateFilter,
    fetchFlights,
  });

  return (
    <SearchBarContainer>
      <InputGroup>
        <Label>Flight Type</Label>
        <Dropdown
          id="flight-type"
          value={filter.flightType}
          onChange={(value) => handleChangeFilter("flightType", value)}
          options={FLIGHT_TYPE_OPTIONS}
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="flight-class">Flight Class</Label>
        <Dropdown
          id="flight-class"
          value={filter.flightClass}
          onChange={(value) => handleChangeFilter("flightClass", value)}
          options={FLIGHT_CLASS_OPTIONS}
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="from">From</Label>
        <AutoCompleteInput
          id="from"
          placeholder="Departure city"
          value={filter.from}
          onChange={handleInputChange}
          onSelect={(value) => {
            handleChangeFilter("from", value.value);
            handleChangeFilter("fromCode", value.code);
          }}
          searchFunction={searchAirports}
          renderSuggestion={(airport: Airport) =>
            `${airport.city} (${airport.code}) - ${airport.name}`
          }
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="to">To</Label>
        <AutoCompleteInput
          id="to"
          placeholder="Arrival city"
          value={filter.to}
          onChange={handleInputChange}
          onSelect={(value) => {
            handleChangeFilter("to", value.value);
            handleChangeFilter("toCode", value.code);
          }}
          searchFunction={searchAirports}
          renderSuggestion={(airport: Airport) =>
            `${airport.city} (${airport.code}) - ${airport.name}`
          }
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="departureDate">Departure Date</Label>
        <DatePicker
          id="departureDate"
          label="Departure Date"
          value={filter.departureDate}
          onChange={(value) => handleChangeFilter("departureDate", value)}
          min={new Date().toISOString().split("T")[0]}
          max={filter.returnDate || undefined}
        />
      </InputGroup>

      {filter.flightType === FlightType.ROUND_TRIP && (
        <InputGroup>
          <Label htmlFor="returnDate">Return Date</Label>
          <DatePicker
            id="returnDate"
            label="Return Date"
            value={filter.returnDate}
            onChange={(value) => handleChangeFilter("returnDate", value)}
            min={filter.departureDate || new Date().toISOString().split("T")[0]}
          />
        </InputGroup>
      )}

      <PassengerInput
        adults={filter.adults}
        children={filter.children}
        infants={filter.infants}
        onAdultsChange={(value) =>
          handleChangeFilter("adults", value.toString())
        }
        onChildrenChange={(value) =>
          handleChangeFilter("children", value.toString())
        }
        onInfantsChange={(value) =>
          handleChangeFilter("infants", value.toString())
        }
      />

      <SearchButtonContainer>
        <Button onClick={handleSearch} disabled={isSearchDisabled}>
          Search Flights
        </Button>
      </SearchButtonContainer>
    </SearchBarContainer>
  );
};

export default SearchBar;
