"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { QuoteFilterState } from "./types";

interface QuoteFilterBarProps {
  filter: QuoteFilterState;
  onFilterChange: (newFilter: Partial<QuoteFilterState>) => void;
  onApplyFilter: () => void;
}

export default function QuoteFilterBar({
  filter,
  onFilterChange,
  onApplyFilter,
}: QuoteFilterBarProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-end gap-3 sm:gap-4">
        {/* Status */}
        <div className="w-full sm:w-auto min-w-[150px]">
          <label className="block text-[13px] font-semibold text-[#333e48] mb-1.5">
            Status
          </label>
          <div className="relative">
            <select
              value={filter.status}
              onChange={(e) => onFilterChange({ status: e.target.value })}
              className="w-full h-[38px] px-3.5 pr-8 bg-white border border-[#d2d6de] rounded-[4px] text-xs text-[#495057] focus:outline-hidden focus:border-[#00a99d] transition cursor-pointer appearance-none"
            >
              <option value="All">All</option>
              <option value="Pending Quote">Pending Quote</option>
              <option value="Pending Payment">Pending Payment</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Search */}
        <div className="w-full sm:w-auto min-w-[170px]">
          <label className="block text-[13px] font-semibold text-[#333e48] mb-1.5">
            Search
          </label>
          <input
            type="text"
            placeholder="Search"
            value={filter.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") onApplyFilter();
            }}
            className="w-full h-[38px] px-3.5 bg-white border border-[#d2d6de] rounded-[4px] text-xs text-[#495057] placeholder:text-gray-400 focus:outline-hidden focus:border-[#00a99d] transition"
          />
        </div>

        {/* Filter Button */}
        <div>
          <button
            type="button"
            onClick={onApplyFilter}
            className="h-[38px] px-5 bg-[#5c57a3] hover:bg-[#4d4895] text-white text-xs font-semibold rounded-[4px] transition cursor-pointer shadow-2xs"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
