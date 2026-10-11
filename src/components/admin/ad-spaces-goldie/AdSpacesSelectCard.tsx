"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { adSpaceOptions } from "./mockData";

interface AdSpacesSelectCardProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function AdSpacesSelectCard({
  selectedId,
  onSelect,
}: AdSpacesSelectCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5">
      <label className="block text-xs font-semibold text-gray-700 mb-2">
        Select Ad Space
      </label>
      <div className="relative max-w-xl">
        <select
          value={selectedId}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 appearance-none pr-8 focus:outline-none focus:border-[#00a99d] transition cursor-pointer"
        >
          {adSpaceOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
      </div>
    </div>
  );
}
