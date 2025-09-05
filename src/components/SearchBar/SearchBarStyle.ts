import styled from "styled-components";

export const SearchBarContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "danger";
}>`
  background-color: ${({ variant }) =>
    variant === "danger"
      ? "#dc3545"
      : variant === "secondary"
      ? "#6c757d"
      : "#007bff"};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 44px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%; /* Make the button take full width */
  &:hover {
    background-color: ${({ variant }) =>
      variant === "danger"
        ? "#c82333"
        : variant === "secondary"
        ? "#545b62"
        : "#0056b3"};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const SearchButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Add some space above the button */
`;
