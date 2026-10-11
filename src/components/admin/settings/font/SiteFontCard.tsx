"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SiteFontConfig } from "./types";

interface SiteFontCardProps {
  initialConfig?: SiteFontConfig;
  onSave: (config: SiteFontConfig) => void;
}

export default function SiteFontCard({
  initialConfig = {
    language: "English",
    siteFont: "Open Sans",
    dashboardFont: "Poppins",
  },
  onSave,
}: SiteFontCardProps) {
  const [config, setConfig] = useState<SiteFontConfig>(initialConfig);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 space-y-4"
    >
      <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100">
        Site Font
      </h2>

      <div className="space-y-3.5 text-xs">
        {/* Language */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Language
          </label>
          <div className="relative">
            <select
              value={config.language}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, language: e.target.value }))
              }
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-700 pr-8 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="Indonesian">Indonesian</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Site Font */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Site Font
          </label>
          <div className="relative">
            <select
              value={config.siteFont}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, siteFont: e.target.value }))
              }
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-700 pr-8 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              <option value="Open Sans">Open Sans</option>
              <option value="Poppins">Poppins</option>
              <option value="Roboto">Roboto</option>
              <option value="Work Sans">Work Sans</option>
              <option value="Ubuntu">Ubuntu</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Dashboard Font */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Dashboard Font
          </label>
          <div className="relative">
            <select
              value={config.dashboardFont}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  dashboardFont: e.target.value,
                }))
              }
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-700 pr-8 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              <option value="Poppins">Poppins</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Roboto">Roboto</option>
              <option value="Work Sans">Work Sans</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2 pointer-events-none" />
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
