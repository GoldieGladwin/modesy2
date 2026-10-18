"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { BulkCurrency } from "./types";

interface BulkCurrencySelectorProps {
  value: BulkCurrency;
  onChange: (value: BulkCurrency) => void;
  error?: boolean;
}

export default function BulkCurrencySelector({
  value,
  onChange,
  error = false,
}: BulkCurrencySelectorProps) {
  const currencies: { code: BulkCurrency; label: string }[] = [
    { code: "USD", label: "USD ($)" },
    { code: "EUR", label: "EUR (€)" },
    { code: "GBP", label: "GBP (£)" },
    { code: "IDR", label: "IDR (Rp)" },
    { code: "TRY", label: "TRY (₺)" },
    { code: "CAD", label: "CAD ($)" },
    { code: "AUD", label: "AUD ($)" },
  ];

  return (
    <div>
      <label className="block text-[12px] font-semibold text-[#333] mb-1.5">
        Currency
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as BulkCurrency)}
          className={`w-full h-[38px] px-3.5 pr-8 border rounded-[4px] text-xs bg-white appearance-none outline-none cursor-pointer transition-colors ${
            value ? "text-[#333]" : "text-[#777]"
          } ${
            error
              ? "border-[#f05023]"
              : "border-[#d2d6de] focus:border-[#00a99d]"
          }`}
        >
          <option value="">Select</option>
          {currencies.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
