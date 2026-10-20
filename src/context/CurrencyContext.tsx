"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Currency {
  code: string;
  symbol: string;
  label: string;
  rate: number;
  symbolPosition: "prefix" | "suffix";
}

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", label: "USD ($)", rate: 1.0, symbolPosition: "prefix" },
  { code: "EUR", symbol: "€", label: "EUR (€)", rate: 0.92, symbolPosition: "prefix" },
  { code: "GBP", symbol: "£", label: "GBP (£)", rate: 0.79, symbolPosition: "prefix" },
  { code: "IDR", symbol: "Rp ", label: "IDR (Rp)", rate: 16000, symbolPosition: "prefix" },
  { code: "INR", symbol: "₹", label: "INR (₹)", rate: 83.5, symbolPosition: "prefix" },
  { code: "BRL", symbol: "R$ ", label: "BRL (R$)", rate: 5.4, symbolPosition: "prefix" },
  { code: "TRY", symbol: "₺", label: "TRY (₺)", rate: 34.0, symbolPosition: "prefix" },
  { code: "RUB", symbol: "₽", label: "RUB (₽)", rate: 92.0, symbolPosition: "suffix" },
  { code: "NGN", symbol: "₦", label: "NGN (₦)", rate: 1550, symbolPosition: "prefix" },
];

interface CurrencyContextType {
  currency: Currency;
  currencies: Currency[];
  setCurrencyCode: (code: string) => void;
  formatPrice: (amountInUSD: number | string | undefined | null) => string;
  convertPrice: (amountInUSD: number | string | undefined | null) => number;
}

const STORAGE_KEY = "modesy_currency";

export function parsePriceNumber(val: number | string | undefined | null): number {
  if (typeof val === "number") return isNaN(val) ? 0 : val;
  if (!val) return 0;
  if (typeof val === "string" && val.toLowerCase().includes("quote")) return 0;
  const cleaned = String(val).replace(/[^0-9.-]+/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function formatPriceWithCurrency(
  amountInUSD: number | string | undefined | null,
  currency: Currency
): string {
  const numUSD = parsePriceNumber(amountInUSD);
  const converted = numUSD * currency.rate;

  let formattedNum = "";
  if (currency.code === "IDR") {
    formattedNum = Math.round(converted).toLocaleString("id-ID");
  } else if (currency.code === "RUB" || currency.code === "NGN") {
    formattedNum = Math.round(converted).toLocaleString("en-US");
  } else {
    formattedNum = converted % 1 !== 0 
      ? converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : converted.toLocaleString("en-US");
  }

  if (currency.symbolPosition === "suffix") {
    return `${formattedNum} ${currency.symbol}`;
  }
  return `${currency.symbol}${formattedNum}`;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedCode = localStorage.getItem(STORAGE_KEY);
      if (savedCode) {
        const found = CURRENCIES.find(
          (c) => c.code === savedCode || c.label === savedCode
        );
        if (found) setCurrency(found);
      }
    } catch (e) {
      // ignore
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const found = CURRENCIES.find(
          (c) => c.code === e.newValue || c.label === e.newValue
        );
        if (found) setCurrency(found);
      }
    };

    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        const found = CURRENCIES.find(
          (c) => c.code === customEvent.detail || c.label === customEvent.detail
        );
        if (found) setCurrency(found);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("modesy_currency_change", handleCustomChange);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("modesy_currency_change", handleCustomChange);
    };
  }, []);

  const setCurrencyCode = (codeOrLabel: string) => {
    const found = CURRENCIES.find(
      (c) => c.code === codeOrLabel || c.label === codeOrLabel
    );
    if (!found) return;

    setCurrency(found);
    try {
      localStorage.setItem(STORAGE_KEY, found.code);
      // Also set cookie so SSR / middleware has access if needed
      document.cookie = `modesy_currency=${found.code}; path=/; max-age=31536000; SameSite=Lax`;
      window.dispatchEvent(
        new CustomEvent("modesy_currency_change", { detail: found.code })
      );
    } catch (e) {
      // ignore
    }
  };

  const convertPrice = (amountInUSD: number | string | undefined | null): number => {
    const numUSD = parsePriceNumber(amountInUSD);
    return numUSD * currency.rate;
  };

  const formatPrice = (amountInUSD: number | string | undefined | null): string => {
    return formatPriceWithCurrency(amountInUSD, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencies: CURRENCIES,
        setCurrencyCode,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextType {
  const context = useContext(CurrencyContext);
  if (!context) {
    return {
      currency: CURRENCIES[0],
      currencies: CURRENCIES,
      setCurrencyCode: () => {},
      formatPrice: (amount) => formatPriceWithCurrency(amount, CURRENCIES[0]),
      convertPrice: (amount) => parsePriceNumber(amount),
    };
  }
  return context;
}
