import { GlobalStyles } from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";
import { theme } from "./styles/theme";
import { Compose } from "./utils/composeProviders";
import FindTickets from "./pages/FindTickets/FindTickets";
import NotFound from "./pages/NotFound/NotFound";
import { useFlightSearchUrlSync } from "./hooks/useFlightSearchUrlSync";
import Modal from "./components/Modal/Modal";
import { useEffect, useState } from "react";
import WelcomeModalContent from "./components/WelcomeModalContent/WelcomeModalContent";

function App() {
  useFlightSearchUrlSync();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcomeModal = localStorage.getItem("hasSeenWelcomeModal");
    if (!hasSeenWelcomeModal) {
      setIsModalOpen(true);
      localStorage.setItem("hasSeenWelcomeModal", "true");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Compose components={[]}>
        <GlobalStyles />
        <Routes>
          <Route path="/findTickets" element={<FindTickets />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Compose>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <WelcomeModalContent />
      </Modal>
    </ThemeProvider>
  );
}

export default App;
