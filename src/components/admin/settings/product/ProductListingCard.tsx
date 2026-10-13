"use client";

import React, { useState } from "react";
import { ProductSearchListingSettings } from "./types";

interface ProductListingCardProps {
  initialSettings?: ProductSearchListingSettings;
  onSave: (settings: ProductSearchListingSettings) => void;
}

export default function ProductListingCard({
  initialSettings = {
    showFeaturedFirst: true,
    paginationCount: 60,
  },
  onSave,
}: ProductListingCardProps) {
  const [settings, setSettings] =
    useState<ProductSearchListingSettings>(initialSettings);

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
        <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100 mb-4">
          Product Search & Listing
        </h2>

        <div className="space-y-4 text-xs text-gray-700">
          <div>
            <label className="inline-flex items-center gap-2 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={settings.showFeaturedFirst}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    showFeaturedFirst: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#007bff] rounded-[2px]"
              />
              <span>Show Featured Products First in Search Results</span>
            </label>
          </div>

          <div className="pt-1">
            <label className="block font-semibold text-gray-700 mb-1.5">
              Pagination (Number of products on each page)
            </label>
            <input
              type="number"
              min={1}
              value={settings.paginationCount}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  paginationCount: Number(e.target.value),
                }))
              }
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
            />
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
