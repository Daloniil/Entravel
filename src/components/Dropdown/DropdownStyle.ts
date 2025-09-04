import styled from "styled-components";
import { colors } from "../../styles/theme";

export const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const StyledSelectButton = styled.button`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  background-color: ${colors.lightBlue};
  color: ${colors.primary};
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:focus {
    outline: none;
    border-color: ${colors.secondary};
  }
`;

export const DropdownIcon = styled.span`
  margin-left: 10px;
  border: solid ${colors.primary};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
`;

export const DropdownList = styled.ul`
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
  z-index: 100;
  box-shadow: 0 4px 8px ${colors.boxShadow};
`;

export const DropdownItem = styled.li`
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
