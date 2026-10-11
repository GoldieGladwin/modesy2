export interface CurrencyItem {
  id: number;
  name: string;
  code: string;
  symbol: string;
  rate: number | "Default";
  isActive: boolean;
  isDefault?: boolean;
}

export interface GeneralCurrencyConfig {
  defaultCurrency: string;
  allowAllCurrenciesForOrdinaryListing: boolean;
}

export interface CurrencyConverterConfig {
  status: boolean;
  autoUpdate: boolean;
  api: string;
  apiKey: string;
}

export interface NewCurrencyPayload {
  name: string;
  code: string;
  symbol: string;
  rate: number;
  isActive: boolean;
}
