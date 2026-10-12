"use client";

import React, { useState } from "react";
import { ChevronDown, Download, FileSpreadsheet } from "lucide-react";
import { ProductFilterState } from "./types";

interface ProductFilterSectionProps {
  filter: ProductFilterState;
  onChange: (filter: Partial<ProductFilterState>) => void;
  onApplyFilter: () => void;
  onExport: (format: "csv" | "excel") => void;
}

export default function ProductFilterSection({
  filter,
  onChange,
  onApplyFilter,
  onExport,
}: ProductFilterSectionProps) {
  const [exportOpen, setExportOpen] = useState(false);

  const categories = [
    "All",
    "Boots",
    "Living Room Furniture",
    "Decorative Pillows",
    "Skirts",
    "Handbags",
    "Vectors",
    "Dresses",
    "Cinematic Music",
    "Men's Clothing",
    "Bags",
    "Accessories",
  ];

  const subcategories = [
    "All",
    "Shoes",
    "Furniture",
    "Home Living",
    "Women's Clothing",
    "Bags",
    "Digital Art",
    "Audio",
    "T-Shirts",
    "Shirts",
    "Scarves",
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* ROW 1: 5 Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Listing Type */}
        <div>
          <label className="block text-[13px] font-semibold text-[#333] mb-1.5">
            Listing Type
          </label>
          <div className="relative">
            <select
              value={filter.listingType}
              onChange={(e) => onChange({ listingType: e.target.value })}
              className="w-full h-[38px] px-3 py-1.5 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none cursor-pointer focus:border-[#00a99d] transition-colors"
            >
              <option value="All">All</option>
              <option value="Sell Now">Sell Now</option>
              <option value="Ordinary Listing">Ordinary Listing</option>
              <option value="Bidding">Bidding</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Product Type */}
        <div>
          <label className="block text-[13px] font-semibold text-[#333] mb-1.5">
            Product Type
          </label>
          <div className="relative">
            <select
              value={filter.productType}
              onChange={(e) => onChange({ productType: e.target.value })}
              className="w-full h-[38px] px-3 py-1.5 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none cursor-pointer focus:border-[#00a99d] transition-colors"
            >
              <option value="All">All</option>
              <option value="Physical">Physical</option>
              <option value="Digital">Digital</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-[13px] font-semibold text-[#333] mb-1.5">
            Category
          </label>
          <div className="relative">
            <select
              value={filter.category}
              onChange={(e) => onChange({ category: e.target.value })}
              className="w-full h-[38px] px-3 py-1.5 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none cursor-pointer focus:border-[#00a99d] transition-colors"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Subcategory */}
        <div>
          <label className="block text-[13px] font-semibold text-[#333] mb-1.5">
            Subcategory
          </label>
          <div className="relative">
            <select
              value={filter.subcategory}
              onChange={(e) => onChange({ subcategory: e.target.value })}
              className="w-full h-[38px] px-3 py-1.5 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none cursor-pointer focus:border-[#00a99d] transition-colors"
            >
              {subcategories.map((sc) => (
                <option key={sc} value={sc}>
                  {sc}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-[13px] font-semibold text-[#333] mb-1.5">
            Stock
          </label>
          <div className="relative">
            <select
              value={filter.stock}
              onChange={(e) => onChange({ stock: e.target.value })}
              className="w-full h-[38px] px-3 py-1.5 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none cursor-pointer focus:border-[#00a99d] transition-colors"
            >
              <option value="All">All</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ROW 2: Search + Filter Button + Export Dropdown */}
      <div className="flex flex-wrap items-end gap-2.5">
        <div>
          <label className="block text-[13px] font-semibold text-[#333] mb-1.5">
            Search
          </label>
          <input
            type="text"
            placeholder="Search"
            value={filter.search}
            onChange={(e) => onChange({ search: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") onApplyFilter();
            }}
            className="w-48 h-[38px] px-3 py-1.5 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] placeholder-gray-400 outline-none focus:border-[#00a99d] transition-colors"
          />
        </div>

        {/* Purple Filter Button */}
        <button
          type="button"
          onClick={onApplyFilter}
          className="h-[38px] bg-[#5853a0] hover:bg-[#4b468e] text-white text-xs font-semibold px-5 rounded-[3px] shadow-xs transition duration-150 cursor-pointer"
        >
          Filter
        </button>

        {/* Light Gray Export Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setExportOpen(!exportOpen)}
            className="h-[38px] bg-[#eef0f8] hover:bg-[#e2e5f1] text-[#4a5568] text-xs font-semibold px-4 rounded-[3px] inline-flex items-center gap-1.5 shadow-2xs transition duration-150 cursor-pointer"
          >
            <span>Export</span>
            <ChevronDown className="w-3 h-3 text-gray-600" />
          </button>

          {exportOpen && (
            <div className="absolute left-0 mt-1 w-36 bg-white border border-[#e2e8f0] rounded-[3px] shadow-lg z-30 py-1 text-left">
              <button
                type="button"
                onClick={() => {
                  setExportOpen(false);
                  onExport("csv");
                }}
                className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-gray-500" />
                <span>Export CSV</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setExportOpen(false);
                  onExport("excel");
                }}
                className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-gray-500" />
                <span>Export Excel</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
