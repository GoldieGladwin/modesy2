"use client";

import React, { useState } from "react";
import { AffiliateSettings } from "./types";
import { DEFAULT_AFFILIATE_SETTINGS } from "./initialData";

interface AffiliateSettingsCardProps {
  initialSettings?: AffiliateSettings;
  onSave?: (settings: AffiliateSettings) => void;
}

export default function AffiliateSettingsCard({
  initialSettings = DEFAULT_AFFILIATE_SETTINGS,
  onSave,
}: AffiliateSettingsCardProps) {
  const [settings, setSettings] = useState<AffiliateSettings>(initialSettings);

  const handleStatusToggle = () => {
    setSettings((prev) => ({ ...prev, statusEnabled: !prev.statusEnabled }));
  };

  const handleProgramTypeChange = (type: "site" | "seller") => {
    setSettings((prev) => ({ ...prev, programType: type }));
  };

  const handleReferrerChange = (value: string) => {
    setSettings((prev) => ({ ...prev, referrerCommission: value }));
  };

  const handleBuyerDiscountChange = (value: string) => {
    setSettings((prev) => ({ ...prev, buyerDiscount: value }));
  };

  const handleSaveClick = () => {
    onSave?.(settings);
    alert("Success: Settings have been saved!");
  };

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[4px] shadow-2xs p-5 relative pb-16">
      <h2 className="text-[15px] font-semibold text-[#333333] pb-3 border-b border-[#f0f0f0] mb-5">
        Settings
      </h2>

      <div className="space-y-5 text-[13px]">
        {/* Status Switch */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={settings.statusEnabled}
            onClick={handleStatusToggle}
            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
              settings.statusEnabled ? "bg-[#00a99d]" : "bg-[#d2d6de]"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                settings.statusEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-[13px] font-semibold text-[#555]">Status</span>
        </div>

        {/* Program Type Radios */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-2">
            Program Type
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2.5 cursor-pointer text-[#666]">
              <input
                type="radio"
                name="programType"
                checked={settings.programType === "site"}
                onChange={() => handleProgramTypeChange("site")}
                className="w-4 h-4 text-[#00a99d] focus:ring-0 cursor-pointer"
              />
              <span>Site-based (For all products, site pays the commission)</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-[#666]">
              <input
                type="radio"
                name="programType"
                checked={settings.programType === "seller"}
                onChange={() => handleProgramTypeChange("seller")}
                className="w-4 h-4 text-[#00a99d] focus:ring-0 cursor-pointer"
              />
              <span>
                Seller-based (For products selected by the seller, seller pays the commission)
              </span>
            </label>
          </div>
        </div>

        {/* Referrer Commission Rate */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-1.5">
            Referrer Commission Rate
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="%"
              value={settings.referrerCommission}
              onChange={(e) => handleReferrerChange(e.target.value)}
              className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-2 text-[13px] text-[#444] placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
            />
          </div>
        </div>

        {/* Buyer Discount Rate */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-1.5">
            Buyer Discount Rate
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="%"
              value={settings.buyerDiscount}
              onChange={(e) => handleBuyerDiscountChange(e.target.value)}
              className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-2 text-[13px] text-[#444] placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
            />
          </div>
        </div>

        {/* Image (1200x980px) Preview & Upload Button */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-2">
            Image (1200x980px)
          </label>

          {/* Illustration Preview Matching Photo */}
          <div className="w-32 h-28 border border-[#e2e8f0] rounded-[3px] overflow-hidden mb-3 bg-[#f8f9fa] flex items-center justify-center relative shadow-2xs">
            <svg
              viewBox="0 0 120 100"
              className="w-full h-full object-cover"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="120" height="100" fill="#fcf7ee" />
              <rect
                x="15"
                y="10"
                width="40"
                height="50"
                fill="#eef2f6"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              <line
                x1="35"
                y1="10"
                x2="35"
                y2="60"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              <line
                x1="15"
                y1="35"
                x2="55"
                y2="35"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              <circle cx="20" cy="70" r="8" fill="#10b981" />
              <rect x="17" y="73" width="6" height="10" fill="#d97706" />
              <rect x="25" y="72" width="70" height="4" fill="#a16207" />
              <line x1="30" y1="76" x2="30" y2="95" stroke="#78350f" strokeWidth="2" />
              <line x1="90" y1="76" x2="90" y2="95" stroke="#78350f" strokeWidth="2" />
              <polygon points="65,72 78,72 75,60 62,60" fill="#475569" />
              <rect x="63" y="61" width="11" height="9" fill="#94a3b8" />
              <circle cx="50" cy="52" r="7" fill="#fbbf24" />
              <path d="M44,50 Q50,42 56,50 Q54,44 47,45 Z" fill="#1e293b" />
              <path d="M45,60 Q50,58 55,60 L57,75 L43,75 Z" fill="#e11d48" />
              <rect x="42" y="65" width="16" height="18" fill="#334155" />
            </svg>
          </div>

          {/* Upload Button */}
          <div className="flex items-center">
            <button
              type="button"
              className="px-3 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[12px] font-semibold rounded-[3px] transition cursor-pointer shadow-2xs"
            >
              Select Image
            </button>
            <span className="text-[11px] text-[#888888] ml-2">
              (.png, .jpg, .jpeg, .gif, .webp)
            </span>
          </div>
        </div>
      </div>

      {/* Save Changes Button (Bottom Right) */}
      <div className="absolute right-5 bottom-4">
        <button
          type="button"
          onClick={handleSaveClick}
          className="px-4 py-2 bg-[#007bff] hover:bg-[#0069d9] text-white rounded-[3px] text-[13px] font-semibold transition cursor-pointer shadow-2xs"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
