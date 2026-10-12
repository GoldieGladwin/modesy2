"use client";

import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface SalesPaginationBarProps {
  totalEntries: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function SalesPaginationBar({
  totalEntries,
  currentPage,
  totalPages,
  onPageChange,
}: SalesPaginationBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#f4f4f4] mt-2">
      {/* Left: Number of Entries */}
      <div className="text-xs text-[#555]">
        Number of Entries:{" "}
        <strong className="text-[#333] font-bold">{totalEntries}</strong>
      </div>

      {/* Right: Pagination (Only show if totalPages > 1) */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1.5">
          {/* Prev arrow */}
          {currentPage > 1 && (
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              className="w-8 h-8 rounded-[3px] bg-white border border-[#e2e8f0] text-gray-700 text-xs hover:bg-gray-50 flex items-center justify-center transition cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded-[3px] text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                  isActive
                    ? "bg-[#00ab80] text-white shadow-2xs"
                    : "bg-white border border-[#e2e8f0] text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next arrow › */}
          {currentPage < totalPages && (
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              className="w-8 h-8 rounded-[3px] bg-white border border-[#e2e8f0] text-gray-700 text-xs hover:bg-gray-50 flex items-center justify-center transition cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
