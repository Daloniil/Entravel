import ApiClientFactory from "./apiClient";

const SKYSCANNER_API_KEY = import.meta.env.VITE_SKYSCANNER_API_KEY;
const SKYSCANNER_BASE_URL = "https://skyscanner-api.p.rapidapi.com";
const SKYSCANNER_API_HOST = "skyscanner-api.p.rapidapi.com";

interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  cabinClass: string;
}

const skyscannerApiClient = ApiClientFactory({
  baseURL: SKYSCANNER_BASE_URL,
  headers: {
    "X-RapidAPI-Key": SKYSCANNER_API_KEY,
    "X-RapidAPI-Host": SKYSCANNER_API_HOST,
    "Content-Type": "application/json",
  },
});

export const skyscannerService = {
  searchFlights: async (params: FlightSearchParams) => {
    if (!SKYSCANNER_API_KEY) {
      console.error("Skyscanner API key is not defined.");
      return [];
    }

    try {
      const endpoint = "/v1/flights/search";

      interface SkyscannerRequestParams {
        origin: string;
        destination: string;
        departureDate: string;
        returnDate?: string;
        adults: string;
        children: string;
        infants: string;
        cabinClass: string;
      }

      const requestParams: SkyscannerRequestParams = {
        origin: params.origin,
        destination: params.destination,
        departureDate: params.departureDate,
        adults: params.adults.toString(),
        children: params.children.toString(),
        infants: params.infants.toString(),
        cabinClass: params.cabinClass,
      };

      if (params.returnDate) {
        requestParams.returnDate = params.returnDate;
      }

      const response = await skyscannerApiClient.get(endpoint, {
        params: requestParams,
      });

      return response.data;
    } catch {
      return [];
    }
  },
};
