"use client";

import React, { useState, useMemo } from "react";
import DigitalSalesHeader from "@/components/admin/digital-sales/DigitalSalesHeader";
import DigitalSalesFilterBar from "@/components/admin/digital-sales/DigitalSalesFilterBar";
import DigitalSalesTable from "@/components/admin/digital-sales/DigitalSalesTable";
import DigitalSalesPagination from "@/components/admin/digital-sales/DigitalSalesPagination";
import DigitalSaleDetailModal from "@/components/admin/digital-sales/DigitalSaleDetailModal";
import { INITIAL_DIGITAL_SALES } from "@/components/admin/digital-sales/mockData";
import { DigitalSale, ExportFormat } from "@/components/admin/digital-sales/types";
import { exportDigitalSales } from "@/components/admin/digital-sales/exportUtils";

export default function DigitalSalesPage() {
  const [salesList, setSalesList] = useState<DigitalSale[]>(INITIAL_DIGITAL_SALES);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedSale, setSelectedSale] = useState<DigitalSale | null>(null);

  // Filter sales based on applied purchase code / order search
  const filteredSales = useMemo(() => {
    if (!appliedSearch.trim()) {
      return salesList;
    }
    const query = appliedSearch.trim().toLowerCase();
    return salesList.filter(
      (sale) =>
        sale.purchaseCode.toLowerCase().includes(query) ||
        sale.order.toLowerCase().includes(query) ||
        sale.seller.toLowerCase().includes(query) ||
        sale.buyer.toLowerCase().includes(query)
    );
  }, [salesList, appliedSearch]);

  // Paginate filtered sales
  const paginatedSales = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredSales.slice(startIndex, startIndex + pageSize);
  }, [filteredSales, currentPage, pageSize]);

  // Submit filter search
  const handleFilterSubmit = () => {
    setAppliedSearch(searchTerm);
    setCurrentPage(1);
  };

  // Change page size (15, 30, 60, 100)
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  // Export handlers
  const handleExport = (format: ExportFormat) => {
    exportDigitalSales(filteredSales, format);
  };

  // Row actions
  const handleDelete = (saleId: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setSalesList((prev) => prev.filter((s) => s.id !== saleId));
    }
  };

  const handleViewDetails = (sale: DigitalSale) => {
    setSelectedSale(sale);
  };

  return (
    <div className="bg-white border border-[#d2d6de] rounded-[4px] p-5 sm:p-6 shadow-xs">
      {/* 1. Page Title */}
      <DigitalSalesHeader title="Digital Sales" />

      {/* 2. Filter & Toolbar Bar */}
      <DigitalSalesFilterBar
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterSubmit={handleFilterSubmit}
        onExport={handleExport}
      />

      {/* 3. Table */}
      <DigitalSalesTable
        sales={paginatedSales}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
      />

      {/* 4. Pagination */}
      <DigitalSalesPagination
        currentPage={currentPage}
        totalItems={filteredSales.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />

      {/* 5. Detail Modal */}
      <DigitalSaleDetailModal
        sale={selectedSale}
        onClose={() => setSelectedSale(null)}
      />
    </div>
  );
}
