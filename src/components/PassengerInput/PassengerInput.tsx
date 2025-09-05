import React from "react";
import { InputGroup, Label, PassengerInputField } from "./PassengerInputStyle";
import NumberInputControl from "../NumberInputControl/NumberInputControl";

interface PassengerInputProps {
  adults: number;
  children: number;
  infants: number;
  onChange: (type: string, value: number) => void;
}

const PassengerInput: React.FC<PassengerInputProps> = ({
  adults,
  children,
  infants,
  onChange,
}) => {
  return (
    <InputGroup>
      <Label>Passengers</Label>
      <PassengerInputField>
        <Label htmlFor="adults">Adults</Label>
        <NumberInputControl
          id="adults"
          label="Adults"
          value={adults}
          onChange={(value) => onChange("adults", value)}
          min={1}
        />
      </PassengerInputField>
      <PassengerInputField>
        <Label htmlFor="children">Children</Label>
        <NumberInputControl
          id="children"
          label="Children"
          value={children}
          onChange={(value) => onChange("children", value)}
          min={0}
        />
      </PassengerInputField>
      <PassengerInputField>
        <Label htmlFor="infants">Infants</Label>
        <NumberInputControl
          id="infants"
          label="Infants"
          value={infants}
          onChange={(value) => onChange("infants", value)}
          min={0}
        />
      </PassengerInputField>
    </InputGroup>
  );
};

export default PassengerInput;
