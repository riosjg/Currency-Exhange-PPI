export type KnownCurrencies =
  | "EUR"
  | "USD"
  | "JPY"
  | "BGN"
  | "CZK"
  | "DKK"
  | "GBP"
  | "HUF"
  | "PLN"
  | "RON"
  | "SEK"
  | "CHF"
  | "ISK"
  | "NOK"
  | "TRY"
  | "AUD"
  | "BRL"
  | "CAD"
  | "CNY"
  | "HKD"
  | "IDR"
  | "ILS"
  | "INR"
  | "KRW"
  | "MXN"
  | "MYR"
  | "NZD"
  | "PHP"
  | "SGD"
  | "THB"
  | "ZAR";

export type Currencies = Record<
  KnownCurrencies,
  { name: string; symbol: string }
>;

export type Rates = Record<KnownCurrencies, number>;

export interface ApiData {
  date: string;
  base: string;
  rates: Rates;
}
