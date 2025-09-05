import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import type { Airport } from "../../types/common";
import { SuggestionsList } from "./AutoCompleteInputStyle";

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
  const [errorHint, setErrorHint] = useState<string | null>(null);

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
      setSuggestions([]);
      setLoading(true);
      setErrorHint(null);
      searchFunction(debouncedValue)
        .then((results) => {
          setSuggestions(results);
          setShowSuggestions(results.length > 0);
          if (results.length === 0) {
            setErrorHint("Nothing found");
          } else {
            setErrorHint(null);
          }
        })
        .catch(() => {
          setSuggestions([]);
          setErrorHint("Nothing found");
          setShowSuggestions(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setErrorHint(null);
    }
  }, [debouncedValue, searchFunction]);

  const handleSelectSuggestion = (item: Airport) => {
    setIsSelecting(true);
    onSelect({ code: item.code, value: renderSuggestion(item) });
    setSuggestions([]);
    setShowSuggestions(false);
    setErrorHint(null); // Clear error on selection
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (
        !relatedTarget ||
        !relatedTarget.closest(SuggestionsList.styledComponentId as string)
      ) {
        setShowSuggestions(false);
        // Do not clear error on blur, let it persist if nothing found
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
    errorHint,
  };
};
