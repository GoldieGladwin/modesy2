"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { TagLanguageOption } from "./types";

interface TagsFilterBarProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  searchInput: string;
  onSearchInputChange: (val: string) => void;
  onApplyFilter: () => void;
}

export default function TagsFilterBar({
  pageSize,
  onPageSizeChange,
  selectedLanguage,
  onLanguageChange,
  searchInput,
  onSearchInputChange,
  onApplyFilter,
}: TagsFilterBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onApplyFilter();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 text-xs text-gray-700">
      {/* Show Count */}
      <div className="flex items-center gap-2">
        <label htmlFor="pageSizeSelect" className="font-medium text-gray-600">
          Show
        </label>
        <div className="relative">
          <select
            id="pageSizeSelect"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-xs text-gray-800 pr-7 appearance-none focus:outline-none focus:border-[#00a99d] transition cursor-pointer"
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
            <option value={100}>100</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2 pointer-events-none" />
        </div>
      </div>

      {/* Language */}
      <div className="flex items-center gap-2">
        <label htmlFor="languageSelect" className="font-medium text-gray-600">
          Language
        </label>
        <div className="relative">
          <select
            id="languageSelect"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 pr-7 appearance-none focus:outline-none focus:border-[#00a99d] transition cursor-pointer min-w-[90px]"
          >
            <option value="All">All</option>
            <option value="English">English</option>
            <option value="Indonesian">Indonesian</option>
            <option value="Arabic">Arabic</option>
            <option value="Spanish">Spanish</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2 pointer-events-none" />
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] transition w-44 sm:w-56"
        />
      </div>

      {/* Filter Button */}
      <button
        type="button"
        onClick={onApplyFilter}
        className="bg-[#605ca8] hover:bg-[#504c94] text-white text-xs font-semibold px-4 py-1.5 rounded-[3px] shadow-xs transition-colors cursor-pointer"
      >
        Filter
      </button>
    </div>
  );
}
