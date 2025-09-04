import styled from "styled-components";
import { colors } from "../../styles/theme";

export const InputControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  overflow: hidden;
`;

export const Input = styled.input`
  flex-grow: 1;
  padding: 8px 0;
  border: none;
  text-align: center;
  font-size: 1rem;
  color: ${colors.textPrimary};
  background-color: ${colors.background};
  width: 50px; // Smaller width for the input field

  &:focus {
    outline: none;
  }

  // Hide number input arrows for type="text" with inputMode="numeric"
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield; // Firefox
`;

export const ControlButton = styled.button`
  background-color: ${colors.lightBlue};
  color: ${colors.primary};
  border: none;
  padding: 8px 12px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background-color: ${colors.lightHoverBlue};
  }

  &:disabled {
    color: ${colors.lightGray};
    cursor: not-allowed;
  }
`;
