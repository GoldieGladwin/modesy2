"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ProductFilterState } from "./types";
import { CATEGORY_OPTIONS, getSubcategoriesForCategory } from "./categoryData";

interface ProductFilterSectionProps {
  filter: ProductFilterState;
  onChange: (filter: Partial<ProductFilterState>) => void;
  onApplyFilter: () => void;
  onExport: (format: "csv" | "excel" | "xml") => void;
}

export default function ProductFilterSection({
  filter,
  onChange,
  onApplyFilter,
  onExport,
}: ProductFilterSectionProps) {
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  // Close export dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setExportOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const subcategoryOptions = getSubcategoriesForCategory(filter.category);

  const handleCategoryChange = (cat: string) => {
    onChange({ category: cat, subcategory: "All" });
  };

  return (
    <div className="flex flex-wrap items-end gap-2.5 mb-6">
      {/* 1. Listing Type */}
      <div className="w-[110px] shrink-0">
        <label className="block text-xs font-semibold text-[#555] mb-1.5">
          Listing Type
        </label>
        <div className="relative">
          <select
            value={filter.listingType}
            onChange={(e) => onChange({ listingType: e.target.value })}
            className="w-full h-[34px] px-2.5 pr-7 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none cursor-pointer focus:border-[#00a99d] transition-colors"
          >
            <option value="All">All</option>
            <option value="Marketplace (Selling Products on the Site)">
              Marketplace (Selling Products on the Site)
            </option>
            <option value="Classified Ads (Adding a Product or Service as an Ordinary Listing)">
              Classified Ads (Adding a Product or Service as an Ordinary Listing)
            </option>
            <option value="Bidding System (Request Quote)">
              Bidding System (Request Quote)
            </option>
            <option value="Selling License Keys">Selling License Keys</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 2. Product Type */}
      <div className="w-[110px] shrink-0">
        <label className="block text-xs font-semibold text-[#555] mb-1.5">
          Product Type
        </label>
        <div className="relative">
          <select
            value={filter.productType}
            onChange={(e) => onChange({ productType: e.target.value })}
            className="w-full h-[34px] px-2.5 pr-7 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none cursor-pointer focus:border-[#00a99d] transition-colors"
          >
            <option value="All">All</option>
            <option value="Physical">Physical</option>
            <option value="Digital">Digital</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 3. Category */}
      <div className="w-[130px] shrink-0">
        <label className="block text-xs font-semibold text-[#555] mb-1.5">
          Category
        </label>
        <div className="relative">
          <select
            value={filter.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full h-[34px] px-2.5 pr-7 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none cursor-pointer focus:border-[#00a99d] transition-colors"
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 4. Subcategory */}
      <div className="w-[130px] shrink-0">
        <label className="block text-xs font-semibold text-[#555] mb-1.5">
          Subcategory
        </label>
        <div className="relative">
          <select
            value={filter.subcategory}
            onChange={(e) => onChange({ subcategory: e.target.value })}
            className="w-full h-[34px] px-2.5 pr-7 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none cursor-pointer focus:border-[#00a99d] transition-colors"
          >
            {subcategoryOptions.map((sc) => (
              <option key={sc} value={sc}>
                {sc}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 5. Stock */}
      <div className="w-[100px] shrink-0">
        <label className="block text-xs font-semibold text-[#555] mb-1.5">
          Stock
        </label>
        <div className="relative">
          <select
            value={filter.stock}
            onChange={(e) => onChange({ stock: e.target.value })}
            className="w-full h-[34px] px-2.5 pr-7 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none cursor-pointer focus:border-[#00a99d] transition-colors"
          >
            <option value="All">All</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 6. Search */}
      <div className="w-[150px] shrink-0">
        <label className="block text-xs font-semibold text-[#555] mb-1.5">
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
          className="w-full h-[34px] px-2.5 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] placeholder-gray-400 outline-none focus:border-[#00a99d] transition-colors"
        />
      </div>

      {/* 7. Filter Button */}
      <button
        type="button"
        onClick={onApplyFilter}
        className="h-[34px] bg-[#5853a0] hover:bg-[#4b468e] text-white text-xs font-semibold px-4 rounded-[3px] shadow-2xs transition duration-150 cursor-pointer flex items-center justify-center shrink-0"
      >
        Filter
      </button>

      {/* 8. Export Dropdown */}
      <div className="relative shrink-0" ref={exportRef}>
        <button
          type="button"
          onClick={() => setExportOpen(!exportOpen)}
          className="h-[34px] bg-[#eef0f8] hover:bg-[#e2e5f1] text-[#4a5568] text-xs font-semibold px-3.5 rounded-[3px] inline-flex items-center gap-1.5 shadow-2xs transition duration-150 cursor-pointer"
        >
          <span>Export</span>
          <ChevronDown className="w-3 h-3 text-[#4a5568]" />
        </button>

        {exportOpen && (
          <div className="absolute left-0 mt-1 w-32 bg-white border border-[#d2d6de] rounded-[3px] shadow-md z-30 py-1 text-left">
            <button
              type="button"
              onClick={() => {
                setExportOpen(false);
                onExport("csv");
              }}
              className="w-full px-3 py-1.5 text-xs text-[#333] hover:bg-[#f8f9fa] block cursor-pointer transition-colors text-left"
            >
              CSV
            </button>
            <button
              type="button"
              onClick={() => {
                setExportOpen(false);
                onExport("xml");
              }}
              className="w-full px-3 py-1.5 text-xs text-[#333] hover:bg-[#f8f9fa] block cursor-pointer transition-colors text-left"
            >
              XML
            </button>
            <button
              type="button"
              onClick={() => {
                setExportOpen(false);
                onExport("excel");
              }}
              className="w-full px-3 py-1.5 text-xs text-[#333] hover:bg-[#f8f9fa] block cursor-pointer transition-colors text-left"
            >
              Excel (.xlsx)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
