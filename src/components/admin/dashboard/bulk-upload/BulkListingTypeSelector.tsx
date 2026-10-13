"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { BulkListingType } from "./types";

interface BulkListingTypeSelectorProps {
  value: BulkListingType;
  onChange: (value: BulkListingType) => void;
  error?: boolean;
}

export default function BulkListingTypeSelector({
  value,
  onChange,
  error = false,
}: BulkListingTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-[14px] font-semibold text-[#333]">
        Listing Type
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as BulkListingType)}
          className={`w-full h-[42px] px-3.5 py-2.5 border rounded-[3px] text-sm bg-white appearance-none outline-none cursor-pointer transition-colors ${
            value ? "text-[#333]" : "text-[#777]"
          } ${
            error
              ? "border-[#f05023]"
              : "border-[#e2e8f0] focus:border-[#00a99d]"
          }`}
        >
          <option value="">Select</option>
          <option value="sell_on_site">Add a Product for Sale</option>
          <option value="ordinary_listing">
            Add a Product or Service as an Ordinary Listing
          </option>
          <option value="quote_request">
            Add a Product to Receive Quote (Price) Requests
          </option>
          <option value="license_keys">Add a Product to Sell License Keys</option>
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
