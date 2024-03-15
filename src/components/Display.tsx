import React from "react";
import { styled } from "styled-components";
import { Currencies, KnownCurrencies } from "../types/apiTypes";

interface DisplayProps {
  amount: number;
  currencies: Currencies;
  exchangeRate: number;
  fromCurrency: KnownCurrencies;
  toCurrency: KnownCurrencies;
}

const Display: React.FC<DisplayProps> = ({
  amount,
  currencies,
  exchangeRate,
  fromCurrency,
  toCurrency,
}) => {
  return (
    <StyledDisplay>
      <StyledConvertedAmount className="converted-amount">
        {`${amount.toFixed(2)} ${currencies[fromCurrency].name} =`}
        <br /> {`${amount * exchangeRate} ${currencies[toCurrency].name}`}
      </StyledConvertedAmount>
      <StyledRate>{`1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`}</StyledRate>
    </StyledDisplay>
  );
};

const StyledDisplay = styled.div`
  color: #000;
  padding-bottom: 74px;
  @media (max-width: 600px) {
    padding: 16px 0;
  }
`;
const StyledConvertedAmount = styled.div`
  font-size: 32px;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  @media (max-width: 600px) {
    font-size: 24px;
  }
`;
const StyledRate = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  color: #757575;
`;

export default Display;
