"use client";

import React, { useState } from "react";
import ProductFilterBar from "./ProductFilterBar";
import ProductTable from "./ProductTable";
import ProductPagination from "./ProductPagination";
import { ProductFilterState, ProductItem } from "./types";

export default function HiddenProductsView() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<ProductFilterState>({
    pageSize: 15,
    listingType: "All",
    productType: "All",
    category: "All",
    subcategory: "All",
    stock: "All",
    search: "",
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleFilterChange = (newFilter: Partial<ProductFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
          Hidden Products
        </h1>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-xs">
          <span>{notification}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-[#155724] font-bold text-sm cursor-pointer ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* Filter Bar */}
      <ProductFilterBar
        filter={filter}
        onFilterChange={handleFilterChange}
        onApplyFilter={() => {}}
        onExport={(format) =>
          showNotification(`Exporting hidden products to ${format.toUpperCase()}...`)
        }
      />

      {/* Products Table (Empty State: No records found!) */}
      <ProductTable products={products} viewType="hidden" />

      {/* Pagination */}
      <ProductPagination
        totalCount={products.length}
        pageSize={filter.pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
