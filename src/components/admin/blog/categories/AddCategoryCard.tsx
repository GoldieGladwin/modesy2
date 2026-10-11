"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CategoryFormData } from "./types";

interface AddCategoryCardProps {
  onAddCategory?: (data: CategoryFormData) => void;
}

export default function AddCategoryCard({ onAddCategory }: AddCategoryCardProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    language: "English",
    name: "",
    slug: "",
    description: "",
    keywords: "",
    order: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a category name");
      return;
    }
    onAddCategory?.(formData);
    setFormData({
      language: "English",
      name: "",
      slug: "",
      description: "",
      keywords: "",
      order: 1,
    });
    alert("Category added successfully!");
  };

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[4px] shadow-2xs p-5 relative pb-16">
      <h2 className="text-[15px] font-semibold text-[#333333] pb-3 border-b border-[#f0f0f0] mb-5">
        Add Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-[13px]">
        {/* 1. Language */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-1.5">
            Language
          </label>
          <div className="relative">
            <select
              value={formData.language}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, language: e.target.value }))
              }
              className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3.5 py-2 rounded-[3px] appearance-none focus:outline-none focus:border-[#007bff]"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="French">French</option>
              <option value="Indonesian">Indonesian</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* 2. Category Name */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-1.5">
            Category Name
          </label>
          <input
            type="text"
            placeholder="Category Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full border border-[#d2d6de] rounded-[3px] px-3.5 py-2 text-[13px] text-[#444] placeholder:text-[#888] focus:outline-none focus:border-[#007bff]"
          />
        </div>

        {/* 3. Slug */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-1.5">
            Slug (If you leave it empty, it will be generated automatically.)
          </label>
          <input
            type="text"
            placeholder="Slug"
            value={formData.slug}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, slug: e.target.value }))
            }
            className="w-full border border-[#d2d6de] rounded-[3px] px-3.5 py-2 text-[13px] text-[#444] placeholder:text-[#888] focus:outline-none focus:border-[#007bff]"
          />
        </div>

        {/* 4. Description (Meta Tag) */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-1.5">
            Description (Meta Tag)
          </label>
          <input
            type="text"
            placeholder="Description (Meta Tag)"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full border border-[#d2d6de] rounded-[3px] px-3.5 py-2 text-[13px] text-[#444] placeholder:text-[#888] focus:outline-none focus:border-[#007bff]"
          />
        </div>

        {/* 5. Keywords (Meta Tag) */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-1.5">
            Keywords (Meta Tag)
          </label>
          <input
            type="text"
            placeholder="Keywords (Meta Tag)"
            value={formData.keywords}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, keywords: e.target.value }))
            }
            className="w-full border border-[#d2d6de] rounded-[3px] px-3.5 py-2 text-[13px] text-[#444] placeholder:text-[#888] focus:outline-none focus:border-[#007bff]"
          />
        </div>

        {/* 6. Order */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-1.5">
            Order
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                order: parseInt(e.target.value, 10) || 1,
              }))
            }
            className="w-full border border-[#d2d6de] rounded-[3px] px-3.5 py-2 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
          />
        </div>

        {/* Submit Button (Bottom Right) */}
        <div className="absolute right-5 bottom-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#007bff] hover:bg-[#0069d9] text-white rounded-[3px] text-[13px] font-semibold transition cursor-pointer shadow-2xs"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
}
