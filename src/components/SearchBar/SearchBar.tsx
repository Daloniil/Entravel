import React from "react";
import { useSearch } from "../../hooks/useSearch";
import type { FlightType, FlightClass } from "../../types/search";
import { searchAirports } from "../../services/airportService";
import type { Airport } from "../../services/airportService";
import AutocompleteInput from "../AutocompleteInput/AutocompleteInput";
import Dropdown from "../Dropdown/Dropdown";
import {
  SearchBarContainer,
  InputGroup,
  Label,
  Input,
  Button,
} from "./SearchBarStyle";

const SearchBar: React.FC = () => {
  const { searchState, updateSearchState } = useSearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    updateSearchState({ [id]: value });
  };

  const handlePassengerChange = (
    type: "adults" | "children" | "infants",
    value: string
  ) => {
    updateSearchState({ [type]: parseInt(value, 10) });
  };

  const handleSearch = () => {
    console.log("Search initiated with state:", searchState);
  };

  return (
    <SearchBarContainer>
      <InputGroup>
        <Label>Flight Type</Label>
        <Dropdown
          id="flight-type"
          value={searchState.flightType}
          onChange={(value) =>
            updateSearchState({ flightType: value as FlightType })
          }
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
          value={searchState.flightClass}
          onChange={(value) =>
            updateSearchState({ flightClass: value as FlightClass })
          }
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
          value={searchState.from}
          onChange={handleInputChange}
          onSelect={(value) => updateSearchState({ from: value })}
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
          value={searchState.to}
          onChange={handleInputChange}
          onSelect={(value) => updateSearchState({ to: value })}
          searchFunction={searchAirports}
          renderSuggestion={(airport: Airport) =>
            `${airport.city} (${airport.code}) - ${airport.name}`
          }
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="departureDate">Departure Date</Label>
        <Input
          id="departureDate"
          type="date"
          value={searchState.departureDate}
          onChange={handleInputChange}
        />
      </InputGroup>

      {searchState.flightType === "round-trip" && (
        <InputGroup>
          <Label htmlFor="returnDate">Return Date</Label>
          <Input
            id="returnDate"
            type="date"
            value={searchState.returnDate}
            onChange={handleInputChange}
          />
        </InputGroup>
      )}

      <InputGroup>
        <Label>Passengers</Label>
        <Input
          type="number"
          placeholder="Adults"
          min="1"
          id="adults"
          value={searchState.adults}
          onChange={(e) => handlePassengerChange("adults", e.target.value)}
        />
        <Input
          type="number"
          placeholder="Children"
          min="0"
          id="children"
          value={searchState.children}
          onChange={(e) => handlePassengerChange("children", e.target.value)}
        />
        <Input
          type="number"
          placeholder="Infants"
          min="0"
          id="infants"
          value={searchState.infants}
          onChange={(e) => handlePassengerChange("infants", e.target.value)}
        />
      </InputGroup>

      <Button onClick={handleSearch}>Search Flights</Button>
    </SearchBarContainer>
  );
};

export default SearchBar;
