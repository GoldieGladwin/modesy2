"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  List,
  ChevronDown,
  CheckCircle2,
  Image as ImageIcon,
  Code,
  Eye,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List as ListIcon,
  ListOrdered,
  Type,
  Video,
  Link2,
} from "lucide-react";
import { KnowledgeContentItem } from "./types";
import {
  KNOWLEDGE_LANGUAGES,
  getStoredContents,
  getStoredCategories,
  saveStoredContents,
  saveSingleContent,
} from "./helpCenterData";

interface KnowledgeContentFormProps {
  mode: "add" | "edit";
  initialContent?: KnowledgeContentItem | null;
}

export default function KnowledgeContentForm({
  mode,
  initialContent,
}: KnowledgeContentFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialContent?.title || "");
  const [slug, setSlug] = useState(initialContent?.slug || "");
  const [language, setLanguage] = useState(initialContent?.language || "English");
  const [category, setCategory] = useState(initialContent?.category || "Account");
  const [order, setOrder] = useState<number>(initialContent?.order || 1);
  const [content, setContent] = useState(initialContent?.content || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(mode === "edit");
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const cats = getStoredCategories().map((c) => c.name);
    setCategoriesList(cats.length > 0 ? cats : ["Account", "Order & Returns", "Products & Sizing", "Payment"]);
    if (!initialContent && cats.length > 0) {
      setCategory(cats[0]);
    }
  }, [initialContent]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManuallyEdited) {
      const gen = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug(gen);
    }
  };

  const insertToolbarTag = (prefix: string, suffix: string = "") => {
    setContent((prev) => `${prev}\n${prefix}Text${suffix}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    setIsSubmitting(true);
    const contents = getStoredContents();
    const finalSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    const now = new Date();
    const dateFormatted = `${now.toISOString().split("T")[0]} / ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    if (mode === "edit" && initialContent) {
      const updated: KnowledgeContentItem = {
        ...initialContent,
        title: title.trim(),
        slug: finalSlug,
        language,
        category,
        order: Number(order) || 1,
        content: content.trim(),
      };

      const idx = contents.findIndex((c) => c.id === initialContent.id);
      if (idx >= 0) {
        contents[idx] = updated;
        saveStoredContents(contents);
      } else {
        saveSingleContent(updated);
      }

      setToastMessage("Content updated successfully!");
      setTimeout(() => {
        router.push("/admin/admin-panel/help-center/knowledge-base");
      }, 700);
    } else {
      const newId =
        contents.length > 0 ? Math.max(...contents.map((c) => c.id)) + 1 : 1;
      const newItem: KnowledgeContentItem = {
        id: newId,
        title: title.trim(),
        slug: finalSlug,
        language,
        category,
        order: Number(order) || 1,
        date: dateFormatted,
        content: content.trim(),
      };

      contents.unshift(newItem);
      saveStoredContents(contents);

      setToastMessage("Content added successfully!");
      setTimeout(() => {
        router.push("/admin/admin-panel/help-center/knowledge-base");
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

      {/* HEADER: Title & Green List Button (Screenshot 3) */}
      <div className="flex items-center justify-between pb-4 border-b border-[#f4f4f4] mb-6">
        <h1 className="text-[18px] font-normal text-[#333333]">
          {mode === "edit" ? "Update Content" : "Add Content"}
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
        {/* Title */}
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

        {/* Slug */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
            Slug <span className="text-[11px] text-gray-400">(If you leave it empty, it will be generated automatically.)</span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              setIsSlugManuallyEdited(true);
              setSlug(e.target.value);
            }}
            placeholder="Slug"
            className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors font-mono"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
            Language
          </label>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7]"
            >
              {KNOWLEDGE_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
            Categories
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7]"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-3 pointer-events-none" />
          </div>
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
            onChange={(e) => setOrder(Number(e.target.value))}
            className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] focus:outline-none focus:border-[#0073b7]"
          />
        </div>

        {/* Content (Screenshot 3 Rich Editor) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[13px] font-normal text-[#333333]">
              Content
            </label>
            <button
              type="button"
              onClick={() => insertToolbarTag('<img src="https://images.unsplash.com/photo-1557821552-17105176677c?w=600" alt="Support Image" />')}
              className="px-2.5 py-1 text-xs border border-[#d2d6de] bg-gray-50 hover:bg-gray-100 rounded-[3px] text-gray-700 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ImageIcon className="w-3.5 h-3.5 text-gray-500" />
              <span>Add Image</span>
            </button>
          </div>

          {/* TinyMCE Replica Wrapper */}
          <div className="border border-[#d2d6de] rounded-[3px] overflow-hidden bg-white">
            {/* Menu Bar */}
            <div className="bg-[#f8f9fa] border-b border-[#e9ecef] px-3 py-1.5 flex items-center gap-4 text-xs text-gray-700 select-none">
              <span className="hover:text-black cursor-pointer">File</span>
              <span className="hover:text-black cursor-pointer">Edit</span>
              <span className="hover:text-black cursor-pointer">View</span>
              <span className="hover:text-black cursor-pointer">Insert</span>
              <span className="hover:text-black cursor-pointer">Format</span>
              <span className="hover:text-black cursor-pointer">Tools</span>
              <span className="hover:text-black cursor-pointer">Table</span>
            </div>

            {/* Toolbar Buttons */}
            <div className="bg-white border-b border-[#e9ecef] p-2 flex items-center gap-1 flex-wrap text-gray-600">
              <button
                type="button"
                onClick={() => insertToolbarTag("<code>", "</code>")}
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Code"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => alert(content || "No content to preview")}
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-gray-300 mx-1" />
              <button
                type="button"
                onClick={() => setContent((c) => c.slice(0, -5))}
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Undo"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Redo"
              >
                <Redo2 className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-gray-300 mx-1" />
              <button
                type="button"
                onClick={() => insertToolbarTag("<strong>", "</strong>")}
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertToolbarTag("<em>", "</em>")}
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertToolbarTag("<u>", "</u>")}
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Underline"
              >
                <Underline className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertToolbarTag("<strike>", "</strike>")}
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Strikethrough"
              >
                <Strikethrough className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-gray-300 mx-1" />
              <button
                type="button"
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Align Left"
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Align Center"
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Align Right"
              >
                <AlignRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Justify"
              >
                <AlignJustify className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-gray-300 mx-1" />
              <button
                type="button"
                onClick={() => insertToolbarTag("<ul>\n  <li>", "</li>\n</ul>")}
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Bullet List"
              >
                <ListIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertToolbarTag("<ol>\n  <li>", "</li>\n</ol>")}
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertToolbarTag('<a href="#">', "</a>")}
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Link"
              >
                <Link2 className="w-4 h-4" />
              </button>
            </div>

            {/* Editable Content */}
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write knowledge base article details here..."
              className="w-full p-4 text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none leading-relaxed"
            />

            {/* Status bar */}
            <div className="bg-[#f8f9fa] border-t border-[#e9ecef] px-3 py-1 flex items-center justify-between text-[11px] text-gray-500">
              <span>p</span>
              <span className="font-mono font-semibold text-gray-400">tiny</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-[#0073b7] hover:bg-[#005a92] disabled:opacity-50 text-white text-[13px] font-medium rounded-[3px] shadow-2xs transition-colors cursor-pointer"
          >
            {mode === "edit" ? "Update Content" : "Add Content"}
          </button>
        </div>
      </form>
    </div>
  );
}
