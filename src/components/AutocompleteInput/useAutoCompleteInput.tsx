import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import type { Airport } from "../../types/common";
import { SuggestionsList } from "./AutoCompleteInputStyle.ts";

export const useAutoCompleteInput = (
  value: string,
  debounceTime: number,
  searchFunction: (query: string) => Promise<Airport[]>,
  onSelect: (value: { code: string; value: string }) => void,
  renderSuggestion: (item: Airport) => string
) => {
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const debouncedValue = useDebounce(value, debounceTime);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

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

  return {
    suggestions,
    loading,
    showSuggestions,
    setShowSuggestions,
    handleSelectSuggestion,
    handleBlur,
  };
};
