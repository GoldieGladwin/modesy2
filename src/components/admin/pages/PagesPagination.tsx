"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PagesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PagesPagination({
  currentPage,
  totalPages = 1,
  onPageChange,
}: PagesPaginationProps) {
  return (
    <div className="flex items-center justify-end gap-1 mt-4 text-[13px]">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-7 h-7 flex items-center justify-center border border-[#d2d6de] rounded-[3px] text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={`w-7 h-7 flex items-center justify-center rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer ${
            currentPage === p
              ? "bg-[#007bff] text-white border border-[#007bff]"
              : "border border-[#d2d6de] text-gray-700 hover:bg-gray-50"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="w-7 h-7 flex items-center justify-center border border-[#d2d6de] rounded-[3px] text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
