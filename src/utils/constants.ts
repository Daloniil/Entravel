export const KIWI_API_KEY = import.meta.env.VITE_KIWI_API_KEY;
export const KIWI_BASE_URL = "https://kiwi-com-cheap-flights.p.rapidapi.com";
export const KIWI_API_HOST = "kiwi-com-cheap-flights.p.rapidapi.com";

export const FLIGHTS_SKY_API_KEY = import.meta.env.VITE_FLIGHTS_SKY_API_KEY;
export const FLIGHTS_SKY_BASE_URL = "https://flights-sky.p.rapidapi.com";
export const FLIGHTS_SKY_API_HOST = "flights-sky.p.rapidapi.com";

export const FLIGHT_TYPE_OPTIONS = [
  { value: "round-trip", label: "Round-trip" },
  { value: "one-way", label: "One-way" },
];

export const FLIGHT_CLASS_OPTIONS = [
  { value: "economy", label: "Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First" },
];
