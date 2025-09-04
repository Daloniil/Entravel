import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  AutocompleteContainer,
  Input,
  SuggestionsList,
  SuggestionItem,
} from "./AutocompleteInputStyle";

interface AutocompleteInputProps<T> {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (value: string) => void;
  searchFunction: (query: string) => Promise<T[]>;
  renderSuggestion: (item: T) => string;
  debounceTime?: number;
}

function AutocompleteInput<T>({
  id,
  placeholder,
  value,
  onChange,
  onSelect,
  searchFunction,
  renderSuggestion,
  debounceTime = 300,
}: AutocompleteInputProps<T>) {
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useCallback(
    (query: string) => {
      const handler = setTimeout(async () => {
        if (query.length > 0) {
          setLoading(true);
          try {
            const results = await searchFunction(query);
            setSuggestions(results);
            setShowSuggestions(true);
          } catch (error) {
            console.error("Autocomplete search failed:", error);
            setSuggestions([]);
          } finally {
            setLoading(false);
          }
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }, debounceTime);

      return () => {
        clearTimeout(handler);
      };
    },
    [searchFunction, debounceTime]
  );

  useEffect(() => {
    debouncedSearch(value);
  }, [value, debouncedSearch]);

  const handleSelectSuggestion = (item: T) => {
    onSelect(renderSuggestion(item));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Delay hiding suggestions to allow click on suggestion item
    setTimeout(() => {
      if (
        !e.relatedTarget ||
        !e.relatedTarget.closest(SuggestionsList.styledComponentId as string)
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
