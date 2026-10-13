"use client";

import React from "react";
import Link from "next/link";
import { Ticket, PlusCircle, LayoutGrid, Table } from "lucide-react";

interface CouponHeaderProps {
  title?: string;
  totalCount: number;
  activeCount: number;
  scheduledCount: number;
  expiredCount: number;
  viewMode: "cards" | "table";
  onViewModeChange: (mode: "cards" | "table") => void;
  onAddCoupon: () => void;
  showBreadcrumb?: boolean;
}

export default function CouponHeader({
  title = "My Coupons",
  totalCount,
  activeCount,
  scheduledCount,
  expiredCount,
  viewMode,
  onViewModeChange,
  onAddCoupon,
  showBreadcrumb = true,
}: CouponHeaderProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Breadcrumb */}
      {showBreadcrumb && (
        <nav className="text-xs text-gray-500 flex items-center gap-1.5">
          <Link href="/admin" className="hover:text-[#00a99d] transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">My Coupons</span>
        </nav>
      )}

      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Ticket className="w-6 h-6 text-[#00a99d]" />
            {title}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage promotional coupons, discount vouchers, and campaign codes across your store.
          </p>

          {/* Quick Counter Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
            <span className="px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-700">
              Total: <strong>{totalCount}</strong>
            </span>
            <span className="px-2.5 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active: <strong>{activeCount}</strong>
            </span>
            <span className="px-2.5 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-200">
              Scheduled: <strong>{scheduledCount}</strong>
            </span>
            <span className="px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500 border border-gray-200">
              Expired: <strong>{expiredCount}</strong>
            </span>
          </div>
        </div>

        {/* View Toggle & Add Button */}
        <div className="flex items-center gap-2.5 self-start sm:self-center">
          {/* Switcher: Cards vs Table */}
          <div className="inline-flex rounded border border-gray-200 bg-gray-50 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => onViewModeChange("cards")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition cursor-pointer ${
                viewMode === "cards"
                  ? "bg-white text-[#00a99d] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="Voucher Cards View (Modesy Style)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition cursor-pointer ${
                viewMode === "table"
                  ? "bg-white text-[#00a99d] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="Table Management View"
            >
              <Table className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          {/* Add Coupon Button */}
          <button
            type="button"
            onClick={onAddCoupon}
            className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Coupon</span>
          </button>
        </div>
      </div>
    </div>
  );
}
