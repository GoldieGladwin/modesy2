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
    <div className="space-y-2">
      <label className="block text-[14px] font-semibold text-[#333]">
        Select Action
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as BulkAction)}
          className={`w-full h-[42px] px-3.5 py-2.5 border rounded-[3px] text-sm bg-white appearance-none outline-none cursor-pointer transition-colors ${
            value ? "text-[#333]" : "text-[#777]"
          } ${
            error
              ? "border-[#f05023]"
              : "border-[#e2e8f0] focus:border-[#00a99d]"
          }`}
        >
          <option value="">Select</option>
          <option value="add_new">Add New Products</option>
          <option value="update_existing">Update Existing Products</option>
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
