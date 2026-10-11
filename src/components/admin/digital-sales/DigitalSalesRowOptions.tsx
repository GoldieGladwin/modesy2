"use client";

import React, { useState, useRef, useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
import { DigitalSale } from "./types";

interface DigitalSalesRowOptionsProps {
  sale: DigitalSale;
  onViewDetails?: (sale: DigitalSale) => void;
  onDelete?: (saleId: number) => void;
}

export default function DigitalSalesRowOptions({
  sale,
  onViewDetails,
  onDelete,
}: DigitalSalesRowOptionsProps) {
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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-[#605ca8] hover:bg-[#545096] text-white text-[12px] px-3 py-1.5 rounded-[4px] inline-flex items-center gap-1.5 font-normal transition-colors cursor-pointer focus:outline-none"
      >
        <span>Select an option</span>
        <span className="text-[9px] leading-none">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-[4px] shadow-lg py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onViewDetails?.(sale);
            }}
            className="w-full text-left px-3.5 py-1.5 text-[13px] text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-gray-500" />
            <span>View Details</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onDelete?.(sale.id);
            }}
            className="w-full text-left px-3.5 py-1.5 text-[13px] text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-500" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}
