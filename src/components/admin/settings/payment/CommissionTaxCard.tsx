"use client";

import React, { useState } from "react";
import { CommissionTaxSettings } from "./types";

interface CommissionTaxCardProps {
  initialSettings?: CommissionTaxSettings;
  onSave: (settings: CommissionTaxSettings) => void;
}

export default function CommissionTaxCard({
  initialSettings = {
    commissionEnabled: true,
    commissionRate: 8,
    vatEnabled: true,
    taxDestination: "buyer",
  },
  onSave,
}: CommissionTaxCardProps) {
  const [settings, setSettings] =
    useState<CommissionTaxSettings>(initialSettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 flex flex-col justify-between h-full space-y-4"
    >
      <div>
        <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100 mb-4">
          Commission & Tax Settings
        </h2>

        <div className="space-y-4 text-xs text-gray-700">
          {/* Commission Radio */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Commission
            </label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="commEnabled"
                  checked={settings.commissionEnabled}
                  onChange={() =>
                    setSettings((p) => ({ ...p, commissionEnabled: true }))
                  }
                  className="text-[#007bff]"
                />
                <span>Enable</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="commEnabled"
                  checked={!settings.commissionEnabled}
                  onChange={() =>
                    setSettings((p) => ({ ...p, commissionEnabled: false }))
                  }
                  className="text-[#007bff]"
                />
                <span>Disable</span>
              </label>
            </div>
          </div>

          {/* Commission Rate (%) */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Commission Rate (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={settings.commissionRate}
              onChange={(e) =>
                setSettings((p) => ({
                  ...p,
                  commissionRate: Number(e.target.value),
                }))
              }
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
            />
          </div>

          {/* VAT Radio */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              VAT (Value Added Tax)
            </label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="vatEnabled"
                  checked={settings.vatEnabled}
                  onChange={() => setSettings((p) => ({ ...p, vatEnabled: true }))}
                  className="text-[#007bff]"
                />
                <span>Enable</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="vatEnabled"
                  checked={!settings.vatEnabled}
                  onChange={() =>
                    setSettings((p) => ({ ...p, vatEnabled: false }))
                  }
                  className="text-[#007bff]"
                />
                <span>Disable</span>
              </label>
            </div>
          </div>

          {/* Tax Destination Calculation */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Tax Destination Calculation
            </label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="taxDest"
                  checked={settings.taxDestination === "buyer"}
                  onChange={() =>
                    setSettings((p) => ({ ...p, taxDestination: "buyer" }))
                  }
                  className="text-[#007bff]"
                />
                <span>Buyer</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="taxDest"
                  checked={settings.taxDestination === "vendor"}
                  onChange={() =>
                    setSettings((p) => ({ ...p, taxDestination: "vendor" }))
                  }
                  className="text-[#007bff]"
                />
                <span>Vendor</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-3 border-t border-gray-100">
        <button
          type="submit"
          className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-4 py-1.5 rounded-[3px] shadow-xs transition cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
