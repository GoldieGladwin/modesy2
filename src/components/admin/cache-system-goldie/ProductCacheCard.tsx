"use client";

import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import { ProductCacheSettings } from "./types";

interface ProductCacheCardProps {
  initialSettings?: ProductCacheSettings;
  onSave: (settings: ProductCacheSettings) => void;
  onReset: () => void;
}

export default function ProductCacheCard({
  initialSettings = {
    status: false,
    refreshOnDbChange: false,
    refreshTimeMinutes: 30,
  },
  onSave,
  onReset,
}: ProductCacheCardProps) {
  const [settings, setSettings] =
    useState<ProductCacheSettings>(initialSettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 flex flex-col justify-between h-full space-y-6"
    >
      <div>
        <h2 className="text-sm font-bold text-gray-800 pb-3 border-b border-gray-100 mb-5">
          Product Cache System
        </h2>

        <div className="space-y-4">
          {/* Status Toggle */}
          <div>
            <ToggleSwitch
              id="product-cache-status"
              checked={settings.status}
              onChange={(val) =>
                setSettings((prev) => ({ ...prev, status: val }))
              }
              label="Status"
            />
          </div>

          {/* Refresh Cache Files When Database Changes */}
          <div>
            <ToggleSwitch
              id="product-cache-refresh-db"
              checked={settings.refreshOnDbChange}
              onChange={(val) =>
                setSettings((prev) => ({ ...prev, refreshOnDbChange: val }))
              }
              label="Refresh Cache Files When Database Changes"
            />
          </div>

          {/* Cache Refresh Time (Minute) */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Cache Refresh Time (Minute){" "}
              <span className="font-normal text-gray-500">
                (After this time, your cache files will be refreshed.)
              </span>
            </label>
            <input
              type="number"
              min={1}
              value={settings.refreshTimeMinutes}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  refreshTimeMinutes: Number(e.target.value),
                }))
              }
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d] transition"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onReset}
          className="bg-[#f39c12] hover:bg-[#e08e0b] text-white text-xs font-semibold px-4 py-2 rounded-[3px] shadow-xs transition cursor-pointer"
        >
          Reset Cache
        </button>
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
