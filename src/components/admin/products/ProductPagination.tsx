"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductPaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}: ProductPaginationProps) {
  if (totalCount === 0) return null;

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs text-gray-500">
      <div>
        Showing 1 to {Math.min(totalCount, pageSize)} of {totalCount} entries
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-[2px] hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer text-gray-600"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`w-7 h-7 flex items-center justify-center rounded-[2px] font-bold transition cursor-pointer ${
              page === currentPage
                ? "bg-[#007bff] text-white shadow-2xs"
                : "border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-[2px] hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer text-gray-600"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
