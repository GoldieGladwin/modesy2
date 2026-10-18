"use client";

import React, { useState } from "react";
import DigitalSalesShowSelect from "./DigitalSalesShowSelect";
import DigitalSalesExportDropdown from "./DigitalSalesExportDropdown";
import { ExportFormat } from "./types";

interface DigitalSalesFilterBarProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterSubmit: () => void;
  onExport: (format: ExportFormat) => void;
}

export default function DigitalSalesFilterBar({
  pageSize,
  onPageSizeChange,
  searchTerm,
  onSearchChange,
  onFilterSubmit,
  onExport,
}: DigitalSalesFilterBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onFilterSubmit();
    }
  };

  return (
    <div className="flex flex-wrap items-end gap-3 mb-6">
      {/* 1. Show Select */}
      <DigitalSalesShowSelect
        value={pageSize}
        onChange={onPageSizeChange}
      />

      {/* 2. Search by Purchase Code */}
      <div className="flex flex-col">
        <label
          htmlFor="digital-sales-search-input"
          className="text-[13px] font-medium text-[#495057] mb-1"
        >
          Search
        </label>
        <input
          id="digital-sales-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Purchase Code"
          className="w-[220px] h-[34px] px-3 bg-white border border-[#d2d6de] rounded-[4px] text-[14px] text-[#495057] placeholder:text-[#888888] focus:outline-none focus:border-[#3c8dbc] transition-colors"
        />
      </div>

      {/* 3. Filter Button */}
      <button
        type="button"
        onClick={onFilterSubmit}
        className="h-[34px] px-5 bg-[#605ca8] hover:bg-[#545096] text-white text-[14px] font-normal rounded-[4px] transition-colors cursor-pointer focus:outline-none"
      >
        Filter
      </button>

      {/* 4. Export Dropdown */}
      <DigitalSalesExportDropdown onExport={onExport} />
    </div>
  );
}
