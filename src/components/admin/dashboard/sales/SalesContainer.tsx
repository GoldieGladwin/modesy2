"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SalesFilterSection from "./SalesFilterSection";
import SalesTable from "./SalesTable";
import SalesPaginationBar from "./SalesPaginationBar";
import { SaleFilterState, SaleItem } from "./types";
import {
  initialActiveSales,
  initialCompletedSales,
  initialCancelledSales,
} from "./mockData";

interface SalesContainerProps {
  title?: string;
  initialItems?: SaleItem[];
  showPaymentStatus?: boolean;
  emptyMessage?: string;
  pageSize?: number;
}

function SalesContainerContent({
  title = "Sales",
  initialItems = initialActiveSales,
  showPaymentStatus = false,
  emptyMessage = "No records found!",
  pageSize = 15,
}: SalesContainerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const st = searchParams?.get("st");
  const pageParam = searchParams?.get("page");
  const initialPage = pageParam ? parseInt(pageParam, 10) || 1 : 1;

  // Determine effective title, items, and showPaymentStatus
  let effectiveTitle = title;
  let defaultItems = initialItems;
  let effectiveShowPaymentStatus = showPaymentStatus;

  if (st === "completed" || title === "Completed Sales") {
    effectiveTitle = "Completed Sales";
    defaultItems = initialCompletedSales;
    effectiveShowPaymentStatus = false;
  } else if (st === "cancelled" || title === "Cancelled Sales") {
    effectiveTitle = "Cancelled Sales";
    defaultItems = initialCancelledSales;
    effectiveShowPaymentStatus = false;
  } else if (st === "active") {
    effectiveTitle = "Active Sales";
    defaultItems = initialActiveSales;
    effectiveShowPaymentStatus = true;
  }

  const [sales, setSales] = useState<SaleItem[]>(defaultItems);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedSale, setSelectedSale] = useState<SaleItem | null>(null);

  useEffect(() => {
    if (pageParam) {
      const p = parseInt(pageParam, 10);
      if (!isNaN(p) && p !== currentPage) {
        setCurrentPage(p);
      }
    }
  }, [pageParam]);

  useEffect(() => {
    if (st === "completed" || title === "Completed Sales") {
      setSales(initialCompletedSales);
    } else if (st === "cancelled" || title === "Cancelled Sales") {
      setSales(initialCancelledSales);
    } else if (st === "active") {
      setSales(initialActiveSales);
    } else {
      setSales(initialItems);
    }
    setCurrentPage(1);
  }, [st, title, initialItems]);

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
    if (searchParams?.get("page")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      const query = params.toString() ? `?${params.toString()}` : "";
      router.push(`${pathname}${query}`, { scroll: false });
    }
  };

  // Filter logic
  const filtered = sales.filter((item) => {
    if (
      effectiveShowPaymentStatus &&
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    const query = params.toString() ? `?${params.toString()}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  };

  const handleExport = (format: "csv" | "excel" | "xml") => {
    const exportData = filtered.length > 0 ? filtered : sales;

    if (format === "xml") {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<sales>\n';
      exportData.forEach((s) => {
        xml += "  <sale>\n";
        xml += `    <id>${s.id}</id>\n`;
        xml += `    <total>${s.total.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</total>\n`;
        xml += `    <payment_status>${s.paymentStatus}</payment_status>\n`;
        xml += `    <status>${s.status}</status>\n`;
        xml += `    <date>${s.date}</date>\n`;
        xml += "  </sale>\n";
      });
      xml += "</sales>";

      const blob = new Blob([xml], {
        type: "application/xml;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `sales_export_${new Date().toISOString().slice(0, 10)}.xml`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }

    if (format === "excel") {
      const headers = ["Sale ID", "Total", "Payment Status", "Status", "Date"];
      const rows = exportData.map((s) => [
        `#${s.id}`,
        s.total,
        s.paymentStatus,
        s.status,
        s.date,
      ]);
      const content = [
        headers.join("\t"),
        ...rows.map((r) => r.join("\t")),
      ].join("\n");
      const blob = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `sales_export_${new Date().toISOString().slice(0, 10)}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }

    // Default CSV
    const csvHeader = "Sale ID,Total,Payment Status,Status,Date\n";
    const csvRows = exportData
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

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const displayedSales = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[3px] p-6 shadow-xs">
      {/* Title */}
      <div className="mb-5">
        <h1 className="text-[15px] font-semibold text-[#333]">{effectiveTitle}</h1>
      </div>

      {/* Filter Section */}
      <SalesFilterSection
        filter={filter}
        showPaymentStatus={effectiveShowPaymentStatus}
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
          onPageChange={handlePageChange}
        />
      )}

      {/* Details Modal */}
      {selectedSale && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedSale(null)}
        >
          <div
            className="bg-white rounded-[4px] max-w-md w-full p-6 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Sale Details #{selectedSale.id}</span>
              <button
                type="button"
                onClick={() => setSelectedSale(null)}
                className="text-gray-400 hover:text-gray-600 text-base cursor-pointer"
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

export default function SalesContainer(props: SalesContainerProps) {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-gray-500">Loading sales...</div>}>
      <SalesContainerContent {...props} />
    </Suspense>
  );
}
