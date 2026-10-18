"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface BlogPostFilterBarProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onFilterSubmit: () => void;
}

export default function BlogPostFilterBar({
  pageSize,
  onPageSizeChange,
  selectedLanguage,
  onLanguageChange,
  searchTerm,
  onSearchChange,
  onFilterSubmit,
}: BlogPostFilterBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onFilterSubmit();
    }
  };

  return (
    <div className="flex flex-wrap items-end gap-3 mb-6">
      {/* 1. Show */}
      <div className="flex flex-col">
        <label className="text-[13px] font-medium text-[#495057] mb-1">
          Show
        </label>
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="w-[84px] h-[34px] bg-white border border-[#d2d6de] rounded-[4px] px-3 appearance-none text-[14px] text-[#495057] focus:outline-none focus:border-[#3c8dbc]"
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
            <option value={100}>100</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#555] absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* 2. Language */}
      <div className="flex flex-col">
        <label className="text-[13px] font-medium text-[#495057] mb-1">
          Language
        </label>
        <div className="relative">
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-[120px] h-[34px] bg-white border border-[#d2d6de] rounded-[4px] px-3 appearance-none text-[14px] text-[#495057] focus:outline-none focus:border-[#3c8dbc]"
          >
            <option value="All">All</option>
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#555] absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* 3. Search */}
      <div className="flex flex-col">
        <label className="text-[13px] font-medium text-[#495057] mb-1">
          Search
        </label>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[220px] h-[34px] px-3 bg-white border border-[#d2d6de] rounded-[4px] text-[14px] text-[#495057] placeholder:text-[#888888] focus:outline-none focus:border-[#3c8dbc] transition-colors"
        />
      </div>

      {/* 4. Filter Button */}
      <button
        type="button"
        onClick={onFilterSubmit}
        className="h-[34px] px-5 bg-[#605ca8] hover:bg-[#545096] text-white text-[14px] font-normal rounded-[4px] transition-colors cursor-pointer focus:outline-none"
      >
        Filter
      </button>
    </div>
  );
}
