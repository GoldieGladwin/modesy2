"use client";

import React from "react";
import { Plus } from "lucide-react";

interface PagesHeaderProps {
  onAddPage?: () => void;
}

export default function PagesHeader({ onAddPage }: PagesHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-[20px] font-normal text-[#333333] tracking-tight">
        Pages
      </h1>
      <button
        type="button"
        onClick={onAddPage}
        className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-[13px] font-medium rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
      >
        <Plus className="w-4 h-4" />
        <span>Add Page</span>
      </button>
    </div>
  );
}
