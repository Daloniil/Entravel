import React from "react";
import { ControlButton, Input, InputControl } from "./NumberInputControlStyle";

interface NumberInputControlProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
}

const NumberInputControl: React.FC<NumberInputControlProps> = ({
  id,
  label,
  value,
  onChange,
  min,
}) => {
  const handleDecrement = () => {
    onChange(Math.max(min, value - 1));
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, ""); // Allow only digits

    if (inputValue === "") {
      onChange(min); // Set to min value if empty
    } else {
      const numValue = Number(inputValue);
      onChange(numValue);
    }
  };

  return (
    <InputControl>
      <ControlButton onClick={handleDecrement} disabled={value <= min}>
        -
      </ControlButton>
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        id={id}
        value={value}
        onChange={handleInputChange}
        aria-label={label}
      />
      <ControlButton onClick={handleIncrement}>+</ControlButton>
    </InputControl>
  );
};

export default NumberInputControl;
