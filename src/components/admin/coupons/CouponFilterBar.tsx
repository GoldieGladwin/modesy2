"use client";

import React from "react";
import { Search, X, Filter } from "lucide-react";
import { CouponStatus, DiscountType } from "./types";

interface CouponFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: "All" | CouponStatus;
  onStatusFilterChange: (status: "All" | CouponStatus) => void;
  typeFilter: "All" | DiscountType;
  onTypeFilterChange: (type: "All" | DiscountType) => void;
  onResetFilters: () => void;
}

export default function CouponFilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  onResetFilters,
}: CouponFilterBarProps) {
  const isFiltered =
    Boolean(searchTerm) || statusFilter !== "All" || typeFilter !== "All";

  return (
    <div className="bg-white border border-gray-200 rounded p-4 mb-5 shadow-xs">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <label htmlFor="coupon-search-input" className="sr-only">
            Search coupons by code or name
          </label>
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="coupon-search-input"
            type="text"
            placeholder="Search coupon code or name (e.g. TREND15, Welcome)..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#00a99d] focus:ring-1 focus:ring-[#00a99d] text-gray-800 placeholder-gray-400 bg-white"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500 font-medium hidden sm:inline">
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) =>
                onStatusFilterChange(e.target.value as "All" | CouponStatus)
              }
              className="px-2.5 py-2 text-xs border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:border-[#00a99d] cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500 font-medium hidden sm:inline">
              Discount:
            </span>
            <select
              value={typeFilter}
              onChange={(e) =>
                onTypeFilterChange(e.target.value as "All" | DiscountType)
              }
              className="px-2.5 py-2 text-xs border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:border-[#00a99d] cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="percentage">Percentage (%)</option>
              <option value="fixed_amount">Fixed Amount ($)</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-1 transition cursor-pointer"
            >
              <Filter className="w-3 h-3 text-gray-500" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
