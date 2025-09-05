import React from "react";
import { useFlightSearch } from "../../context/FlightSearchContext";
import {
  NoResultsMessage,
  ResultsContainer,
  ResultItem,
  FlightNumber,
  Airline,
  Time,
  Price,
  FlightInfo,
  FlightDetails,
  Route,
  LoadingMessage,
} from "./FlightResultsStyle";

const FlightResults: React.FC = () => {
  const { flights: results, loading } = useFlightSearch();

  if (loading) {
    return <LoadingMessage>Searching for flights...</LoadingMessage>;
  }

  if (results.length === 0) {
    return (
      <NoResultsMessage>
        No flights found for your search criteria.
      </NoResultsMessage>
    );
  }

  return (
    <ResultsContainer>
      <h2>Flight Results</h2>
      {results.map((flight) => (
        <ResultItem key={flight.id}>
          <FlightDetails>
            <FlightInfo>
              <Airline>{flight.airline}</Airline>
              <FlightNumber>{flight.flightNumber}</FlightNumber>
            </FlightInfo>
            <Route>
              {flight.departureAirport} &rarr; {flight.arrivalAirport}
            </Route>
            <FlightInfo style={{ textAlign: "right" }}>
              <Time>{new Date(flight.departureTime).toLocaleString()}</Time>
              <Time>{new Date(flight.arrivalTime).toLocaleString()}</Time>
            </FlightInfo>
          </FlightDetails>
          <Price>${flight.price.toFixed(2)}</Price>
        </ResultItem>
      ))}
    </ResultsContainer>
  );
};

export default FlightResults;
