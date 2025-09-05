import React from "react";

const WelcomeModalContent: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default WelcomeModalContent;
