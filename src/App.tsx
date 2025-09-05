import React from "react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";
import { theme } from "./styles/theme";
import { FlightSearchProvider } from "./context/FlightSearchContext";
import { AirportSearchProvider } from "./context/AirportSearchContext"; // Import AirportSearchProvider
import { Compose } from "./utils/composeProviders";
import FindTickets from "./pages/FindTickets/FindTickets";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Compose components={[AirportSearchProvider, FlightSearchProvider]}>
        <GlobalStyles />
        <Routes>
          <Route path="/findTickets" element={<FindTickets />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Compose>
    </ThemeProvider>
  );
}

export default App;
