"use client";

import React from "react";

interface CouponPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function CouponPagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: CouponPaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  if (totalPages <= 1) {
    return null;
  }

  const startIdx = (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600 bg-white p-3.5 rounded border border-gray-200">
      <div>
        Showing <span className="font-semibold text-gray-800">{startIdx}</span> to{" "}
        <span className="font-semibold text-gray-800">{endIdx}</span> of{" "}
        <span className="font-semibold text-gray-800">{totalItems}</span> coupons
      </div>

      <div className="flex items-center space-x-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-2.5 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-medium cursor-pointer"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-1.5 border rounded transition-colors text-xs cursor-pointer ${
              currentPage === pageNum
                ? "bg-[#00a99d] border-[#00a99d] text-white font-bold"
                : "border-gray-300 text-gray-600 hover:bg-gray-50 font-medium"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-2.5 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-medium cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
