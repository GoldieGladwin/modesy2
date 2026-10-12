"use client";

import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface ProductPaginationBarProps {
  totalEntries: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductPaginationBar({
  totalEntries,
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#f4f4f4] mt-2">
      {/* Left: Number of Entries */}
      <div className="text-xs text-[#555]">
        Number of Entries:{" "}
        <strong className="text-[#333] font-bold">{totalEntries}</strong>
      </div>

      {/* Right: Pagination (1, 2, ›) */}
      <div className="flex items-center gap-1.5">
        {/* Optional Prev arrow if page > 1 */}
        {currentPage > 1 && (
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            className="w-8 h-8 rounded-[3px] bg-white border border-[#e2e8f0] text-gray-700 text-xs hover:bg-gray-50 flex items-center justify-center transition cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}

        {(() => {
          let visiblePages: number[] = [];
          if (totalPages <= 3) {
            visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
          } else if (currentPage <= 2) {
            visiblePages = [1, 2, 3];
          } else if (currentPage >= totalPages - 1) {
            visiblePages = [totalPages - 2, totalPages - 1, totalPages];
          } else {
            visiblePages = [currentPage - 1, currentPage, currentPage + 1];
          }

          return visiblePages.map((pageNum) => {
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded-[3px] text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                  isActive
                    ? "bg-[#00a99d] text-white shadow-2xs"
                    : "bg-white border border-[#e2e8f0] text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          });
        })()}

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
    </div>
  );
}
