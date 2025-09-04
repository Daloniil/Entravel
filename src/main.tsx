import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { searchAirports } from "./services/airportService.ts";
import { searchFlights } from "./services/flightService.ts";
import { useConfigStore } from "./stores/useConfigStore.ts";

const customConfig = {
  services: {
    searchAirports: searchAirports,
    searchFlights: searchFlights,
  },
};

// Initialize config store with custom services
useConfigStore.getState().setConfig(customConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
