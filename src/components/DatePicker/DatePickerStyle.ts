import styled from "styled-components";
import { colors } from "../../styles/theme";

export const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledDateInput = styled.input<{ $hasValue: boolean }>`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  background-color: ${colors.lightBlue};
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  color: ${(props) =>
    props.$hasValue
      ? colors.primary
      : "transparent"}; /* Hide text if no value */

  &:focus {
    outline: none;
    border-color: ${colors.secondary};
    color: ${colors.primary}; /* Show text on focus if value exists */
  }

  /* Webkit-specific styles to hide default date text when empty */
  &::-webkit-datetime-edit-fields-wrapper {
    background: transparent;
  }
  &::-webkit-datetime-edit-text {
    color: ${(props) => (props.$hasValue ? colors.primary : "transparent")};
    display: ${(props) => (props.$hasValue ? "inline" : "none")};
  }
  &::-webkit-datetime-edit-month-field {
    color: ${(props) => (props.$hasValue ? colors.primary : "transparent")};
    display: ${(props) => (props.$hasValue ? "inline" : "none")};
  }
  &::-webkit-datetime-edit-day-field {
    color: ${(props) => (props.$hasValue ? colors.primary : "transparent")};
    display: ${(props) => (props.$hasValue ? "inline" : "none")};
  }
  &::-webkit-datetime-edit-year-field {
    color: ${(props) => (props.$hasValue ? colors.primary : "transparent")};
    display: ${(props) => (props.$hasValue ? "inline" : "none")};
  }

  /* Ensure the calendar icon is always visible and styled */
  &::-webkit-calendar-picker-indicator {
    color: ${colors.primary};
    opacity: 1;
    display: block;
    cursor: pointer;
  }
`;
