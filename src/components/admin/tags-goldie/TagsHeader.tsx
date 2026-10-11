"use client";

import React from "react";
import { Plus } from "lucide-react";

interface TagsHeaderProps {
  onAddTag: () => void;
}

export default function TagsHeader({ onAddTag }: TagsHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
        Tags
      </h1>
      <button
        type="button"
        onClick={onAddTag}
        className="inline-flex items-center gap-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-3.5 py-2 rounded-[3px] shadow-xs transition-colors cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Add Tag</span>
      </button>
    </div>
  );
}
