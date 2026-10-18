"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { GeneralCurrencyConfig } from "./types";

interface GeneralCurrencyCardProps {
  initialConfig?: GeneralCurrencyConfig;
  onSave: (config: GeneralCurrencyConfig) => void;
}

export default function GeneralCurrencyCard({
  initialConfig = {
    defaultCurrency: "USD",
    allowAllCurrenciesForOrdinaryListing: true,
  },
  onSave,
}: GeneralCurrencyCardProps) {
  const [config, setConfig] = useState<GeneralCurrencyConfig>(initialConfig);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 flex flex-col justify-between h-full space-y-4"
    >
      <div>
        <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100 mb-4">
          Currency Settings
        </h2>

        <div className="space-y-4 text-xs">
          {/* Default Currency */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Default Currency
            </label>
            <div className="relative">
              <select
                value={config.defaultCurrency}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    defaultCurrency: e.target.value,
                  }))
                }
                className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-700 pr-8 appearance-none focus:outline-none focus:border-[#00a99d]"
              >
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">United Kingdom Pound (£)</option>
                <option value="IDR">Indonesian Rupiah (Rp)</option>
                <option value="SAR">Saudi Riyal (SR)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Allow All Currencies for Ordinary Listing */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Allow All Currencies for Ordinary Listing
            </label>
            <div className="flex items-center gap-6 text-gray-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="allowAllCurrencies"
                  checked={config.allowAllCurrenciesForOrdinaryListing === true}
                  onChange={() =>
                    setConfig((prev) => ({
                      ...prev,
                      allowAllCurrenciesForOrdinaryListing: true,
                    }))
                  }
                  className="text-[#007bff]"
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="allowAllCurrencies"
                  checked={config.allowAllCurrenciesForOrdinaryListing === false}
                  onChange={() =>
                    setConfig((prev) => ({
                      ...prev,
                      allowAllCurrenciesForOrdinaryListing: false,
                    }))
                  }
                  className="text-[#007bff]"
                />
                <span>No</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-4 py-2 rounded-[3px] shadow-xs transition cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
