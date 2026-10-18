"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import PreferencesRadioGroup from "./PreferencesRadioGroup";
import { SystemPreferences } from "./types";
import { TIMEZONE_OPTIONS } from "./initialData";

interface PreferencesSystemTabProps {
  preferences: SystemPreferences;
  onChange: (updated: SystemPreferences) => void;
}

export default function PreferencesSystemTab({
  preferences,
  onChange,
}: PreferencesSystemTabProps) {
  const updateField = <K extends keyof SystemPreferences>(
    key: K,
    val: SystemPreferences[K]
  ) => {
    onChange({ ...preferences, [key]: val });
  };

  return (
    <div className="space-y-4">
      {/* 1. Physical Products */}
      <PreferencesRadioGroup<boolean>
        label="Physical Products"
        value={preferences.physicalProducts}
        onChange={(val) => updateField("physicalProducts", val)}
      />

      {/* 2. Digital Products */}
      <PreferencesRadioGroup<boolean>
        label="Digital Products"
        value={preferences.digitalProducts}
        onChange={(val) => updateField("digitalProducts", val)}
      />

      {/* 3. Marketplace (Selling Products on the Site) */}
      <PreferencesRadioGroup<boolean>
        label="Marketplace (Selling Products on the Site)"
        value={preferences.marketplace}
        onChange={(val) => updateField("marketplace", val)}
      />

      {/* 4. Classified Ads (Adding a Product or Service as an Ordinary Listing) */}
      <PreferencesRadioGroup<boolean>
        label="Classified Ads (Adding a Product or Service as an Ordinary Listing)"
        value={preferences.classifiedAds}
        onChange={(val) => updateField("classifiedAds", val)}
      />

      {/* 5. Bidding System (Request Quote) */}
      <PreferencesRadioGroup<boolean>
        label="Bidding System (Request Quote)"
        value={preferences.biddingSystem}
        onChange={(val) => updateField("biddingSystem", val)}
      />

      {/* 6. Selling License Keys */}
      <PreferencesRadioGroup<boolean>
        label="Selling License Keys"
        value={preferences.sellingLicenseKeys}
        onChange={(val) => updateField("sellingLicenseKeys", val)}
      />

      {/* 7. Multi-Vendor System */}
      <PreferencesRadioGroup<boolean>
        label="Multi-Vendor System"
        subtitle="If you disable it, only Admin can add product."
        value={preferences.multiVendorSystem}
        onChange={(val) => updateField("multiVendorSystem", val)}
      />

      {/* 8. Timezone */}
      <div className="pt-2">
        <label
          htmlFor="preferences-timezone-select"
          className="block text-[13px] font-semibold text-[#555555] mb-1.5"
        >
          Timezone
        </label>
        <div className="relative">
          <select
            id="preferences-timezone-select"
            value={preferences.timezone}
            onChange={(e) => updateField("timezone", e.target.value)}
            className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3.5 py-2 rounded-[3px] appearance-none focus:outline-none focus:border-[#007bff]"
          >
            {TIMEZONE_OPTIONS.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
