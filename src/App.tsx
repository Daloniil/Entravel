import { GlobalStyles } from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";
import { theme } from "./styles/theme";
import { Compose } from "./utils/composeProviders";
import FindTickets from "./pages/FindTickets/FindTickets";
import NotFound from "./pages/NotFound/NotFound";
import { useFlightSearchUrlSync } from "./hooks/useFlightSearchUrlSync";
import WelcomeModalContent from "./components/WelcomeModalContent/WelcomeModalContent";

function App() {
  useFlightSearchUrlSync();

  return (
    <ThemeProvider theme={theme}>
      <Compose components={[]}>
        <GlobalStyles />
        <Routes>
          <Route path="/findTickets" element={<FindTickets />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Compose>
      <WelcomeModalContent />
    </ThemeProvider>
  );
}

export default App;
