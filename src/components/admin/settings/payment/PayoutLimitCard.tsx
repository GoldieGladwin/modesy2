"use client";

import React, { useState } from "react";
import { PayoutLimitSettings } from "./types";

interface PayoutLimitCardProps {
  initialSettings?: PayoutLimitSettings;
  onSave: (settings: PayoutLimitSettings) => void;
}

export default function PayoutLimitCard({
  initialSettings = {
    minPayout: 50,
    maxPayout: 5000,
    payoutRequestEnabled: false,
  },
  onSave,
}: PayoutLimitCardProps) {
  const [settings, setSettings] =
    useState<PayoutLimitSettings>(initialSettings);

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
          Add-Fund / Payout Limit
        </h2>

        <div className="space-y-4 text-xs text-gray-700">
          {/* Minimum Payout Amount */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Minimum Payout Amount
            </label>
            <div className="flex rounded-[3px] overflow-hidden border border-gray-300">
              <span className="bg-gray-100 px-3 py-1.5 text-xs text-gray-500 font-semibold border-r border-gray-300 select-none">
                USD
              </span>
              <input
                type="number"
                min={0}
                value={settings.minPayout}
                onChange={(e) =>
                  setSettings((p) => ({ ...p, minPayout: Number(e.target.value) }))
                }
                className="w-full px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:bg-blue-50/20"
              />
            </div>
          </div>

          {/* Maximum Payout Amount */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Maximum Payout Amount
            </label>
            <div className="flex rounded-[3px] overflow-hidden border border-gray-300">
              <span className="bg-gray-100 px-3 py-1.5 text-xs text-gray-500 font-semibold border-r border-gray-300 select-none">
                USD
              </span>
              <input
                type="number"
                min={0}
                value={settings.maxPayout}
                onChange={(e) =>
                  setSettings((p) => ({ ...p, maxPayout: Number(e.target.value) }))
                }
                className="w-full px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:bg-blue-50/20"
              />
            </div>
          </div>

          {/* Payout Request Status */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Payout Request Status
            </label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payoutStatus"
                  checked={settings.payoutRequestEnabled}
                  onChange={() =>
                    setSettings((p) => ({ ...p, payoutRequestEnabled: true }))
                  }
                  className="text-[#007bff]"
                />
                <span>Enable</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payoutStatus"
                  checked={!settings.payoutRequestEnabled}
                  onChange={() =>
                    setSettings((p) => ({ ...p, payoutRequestEnabled: false }))
                  }
                  className="text-[#007bff]"
                />
                <span>Disable</span>
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
