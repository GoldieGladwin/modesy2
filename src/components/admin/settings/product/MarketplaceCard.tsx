"use client";

import React, { useState } from "react";
import { MarketplaceSettings } from "./types";

interface MarketplaceCardProps {
  initialSettings?: MarketplaceSettings;
  onSave: (settings: MarketplaceSettings) => void;
}

export default function MarketplaceCard({
  initialSettings = {
    sku: true,
    productOptions: true,
    shipping: true,
    location: true,
  },
  onSave,
}: MarketplaceCardProps) {
  const [settings, setSettings] = useState<MarketplaceSettings>(initialSettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 flex flex-col justify-between h-full space-y-5"
    >
      <div>
        <h2 className="text-sm font-bold text-gray-800">Marketplace</h2>
        <p className="text-[11px] text-gray-400 mt-0.5 mb-4 pb-2 border-b border-gray-100">
          Add a Product for Sale
        </p>

        <div className="space-y-3.5 text-xs text-gray-700">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">SKU</label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.sku}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, sku: e.target.checked }))
                }
                className="w-4 h-4 text-[#007bff] rounded-[2px]"
              />
              <span>Enable</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Product Options
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.productOptions}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    productOptions: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#007bff] rounded-[2px]"
              />
              <span>Enable</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Shipping
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.shipping}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    shipping: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#007bff] rounded-[2px]"
              />
              <span>Enable</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Location
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.location}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    location: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#007bff] rounded-[2px]"
              />
              <span>Enable</span>
            </label>
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
