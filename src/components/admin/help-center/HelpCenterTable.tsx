"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Plus, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";
import HelpCenterRowOptions from "./HelpCenterRowOptions";
import { HelpArticle } from "./types";
import {
  HELP_CATEGORIES,
  getStoredArticles,
  bulkUpdateArticlesStatus,
  deleteStoredArticle,
} from "./helpCenterData";

export default function HelpCenterTable() {
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [appliedCategoryFilter, setAppliedCategoryFilter] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    title: string;
  } | null>(null);

  useEffect(() => {
    setArticles(getStoredArticles());
  }, []);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter handler
  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchInput.trim());
    setAppliedCategoryFilter(selectedCategoryFilter);
    setCurrentPage(1);
  };

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchCategory =
        appliedCategoryFilter === "All" || a.category === appliedCategoryFilter;
      if (!matchCategory) return false;

      if (!appliedSearch) return true;
      const query = appliedSearch.toLowerCase();
      return (
        a.title.toLowerCase().includes(query) ||
        a.slug.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query)
      );
    });
  }, [articles, appliedCategoryFilter, appliedSearch]);

  // Pagination calculation
  const totalItems = filteredArticles.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + pageSize);

  // Bulk actions
  const handleActivateAll = () => {
    const updated = bulkUpdateArticlesStatus("Active");
    setArticles(updated);
    triggerToast("All articles have been activated!");
  };

  const handleInactivateAll = () => {
    const updated = bulkUpdateArticlesStatus("Inactive");
    setArticles(updated);
    triggerToast("All articles have been inactivated!");
  };

  // Confirm delete
  const confirmDelete = () => {
    if (!deleteTarget) return;
    const updated = deleteStoredArticle(deleteTarget.id);
    setArticles(updated);
    triggerToast(`Article "${deleteTarget.title}" deleted successfully!`);
    setDeleteTarget(null);
  };

  // Generate pagination pages
  const paginationPages = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  return (
    <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[3px] shadow-xl max-w-sm w-full p-5 border border-gray-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-[15px] font-semibold text-gray-800">
                Delete Article
              </h3>
            </div>
            <p className="text-xs text-gray-600 mb-5 leading-relaxed">
              Are you sure you want to delete{" "}
              <strong>"{deleteTarget.title}"</strong>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[3px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-3.5 py-1.5 text-xs text-white bg-[#dd4b39] hover:bg-[#c23321] rounded-[3px] font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP HEADER & TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f4f4f4]">
        <div className="flex items-center gap-4">
          <h1 className="text-[18px] font-normal text-[#333333]">Help Center</h1>
          <div className="flex items-center text-[12px] bg-gray-100 p-0.5 rounded-[3px]">
            <span className="px-3 py-1 font-semibold text-white bg-[#0073b7] rounded-[2px] shadow-2xs">
              Knowledge Base
            </span>
            <Link
              href="/admin/admin-panel/help-center/tickets"
              className="px-3 py-1 text-gray-600 hover:text-black rounded-[2px] transition-colors"
            >
              Support Tickets
            </Link>
          </div>
        </div>
        <Link
          href="/admin/admin-panel/help-center/add"
          className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-normal rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Article</span>
        </Link>
      </div>

      {/* FILTER TOOLBAR (Matches Modesy UI) */}
      <form onSubmit={handleApplyFilter} className="py-4 flex flex-wrap items-end gap-4 text-[13px]">
        {/* Show */}
        <div>
          <label className="block text-[12px] text-[#444444] font-medium mb-1">
            Show
          </label>
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-1.5 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] min-w-[70px]"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={100}>100</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-[12px] text-[#444444] font-medium mb-1">
            Category
          </label>
          <div className="relative">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-1.5 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] min-w-[160px]"
            >
              <option value="All">All Categories</option>
              {HELP_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Search */}
        <div>
          <label className="block text-[12px] text-[#444444] font-medium mb-1">
            Search
          </label>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search"
            className="border border-[#d2d6de] rounded-[3px] px-3 py-1.5 text-[13px] text-[#444] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] min-w-[180px]"
          />
        </div>

        {/* Filter button */}
        <div>
          <button
            type="submit"
            className="px-4 py-1.5 bg-[#605ca8] hover:bg-[#545096] text-white text-[13px] font-normal rounded-[3px] shadow-2xs transition-colors cursor-pointer"
          >
            Filter
          </button>
        </div>
      </form>

      {/* TABLE */}
      <div className="overflow-x-auto border-t border-gray-100">
        <table className="w-full text-left text-[13px] text-[#333333]">
          <thead>
            <tr className="border-b border-[#f4f4f4] text-[#444] font-semibold text-[13px]">
              <th className="py-2.5 px-3 w-14">Id</th>
              <th className="py-2.5 px-3">Title</th>
              <th className="py-2.5 px-3 w-44">Category</th>
              <th className="py-2.5 px-3 w-20">Order</th>
              <th className="py-2.5 px-3 w-28">Status</th>
              <th className="py-2.5 px-3 w-36 text-right sm:text-left">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentArticles.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500 text-xs">
                  No records found
                </td>
              </tr>
            ) : (
              currentArticles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-[#f4f4f4] hover:bg-[#fcfcfc] transition-colors"
                >
                  <td className="py-2.5 px-3 text-[#555]">{article.id}</td>
                  <td className="py-2.5 px-3 font-normal text-[#333]">
                    <div className="font-medium">{article.title}</div>
                    <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                      slug: {article.slug}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-gray-600 text-xs">
                    {article.category}
                  </td>
                  <td className="py-2.5 px-3 text-[#555]">{article.order}</td>
                  <td className="py-2.5 px-3">
                    {article.status === "Active" ? (
                      <span className="inline-block bg-[#00a65a] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-[3px]">
                        Active
                      </span>
                    ) : (
                      <span className="inline-block bg-[#dd4b39] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-[3px]">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right sm:text-left">
                    <HelpCenterRowOptions
                      article={article}
                      onDelete={(id, title) => setDeleteTarget({ id, title })}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER: BULK ACTIONS & PAGINATION */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Bulk Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleInactivateAll}
            className="px-3 py-1.5 bg-[#dd4b39] hover:bg-[#c23321] text-white text-[12px] font-normal rounded-[3px] shadow-2xs transition-colors cursor-pointer"
          >
            Inactivate All
          </button>
          <button
            type="button"
            onClick={handleActivateAll}
            className="px-3 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[12px] font-normal rounded-[3px] shadow-2xs transition-colors cursor-pointer"
          >
            Activate All
          </button>
        </div>

        {/* Right: Modesy Style Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1 select-none">
            {paginationPages.map((page) => {
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[32px] h-8 px-2.5 text-xs font-medium rounded-[3px] flex items-center justify-center transition-colors cursor-pointer border ${
                    isActive
                      ? "bg-[#337ab7] border-[#337ab7] text-white"
                      : "bg-white border-[#ddd] text-[#337ab7] hover:bg-[#eee]"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            {currentPage < totalPages && (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="min-w-[32px] h-8 px-2 text-xs font-medium rounded-[3px] flex items-center justify-center bg-white border border-[#ddd] text-[#337ab7] hover:bg-[#eee] cursor-pointer"
                >
                  &gt;
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(totalPages)}
                  className="min-w-[32px] h-8 px-2 text-xs font-medium rounded-[3px] flex items-center justify-center bg-white border border-[#ddd] text-[#337ab7] hover:bg-[#eee] cursor-pointer"
                >
                  &raquo;
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
