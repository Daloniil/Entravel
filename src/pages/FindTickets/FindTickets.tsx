import FlightResults from "../../components/FlightResults/FlightResults";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Header, FindTicketsContainer } from "./FindTickets.styles";

function FindTickets() {
  return (
    <FindTicketsContainer>
      <Header>Flight Search System</Header>
      <SearchBar />
      <FlightResults />
    </FindTicketsContainer>
  );
}

export default FindTickets;
