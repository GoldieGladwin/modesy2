"use client";

import React from "react";

interface DigitalSalesPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function DigitalSalesPagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: DigitalSalesPaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  if (totalPages <= 1) {
    return null;
  }

  const startIdx = (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-gray-600">
      <div>
        Showing {startIdx} to {endIdx} of {totalItems} entries
      </div>

      <div className="flex items-center space-x-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-1.5 border rounded transition-colors ${
              currentPage === pageNum
                ? "bg-[#605ca8] border-[#605ca8] text-white font-medium"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
