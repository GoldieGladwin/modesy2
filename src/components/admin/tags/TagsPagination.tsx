"use client";

import React from "react";

interface TagsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TagsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: TagsPaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers
  const pages: number[] = [];
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-end gap-1 pt-4 border-t border-gray-100">
      {/* First Page button */}
      {currentPage > 1 && (
        <button
          type="button"
          onClick={() => onPageChange(1)}
          className="bg-white border border-gray-300 text-[#337ab7] hover:bg-gray-100 px-2.5 py-1 text-xs rounded-[3px] font-medium transition cursor-pointer"
          title="First Page"
        >
          «
        </button>
      )}

      {/* Prev Page button */}
      {currentPage > 1 && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          className="bg-white border border-gray-300 text-[#337ab7] hover:bg-gray-100 px-2.5 py-1 text-xs rounded-[3px] font-medium transition cursor-pointer"
          title="Previous Page"
        >
          ‹
        </button>
      )}

      {/* Numbered Page buttons */}
      {pages.map((p) => {
        const isActive = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`min-w-[32px] px-2.5 py-1 text-xs rounded-[3px] font-medium border transition cursor-pointer ${
              isActive
                ? "bg-[#337ab7] border-[#337ab7] text-white shadow-2xs"
                : "bg-white border-gray-300 text-[#337ab7] hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next Page button */}
      {currentPage < totalPages && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          className="bg-white border border-gray-300 text-[#337ab7] hover:bg-gray-100 px-2.5 py-1 text-xs rounded-[3px] font-medium transition cursor-pointer"
          title="Next Page"
        >
          ›
        </button>
      )}

      {/* Last Page button */}
      {currentPage < totalPages && (
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          className="bg-white border border-gray-300 text-[#337ab7] hover:bg-gray-100 px-2.5 py-1 text-xs rounded-[3px] font-medium transition cursor-pointer"
          title="Last Page"
        >
          »
        </button>
      )}
    </div>
  );
}
