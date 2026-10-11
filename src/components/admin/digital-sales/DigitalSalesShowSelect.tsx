"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DigitalSalesShowSelectProps {
  value: number;
  onChange: (val: number) => void;
  options?: number[];
}

export default function DigitalSalesShowSelect({
  value,
  onChange,
  options = [15, 30, 60, 100],
}: DigitalSalesShowSelectProps) {
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
    <div className="flex flex-col">
      <label className="text-[13px] font-medium text-[#495057] mb-1">
        Show
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-[84px] h-[34px] bg-white border border-[#d2d6de] rounded-[4px] px-3 flex items-center justify-between text-[14px] text-[#495057] focus:outline-none focus:border-[#3c8dbc] transition-colors"
        >
          <span>{value}</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#555] shrink-0" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-[1px] w-[84px] bg-white border border-[#3c8dbc] rounded-b-[4px] shadow-md z-30 overflow-hidden py-0.5">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-[14px] transition-colors ${
                  value === opt
                    ? "bg-[#1877f2] text-white font-medium"
                    : "text-[#495057] hover:bg-[#f1f3f5]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
