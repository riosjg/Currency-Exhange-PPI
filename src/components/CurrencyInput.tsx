import React from "react";
import { styled } from "styled-components";
import { Currencies, KnownCurrencies } from "../types/apiTypes";
import * as yup from "yup";

interface CurrencyInputProps {
  amount: number;
  currencies: Currencies;
  fromCurrency: KnownCurrencies;
  onAmountChange: (amount: number) => void;
}

const amountValidationSchema = yup.object({
  amount: yup
    .number()
    .required("Amount is required")
    .min(0, "Amount cannot be negative"),
});

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  amount,
  currencies,
  fromCurrency,
  onAmountChange,
}) => {
  const symbolRef = React.useRef<HTMLDivElement>(null);
  const [symbolWidth, setSymbolWidth] = React.useState<number>(0);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (symbolRef.current) {
      setSymbolWidth(symbolRef.current.offsetWidth);
    }
  }, [currencies, fromCurrency]);

  const validateAmount = async (value: string): Promise<boolean> => {
    if (value.trim() === "") {
      setError(null);
      return true;
    }

    const numericValue = parseFloat(value);
    try {
      await amountValidationSchema.validate({ amount: numericValue });
      setError(null);
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message); // Set the error message
      }
      return false;
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isValid = await validateAmount(value);
    if (isValid) {
      if (value.trim() !== "") {
        onAmountChange(parseFloat(value));
      } else onAmountChange(0);
    }
  };

  return (
    <StyledWrapper>
      <StyledLabel>Amount</StyledLabel>
      <StyledInputWrapper>
        <StyledCurrencySymbol ref={symbolRef}>
          {currencies[fromCurrency].symbol}
        </StyledCurrencySymbol>
        <StyledInput
          style={{
            paddingLeft: `${symbolWidth + 15}px`,
            minWidth: `${252 - symbolWidth}px`,
          }}
          type="number"
          value={amount}
          onChange={handleChange}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </StyledInputWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: black;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  &,
  & input {
    color: #000;
    font-size: 16px;
    font-weight: 600;
    line-height: 2;
    letter-spacing: 0em;
    text-align: left;
  }
  @media (max-width: 600px) {
    padding-bottom: 14px;
  }
`;

const StyledCurrencySymbol = styled.div`
  position: absolute;
  margin-left: 10px; /* Adjust as needed */
  color: #000;
`;
const StyledInput = styled.input`
  padding: 8px 13px 8px 30px;
  margin: 0;
  background: white;
  border: none;
  outline: 1px solid #ccc;
  border-radius: 4px;
  height: 24px;
  &:focus {
    outline: 1.5px dashed #66a4e2;
  }
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
`;

export default CurrencyInput;
