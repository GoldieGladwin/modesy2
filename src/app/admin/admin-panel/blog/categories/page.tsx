"use client";

import React, { useState } from "react";
import AddCategoryCard from "@/components/admin/blog/categories/AddCategoryCard";
import CategoriesCard from "@/components/admin/blog/categories/CategoriesCard";
import { INITIAL_BLOG_CATEGORIES } from "@/components/admin/blog/categories/mockData";
import { BlogCategory, CategoryFormData } from "@/components/admin/blog/categories/types";

export default function AdminBlogCategoriesPage() {
  const [categories, setCategories] = useState<BlogCategory[]>(INITIAL_BLOG_CATEGORIES);

  const handleAddCategory = (formData: CategoryFormData) => {
    const newCategory: BlogCategory = {
      id: categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
      name: formData.name,
      language: formData.language,
      order: formData.order,
    };
    setCategories((prev) => [newCategory, ...prev]);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleEdit = (category: BlogCategory) => {
    const newName = window.prompt("Edit Category Name:", category.name);
    if (newName && newName.trim()) {
      setCategories((prev) =>
        prev.map((c) => (c.id === category.id ? { ...c, name: newName.trim() } : c))
      );
    }
  };

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto font-sans text-[#333]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Add Category Form */}
        <div className="lg:col-span-5 xl:col-span-4">
          <AddCategoryCard onAddCategory={handleAddCategory} />
        </div>

        {/* Right Column: Categories List Table */}
        <div className="lg:col-span-7 xl:col-span-8">
          <CategoriesCard
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
