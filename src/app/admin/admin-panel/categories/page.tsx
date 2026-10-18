"use client";

import React, { useState, useEffect } from "react";
import { FolderTree, PlusCircle, Edit, Trash2, X, Check, Loader2 } from "lucide-react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/supabase/categories";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { DbCategory } from "@/lib/supabase/types";

const initialCategoriesMock: DbCategory[] = [
  { id: "1", name: "Clothing & Shoes", slug: "clothing-shoes", parent_id: null, order_index: 1, is_featured: true, show_on_homepage: true, show_products_on_index: true, description: null, image_url: null },
  { id: "2", name: "Home & Living", slug: "home-living", parent_id: null, order_index: 2, is_featured: true, show_on_homepage: true, show_products_on_index: true, description: null, image_url: null },
  { id: "3", name: "Jewelry & Accessories", slug: "jewelry-accessories", parent_id: null, order_index: 3, is_featured: true, show_on_homepage: true, show_products_on_index: true, description: null, image_url: null },
  { id: "4", name: "Toys & Entertainment", slug: "toys-entertainment", parent_id: null, order_index: 4, is_featured: false, show_on_homepage: true, show_products_on_index: true, description: null, image_url: null },
  { id: "5", name: "Vintage", slug: "vintage", parent_id: null, order_index: 5, is_featured: false, show_on_homepage: true, show_products_on_index: true, description: null, image_url: null },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<DbCategory[]>(initialCategoriesMock);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<DbCategory | null>(null);
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formOrder, setFormOrder] = useState<number>(1);
  const [toast, setToast] = useState<string | null>(null);

  const fetchCategories = async () => {
    if (!isSupabaseConfigured()) return;
    setLoading(true);
    try {
      const { data } = await getCategories();
      if (data && data.length > 0) {
        setCategories(data);
      }
    } catch (e) {
      console.error("Error loading categories:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setFormName("");
    setFormSlug("");
    setFormOrder(categories.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: DbCategory) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormOrder(cat.order_index);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingCategory) {
      // UPDATE
      if (isSupabaseConfigured() && editingCategory.id.includes("-")) {
        await updateCategory({
          id: editingCategory.id,
          name: formName,
          slug: formSlug || undefined,
          order_index: formOrder,
        });
      }
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: formName, slug: formSlug || c.slug, order_index: formOrder }
            : c
        )
      );
      setToast("Category updated successfully!");
    } else {
      // CREATE
      let newId = Date.now().toString();
      if (isSupabaseConfigured()) {
        const { data } = await createCategory({
          name: formName,
          slug: formSlug || undefined,
          order_index: formOrder,
        });
        if (data) newId = data.id;
      }
      const newCat: DbCategory = {
        id: newId,
        name: formName,
        slug: formSlug || formName.toLowerCase().replace(/\s+/g, "-"),
        parent_id: null,
        order_index: formOrder,
        is_featured: false,
        show_on_homepage: true,
        show_products_on_index: true,
        description: null,
        image_url: null,
      };
      setCategories((prev) => [...prev, newCat]);
      setToast("Category created successfully!");
    }

    setIsModalOpen(false);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      if (isSupabaseConfigured() && id.includes("-")) {
        await deleteCategory(id);
      }
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setToast("Category deleted successfully!");
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs px-4 py-2.5 rounded flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium"><Check className="w-4 h-4 text-emerald-600" /> {toast}</span>
          <button onClick={() => setToast(null)}><X className="w-3.5 h-3.5 cursor-pointer" /></button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-[#00a99d]" /> Categories
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage hierarchical marketplace product taxonomies</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-3.5 py-1.5 bg-[#00a99d] text-white text-xs font-bold rounded hover:bg-[#008f85] transition flex items-center gap-1.5 cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" /> Add Category
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        {loading ? (
          <div className="py-12 flex justify-center items-center text-gray-500 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#00a99d]" /> Loading categories from database...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
                <tr>
                  <th className="py-2.5 px-3">Order</th>
                  <th className="py-2.5 px-3">Category Name</th>
                  <th className="py-2.5 px-3">Slug</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/70">
                    <td className="py-3 px-3 font-bold text-gray-400">#{c.order_index}</td>
                    <td className="py-3 px-3 font-semibold text-gray-900">{c.name}</td>
                    <td className="py-3 px-3 font-mono text-gray-500">{c.slug}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">Active</span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(c)}
                        className="text-gray-500 hover:text-[#00a99d] cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5 inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-gray-400 hover:text-red-600 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Smart Watches"
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Slug (Optional)
                </label>
                <input
                  type="text"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  placeholder="e.g. smart-watches"
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Order Index
                </label>
                <input
                  type="number"
                  value={formOrder}
                  onChange={(e) => setFormOrder(parseInt(e.target.value, 10) || 1)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#00a99d] rounded hover:bg-[#008f85] transition cursor-pointer"
                >
                  {editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
