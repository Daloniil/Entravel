import React, { useState, useEffect, useRef } from "react";
import useDebounce from "../../hooks/useDebounce";
import {
  AutocompleteContainer,
  Input,
  SuggestionsList,
  SuggestionItem,
} from "./AutocompleteInputStyle";
import type { Airport } from "../../types/common";

interface AutocompleteInputProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (value: { code: string; value: string }) => void;
  searchFunction: (query: string) => Promise<Airport[]>;
  renderSuggestion: (item: Airport) => string;
  debounceTime?: number;
}

function AutocompleteInput({
  id,
  placeholder,
  value,
  onChange,
  onSelect,
  searchFunction,
  renderSuggestion,
  debounceTime = 300,
}: AutocompleteInputProps) {
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedValue = useDebounce(value, debounceTime);

  useEffect(() => {
    if (isSelecting) {
      setIsSelecting(false);
      return;
    }

    if (debouncedValue.length > 0) {
      setLoading(true);
      searchFunction(debouncedValue)
        .then((results) => {
          setSuggestions(results);
          setShowSuggestions(true);
        })
        .catch(() => {
          setSuggestions([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedValue, searchFunction]);

  const handleSelectSuggestion = (item: Airport) => {
    setIsSelecting(true);
    onSelect({ code: item.code, value: renderSuggestion(item) });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (
        !relatedTarget ||
        !relatedTarget.closest(SuggestionsList.styledComponentId as string)
      ) {
        setShowSuggestions(false);
      }
    }, 100);
  };

  return (
    <AutocompleteContainer>
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
    </AutocompleteContainer>
  );
}

export default AutocompleteInput;
