"use client";

import React, { useState } from "react";
import { LayoutGrid } from "lucide-react";
import { ProductByCategoryItem } from "@/types/uliladmin";
import CategorySelectDropdown from "./CategorySelectDropdown";

interface Props {
  onNotify?: (msg: string) => void;
}

const INITIAL_PRODUCTS_BY_CATEGORY: ProductByCategoryItem[] = [
  { id: "1", name: "Clothing", order: 1, showSubcategories: true },
  { id: "2", name: "Jewelry & Accessories", order: 2, showSubcategories: false },
];

export default function ProductsByCategoryManager({ onNotify }: Props) {
  const [categories, setCategories] = useState<ProductByCategoryItem[]>(INITIAL_PRODUCTS_BY_CATEGORY);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showSubcategories, setShowSubcategories] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!selectedCategory) {
      if (onNotify) onNotify("Please select a category first.");
      return;
    }

    const newItem: ProductByCategoryItem = {
      id: Date.now().toString(),
      name: selectedCategory,
      order: categories.length + 1,
      showSubcategories,
    };

    setCategories((prev) => [...prev, newItem]);
    setSelectedCategory("");
    setShowSubcategories(false);
    if (onNotify) onNotify(`"${selectedCategory}" added to Products by Category!`);
  };

  const handleDelete = (id: string, name: string) => {
    setDeletingId(id);
    setTimeout(() => {
      setCategories((prev) => prev.filter((item) => item.id !== id));
      setDeletingId(null);
      if (onNotify) onNotify(`"${name}" removed from Products by Category!`);
    }, 200);
  };

  const handleOrderChange = (id: string, newOrder: number) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, order: newOrder } : c))
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xs p-6 shadow-none transition-shadow hover:shadow-xs">
      <h2 className="text-base font-semibold text-gray-700">Products by Category</h2>
      <p className="text-xs text-gray-500 mb-5">
        Show products by categories on the homepage
      </p>

      {/* Form Dropdown + Checkbox + Button */}
      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Category
          </label>
          <CategorySelectDropdown
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val)}
            placeholder="Select Category"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="showSubcategoryProducts"
            checked={showSubcategories}
            onChange={(e) => setShowSubcategories(e.target.checked)}
            className="w-4 h-4 rounded-xs border-gray-300 text-[#0084ff] focus:ring-0 cursor-pointer"
          />
          <label
            htmlFor="showSubcategoryProducts"
            className="text-xs text-gray-600 cursor-pointer select-none"
          >
            Show subcategory products
          </label>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2 bg-[#0084ff] hover:bg-[#0073e6] active:scale-95 text-white text-xs font-medium rounded-xs transition shadow-none cursor-pointer"
          >
            Select Category
          </button>
        </div>
      </div>

      {/* List / Table of Items */}
      <div className="border-t border-gray-100 divide-y divide-gray-100 text-xs">
        {categories.map((cat) => {
          const isDeleting = deletingId === cat.id;

          return (
            <div
              key={cat.id}
              className={`py-2.5 flex items-center justify-between gap-3 hover:bg-gray-50/70 px-1 transition-all duration-200 ${
                isDeleting ? "opacity-0 -translate-x-3" : "opacity-100 translate-x-0"
              }`}
            >
              <span className="text-gray-700 font-normal truncate flex-1">
                {cat.name}
              </span>

              <div className="flex items-center gap-2 shrink-0">
                {/* Matrix / Layout grid icon */}
                <div className="text-gray-400 p-1">
                  <LayoutGrid className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  type="number"
                  min="1"
                  value={cat.order}
                  onChange={(e) => handleOrderChange(cat.id, Number(e.target.value))}
                  className="w-14 border border-gray-300 rounded-xs px-2 py-1 text-xs text-center text-gray-700 focus:outline-none focus:border-[#0084ff] transition"
                />
                <button
                  type="button"
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="border border-gray-300 hover:bg-gray-50 hover:border-red-300 text-gray-600 hover:text-red-600 px-3 py-1 rounded-xs transition text-xs font-normal cursor-pointer active:scale-95"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
