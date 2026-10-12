"use client";

import React, { useState } from "react";
import SalesFilterSection from "./SalesFilterSection";
import SalesTable from "./SalesTable";
import SalesPaginationBar from "./SalesPaginationBar";
import { SaleFilterState, SaleItem } from "./types";

interface SalesContainerProps {
  title: string;
  initialItems: SaleItem[];
  showPaymentStatus?: boolean;
  emptyMessage?: string;
  pageSize?: number;
}

export default function SalesContainer({
  title,
  initialItems,
  showPaymentStatus = false,
  emptyMessage = "No records found!",
  pageSize = 15,
}: SalesContainerProps) {
  const [sales, setSales] = useState<SaleItem[]>(initialItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSale, setSelectedSale] = useState<SaleItem | null>(null);

  const [filter, setFilter] = useState<SaleFilterState>({
    paymentStatus: "All",
    searchId: "",
  });

  const [appliedFilter, setAppliedFilter] = useState<SaleFilterState>(filter);

  const handleFilterChange = (newFilter: Partial<SaleFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const handleApplyFilter = () => {
    setAppliedFilter({ ...filter });
    setCurrentPage(1);
  };

  const handleExport = (format: "csv" | "excel") => {
    const csvHeader = "Sale ID,Total,Payment Status,Status,Date\n";
    const csvRows = sales
      .map(
        (s) =>
          `"#${s.id}","${s.total}","${s.paymentStatus}","${s.status}","${s.date}"`
      )
      .join("\n");

    const blob = new Blob([csvHeader + csvRows], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `sales_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleViewDetails = (sale: SaleItem) => {
    setSelectedSale(sale);
  };

  // Filter logic
  const filtered = sales.filter((item) => {
    if (
      showPaymentStatus &&
      appliedFilter.paymentStatus !== "All" &&
      item.paymentStatus !== appliedFilter.paymentStatus
    ) {
      return false;
    }

    if (appliedFilter.searchId.trim()) {
      const q = appliedFilter.searchId.trim().toLowerCase().replace("#", "");
      if (!item.id.toLowerCase().includes(q)) {
        return false;
      }
    }

    return true;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const displayedSales = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 sm:p-7 shadow-xs">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-[18px] font-bold text-[#2d3748]">{title}</h1>
      </div>

      {/* Filter Section */}
      <SalesFilterSection
        filter={filter}
        showPaymentStatus={showPaymentStatus}
        onChange={handleFilterChange}
        onApplyFilter={handleApplyFilter}
        onExport={handleExport}
      />

      {/* Table */}
      <SalesTable
        sales={displayedSales}
        emptyMessage={emptyMessage}
        onViewDetails={handleViewDetails}
      />

      {/* Pagination Footer */}
      {filtered.length > 0 && (
        <SalesPaginationBar
          totalEntries={filtered.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {/* Details Modal */}
      {selectedSale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-[6px] max-w-md w-full p-6 shadow-xl relative">
            <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Sale Details #{selectedSale.id}</span>
              <button
                type="button"
                onClick={() => setSelectedSale(null)}
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </h3>
            <div className="space-y-3 text-xs text-gray-700">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="font-semibold text-gray-500">Sale ID:</span>
                <span className="font-bold text-gray-900">#{selectedSale.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="font-semibold text-gray-500">Total:</span>
                <span className="font-bold text-[#00a99d]">{selectedSale.total}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="font-semibold text-gray-500">Payment Status:</span>
                <span className="font-medium">{selectedSale.paymentStatus}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="font-semibold text-gray-500">Order Status:</span>
                <span className="font-medium">{selectedSale.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="font-semibold text-gray-500">Date:</span>
                <span>{selectedSale.date}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSale(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-[3px] transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
