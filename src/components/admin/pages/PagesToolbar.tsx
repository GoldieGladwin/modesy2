"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface PagesToolbarProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  searchTerm: string;
  onSearchChange: (query: string) => void;
}

export default function PagesToolbar({
  pageSize,
  onPageSizeChange,
  selectedLanguage,
  onLanguageChange,
  searchTerm,
  onSearchChange,
}: PagesToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 text-[13px] text-[#555]">
      {/* Left side: Show count & Language */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-white border border-[#d2d6de] text-[13px] text-[#444] px-2.5 py-1.5 rounded-[3px] appearance-none pr-7 focus:outline-none focus:border-[#007bff]"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={100}>100</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span>Language</span>
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-white border border-[#d2d6de] text-[13px] text-[#444] px-2.5 py-1.5 rounded-[3px] appearance-none pr-7 focus:outline-none focus:border-[#007bff]"
            >
              <option value="All">All</option>
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Right side: Search */}
      <div className="flex items-center gap-2">
        <span>Search:</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border border-[#d2d6de] rounded-[3px] px-2.5 py-1 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
        />
      </div>
    </div>
  );
}
