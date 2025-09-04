import styled from "styled-components";
import { colors } from "../../styles/theme";

export const AutocompleteContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  background-color: ${colors.lightBlue};
  color: ${colors.primary};
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: ${colors.secondary};
  }
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${colors.white};
  border: 1px solid ${colors.primary};
  border-top: none;
  border-radius: 0 0 4px 4px;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 4px 8px ${colors.boxShadow};
`;

export const SuggestionItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  color: ${colors.primary};
  &:hover {
    background-color: ${colors.lightHoverBlue};
  }
  &.active {
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;
