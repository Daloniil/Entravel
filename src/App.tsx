import React, { useEffect, useState } from "react";
import { GlobalStyles } from "./styles/GlobalStyles";
import styled, { ThemeProvider } from "styled-components";
import SearchBar from "./components/SearchBar/SearchBar";
import { useSearchParamsSync } from "./hooks/useSearchParamsSync";
import FlightResults from "./components/FlightResults/FlightResults";
import { useSearch } from "./hooks/useSearch";
import { searchFlights } from "./services/flightService";
import type { FlightResult } from "./services/flightService";
import { useConfig } from "./hooks/useConfig";
import { theme } from "./styles/theme";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.h1`
  color: #0056b3;
  margin-bottom: 40px;
`;

function App() {
  useSearchParamsSync(); // Initialize URL synchronization
  const { searchState } = useSearch();
  const [flightResults, setFlightResults] = useState<FlightResult[]>([]);
  const [loading, setLoading] = useState(false);
  const config = useConfig(); // Access config for theming

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      const results = await searchFlights(searchState);
      setFlightResults(results);
      setLoading(false);
    };

    fetchFlights();
  }, [searchState]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Header>{config.appName}</Header>
        {config.features.bannerText && <p>{config.features.bannerText}</p>}
        <SearchBar />
        <FlightResults results={flightResults} loading={loading} />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
