"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import ProductFilterBar from "./ProductFilterBar";
import ProductTable from "./ProductTable";
import ProductPagination from "./ProductPagination";
import { ProductFilterState, ProductItem } from "./types";
import {
  initialFeaturedProducts,
  initialSpecialOffers,
  initialDraftProducts,
} from "./mockData";

export default function ProductsView() {
  // Combine all sample products for the general products overview
  const [products, setProducts] = useState<ProductItem[]>([
    ...initialFeaturedProducts,
    ...initialSpecialOffers,
    ...initialDraftProducts,
  ]);
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

  const filteredProducts = products.filter((p) => {
    if (filter.productType !== "All" && p.productType !== filter.productType)
      return false;
    if (filter.category !== "All" && p.category !== filter.category)
      return false;
    if (filter.subcategory !== "All" && p.subcategory !== filter.subcategory)
      return false;
    if (filter.stock !== "All") {
      if (filter.stock === "In Stock" && !p.stock.toLowerCase().includes("in"))
        return false;
      if (
        filter.stock === "Out of Stock" &&
        p.stock.toLowerCase().includes("in")
      )
        return false;
    }
    if (filter.search.trim()) {
      const q = filter.search.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.user.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleDelete = (id: number) => {
    const target = products.find((p) => p.id === id);
    if (confirm(`Are you sure you want to delete "${target?.title}"?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showNotification(`Product "${target?.title}" deleted successfully.`);
    }
  };

  const handleBulkDelete = (ids: number[]) => {
    setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
    showNotification(`${ids.length} products deleted successfully.`);
  };

  const handleToggleFeatured = (item: ProductItem) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, isFeatured: !p.isFeatured } : p
      )
    );
    showNotification(
      item.isFeatured
        ? `Removed "${item.title}" from Featured Products.`
        : `Added "${item.title}" to Featured Products.`
    );
  };

  const handleToggleSpecialOffer = (item: ProductItem) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, isSpecialOffer: !p.isSpecialOffer } : p
      )
    );
    showNotification(
      item.isSpecialOffer
        ? `Removed "${item.title}" from Special Offers.`
        : `Added "${item.title}" to Special Offers.`
    );
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Title & Add Action */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
          Products
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
          showNotification(`Exporting products to ${format.toUpperCase()}...`)
        }
      />

      {/* Products Table */}
      <ProductTable
        products={filteredProducts}
        viewType="all"
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
        onToggleFeatured={handleToggleFeatured}
        onToggleSpecialOffer={handleToggleSpecialOffer}
      />

      {/* Pagination */}
      <ProductPagination
        totalCount={filteredProducts.length}
        pageSize={filter.pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
