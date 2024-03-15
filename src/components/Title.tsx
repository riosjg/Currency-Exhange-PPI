import { styled } from "styled-components";
import { Currencies, KnownCurrencies } from "../types/apiTypes";

type TitleType = {
  amount: number;
  fromCurrency: KnownCurrencies;
  toCurrency: KnownCurrencies;
  currencies: Currencies;
};

const Title: React.FC<TitleType> = ({
  amount,
  fromCurrency,
  toCurrency,
  currencies,
}) => {
  return (
    <StyledTitle>
      {`${amount} ${fromCurrency} to ${toCurrency} - Convert ${currencies[fromCurrency].name}s to ${currencies[toCurrency].name}`}
      s
    </StyledTitle>
  );
};

const StyledTitle = styled.h1`
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
  padding-top: 63px;
  @media (max-width: 600px) {
    padding: 30px 48px 0 48px;
  }
`;

export default Title;
