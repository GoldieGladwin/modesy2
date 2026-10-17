"use client";

import React, { useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { ProductFilterState } from "./types";
import { filterCategories, filterSubcategories } from "./mockData";

interface ProductFilterBarProps {
  filter: ProductFilterState;
  onFilterChange: (newFilter: Partial<ProductFilterState>) => void;
  onApplyFilter: () => void;
  onExport?: (format: "csv" | "excel" | "xml") => void;
}

export default function ProductFilterBar({
  filter,
  onFilterChange,
  onApplyFilter,
  onExport,
}: ProductFilterBarProps) {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-[3px] p-4 mb-4 shadow-2xs">
      <div className="flex flex-wrap items-end gap-3 text-xs">
        {/* Show */}
        <div className="w-20">
          <label className="block text-gray-600 font-semibold mb-1">Show</label>
          <div className="relative">
            <select
              value={filter.pageSize}
              onChange={(e) =>
                onFilterChange({ pageSize: Number(e.target.value) })
              }
              className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-xs text-gray-700 pr-6 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Listing Type */}
        <div className="w-28">
          <label className="block text-gray-600 font-semibold mb-1">
            Listing Type
          </label>
          <div className="relative">
            <select
              value={filter.listingType}
              onChange={(e) => onFilterChange({ listingType: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-xs text-gray-700 pr-6 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              <option value="All">All</option>
              <option value="Sell Now">Sell Now</option>
              <option value="Ordinary Listing">Ordinary Listing</option>
              <option value="Bidding">Bidding</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Product Type */}
        <div className="w-28">
          <label className="block text-gray-600 font-semibold mb-1">
            Product Type
          </label>
          <div className="relative">
            <select
              value={filter.productType}
              onChange={(e) => onFilterChange({ productType: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-xs text-gray-700 pr-6 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              <option value="All">All</option>
              <option value="Physical">Physical</option>
              <option value="Digital">Digital</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Category */}
        <div className="w-32">
          <label className="block text-gray-600 font-semibold mb-1">
            Category
          </label>
          <div className="relative">
            <select
              value={filter.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-xs text-gray-700 pr-6 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              {filterCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Subcategory */}
        <div className="w-32">
          <label className="block text-gray-600 font-semibold mb-1">
            Subcategory
          </label>
          <div className="relative">
            <select
              value={filter.subcategory}
              onChange={(e) => onFilterChange({ subcategory: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-xs text-gray-700 pr-6 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              {filterSubcategories.map((sc) => (
                <option key={sc} value={sc}>
                  {sc}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Stock */}
        <div className="w-28">
          <label className="block text-gray-600 font-semibold mb-1">
            Stock
          </label>
          <div className="relative">
            <select
              value={filter.stock}
              onChange={(e) => onFilterChange({ stock: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-xs text-gray-700 pr-6 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              <option value="All">All</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-gray-600 font-semibold mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search"
            value={filter.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") onApplyFilter();
            }}
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
        </div>

        {/* Buttons: Filter + Export */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onApplyFilter}
            className="bg-[#605ca8] hover:bg-[#504c94] text-white font-semibold text-xs px-4 py-1.5 rounded-[3px] shadow-xs transition cursor-pointer"
          >
            Filter
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setExportOpen((prev) => !prev)}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs px-3 py-1.5 rounded-[3px] shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Export</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {exportOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1 text-left">
                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    onExport?.("csv");
                  }}
                  className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gray-500" />
                  <span>Export CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    onExport?.("xml");
                  }}
                  className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gray-500" />
                  <span>Export XML</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    onExport?.("excel");
                  }}
                  className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gray-500" />
                  <span>Export Excel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
