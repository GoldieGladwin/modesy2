"use client";

import React, { useState } from "react";
import { ClassifiedAdsSettings } from "./types";

interface ClassifiedAdsCardProps {
  initialSettings?: ClassifiedAdsSettings;
  onSave: (settings: ClassifiedAdsSettings) => void;
}

export default function ClassifiedAdsCard({
  initialSettings = {
    priceEnabled: true,
    priceRequired: true,
    externalLink: true,
    location: true,
  },
  onSave,
}: ClassifiedAdsCardProps) {
  const [settings, setSettings] =
    useState<ClassifiedAdsSettings>(initialSettings);

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
        <h2 className="text-sm font-bold text-gray-800">Classified Ads</h2>
        <p className="text-[11px] text-gray-400 mt-0.5 mb-4 pb-2 border-b border-gray-100">
          Add a Product or Service as an Ordinary Listing
        </p>

        <div className="space-y-3.5 text-xs text-gray-700">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Price</label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.priceEnabled}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      priceEnabled: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-[#007bff] rounded-[2px]"
                />
                <span>Enable</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.priceRequired}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      priceRequired: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-[#007bff] rounded-[2px]"
                />
                <span>Required</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              External Link
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.externalLink}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    externalLink: e.target.checked,
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
