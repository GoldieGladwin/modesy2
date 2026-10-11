"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface AffiliateProgramHeaderProps {
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  languages?: string[];
}

export default function AffiliateProgramHeader({
  selectedLanguage,
  onLanguageChange,
  languages = ["English", "Arabic", "French", "Indonesian"],
}: AffiliateProgramHeaderProps) {
  return (
    <div>
      <h1 className="text-[20px] font-normal text-[#333333] mb-4">
        Affiliate Program
      </h1>

      <div className="max-w-xs mb-6">
        <label
          htmlFor="affiliate-language-select"
          className="block text-[13px] font-semibold text-[#555555] mb-1.5"
        >
          Language
        </label>
        <div className="relative">
          <select
            id="affiliate-language-select"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#555] px-3.5 py-2 rounded-[3px] appearance-none focus:outline-none focus:border-[#00a99d] shadow-2xs"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
