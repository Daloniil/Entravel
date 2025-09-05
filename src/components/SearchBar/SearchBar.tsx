import React from "react";
import { FlightClass, FlightType } from "../../types/search";
import { useAirportSearch } from "../../context/AirportSearchContext";
import type { Airport } from "../../types/common";
import AutocompleteInput from "../AutocompleteInput/AutocompleteInput";
import Dropdown from "../Dropdown/Dropdown";
import DatePicker from "../DatePicker/DatePicker";
import {
  SearchBarContainer,
  InputGroup,
  Label,
  Button,
} from "./SearchBarStyle";
import PassengerInput from "../PassengerInput/PassengerInput";
import { useFlightSearch } from "../../context/FlightSearchContext";
import { isFlightType } from "../../utils/isFlightType";
import { isFlightClass } from "../../utils/isFlightClass";

const SearchBar: React.FC = () => {
  const { searchAirports } = useAirportSearch();
  const { filter, updateFilter, fetchFlights } = useFlightSearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    updateFilter({ [id]: value });
  };

  const handleAutocompleteSelect = (id: string, value: string) => {
    updateFilter({ [id]: value });
  };

  const handleDateChange = (id: string, value: string) => {
    updateFilter({ [id]: value });
  };

  const handleDropdownChange = (id: string, value: string) => {
    if (isFlightType(id)) {
      updateFilter({ flightType: value as FlightType });
    } else if (isFlightClass(id)) {
      updateFilter({ flightClass: value as FlightClass });
    }
  };

  const handlePassengerChange = (type: string, value: number) => {
    updateFilter({ [type]: value });
  };

  const handleSearch = () => fetchFlights();

  return (
    <SearchBarContainer>
      <InputGroup>
        <Label>Flight Type</Label>
        <Dropdown
          id="flight-type"
          value={filter.flightType}
          onChange={(value) => handleDropdownChange("flight-type", value)}
          options={[
            { value: "round-trip", label: "Round-trip" },
            { value: "one-way", label: "One-way" },
          ]}
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="flight-class">Flight Class</Label>
        <Dropdown
          id="flight-class"
          value={filter.flightClass}
          onChange={(value) => handleDropdownChange("flight-class", value)}
          options={[
            { value: "economy", label: "Economy" },
            { value: "business", label: "Business" },
            { value: "first", label: "First" },
          ]}
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="from">From</Label>
        <AutocompleteInput
          id="from"
          placeholder="Departure city"
          value={filter.from}
          onChange={handleInputChange}
          onSelect={(value) => handleAutocompleteSelect("from", value)}
          searchFunction={searchAirports}
          renderSuggestion={(airport: Airport) =>
            `${airport.city} (${airport.code}) - ${airport.name}`
          }
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="to">To</Label>
        <AutocompleteInput
          id="to"
          placeholder="Arrival city"
          value={filter.to}
          onChange={handleInputChange}
          onSelect={(value) => handleAutocompleteSelect("to", value)}
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
          placeholder="Select Departure Date"
          value={filter.departureDate}
          onChange={(value) => handleDateChange("departureDate", value)}
          min={new Date().toISOString().split("T")[0]}
          max={filter.returnDate || undefined}
        />
      </InputGroup>

      {filter.flightType === "round-trip" && (
        <InputGroup>
          <Label htmlFor="returnDate">Return Date</Label>
          <DatePicker
            id="returnDate"
            label="Return Date"
            placeholder="Select Return Date"
            value={filter.returnDate}
            onChange={(value) => handleDateChange("returnDate", value)}
            min={filter.departureDate || new Date().toISOString().split("T")[0]}
          />
        </InputGroup>
      )}

      <PassengerInput
        adults={filter.adults}
        children={filter.children}
        infants={filter.infants}
        onAdultsChange={(value) => handlePassengerChange("adults", value)}
        onChildrenChange={(value) => handlePassengerChange("children", value)}
        onInfantsChange={(value) => handlePassengerChange("infants", value)}
      />

      <Button onClick={handleSearch}>Search Flights</Button>
    </SearchBarContainer>
  );
};

export default SearchBar;
