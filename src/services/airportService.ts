export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

const mockAirports: Airport[] = [
  {
    code: "JFK",
    name: "John F. Kennedy International Airport",
    city: "New York",
    country: "USA",
  },
  {
    code: "LAX",
    name: "Los Angeles International Airport",
    city: "Los Angeles",
    country: "USA",
  },
  {
    code: "ORD",
    name: "O'Hare International Airport",
    city: "Chicago",
    country: "USA",
  },
  {
    code: "LHR",
    name: "London Heathrow Airport",
    city: "London",
    country: "UK",
  },
  {
    code: "CDG",
    name: "Charles de Gaulle Airport",
    city: "Paris",
    country: "France",
  },
  {
    code: "DXB",
    name: "Dubai International Airport",
    city: "Dubai",
    country: "UAE",
  },
  {
    code: "HND",
    name: "Tokyo Haneda Airport",
    city: "Tokyo",
    country: "Japan",
  },
  { code: "SYD", name: "Sydney Airport", city: "Sydney", country: "Australia" },
  {
    code: "MIA",
    name: "Miami International Airport",
    city: "Miami",
    country: "USA",
  },
  {
    code: "DFW",
    name: "Dallas/Fort Worth International Airport",
    city: "Dallas",
    country: "USA",
  },
];

export const searchAirports = async (query: string): Promise<Airport[]> => {
  console.log(`Searching airports for query: ${query}`);
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!query) {
    return [];
  }

  const lowerCaseQuery = query.toLowerCase();
  return mockAirports.filter(
    (airport) =>
      airport.name.toLowerCase().includes(lowerCaseQuery) ||
      airport.city.toLowerCase().includes(lowerCaseQuery) ||
      airport.code.toLowerCase().includes(lowerCaseQuery)
  );
};
