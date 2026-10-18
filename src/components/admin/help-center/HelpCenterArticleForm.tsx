"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { List, ChevronDown, CheckCircle2, Bold, Italic, Link2, ListOrdered, Quote } from "lucide-react";
import CustomRadio from "@/components/admin/location/CustomRadio";
import { HelpArticle } from "./types";
import {
  HELP_CATEGORIES,
  getStoredArticles,
  saveSingleArticle,
  saveStoredArticles,
} from "./helpCenterData";

interface HelpCenterArticleFormProps {
  mode: "add" | "edit";
  initialArticle?: HelpArticle | null;
}

export default function HelpCenterArticleForm({
  mode,
  initialArticle,
}: HelpCenterArticleFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialArticle?.title || "");
  const [slug, setSlug] = useState(initialArticle?.slug || "");
  const [category, setCategory] = useState(
    initialArticle?.category || HELP_CATEGORIES[0]
  );
  const [order, setOrder] = useState<number>(initialArticle?.order || 1);
  const [content, setContent] = useState(initialArticle?.content || "");
  const [status, setStatus] = useState<"Active" | "Inactive">(
    initialArticle?.status || "Active"
  );
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(
    mode === "edit"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-generate slug from title in add mode unless user manually changed it
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManuallyEdited) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug(generated);
    }
  };

  const handleSlugChange = (val: string) => {
    setIsSlugManuallyEdited(true);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
    );
  };

  // Helper formatting for textarea
  const insertFormatting = (prefix: string, suffix: string = "") => {
    setContent((prev) => `${prev}\n${prefix}Sample Text${suffix}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      alert("Please fill in both Title and Slug fields.");
      return;
    }

    setIsSubmitting(true);
    const articles = getStoredArticles();

    if (mode === "edit" && initialArticle) {
      const updatedArticle: HelpArticle = {
        ...initialArticle,
        title: title.trim(),
        slug: slug.trim(),
        category,
        order: Number(order) || 1,
        content: content.trim(),
        status,
      };

      const index = articles.findIndex((a) => a.id === initialArticle.id);
      if (index >= 0) {
        articles[index] = updatedArticle;
        saveStoredArticles(articles);
      } else {
        saveSingleArticle(updatedArticle);
      }

      setToastMessage("Article updated successfully!");
      setTimeout(() => {
        router.push("/admin/admin-panel/help-center");
      }, 700);
    } else {
      // Add mode
      const newId =
        articles.length > 0 ? Math.max(...articles.map((a) => a.id)) + 1 : 1;
      const newArticle: HelpArticle = {
        id: newId,
        title: title.trim(),
        slug: slug.trim(),
        category,
        order: Number(order) || newId,
        content: content.trim(),
        views: 0,
        status,
        createdAt: new Date().toISOString().split("T")[0],
      };

      articles.unshift(newArticle);
      saveStoredArticles(articles);

      setToastMessage("Article added successfully!");
      setTimeout(() => {
        router.push("/admin/admin-panel/help-center");
      }, 700);
    }
  };

  return (
    <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5 relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER: Title & Green List Button */}
      <div className="flex items-center justify-between pb-4 border-b border-[#f4f4f4] mb-6">
        <h1 className="text-[18px] font-normal text-[#333333]">
          {mode === "edit" ? "Update Article" : "Add Article"}
        </h1>
        <Link
          href="/admin/admin-panel/help-center"
          className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-normal rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <List className="w-4 h-4" />
          <span>Help Center</span>
        </Link>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title Field */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
            Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Title"
            className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors"
          />
        </div>

        {/* Slug Field (Highlighted as requested for editing by slug) */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
            Slug
          </label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="article-slug"
            className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors font-mono"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            URL route identifier:{" "}
            <span className="font-mono text-purple-700">/admin/admin-panel/help-center/edit/{slug || "..."}</span>
          </p>
        </div>

        {/* Category Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] transition-colors"
              >
                {HELP_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
              Order
            </label>
            <input
              type="number"
              min={1}
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              placeholder="1"
              className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] focus:outline-none focus:border-[#0073b7] transition-colors"
            />
          </div>
        </div>

        {/* Content Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[13px] font-normal text-[#333333]">
              Content
            </label>
            <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded text-gray-600">
              <button
                type="button"
                onClick={() => insertFormatting("**", "**")}
                className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                title="Bold"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("*", "*")}
                className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                title="Italic"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("[Link Title](https://example.com)")}
                className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                title="Link"
              >
                <Link2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("1. ")}
                className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                title="Ordered List"
              >
                <ListOrdered className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("> ")}
                className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                title="Quote"
              >
                <Quote className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea
            rows={7}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write the detailed help topic guide, FAQs, steps, or policy terms..."
            className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] p-3 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors leading-relaxed"
          />
        </div>

        {/* Status Radio Buttons */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-2">
            Status
          </label>
          <div className="flex items-center gap-6">
            <CustomRadio
              name="status"
              label="Active"
              value="Active"
              checked={status === "Active"}
              onChange={() => setStatus("Active")}
            />
            <CustomRadio
              name="status"
              label="Inactive"
              value="Inactive"
              checked={status === "Inactive"}
              onChange={() => setStatus("Inactive")}
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-[#0073b7] hover:bg-[#005a92] disabled:opacity-50 text-white text-[13px] font-medium rounded-[3px] shadow-2xs transition-colors cursor-pointer"
          >
            {mode === "edit" ? "Update Article" : "Add Article"}
          </button>
        </div>
      </form>
    </div>
  );
}
