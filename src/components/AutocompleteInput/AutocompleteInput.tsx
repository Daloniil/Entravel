import React, { useRef } from "react";
import type { Airport } from "../../types/common";
import { useAutoCompleteInput } from "./useAutoCompleteInput";
import {
  AutoCompleteInputContainer,
  Input,
  SuggestionItem,
  SuggestionsList,
} from "./AutoCompleteInputStyle";

interface AutoCompleteInputProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (value: { code: string; value: string }) => void;
  searchFunction: (query: string) => Promise<Airport[]>;
  renderSuggestion: (item: Airport) => string;
  debounceTime?: number;
}

function AutoCompleteInput({
  id,
  placeholder,
  value,
  onChange,
  onSelect,
  searchFunction,
  renderSuggestion,
  debounceTime = 300,
}: AutoCompleteInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    suggestions,
    loading,
    showSuggestions,
    setShowSuggestions,
    handleSelectSuggestion,
    handleBlur,
  } = useAutoCompleteInput(
    value,
    debounceTime,
    searchFunction,
    onSelect,
    renderSuggestion
  );

  return (
    <AutoCompleteInputContainer>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() =>
          value.length > 0 && suggestions.length > 0 && setShowSuggestions(true)
        }
        onBlur={handleBlur}
        ref={inputRef}
      />
      {loading && <p>Loading...</p>}
      {showSuggestions && suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((item, index) => (
            <SuggestionItem
              key={index}
              onClick={() => handleSelectSuggestion(item)}
            >
              {renderSuggestion(item)}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </AutoCompleteInputContainer>
  );
}

export default AutoCompleteInput;
