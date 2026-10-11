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
    <div className="bg-white border border-gray-200 rounded-[3px] p-4 mb-4 shadow-2xs">
      <div className="flex flex-wrap items-end gap-3 text-xs">
        {/* Show */}
        <div className="w-20">
          <label className="block text-gray-600 font-semibold mb-1">Show</label>
          <div className="relative">
            <select
              value={filter.pageSize}
              onChange={(e) =>
                onFilterChange({ pageSize: Number(e.target.value) })
              }
              className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-xs text-gray-700 pr-6 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Status */}
        <div className="w-44">
          <label className="block text-gray-600 font-semibold mb-1">
            Status
          </label>
          <div className="relative">
            <select
              value={filter.status}
              onChange={(e) => onFilterChange({ status: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-xs text-gray-700 pr-6 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              <option value="All">All</option>
              <option value="New Quote Request">New Quote Request</option>
              <option value="Closed">Closed</option>
              <option value="Pending Payment">Pending Payment</option>
              <option value="Pending Quote">Pending Quote</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 min-w-[180px] max-w-sm">
          <label className="block text-gray-600 font-semibold mb-1">
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
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
        </div>

        {/* Filter Button */}
        <div>
          <button
            type="button"
            onClick={onApplyFilter}
            className="bg-[#605ca8] hover:bg-[#504c94] text-white font-semibold text-xs px-5 py-1.5 rounded-[3px] shadow-xs transition cursor-pointer"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
