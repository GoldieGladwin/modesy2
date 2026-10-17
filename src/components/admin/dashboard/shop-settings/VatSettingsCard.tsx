"use client";

import React, { useState, useMemo } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { VatLocationItem } from "./types";
import { initialVatLocations } from "./mockData";

interface VatSettingsCardProps {
  onSuccess?: (msg: string) => void;
}

export default function VatSettingsCard({ onSuccess }: VatSettingsCardProps) {
  const [rates, setRates] = useState<VatLocationItem[]>(initialVatLocations);
  const [isFixedVat, setIsFixedVat] = useState(false);
  const [fixedRateValue, setFixedRateValue] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const handleRateChange = (id: string, newRate: number) => {
    setRates((prev) =>
      prev.map((item) => (item.id === id ? { ...item, taxRate: newRate } : item))
    );
  };

  const handleFixedVatToggle = () => {
    const nextVal = !isFixedVat;
    setIsFixedVat(nextVal);
    if (nextVal) {
      // Set all rates to fixed rate
      setRates((prev) =>
        prev.map((item) => ({ ...item, taxRate: fixedRateValue }))
      );
    }
  };

  const handleFixedRateChange = (val: number) => {
    setFixedRateValue(val);
    if (isFixedVat) {
      setRates((prev) => prev.map((item) => ({ ...item, taxRate: val })));
    }
  };

  const toggleSort = () => {
    if (sortOrder === null) setSortOrder("asc");
    else if (sortOrder === "asc") setSortOrder("desc");
    else setSortOrder(null);
  };

  const filteredRates = useMemo(() => {
    let result = rates.filter((item) =>
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === "asc") {
      result = [...result].sort((a, b) => a.taxRate - b.taxRate);
    } else if (sortOrder === "desc") {
      result = [...result].sort((a, b) => b.taxRate - a.taxRate);
    }

    return result;
  }, [rates, searchQuery, sortOrder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSuccess) {
      onSuccess("VAT rates have been saved successfully!");
    }
  };

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs font-sans">
      <h2 className="text-[16px] font-bold text-[#2d3748] mb-0.5">
        VAT (Value-Added Tax)
      </h2>
      <p className="text-xs text-gray-400 mb-5">
        Define VAT values for your products based on countries
      </p>

      <form onSubmit={handleSubmit}>
        {/* Checkbox: Set Fixed VAT Rate for All Countries */}
        <div className="mb-4">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <div
              onClick={handleFixedVatToggle}
              className={`w-4 h-4 rounded-[2px] flex items-center justify-center transition-colors ${
                isFixedVat
                  ? "bg-[#00a99d] border border-[#00a99d] text-white"
                  : "border border-[#cbd5e1] bg-white hover:border-gray-400"
              }`}
            >
              {isFixedVat && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span
              onClick={handleFixedVatToggle}
              className="text-xs font-semibold text-[#333e48]"
            >
              Set Fixed VAT Rate for All Countries
            </span>
          </label>

          {isFixedVat && (
            <div className="mt-2.5 flex items-center gap-2 pl-6">
              <span className="text-xs text-[#555]">Fixed Tax Rate (%):</span>
              <input
                type="number"
                min="0"
                max="100"
                value={fixedRateValue}
                onChange={(e) => handleFixedRateChange(Number(e.target.value))}
                className="w-20 px-2 py-1 text-xs border border-[#d1d5db] rounded-[3px] text-center focus:outline-none focus:border-[#00a99d]"
              />
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="mb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full px-3 py-2 text-xs border border-[#d1d5db] rounded-[4px] focus:outline-none focus:border-[#00a99d] text-[#333e48]"
          />
        </div>

        {/* Scrollable Table */}
        <div className="border border-[#e9ecef] rounded-[4px] max-h-[360px] overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-white border-b border-[#e9ecef] z-10 shadow-2xs">
              <tr className="text-[#333e48] font-bold">
                <th className="py-2.5 px-3 font-bold">Location</th>
                <th
                  onClick={toggleSort}
                  className="py-2.5 px-3 font-bold w-32 cursor-pointer hover:bg-gray-50 transition-colors select-none"
                >
                  <div className="flex items-center justify-between">
                    <span>Tax Rate(%)</span>
                    <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRates.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className="py-8 text-center text-[#555] text-xs font-normal"
                  >
                    No matching location found.
                  </td>
                </tr>
              ) : (
                filteredRates.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f1f3f5] hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-2 px-3 text-[#333e48]">{item.location}</td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.taxRate}
                        onChange={(e) =>
                          handleRateChange(item.id, Number(e.target.value))
                        }
                        className="w-20 px-2 py-1 text-center text-xs border border-[#d1d5db] rounded-[3px] focus:outline-none focus:border-[#00a99d] text-[#333e48]"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Save Button */}
        <div className="flex justify-end my-4">
          <button
            type="submit"
            className="bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-4 py-2 rounded-[4px] shadow-xs transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>

        {/* Warning Alert Banner */}
        <div className="bg-[#dcf3f6] border border-[#b8e8ed] text-[#006a65] rounded-[4px] p-3.5 text-xs leading-relaxed">
          <strong className="font-bold text-[#00524e]">Warning!</strong> The VAT
          rate you set for a country will apply to all states within that country.
          However, if you want a state to have its own unique tax rate, you can
          specify a different VAT rate for that state.
        </div>
      </form>
    </div>
  );
}
