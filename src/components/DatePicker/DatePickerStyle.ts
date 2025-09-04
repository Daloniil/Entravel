import styled from "styled-components";
import { colors } from "../../styles/theme";

export const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledDateInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  background-color: ${colors.lightBlue};
  color: ${colors.primary};
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: ${colors.secondary};
  }
`;
