import React, { useState } from "react";
import {
  SelectWrapper,
  StyledSelectButton,
  DropdownIcon,
  DropdownList,
  DropdownItem,
} from "./DropdownStyle.ts";

interface CustomSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const Dropdown: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <SelectWrapper>
      <StyledSelectButton id={id} onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel || "Select an option"}
        <DropdownIcon />
      </StyledSelectButton>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={value === option.value ? "active" : ""}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </SelectWrapper>
  );
};

export default Dropdown;
