import React from "react";
import { DatePickerWrapper, StyledDateInput } from "./DatePickerStyle.ts";

interface DatePickerProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  label: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  value,
  onChange,
  min,
  max,
  label,
}) => {
  return (
    <DatePickerWrapper>
      <StyledDateInput
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        aria-label={label}
        $hasValue={!!value}
      />
    </DatePickerWrapper>
  );
};

export default DatePicker;
