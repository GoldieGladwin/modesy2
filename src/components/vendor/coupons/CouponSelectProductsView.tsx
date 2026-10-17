"use client";

import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import {
  getCouponById,
  toggleProductSelection,
  toggleCategorySelection,
  subscribeCoupons,
} from "./couponStore";
import { COUPON_CATEGORIES, COUPON_PRODUCTS } from "./mockData";
import { VendorCoupon } from "./types";

interface CouponSelectProductsViewProps {
  couponId: string;
}

export default function CouponSelectProductsView({
  couponId,
}: CouponSelectProductsViewProps) {
  const [coupon, setCoupon] = useState<VendorCoupon | undefined>(
    getCouponById(couponId)
  );

  // Filters
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [selectedSubcategoryFilter, setSelectedSubcategoryFilter] =
    useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedCategoryFilter, setAppliedCategoryFilter] = useState("All");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

  useEffect(() => {
    const sync = () => setCoupon(getCouponById(couponId));
    sync();
    return subscribeCoupons(sync);
  }, [couponId]);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedCategoryFilter(selectedCategoryFilter);
    setAppliedSearchTerm(searchTerm);
  };

  const handleProductToggle = (productId: number) => {
    toggleProductSelection(couponId, productId);
  };

  const handleCategoryToggle = (categoryName: string) => {
    const categoryProductIds = COUPON_PRODUCTS.filter(
      (p) => p.category === categoryName
    ).map((p) => p.id);
    toggleCategorySelection(couponId, categoryName, categoryProductIds);
  };

  // Filter products
  const filteredProducts = COUPON_PRODUCTS.filter((product) => {
    const matchesCategory =
      appliedCategoryFilter === "All" ||
      product.category === appliedCategoryFilter;
    const matchesSearch =
      !appliedSearchTerm ||
      product.title.toLowerCase().includes(appliedSearchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedIds = coupon?.selectedProductIds || [];
  const selectedCategories = coupon?.selectedCategories || [];

  return (
    <div className="w-full space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-[17px] font-semibold text-gray-800">
          Select Products
        </h1>
        <p className="text-[13px] text-gray-600 mt-0.5">
          Coupon: {coupon?.code || "4IGNOLDX"}
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Categories */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 bg-white rounded border border-[#e4e7ea] p-5 shadow-sm">
          <h2 className="text-[14px] font-semibold text-gray-800 mb-3">
            Categories
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-700 text-[12px] font-semibold">
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-center">Select for Coupon</th>
                </tr>
              </thead>
            </table>

            {/* Scrollable list */}
            <div className="max-h-[580px] overflow-y-auto divide-y divide-gray-100 text-[13px]">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {COUPON_CATEGORIES.map((cat) => {
                    const isChecked = selectedCategories.includes(cat.name);
                    return (
                      <tr
                        key={cat.name}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="py-3 px-3 text-gray-800 align-middle font-normal">
                          {cat.name}
                        </td>
                        <td className="py-3 px-3 align-middle text-center">
                          <label className="inline-flex items-center justify-center cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleCategoryToggle(cat.name)}
                              className="sr-only"
                            />
                            <div
                              className={`w-4 h-4 rounded-[2px] flex items-center justify-center transition-all ${
                                isChecked
                                  ? "bg-[#20c997] border border-[#20c997]"
                                  : "border border-gray-300 bg-white"
                              }`}
                            >
                              {isChecked && (
                                <Check className="w-3 h-3 text-white stroke-[3.5]" />
                              )}
                            </div>
                          </label>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Products */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 bg-white rounded border border-[#e4e7ea] p-5 shadow-sm">
          <h2 className="text-[14px] font-semibold text-gray-800 mb-3">
            Products
          </h2>

          {/* Filter Bar */}
          <form
            onSubmit={handleFilter}
            className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end mb-4 pb-4 border-b border-gray-100"
          >
            {/* Category Dropdown */}
            <div className="sm:col-span-3">
              <label className="block text-[12px] text-gray-700 font-medium mb-1">
                Category
              </label>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-[12.5px] text-gray-700 bg-white focus:outline-none focus:border-[#20c997]"
              >
                <option value="All">All</option>
                {COUPON_CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Dropdown */}
            <div className="sm:col-span-3">
              <label className="block text-[12px] text-gray-700 font-medium mb-1">
                Subcategory
              </label>
              <select
                value={selectedSubcategoryFilter}
                onChange={(e) => setSelectedSubcategoryFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-[12.5px] text-gray-700 bg-white focus:outline-none focus:border-[#20c997]"
              >
                <option value="All">All</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="sm:col-span-4">
              <label className="block text-[12px] text-gray-700 font-medium mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-[12.5px] text-gray-800 focus:outline-none focus:border-[#20c997]"
              />
            </div>

            {/* Filter Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-1.5 px-4 bg-[#6658dd] hover:bg-[#5b4ec7] text-white text-[12.5px] font-medium rounded-[3px] transition-colors shadow-2xs cursor-pointer"
              >
                Filter
              </button>
            </div>
          </form>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-700 text-[12px] font-semibold">
                  <th className="py-2.5 px-3 w-12">Id</th>
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3 w-36">Category</th>
                  <th className="py-2.5 px-3 w-32 text-center">
                    Select for Coupon
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[13px]">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-400">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const isChecked = selectedIds.includes(product.id);
                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="py-3 px-3 text-gray-700 align-middle">
                          {product.id}
                        </td>
                        <td className="py-3 px-3 text-gray-800 font-normal align-middle">
                          {product.title}
                        </td>
                        <td className="py-3 px-3 text-gray-700 align-middle">
                          {product.category}
                        </td>
                        <td className="py-3 px-3 align-middle text-center">
                          <label className="inline-flex items-center justify-center cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleProductToggle(product.id)}
                              className="sr-only"
                            />
                            <div
                              className={`w-4 h-4 rounded-[2px] flex items-center justify-center transition-all ${
                                isChecked
                                  ? "bg-[#20c997] border border-[#20c997]"
                                  : "border border-gray-300 bg-white"
                              }`}
                            >
                              {isChecked && (
                                <Check className="w-3 h-3 text-white stroke-[3.5]" />
                              )}
                            </div>
                          </label>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Entry Count */}
          <div className="pt-6 text-[12.5px] text-gray-700">
            <span>Number of Entries: </span>
            <span className="font-semibold">{filteredProducts.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
