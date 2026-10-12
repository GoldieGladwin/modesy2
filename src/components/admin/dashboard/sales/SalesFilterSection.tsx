"use client";

import React, { useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { SaleFilterState } from "./types";

interface SalesFilterSectionProps {
  filter: SaleFilterState;
  showPaymentStatus?: boolean;
  onChange: (newFilter: Partial<SaleFilterState>) => void;
  onApplyFilter: () => void;
  onExport: (format: "csv" | "excel") => void;
}

export default function SalesFilterSection({
  filter,
  showPaymentStatus = false,
  onChange,
  onApplyFilter,
  onExport,
}: SalesFilterSectionProps) {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-end gap-3 sm:gap-4">
        {/* 1. Payment Status Dropdown (Only on Active Sales) */}
        {showPaymentStatus && (
          <div className="w-full sm:w-auto min-w-[140px]">
            <label className="block text-[12px] font-semibold text-[#333] mb-1.5">
              Payment Status
            </label>
            <div className="relative">
              <select
                value={filter.paymentStatus}
                onChange={(e) => onChange({ paymentStatus: e.target.value })}
                className="w-full h-[38px] px-3.5 pr-8 bg-white border border-[#d2d6de] rounded-[4px] text-xs text-[#495057] focus:outline-hidden focus:border-[#00a99d] transition cursor-pointer appearance-none"
              >
                <option value="All">All</option>
                <option value="Payment Received">Payment Received</option>
                <option value="Pending Payment">Pending Payment</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}

        {/* 2. Search Input */}
        <div className="w-full sm:w-auto min-w-[170px]">
          <label className="block text-[12px] font-semibold text-[#333] mb-1.5">
            Search
          </label>
          <input
            type="text"
            placeholder="Sale Id"
            value={filter.searchId}
            onChange={(e) => onChange({ searchId: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") onApplyFilter();
            }}
            className="w-full h-[38px] px-3.5 bg-white border border-[#d2d6de] rounded-[4px] text-xs text-[#495057] placeholder:text-gray-400 focus:outline-hidden focus:border-[#00a99d] transition"
          />
        </div>

        {/* 3. Filter Button (Purple/Indigo #53509b) */}
        <div>
          <button
            type="button"
            onClick={onApplyFilter}
            className="h-[38px] px-5 bg-[#53509b] hover:bg-[#484589] text-white text-xs font-semibold rounded-[4px] transition cursor-pointer shadow-2xs"
          >
            Filter
          </button>
        </div>

        {/* 4. Export Dropdown Button (#e2e5f1) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setExportOpen(!exportOpen)}
            className="h-[38px] px-4 bg-[#e2e5f1] hover:bg-[#d5d9e8] text-[#4a5568] text-xs font-semibold rounded-[4px] inline-flex items-center gap-2 transition cursor-pointer"
          >
            <span>Export</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#4a5568]" />
          </button>

          {exportOpen && (
            <div className="absolute left-0 mt-1 w-32 bg-white border border-gray-200 rounded-[4px] shadow-lg py-1 z-30">
              <button
                type="button"
                onClick={() => {
                  onExport("csv");
                  setExportOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 transition"
              >
                CSV
              </button>
              <button
                type="button"
                onClick={() => {
                  onExport("excel");
                  setExportOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 transition"
              >
                Excel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
