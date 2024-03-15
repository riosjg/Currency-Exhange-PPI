import * as React from "react";
import { styled } from "styled-components";
import { Currencies, KnownCurrencies } from "../types/apiTypes";

type ConversionDateType = {
  currencies: Currencies;
  fromCurrency: KnownCurrencies;
  toCurrency: KnownCurrencies;
};

const ConversionDate: React.FC<ConversionDateType> = ({
  currencies,
  fromCurrency,
  toCurrency,
}) => {
  const generateUrl = (currency: KnownCurrencies, currencyName: string) => {
    const code = currency.toLowerCase();
    const name = currencyName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    //   edge case with CNY
    if (currency === "CNY") {
      console.log("🚀 ~ generateUrl ~ currency:", currency);
      return `https://www.xe.com/currency/${code}-${name}-renminbi`;
    }
    return `https://www.xe.com/currency/${code}-${name}`;
  };

  const generateFormattedDate = () => {
    const now = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
      hour12: false,
    };

    return `Last updated ${now.toLocaleString(
      "en-US",
      dateOptions
    )}, ${now.toLocaleString("en-US", timeOptions)}`;
  };

  return (
    <StyledText>
      <a
        href={generateUrl(fromCurrency, currencies[fromCurrency].name)}
        target="_blank"
      >
        {currencies[fromCurrency].name}
      </a>{" "}
      to{" "}
      <a
        href={generateUrl(toCurrency, currencies[toCurrency].name)}
        target="_blank"
      >
        {currencies[toCurrency].name}
      </a>
      {` conversion — ${generateFormattedDate()}`}
    </StyledText>
  );
};

const StyledText = styled.p`
  text-align: left;
  position: absolute;
  right: 30px;
  bottom: 5px;
  &,
  a {
    font-size: 12px;
    font-weight: 300;
    line-height: 36px;
    letter-spacing: 0em;
    color: #000;
  }
  a {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    font-size: 12px;
    line-height: 23px;
    text-align: left;
    bottom: -69px;
  }
`;

export default ConversionDate;
