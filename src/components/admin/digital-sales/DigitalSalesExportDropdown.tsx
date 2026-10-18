"use client";

import React, { useState, useRef, useEffect } from "react";
import { ExportFormat } from "./types";

interface DigitalSalesExportDropdownProps {
  onExport: (format: ExportFormat) => void;
}

export default function DigitalSalesExportDropdown({
  onExport,
}: DigitalSalesExportDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (format: ExportFormat) => {
    onExport(format);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-[34px] px-3.5 bg-[#d2d6de] hover:bg-[#c5cbd5] text-[#333333] text-[14px] font-normal rounded-[4px] inline-flex items-center gap-1.5 transition-colors focus:outline-none"
      >
        <span>Export</span>
        <span className="text-[10px] leading-none">▼</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-[140px] bg-white border border-gray-200 rounded-[4px] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
          <button
            type="button"
            onClick={() => handleSelect("csv")}
            className="w-full text-left px-4 py-2 text-[14px] text-[#495057] hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
          >
            CSV
          </button>
          <button
            type="button"
            onClick={() => handleSelect("xml")}
            className="w-full text-left px-4 py-2 text-[14px] text-[#495057] hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
          >
            XML
          </button>
          <button
            type="button"
            onClick={() => handleSelect("xlsx")}
            className="w-full text-left px-4 py-2 text-[14px] text-[#495057] hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
          >
            Excel (.xlsx)
          </button>
        </div>
      )}
    </div>
  );
}
