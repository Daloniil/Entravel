import styled from "styled-components";

export const AutocompleteContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #007bff;
  border-radius: 4px;
  background-color: #f0f7ff;
  color: #007bff;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #0056b3;
  }
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #007bff; /* Changed border color */
  border-top: none;
  border-radius: 0 0 4px 4px;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100; /* Changed z-index */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SuggestionItem = styled.li`
  padding: 10px 15px; /* Changed padding */
  cursor: pointer;
  color: #007bff; /* Added color */
  &:hover {
    background-color: #e0efff; /* Changed hover color */
  }
  &.active {
    background-color: #007bff;
    color: white;
  }
`;
