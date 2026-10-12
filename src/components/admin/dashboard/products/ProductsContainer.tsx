"use client";

import React, { useState } from "react";
import ProductFilterSection from "./ProductFilterSection";
import ProductTable from "./ProductTable";
import ProductPaginationBar from "./ProductPaginationBar";
import ProductPromoteModal from "./ProductPromoteModal";
import { ProductFilterState, ProductItem } from "./types";
import { initialDashboardProducts } from "./mockData";

interface ProductsContainerProps {
  title?: string;
  initialItems?: ProductItem[];
  emptyMessage?: string;
  pageSize?: number;
  showPromote?: boolean;
}

export default function ProductsContainer({
  title = "Products",
  initialItems = initialDashboardProducts,
  emptyMessage = "No records found!",
  pageSize = 15,
  showPromote = true,
}: ProductsContainerProps) {
  const [products, setProducts] = useState<ProductItem[]>(initialItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [promoteProduct, setPromoteProduct] = useState<ProductItem | null>(null);

  const [filter, setFilter] = useState<ProductFilterState>({
    listingType: "All",
    productType: "All",
    category: "All",
    subcategory: "All",
    stock: "All",
    search: "",
  });

  const [appliedFilter, setAppliedFilter] = useState<ProductFilterState>(filter);

  const handleFilterChange = (newFilter: Partial<ProductFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const handleApplyFilter = () => {
    setAppliedFilter({ ...filter });
    setCurrentPage(1);
  };

  const handleExport = (format: "csv" | "excel") => {
    const csvHeader = "ID,Title,SKU,Product Type,Category,Price,Stock,Views,Date\n";
    const csvRows = products
      .map(
        (p) =>
          `"${p.id}","${p.title}","${p.sku || ""}","${p.productType}","${p.category}","${p.price}","${p.stock}","${p.pageViews}","${p.date}"`
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
      `products_export_${new Date().toISOString().slice(0, 10)}.${
        format === "excel" ? "csv" : "csv"
      }`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleEdit = (prod: ProductItem) => {
    window.location.href = `/admin/dashboard/add-product`;
  };

  const handleClone = (prod: ProductItem) => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    const cloned: ProductItem = {
      ...prod,
      id: newId,
      title: `${prod.title} (Copy)`,
      sku: `${prod.sku}-COPY`,
      date: new Date().toISOString().slice(0, 10) + " / 12:00",
      editedAgo: "Edited: just now",
    };
    setProducts((prev) => [cloned, ...prev]);
  };

  const handleDelete = (id: number) => {
    const target = products.find((p) => p.id === id);
    if (confirm(`Are you sure you want to delete "${target?.title}"?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handlePromoteSuccess = (id: number, planName: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, purchasedPlan: planName, isFeatured: true } : p
      )
    );
  };

  // Filtered items
  const filtered = products.filter((p) => {
    if (
      appliedFilter.listingType !== "All" &&
      p.listingType !== appliedFilter.listingType
    )
      return false;
    if (
      appliedFilter.productType !== "All" &&
      p.productType !== appliedFilter.productType
    )
      return false;
    if (
      appliedFilter.category !== "All" &&
      p.category !== appliedFilter.category
    )
      return false;
    if (
      appliedFilter.subcategory !== "All" &&
      p.subcategory !== appliedFilter.subcategory
    )
      return false;
    if (appliedFilter.stock !== "All") {
      if (
        appliedFilter.stock === "In Stock" &&
        !p.stock.toLowerCase().includes("in") &&
        !p.stock.toLowerCase().includes("active")
      )
        return false;
      if (
        appliedFilter.stock === "Out of Stock" &&
        (p.stock.toLowerCase().includes("in") ||
          p.stock.toLowerCase().includes("active"))
      )
        return false;
    }
    if (appliedFilter.search.trim()) {
      const q = appliedFilter.search.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const displayedProducts = filtered.slice(
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
      <ProductFilterSection
        filter={filter}
        onChange={handleFilterChange}
        onApplyFilter={handleApplyFilter}
        onExport={handleExport}
      />

      {/* Table */}
      <ProductTable
        products={displayedProducts}
        emptyMessage={emptyMessage}
        showPromote={showPromote}
        onEdit={handleEdit}
        onClone={handleClone}
        onDelete={handleDelete}
        onOpenPromote={(prod) => setPromoteProduct(prod)}
      />

      {/* Pagination Footer (Only show when there are entries) */}
      {filtered.length > 0 && (
        <ProductPaginationBar
          totalEntries={filtered.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {/* Promote Modal */}
      <ProductPromoteModal
        product={promoteProduct}
        isOpen={Boolean(promoteProduct)}
        onClose={() => setPromoteProduct(null)}
        onPromoteSuccess={handlePromoteSuccess}
      />
    </div>
  );
}
