import styled from "styled-components";

export const ResultsContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
`;

export const ResultItem = styled.div`
  border-bottom: 1px solid #eee;
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
  color: #333;
`;

export const FlightNumber = styled.span`
  font-size: 0.9em;
  color: #777;
`;

export const Route = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  color: #0056b3;
`;

export const Time = styled.span`
  font-size: 0.9em;
  color: #555;
`;

export const Price = styled.div`
  font-size: 1.4em;
  font-weight: bold;
  color: #28a745;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: #555;
`;

export const NoResultsMessage = styled(LoadingMessage)`
  color: #777;
`;
