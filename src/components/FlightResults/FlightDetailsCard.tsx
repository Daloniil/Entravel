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
import { FlightLeg } from "../../types/search";

interface FlightDetailsCardProps {
  flightLeg: FlightLeg;
}

const FlightDetailsCard: React.FC<FlightDetailsCardProps> = ({ flightLeg }) => {
  return (
    <FlightDetails>
      <FlightInfo>
        <Airline>{flightLeg.airline}</Airline>
        <FlightNumber>{flightLeg.flightNumber}</FlightNumber>
      </FlightInfo>
      <RouteDetails>
        <Duration>
          {`${Math.floor(flightLeg.duration / 3600)} hours ${Math.floor(
            (flightLeg.duration % 3600) / 60
          )} minutes`}
        </Duration>
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
