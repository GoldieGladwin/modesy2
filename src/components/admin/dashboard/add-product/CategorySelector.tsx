"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import ValidationTooltip from "./ValidationTooltip";

interface CategorySelectorProps {
  value: string;
  onChange: (category: string) => void;
  showError?: boolean;
}

export default function CategorySelector({
  value,
  onChange,
  showError = false,
}: CategorySelectorProps) {
  return (
    <div className="space-y-2 relative">
      <label className="block text-[15px] font-semibold text-[#333]">
        Category
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2.5 border rounded-[3px] text-sm text-[#495057] bg-white appearance-none outline-none cursor-pointer transition-colors ${
            showError
              ? "border-[#f05023]"
              : "border-[#e2e8f0] focus:border-[#00a99d]"
          }`}
        >
          <option value="">Select Category</option>
          {CATEGORIES.map((cat) => (
            <optgroup key={cat.id} label={cat.title}>
              <option value={cat.title}>{cat.title}</option>
              {cat.subcategories.map((sub, sIdx) => (
                <option key={`${cat.id}-${sIdx}`} value={`${cat.title} > ${sub.title}`}>
                  &nbsp;&nbsp;{sub.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <ChevronDown className="w-4 h-4" />
        </div>

        {showError && (
          <ValidationTooltip
            message="Please select an item in the list."
            className="top-full left-0 mt-1"
            arrowOffsetPx={30}
          />
        )}
      </div>
    </div>
  );
}
