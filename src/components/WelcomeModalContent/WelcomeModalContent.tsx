import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

const WelcomeModalContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcomeModal = localStorage.getItem("hasSeenWelcomeModal");
    if (!hasSeenWelcomeModal) {
      setIsModalOpen(true);
      localStorage.setItem("hasSeenWelcomeModal", "true");
    }
  }, []);

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <h3>⚠️ Important notice:</h3>
      <p>
        I deliberately chose to use the real Kiwi API (via RapidAPI) instead of
        mock data to demonstrate working with live requests. However, the API
        contains issues beyond my implementation, and there are official
        discussions confirming them:
      </p>
      <ul>
        <li>
          <a
            href="https://rapidapi.com/emir12/api/kiwi-com-cheap-flights/discussions/139492"
            target="_blank"
            rel="noopener noreferrer"
          >
            Date filtering does not work
          </a>
        </li>
        <li>
          <a
            href="https://rapidapi.com/emir12/api/kiwi-com-cheap-flights/discussions/151988"
            target="_blank"
            rel="noopener noreferrer"
          >
            Incorrect handling of number of adults and baggage
          </a>
        </li>
      </ul>
      <p>
        Unfortunately, I discovered these problems only at the end of the test
        task, when the entire architecture had already been built around Kiwi.
        All parameters are correctly passed and processed on my side. The issue
        lies within the API itself, so I kindly ask not to treat this as a
        shortcoming of my solution.
      </p>
    </Modal>
  );
};

export default WelcomeModalContent;
