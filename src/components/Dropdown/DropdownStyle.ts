import styled from "styled-components";

export const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const StyledSelectButton = styled.button`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #007bff;
  border-radius: 4px;
  background-color: #f0f7ff;
  color: #007bff;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:focus {
    outline: none;
    border-color: #0056b3;
  }
`;

export const DropdownIcon = styled.span`
  margin-left: 10px;
  border: solid #007bff;
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
  background-color: #fff;
  border: 1px solid #007bff;
  border-top: none;
  border-radius: 0 0 4px 4px;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const DropdownItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  color: #007bff;
  &:hover {
    background-color: #e0efff;
  }
  &.active {
    background-color: #007bff;
    color: white;
  }
`;
