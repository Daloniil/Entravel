import { create } from "zustand";
import type { AppConfig } from "../types/config";

// Default configuration
const defaultConfig: AppConfig = {
  appName: "Flight Search System",
  theme: {
    primaryColor: "#007bff",
    secondaryColor: "#6c757d",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  features: {
    extraSearchOptions: false,
    bannerText: "Welcome to our Flight Search!",
  },
  apiEndpoints: {
    airportSearch: "/api/airports", // Mock API endpoint
    flightSearch: "/api/flights", // Mock API endpoint
  },
  services: {
    searchAirports: () => Promise.resolve([]), // Placeholder, will be overridden
    searchFlights: () => Promise.resolve([]), // Placeholder, will be overridden
  },
};

interface ConfigStore {
  config: AppConfig;
  setConfig: (config: Partial<AppConfig>) => void;
}

export const useConfigStore = create<ConfigStore>((set) => ({
  config: defaultConfig,
  setConfig: (updates) =>
    set((state) => ({
      config: {
        ...state.config,
        ...updates,
        services: { ...state.config.services, ...(updates.services || {}) },
      },
    })),
}));
