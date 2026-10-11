"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Plus, ChevronDown, CheckCircle2, AlertCircle, Edit, Trash2 } from "lucide-react";
import { KnowledgeContentItem, KnowledgeCategoryItem } from "./types";
import {
  KNOWLEDGE_LANGUAGES,
  getStoredContents,
  getStoredCategories,
  deleteStoredContent,
  deleteStoredCategory,
} from "./helpCenterData";

export default function KnowledgeBaseView() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

  // Contents state
  const [contents, setContents] = useState<KnowledgeContentItem[]>([]);
  const [contentPageSize, setContentPageSize] = useState<number>(15);
  const [contentCurrentPage, setContentCurrentPage] = useState<number>(1);
  const [contentSearch, setContentSearch] = useState<string>("");
  const [openContentDropdownId, setOpenContentDropdownId] = useState<number | null>(null);
  const [deleteContentTarget, setDeleteContentTarget] = useState<KnowledgeContentItem | null>(null);

  // Categories state
  const [categories, setCategories] = useState<KnowledgeCategoryItem[]>([]);
  const [catPageSize, setCatPageSize] = useState<number>(15);
  const [catCurrentPage, setCatCurrentPage] = useState<number>(1);
  const [catSearch, setCatSearch] = useState<string>("");
  const [openCatDropdownId, setOpenCatDropdownId] = useState<number | null>(null);
  const [deleteCatTarget, setDeleteCatTarget] = useState<KnowledgeCategoryItem | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const contentDropdownRef = useRef<HTMLDivElement>(null);
  const catDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContents(getStoredContents());
    setCategories(getStoredCategories());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        contentDropdownRef.current &&
        !contentDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenContentDropdownId(null);
      }
      if (
        catDropdownRef.current &&
        !catDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenCatDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Contents
  const filteredContents = useMemo(() => {
    return contents.filter((c) => {
      const matchLang = selectedLanguage === "All" || c.language === selectedLanguage;
      if (!matchLang) return false;
      if (!contentSearch) return true;
      const q = contentSearch.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q)
      );
    });
  }, [contents, selectedLanguage, contentSearch]);

  const contentTotalPages = Math.ceil(filteredContents.length / contentPageSize) || 1;
  const contentStart = (contentCurrentPage - 1) * contentPageSize;
  const displayedContents = filteredContents.slice(contentStart, contentStart + contentPageSize);

  // Filtered Categories
  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const matchLang = selectedLanguage === "All" || c.language === selectedLanguage;
      if (!matchLang) return false;
      if (!catSearch) return true;
      const q = catSearch.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q);
    });
  }, [categories, selectedLanguage, catSearch]);

  const catTotalPages = Math.ceil(filteredCategories.length / catPageSize) || 1;
  const catStart = (catCurrentPage - 1) * catPageSize;
  const displayedCategories = filteredCategories.slice(catStart, catStart + catPageSize);

  // Delete handlers
  const confirmDeleteContent = () => {
    if (!deleteContentTarget) return;
    const updated = deleteStoredContent(deleteContentTarget.id);
    setContents(updated);
    triggerToast(`Content "${deleteContentTarget.title}" deleted successfully!`);
    setDeleteContentTarget(null);
  };

  const confirmDeleteCategory = () => {
    if (!deleteCatTarget) return;
    const updated = deleteStoredCategory(deleteCatTarget.id);
    setCategories(updated);
    triggerToast(`Category "${deleteCatTarget.name}" deleted successfully!`);
    setDeleteCatTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Delete Content Modal */}
      {deleteContentTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[3px] shadow-xl max-w-sm w-full p-5 border border-gray-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-[15px] font-semibold text-gray-800">
                Delete Content
              </h3>
            </div>
            <p className="text-xs text-gray-600 mb-5 leading-relaxed">
              Are you sure you want to delete{" "}
              <strong>"{deleteContentTarget.title}"</strong>?
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteContentTarget(null)}
                className="px-3.5 py-1.5 text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[3px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteContent}
                className="px-3.5 py-1.5 text-xs text-white bg-[#dd4b39] hover:bg-[#c23321] rounded-[3px] font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Modal */}
      {deleteCatTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[3px] shadow-xl max-w-sm w-full p-5 border border-gray-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-[15px] font-semibold text-gray-800">
                Delete Category
              </h3>
            </div>
            <p className="text-xs text-gray-600 mb-5 leading-relaxed">
              Are you sure you want to delete category{" "}
              <strong>"{deleteCatTarget.name}"</strong>?
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteCatTarget(null)}
                className="px-3.5 py-1.5 text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[3px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteCategory}
                className="px-3.5 py-1.5 text-xs text-white bg-[#dd4b39] hover:bg-[#c23321] rounded-[3px] font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP: KNOWLEDGE BASE HEADER & LANGUAGE DROPDOWN (Screenshot 2) */}
      <h1 className="text-[18px] font-normal text-[#333333]">
        Knowledge Base
      </h1>

      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
          Language
        </label>
        <div className="relative max-w-full">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
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

      {/* CARD 1: CONTENTS (Screenshot 2) */}
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-5 shadow-[0_1px_1px_rgba(0,0,0,0.05)]" ref={contentDropdownRef}>
        <h2 className="text-[16px] font-normal text-[#333333] pb-3 border-b border-[#f4f4f4] mb-4">
          Contents
        </h2>

        {/* Top Controls: Show & Search + Add Content */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-[13px]">
          {/* Left: Show */}
          <div className="flex items-center gap-2">
            <span className="text-[#555]">Show</span>
            <div className="relative">
              <select
                value={contentPageSize}
                onChange={(e) => {
                  setContentPageSize(Number(e.target.value));
                  setContentCurrentPage(1);
                }}
                className="bg-white border border-[#d2d6de] text-[13px] text-[#444] px-2.5 py-1.5 rounded-[3px] appearance-none pr-7 focus:outline-none focus:border-[#0073b7]"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Right: Search & + Add Content */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[#555]">Search:</span>
              <input
                type="text"
                value={contentSearch}
                onChange={(e) => setContentSearch(e.target.value)}
                className="border border-[#d2d6de] rounded-[3px] px-2.5 py-1 text-[13px] text-[#444] focus:outline-none focus:border-[#0073b7] min-w-[150px]"
              />
            </div>
            <Link
              href="/admin/admin-panel/help-center/knowledge-base/add-content"
              className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-normal rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Content</span>
            </Link>
          </div>
        </div>

        {/* Contents Table (Screenshot 2: Id | Title | Language | Category | Date | Options) */}
        <div className="overflow-x-auto border-t border-gray-100">
          <table className="w-full text-left text-[13px] text-[#333333]">
            <thead>
              <tr className="border-b border-[#f4f4f4] text-[#444] font-semibold text-[13px]">
                <th className="py-2.5 px-3 w-14">Id</th>
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3 w-28">Language</th>
                <th className="py-2.5 px-3 w-44">Category</th>
                <th className="py-2.5 px-3 w-44">Date</th>
                <th className="py-2.5 px-3 w-36 text-right sm:text-left">Options</th>
              </tr>
            </thead>
            <tbody>
              {displayedContents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-xs">
                    No contents found
                  </td>
                </tr>
              ) : (
                displayedContents.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f4f4f4] hover:bg-[#fcfcfc] transition-colors"
                  >
                    <td className="py-2.5 px-3 text-[#555]">{item.id}</td>
                    <td className="py-2.5 px-3 text-[#333] font-normal">
                      {item.title}
                    </td>
                    <td className="py-2.5 px-3 text-[#555]">{item.language}</td>
                    <td className="py-2.5 px-3 text-[#555]">{item.category}</td>
                    <td className="py-2.5 px-3 text-[#555] text-xs">{item.date}</td>
                    <td className="py-2.5 px-3 text-right sm:text-left">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenContentDropdownId(
                              openContentDropdownId === item.id ? null : item.id
                            )
                          }
                          className="bg-[#605ca8] hover:bg-[#545096] text-white text-[12px] px-3 py-1.5 rounded-[3px] inline-flex items-center gap-2 font-normal transition-colors cursor-pointer focus:outline-none"
                        >
                          <span>Select an option</span>
                          <span className="text-[9px] leading-none">▼</span>
                        </button>

                        {openContentDropdownId === item.id && (
                          <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-[3px] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                            <Link
                              href={`/admin/admin-panel/help-center/knowledge-base/edit-content/${item.slug}`}
                              onClick={() => setOpenContentDropdownId(null)}
                              className="w-full text-left px-3.5 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5 text-gray-500" />
                              <span>Edit</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setOpenContentDropdownId(null);
                                setDeleteContentTarget(item);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-[12px] text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination on bottom right */}
        <div className="mt-4 flex justify-end">
          <div className="flex items-center gap-1 select-none">
            <button
              type="button"
              disabled={contentCurrentPage === 1}
              onClick={() => setContentCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-2.5 py-1 text-xs border border-[#ddd] bg-white text-[#337ab7] rounded-[3px] disabled:opacity-40 cursor-pointer"
            >
              &lt;
            </button>
            <span className="px-3 py-1 text-xs bg-[#337ab7] text-white border border-[#337ab7] rounded-[3px] font-medium">
              {contentCurrentPage}
            </span>
            <button
              type="button"
              disabled={contentCurrentPage >= contentTotalPages}
              onClick={() => setContentCurrentPage((p) => Math.min(p + 1, contentTotalPages))}
              className="px-2.5 py-1 text-xs border border-[#ddd] bg-white text-[#337ab7] rounded-[3px] disabled:opacity-40 cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* CARD 2: CATEGORIES (Screenshot 2) */}
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-5 shadow-[0_1px_1px_rgba(0,0,0,0.05)]" ref={catDropdownRef}>
        <h2 className="text-[16px] font-normal text-[#333333] pb-3 border-b border-[#f4f4f4] mb-4">
          Categories
        </h2>

        {/* Top Controls: Show & Search + Add Category */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-[13px]">
          {/* Left: Show */}
          <div className="flex items-center gap-2">
            <span className="text-[#555]">Show</span>
            <div className="relative">
              <select
                value={catPageSize}
                onChange={(e) => {
                  setCatPageSize(Number(e.target.value));
                  setCatCurrentPage(1);
                }}
                className="bg-white border border-[#d2d6de] text-[13px] text-[#444] px-2.5 py-1.5 rounded-[3px] appearance-none pr-7 focus:outline-none focus:border-[#0073b7]"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Right: Search & + Add Category */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[#555]">Search:</span>
              <input
                type="text"
                value={catSearch}
                onChange={(e) => setCatSearch(e.target.value)}
                className="border border-[#d2d6de] rounded-[3px] px-2.5 py-1 text-[13px] text-[#444] focus:outline-none focus:border-[#0073b7] min-w-[150px]"
              />
            </div>
            <Link
              href="/admin/admin-panel/help-center/knowledge-base/add-category"
              className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-normal rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </Link>
          </div>
        </div>

        {/* Categories Table (Screenshot 2: Id | Title | Language | Options) */}
        <div className="overflow-x-auto border-t border-gray-100">
          <table className="w-full text-left text-[13px] text-[#333333]">
            <thead>
              <tr className="border-b border-[#f4f4f4] text-[#444] font-semibold text-[13px]">
                <th className="py-2.5 px-3 w-16">Id</th>
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3 w-36">Language</th>
                <th className="py-2.5 px-3 w-40 text-right sm:text-left">Options</th>
              </tr>
            </thead>
            <tbody>
              {displayedCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500 text-xs">
                    No categories found
                  </td>
                </tr>
              ) : (
                displayedCategories.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f4f4f4] hover:bg-[#fcfcfc] transition-colors"
                  >
                    <td className="py-2.5 px-3 text-[#555]">{item.id}</td>
                    <td className="py-2.5 px-3 text-[#333] font-normal">
                      {item.name}
                    </td>
                    <td className="py-2.5 px-3 text-[#555]">{item.language}</td>
                    <td className="py-2.5 px-3 text-right sm:text-left">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenCatDropdownId(
                              openCatDropdownId === item.id ? null : item.id
                            )
                          }
                          className="bg-[#605ca8] hover:bg-[#545096] text-white text-[12px] px-3 py-1.5 rounded-[3px] inline-flex items-center gap-2 font-normal transition-colors cursor-pointer focus:outline-none"
                        >
                          <span>Select an option</span>
                          <span className="text-[9px] leading-none">▼</span>
                        </button>

                        {openCatDropdownId === item.id && (
                          <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-[3px] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                            <Link
                              href={`/admin/admin-panel/help-center/knowledge-base/edit-category/${item.slug}`}
                              onClick={() => setOpenCatDropdownId(null)}
                              className="w-full text-left px-3.5 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5 text-gray-500" />
                              <span>Edit</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setOpenCatDropdownId(null);
                                setDeleteCatTarget(item);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-[12px] text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination on bottom right */}
        <div className="mt-4 flex justify-end">
          <div className="flex items-center gap-1 select-none">
            <button
              type="button"
              disabled={catCurrentPage === 1}
              onClick={() => setCatCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-2.5 py-1 text-xs border border-[#ddd] bg-white text-[#337ab7] rounded-[3px] disabled:opacity-40 cursor-pointer"
            >
              &lt;
            </button>
            <span className="px-3 py-1 text-xs bg-[#337ab7] text-white border border-[#337ab7] rounded-[3px] font-medium">
              {catCurrentPage}
            </span>
            <button
              type="button"
              disabled={catCurrentPage >= catTotalPages}
              onClick={() => setCatCurrentPage((p) => Math.min(p + 1, catTotalPages))}
              className="px-2.5 py-1 text-xs border border-[#ddd] bg-white text-[#337ab7] rounded-[3px] disabled:opacity-40 cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
