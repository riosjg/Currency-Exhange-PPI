import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import Card from "./Card";
import ConversionDate from "../components/ConversionDate";
import CurrencyInput from "../components/CurrencyInput";
import CurrencySelect from "../components/CurrencySelect";
import Display from "../components/Display";
import Header from "./Header";
import RateDisclaimer from "../components/RateDisclaimer";
import { InitialSpinnerWrapper, Spinner } from "../components/Spinner";
import SwapButton from "../components/SwapButton";
import Title from "../components/Title";
import { ApiData, Currencies, KnownCurrencies, Rates } from "../types/apiTypes";

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [currencies, setCurrencies] = useState<Currencies>({} as Currencies);
  const [fromCurrency, setFromCurrency] = useState<KnownCurrencies>("USD");
  const [toCurrency, setToCurrency] = useState<KnownCurrencies>("EUR");
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [rates, setRates] = useState<Rates>({} as Rates);
  const [loadingRates, setLoadingRates] = useState<boolean>(false);

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const response = await fetch("https://api.vatcomply.com/currencies");
        const res = await response.json();
        setCurrencies(res);
      } catch (error) {
        console.error("There was an error fetching the currencies:", error);
      }
    };
    const getRates = async () => {
      try {
        const response = await fetch(
          `https://api.vatcomply.com/rates?base=${fromCurrency}`
        );
        const res: ApiData = await response.json();
        setRates(res.rates);
        setExchangeRate(res.rates[toCurrency]);
        setLoadingRates(false);
      } catch (error) {
        console.error("There was an error fetching exchange rates:", error);
      }
    };
    getCurrencies();
    setLoadingRates(true);
    getRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (rates[toCurrency] !== undefined) {
      setExchangeRate(rates[toCurrency]);
    }
  }, [toCurrency, rates]);

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
  };

  const handleFromCurrencyChange = (newFromCurrency: KnownCurrencies) => {
    setFromCurrency(newFromCurrency);
    if (rates[newFromCurrency] !== undefined) {
      setExchangeRate(rates[newFromCurrency]);
    }
  };

  const handleToCurrencyChange = (newToCurrency: KnownCurrencies) => {
    setToCurrency(newToCurrency);
    const newExchangeRate = rates[newToCurrency] || 1;
    setExchangeRate(1 / newExchangeRate);
  };

  const swapCurrencies = (
    fromCurrency: KnownCurrencies,
    toCurrency: KnownCurrencies
  ) => {
    setToCurrency(fromCurrency);
    setFromCurrency(toCurrency);
  };

  if (Object.keys(currencies).length === 0)
    return (
      <InitialSpinnerWrapper>
        <Spinner />
      </InitialSpinnerWrapper>
    );

  return (
    <StyledContainer>
      <Header title="Currency exchange" />
      <StyledTitleContainer>
        <Title
          amount={amount}
          currencies={currencies}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
      </StyledTitleContainer>
      <StyledCardWrapper>
        <Card>
          <StyledInputsWrapper>
            <CurrencyInput
              amount={amount}
              onAmountChange={handleAmountChange}
              currencies={currencies}
              fromCurrency={fromCurrency}
            />
            <CurrencySelect
              currencies={currencies}
              label="From"
              selectedCurrency={fromCurrency}
              onCurrencyChange={handleFromCurrencyChange}
            />
            <SwapButton
              onClick={() => swapCurrencies(fromCurrency, toCurrency)}
            />
            <CurrencySelect
              currencies={currencies}
              label="To"
              selectedCurrency={toCurrency}
              onCurrencyChange={handleToCurrencyChange}
            />
          </StyledInputsWrapper>
          <ContentWrapper>
            {loadingRates ? (
              <Spinner />
            ) : (
              <Display
                amount={amount}
                currencies={currencies}
                exchangeRate={exchangeRate}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
              />
            )}

            <RateDisclaimer />
          </ContentWrapper>
          <ConversionDate
            currencies={currencies}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
          />
        </Card>
      </StyledCardWrapper>
    </StyledContainer>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
  @media (max-width: 600px) {
    align-items: start;
  }
`;

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  @media (max-width: 600px) {
    height: calc(
      100vh + 69px
    ); // Conversion date is absolutely positioned 69px below the card
  }
`;

const StyledTitleContainer = styled.div`
  background-color: #1a8dff;
  width: 100%;
  height: 295px;
`;

const StyledCardWrapper = styled.main`
  position: absolute;
  top: 228px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 1200px;
  width: 88%;
`;

const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
    align-items: start;
  }
`;

export default CurrencyConverter;
