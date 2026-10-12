"use client";

import React from "react";
import ValidationTooltip from "./ValidationTooltip";

export type ProductType = "physical" | "digital";

interface ProductTypeSelectorProps {
  value: ProductType | null;
  onChange: (type: ProductType) => void;
  showError?: boolean;
}

export default function ProductTypeSelector({
  value,
  onChange,
  showError = false,
}: ProductTypeSelectorProps) {
  return (
    <div className="space-y-3 relative">
      <label className="block text-[15px] font-semibold text-[#333]">
        Product Type
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Physical Option */}
        <div className="relative">
          <label
            onClick={() => onChange("physical")}
            className="flex items-start gap-3 cursor-pointer select-none group"
          >
            <div className="mt-0.5 relative flex items-center justify-center shrink-0">
              <input
                type="radio"
                name="product_type"
                checked={value === "physical"}
                onChange={() => onChange("physical")}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  value === "physical"
                    ? "border-[#00a99d]"
                    : "border-[#cbd5e0] group-hover:border-gray-400"
                }`}
              >
                {value === "physical" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00a99d]" />
                )}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#2d3748]">Physical</div>
              <div className="text-xs text-[#718096] mt-0.5">
                A tangible product that you will ship to buyers
              </div>
            </div>
          </label>

          {/* Validation Tooltip: Persis seperti di gambar user */}
          {showError && (
            <ValidationTooltip
              message="Please select one of these options."
              className="top-[44px] -left-[70px]"
              arrowOffsetPx={80}
            />
          )}
        </div>

        {/* Digital Option */}
        <label
          onClick={() => onChange("digital")}
          className="flex items-start gap-3 cursor-pointer select-none group"
        >
          <div className="mt-0.5 relative flex items-center justify-center shrink-0">
            <input
              type="radio"
              name="product_type"
              checked={value === "digital"}
              onChange={() => onChange("digital")}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                value === "digital"
                  ? "border-[#00a99d]"
                  : "border-[#cbd5e0] group-hover:border-gray-400"
              }`}
            >
              {value === "digital" && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#00a99d]" />
              )}
            </div>
          </div>
          <div>
            <div className="text-[14px] font-medium text-[#2d3748]">Digital</div>
            <div className="text-xs text-[#718096] mt-0.5">
              A digital file that buyers will download
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
