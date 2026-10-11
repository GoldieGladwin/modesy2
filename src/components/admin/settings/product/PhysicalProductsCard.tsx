"use client";

import React, { useState } from "react";
import { PhysicalProductsSettings } from "./types";

interface PhysicalProductsCardProps {
  initialSettings?: PhysicalProductsSettings;
  onSave: (settings: PhysicalProductsSettings) => void;
}

export default function PhysicalProductsCard({
  initialSettings = {
    demoUrl: true,
    videoPreview: true,
    audioPreview: true,
  },
  onSave,
}: PhysicalProductsCardProps) {
  const [settings, setSettings] =
    useState<PhysicalProductsSettings>(initialSettings);

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
          Physical Products
        </h2>

        <div className="space-y-3.5 text-xs text-gray-700">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Demo URL
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.demoUrl}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, demoUrl: e.target.checked }))
                }
                className="w-4 h-4 text-[#007bff] rounded-[2px]"
              />
              <span>Enable</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Video Preview
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.videoPreview}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    videoPreview: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#007bff] rounded-[2px]"
              />
              <span>Enable</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Audio Preview
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.audioPreview}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    audioPreview: e.target.checked,
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
