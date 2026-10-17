"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { BulkAction } from "./types";

interface BulkActionSelectorProps {
  value: BulkAction;
  onChange: (value: BulkAction) => void;
  error?: boolean;
}

export default function BulkActionSelector({
  value,
  onChange,
  error = false,
}: BulkActionSelectorProps) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-[#333] mb-1.5">
        Select Action
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as BulkAction)}
          className={`w-full h-[38px] px-3.5 pr-8 border rounded-[4px] text-xs bg-white appearance-none outline-none cursor-pointer transition-colors ${
            value ? "text-[#333]" : "text-[#777]"
          } ${
            error
              ? "border-[#f05023]"
              : "border-[#d2d6de] focus:border-[#00a99d]"
          }`}
        >
          <option value="">Select</option>
          <option value="add">Add Products</option>
          <option value="edit">Edit Products</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
