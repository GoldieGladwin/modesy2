"use client";

import React, { useState } from "react";
import { FeaturedCategoryItem } from "@/types/uliladmin";
import CategorySelectDropdown from "./CategorySelectDropdown";

interface Props {
  onNotify?: (msg: string) => void;
}

const INITIAL_FEATURED_CATEGORIES: FeaturedCategoryItem[] = [
  { id: "1", name: "Clothing", order: 1 },
  { id: "2", name: "Home & Living", order: 1 },
  { id: "3", name: "Toys & Entertainment", order: 1 },
  { id: "4", name: "Clothing / Women's Clothing", order: 1 },
  { id: "5", name: "Clothing / Men's Clothing", order: 1 },
  { id: "6", name: "Home & Living / Furniture", order: 1 },
  { id: "7", name: "Jewelry & Accessories / Necklaces & Accessories", order: 1 },
  { id: "8", name: "Graphics & Photos / Graphics", order: 1 },
  { id: "9", name: "Home & Living / Painting", order: 1 },
  { id: "10", name: "Shoes / Women's Shoes / Boots", order: 1 },
  { id: "11", name: "Home & Living / Home Decor / Decorative Pillows", order: 1 },
  { id: "12", name: "Jewelry & Accessories / Bags & Purses / Handbags", order: 1 },
];

export default function FeaturedCategoriesManager({ onNotify }: Props) {
  const [categories, setCategories] = useState<FeaturedCategoryItem[]>(INITIAL_FEATURED_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!selectedCategory) {
      if (onNotify) onNotify("Please select a category first.");
      return;
    }

    const newItem: FeaturedCategoryItem = {
      id: Date.now().toString(),
      name: selectedCategory,
      order: 1,
    };

    setCategories((prev) => [...prev, newItem]);
    setSelectedCategory("");
    if (onNotify) onNotify(`"${selectedCategory}" added to Featured Categories!`);
  };

  const handleDelete = (id: string, name: string) => {
    setDeletingId(id);
    setTimeout(() => {
      setCategories((prev) => prev.filter((item) => item.id !== id));
      setDeletingId(null);
      if (onNotify) onNotify(`"${name}" removed from Featured Categories!`);
    }, 200);
  };

  const handleOrderChange = (id: string, newOrder: number) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, order: newOrder } : c))
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xs p-6 shadow-none transition-shadow hover:shadow-xs">
      <h2 className="text-base font-semibold text-gray-700">Featured Categories</h2>
      <p className="text-xs text-gray-500 mb-5">
        Select the categories you want to show under the slider
      </p>

      {/* Form Dropdown + Button */}
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

      {/* List / Table of Items with animation */}
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
