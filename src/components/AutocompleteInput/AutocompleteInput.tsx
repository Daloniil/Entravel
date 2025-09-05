import React, { useState, useEffect, useRef } from "react";
import useDebounce from "../../hooks/useDebounce";
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

  const handleSelectSuggestion = (item: T) => {
    setIsSelecting(true);
    onSelect(renderSuggestion(item));
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
