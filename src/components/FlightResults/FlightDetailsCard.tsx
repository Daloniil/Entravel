import React from "react";
import {
  FlightNumber,
  Airline,
  Time,
  FlightInfo,
  FlightDetails,
  Duration,
  Route,
  RouteDetails,
} from "./FlightResultsStyle";
import { calculateDuration } from "../../utils/calculateDuration";
import type { FlightBoundaries } from "../../store/flightSearchStore";

interface FlightDetailsCardProps {
  flightLeg: FlightBoundaries;
}

const FlightDetailsCard: React.FC<FlightDetailsCardProps> = ({ flightLeg }) => {
  return (
    <FlightDetails>
      <FlightInfo>
        <Airline>{flightLeg.airline}</Airline>
        <FlightNumber>{flightLeg.flightNumber}</FlightNumber>
      </FlightInfo>
      <RouteDetails>
        <Duration>{calculateDuration(flightLeg.duration)}</Duration>
        <Route>
          {flightLeg.departureAirport} &rarr; {flightLeg.arrivalAirport}
        </Route>
      </RouteDetails>
      <FlightInfo style={{ textAlign: "right" }}>
        <Time>{new Date(flightLeg.departureTime).toLocaleString()}</Time>
        <Time>{new Date(flightLeg.arrivalTime).toLocaleString()}</Time>
      </FlightInfo>
    </FlightDetails>
  );
};

export default FlightDetailsCard;
