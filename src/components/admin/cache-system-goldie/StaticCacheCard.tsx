"use client";

import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import { StaticCacheSettings } from "./types";

interface StaticCacheCardProps {
  initialSettings?: StaticCacheSettings;
  onSave: (settings: StaticCacheSettings) => void;
  onReset: () => void;
}

export default function StaticCacheCard({
  initialSettings = {
    staticContentCache: true,
    categoryCache: true,
  },
  onSave,
  onReset,
}: StaticCacheCardProps) {
  const [settings, setSettings] =
    useState<StaticCacheSettings>(initialSettings);

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
          Static Cache System
        </h2>

        <div className="space-y-4">
          {/* Static Content Cache */}
          <div>
            <ToggleSwitch
              id="static-content-cache"
              checked={settings.staticContentCache}
              onChange={(val) =>
                setSettings((prev) => ({ ...prev, staticContentCache: val }))
              }
              label="Static Content Cache (Settings, Languages, Pages...)"
            />
          </div>

          {/* Category Cache */}
          <div>
            <ToggleSwitch
              id="category-cache"
              checked={settings.categoryCache}
              onChange={(val) =>
                setSettings((prev) => ({ ...prev, categoryCache: val }))
              }
              label="Category Cache (Categories, Brands, Custom Fields)"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
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

        {/* Warning / Notice Box */}
        <div className="bg-[#d9edf7] border border-[#bce8f1] text-[#31708f] p-3 rounded-[3px] text-xs leading-relaxed">
          <strong className="font-bold text-[#245269]">Warning!</strong> While the
          cache system is used for products that are updated more frequently,
          static cache is applied to records that do not change often (such as
          categories, custom fields, settings, etc.). If any changes occur in
          these records, the cache files are automatically refreshed.
        </div>
      </div>
    </form>
  );
}
