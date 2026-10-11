"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { List, ChevronDown, CheckCircle2 } from "lucide-react";
import { KnowledgeCategoryItem } from "./types";
import {
  KNOWLEDGE_LANGUAGES,
  getStoredCategories,
  saveStoredCategories,
  saveSingleCategory,
} from "./helpCenterData";

interface KnowledgeCategoryFormProps {
  mode: "add" | "edit";
  initialCategory?: KnowledgeCategoryItem | null;
}

export default function KnowledgeCategoryForm({
  mode,
  initialCategory,
}: KnowledgeCategoryFormProps) {
  const router = useRouter();

  const [language, setLanguage] = useState(initialCategory?.language || "English");
  const [name, setName] = useState(initialCategory?.name || "");
  const [slug, setSlug] = useState(initialCategory?.slug || "");
  const [order, setOrder] = useState<number>(initialCategory?.order || 1);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(mode === "edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setLanguage(initialCategory.language || "English");
      setName(initialCategory.name || "");
      setSlug(initialCategory.slug || "");
      setOrder(initialCategory.order || 1);
      setIsSlugManuallyEdited(true);
    }
  }, [initialCategory]);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isSlugManuallyEdited) {
      const gen = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug(gen);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter category name.");
      return;
    }

    setIsSubmitting(true);
    const categories = getStoredCategories();
    const finalSlug =
      slug.trim() ||
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    if (mode === "edit" && initialCategory) {
      const updated: KnowledgeCategoryItem = {
        ...initialCategory,
        name: name.trim(),
        slug: finalSlug,
        language,
        order: Number(order) || 1,
      };

      const idx = categories.findIndex((c) => c.id === initialCategory.id);
      if (idx >= 0) {
        categories[idx] = updated;
        saveStoredCategories(categories);
      } else {
        saveSingleCategory(updated);
      }

      setToastMessage("Category updated successfully!");
      setTimeout(() => {
        router.push("/admin/admin-panel/help-center/knowledge-base");
      }, 700);
    } else {
      const newId =
        categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
      const newItem: KnowledgeCategoryItem = {
        id: newId,
        name: name.trim(),
        slug: finalSlug,
        language,
        order: Number(order) || 1,
      };

      categories.unshift(newItem);
      saveStoredCategories(categories);

      setToastMessage("Category added successfully!");
      setTimeout(() => {
        router.push("/admin/admin-panel/help-center/knowledge-base");
      }, 700);
    }
  };

  return (
    <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER: Title & Green List Button (Screenshot 4) */}
      <div className="flex items-center justify-between pb-4 border-b border-[#f4f4f4] mb-6">
        <h1 className="text-[18px] font-normal text-[#333333]">
          {mode === "edit" ? "Update Category" : "Add Category"}
        </h1>
        <Link
          href="/admin/admin-panel/help-center/knowledge-base"
          className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-normal rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <List className="w-4 h-4" />
          <span>Knowledge Base</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Language */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
            Language
          </label>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] transition-colors"
            >
              {KNOWLEDGE_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
            Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Name"
            className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
            Slug{" "}
            <span className="text-[11px] text-gray-400">
              (If you leave it empty, it will be generated automatically.)
            </span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setIsSlugManuallyEdited(true);
            }}
            placeholder="Slug"
            className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors"
          />
        </div>

        {/* Order */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
            Order
          </label>
          <input
            type="number"
            min={1}
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value) || 1)}
            className="w-48 bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] focus:outline-none focus:border-[#0073b7] transition-colors"
          />
        </div>

        {/* Submit Button (Screenshot 4: Blue button at bottom right) */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
          >
            {mode === "edit" ? "Save Changes" : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
