import React from "react";
import { styled } from "styled-components";
import { Currencies, KnownCurrencies } from "../types/apiTypes";

interface CurrencySelectProps {
  currencies: Currencies;
  label: string;
  selectedCurrency: KnownCurrencies;
  onCurrencyChange: (currency: KnownCurrencies) => void;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  currencies,
  label,
  selectedCurrency,
  onCurrencyChange,
}) => {
  return (
    <StyledSelectWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledSelect
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value as KnownCurrencies)}
      >
        {Object.keys(currencies).map((currency: string) => {
          const key = currency as KnownCurrencies;
          return (
            <option key={key} value={key}>
              {currencies[key].name}
            </option>
          );
        })}
      </StyledSelect>
    </StyledSelectWrapper>
  );
};

const StyledLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: black;
`;

const StyledSelectWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  & select {
    appearance: none;
    -webkit-appearance: none; /* Safari */
    -moz-appearance: none; /* Firefox */
  }

  &::after {
    content: url("../../chevron.svg");
    width: 16px;
    height: 16px;
    position: absolute;
    right: 16px;
    top: calc(50% + 16px); //16 px from the gap between label and input
    transform: translateY(-50%);
    pointer-events: none;
  }
`;
const StyledSelect = styled.select`
  padding: 8px 13px;
  margin: 0;
  color: black;
  background: white;
  border: none;
  outline: 1px solid #ccc;
  border-radius: 4px;
  min-width: 280px;
  height: 40px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  &:focus {
    outline: 1.5px dashed #66a4e2;
  }
`;

export default CurrencySelect;
