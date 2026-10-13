"use client";

import React from "react";
import ValidationTooltip from "./ValidationTooltip";

export type ListingType =
  | "sell_on_site"
  | "ordinary_listing"
  | "quote_request"
  | "license_keys";

interface ListingTypeSelectorProps {
  value: ListingType | null;
  onChange: (type: ListingType) => void;
  showError?: boolean;
}

export default function ListingTypeSelector({
  value,
  onChange,
  showError = false,
}: ListingTypeSelectorProps) {
  const options = [
    {
      id: "sell_on_site" as ListingType,
      title: "Add a Product for Sale",
      description: "Add a product to sell on the site",
    },
    {
      id: "ordinary_listing" as ListingType,
      title: "Add a Product or Service as an Ordinary Listing",
      description: "Add a product or service without buy option",
    },
    {
      id: "quote_request" as ListingType,
      title: "Add a Product to Receive Quote (Price) Requests",
      description:
        "Add a product without adding a price to get price requests from customers",
    },
    {
      id: "license_keys" as ListingType,
      title: "Add a Product to Sell License Keys",
      description: "Add a product to sell only license keys",
    },
  ];

  return (
    <div className="space-y-3 relative">
      <label className="block text-[15px] font-semibold text-[#333]">
        Listing Type
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">
        {options.map((opt, idx) => {
          const isSelected = value === opt.id;
          return (
            <div key={opt.id} className="relative">
              <label
                onClick={() => onChange(opt.id)}
                className="flex items-start gap-3 cursor-pointer select-none group"
              >
                <div className="mt-0.5 relative flex items-center justify-center shrink-0">
                  <input
                    type="radio"
                    name="listing_type"
                    checked={isSelected}
                    onChange={() => onChange(opt.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-[#00a99d]"
                        : "border-[#cbd5e0] group-hover:border-gray-400"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00a99d]" />
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#2d3748] leading-tight">
                    {opt.title}
                  </div>
                  <div className="text-xs text-[#718096] mt-0.5 leading-snug">
                    {opt.description}
                  </div>
                </div>
              </label>

              {/* Show error on first option if error is active */}
              {showError && idx === 0 && (
                <ValidationTooltip
                  message="Please select one of these options."
                  className="top-[44px] -left-[70px]"
                  arrowOffsetPx={80}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
