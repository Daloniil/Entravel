import React from "react";
import { useFlightSearch } from "../../context/FlightSearchContext";
import {
  NoResultsMessage,
  ResultsContainer,
  ResultItem,
  Price,
  LoadingMessage,
} from "./FlightResultsStyle";
import FlightDetailsCard from "./FlightDetailsCard";

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
          <FlightDetailsCard flightLeg={flight.outbound} />
          {flight.inbound && <FlightDetailsCard flightLeg={flight.inbound} />}
          <Price>${flight.price.toFixed(2)}</Price>
        </ResultItem>
      ))}
    </ResultsContainer>
  );
};

export default FlightResults;
