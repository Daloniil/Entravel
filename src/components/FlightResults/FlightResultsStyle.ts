import styled from "styled-components";
import { colors } from "../../styles/theme";

export const ResultsContainer = styled.div`
  background-color: ${colors.white};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px ${colors.boxShadow};
  width: 100%;
  max-width: 900px;
`;

export const ResultItem = styled.div`
  border-bottom: 1px solid ${colors.border};
  padding: 15px 0;
  &:last-child {
    border-bottom: none;
  }
`;

export const FlightDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const FlightInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Airline = styled.span`
  font-weight: bold;
  color: ${colors.darkGray};
`;

export const FlightNumber = styled.span`
  font-size: 0.9em;
  color: ${colors.lightGray};
`;

export const Route = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  color: ${colors.primary};
`;

export const RouteDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the duration and route horizontally */
`;

export const Duration = styled.span`
  font-size: 0.9em;
  color: ${colors.mediumGray};
  margin-bottom: 5px;
`;

export const Time = styled.span`
  font-size: 0.9em;
  color: ${colors.mediumGray};
`;

export const Price = styled.div`
  font-size: 1.4em;
  font-weight: bold;
  color: ${colors.success};
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: ${colors.mediumGray};
`;

export const NoResultsMessage = styled(LoadingMessage)`
  color: ${colors.lightGray};
`;
