"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CurrencyConverterConfig } from "./types";

interface CurrencyConverterCardProps {
  initialConfig?: CurrencyConverterConfig;
  onSave: (config: CurrencyConverterConfig) => void;
}

export default function CurrencyConverterCard({
  initialConfig = {
    status: true,
    autoUpdate: true,
    api: "currencyapi.net",
    apiKey: "••••••••••••••••••••••••••••••••",
  },
  onSave,
}: CurrencyConverterCardProps) {
  const [config, setConfig] = useState<CurrencyConverterConfig>(initialConfig);

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
          Currency Converter
        </h2>

        <div className="space-y-3.5 text-xs">
          {/* Status */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Status
            </label>
            <div className="flex items-center gap-6 text-gray-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="converterStatus"
                  checked={config.status === true}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, status: true }))
                  }
                  className="text-[#007bff]"
                />
                <span>Enable</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="converterStatus"
                  checked={config.status === false}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, status: false }))
                  }
                  className="text-[#007bff]"
                />
                <span>Disable</span>
              </label>
            </div>
          </div>

          {/* Automatically Update Exchange Rates */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Automatically Update Exchange Rates
            </label>
            <div className="flex items-center gap-6 text-gray-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="autoUpdateRates"
                  checked={config.autoUpdate === true}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, autoUpdate: true }))
                  }
                  className="text-[#007bff]"
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="autoUpdateRates"
                  checked={config.autoUpdate === false}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, autoUpdate: false }))
                  }
                  className="text-[#007bff]"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Currency Converter API */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Currency Converter API
            </label>
            <div className="relative">
              <select
                value={config.api}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, api: e.target.value }))
                }
                className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-700 pr-8 appearance-none focus:outline-none focus:border-[#00a99d]"
              >
                <option value="currencyapi.net">Currencyapi.net</option>
                <option value="openexchangerates.org">Open Exchange Rates</option>
                <option value="fixer.io">Fixer.io</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* API Key */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              API Key
            </label>
            <input
              type="text"
              value={config.apiKey}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, apiKey: e.target.value }))
              }
              placeholder="API Key"
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
            />
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
