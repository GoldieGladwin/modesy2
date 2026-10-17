"use client";

import React, { useState } from "react";
import ProductFilterBar from "./ProductFilterBar";
import ProductTable from "./ProductTable";
import ProductPagination from "./ProductPagination";
import ProductDeleteModal from "@/components/admin/dashboard/products/ProductDeleteModal";
import { ProductFilterState, ProductItem } from "./types";
import { initialFeaturedProducts } from "./mockData";

export default function FeaturedProductsView() {
  const [products, setProducts] = useState<ProductItem[]>(
    initialFeaturedProducts
  );
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

  const [deleteProductTarget, setDeleteProductTarget] = useState<ProductItem | null>(null);

  const handleDelete = (id: number) => {
    const target = products.find((p) => p.id === id);
    if (target) {
      setDeleteProductTarget(target);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteProductTarget) {
      setProducts((prev) => prev.filter((p) => p.id !== deleteProductTarget.id));
      showNotification(`Product "${deleteProductTarget.title}" deleted successfully.`);
      setDeleteProductTarget(null);
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
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
          Featured Products
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
          showNotification(`Exporting featured products to ${format.toUpperCase()}...`)
        }
      />

      {/* Products Table */}
      <ProductTable
        products={filteredProducts}
        viewType="featured"
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

      {/* Delete Confirmation Modal */}
      <ProductDeleteModal
        product={deleteProductTarget as any}
        isOpen={Boolean(deleteProductTarget)}
        onClose={() => setDeleteProductTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
