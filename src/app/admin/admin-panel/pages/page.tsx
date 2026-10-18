"use client";

import React, { useState, useMemo } from "react";
import PagesHeader from "@/components/admin/pages/PagesHeader";
import PagesToolbar from "@/components/admin/pages/PagesToolbar";
import PagesTable from "@/components/admin/pages/PagesTable";
import PagesPagination from "@/components/admin/pages/PagesPagination";
import { INITIAL_CMS_PAGES } from "@/components/admin/pages/mockData";
import { CMSPage } from "@/components/admin/pages/types";

export default function AdminPagesPage() {
  const [pagesList, setPagesList] = useState<CMSPage[]>(INITIAL_CMS_PAGES);
  const [pageSize, setPageSize] = useState<number>(15);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter pages by language and search query
  const filteredPages = useMemo(() => {
    return pagesList.filter((page) => {
      const matchesLang =
        selectedLanguage === "All" ||
        page.language.toLowerCase() === selectedLanguage.toLowerCase();
      const matchesSearch =
        !searchTerm.trim() ||
        page.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        page.location.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        page.id.toString().includes(searchTerm.trim());
      return matchesLang && matchesSearch;
    });
  }, [pagesList, selectedLanguage, searchTerm]);

  // Paginate pages
  const paginatedPages = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredPages.slice(startIndex, startIndex + pageSize);
  }, [filteredPages, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredPages.length / pageSize) || 1;

  const handleAddPage = () => {
    const title = window.prompt("Enter Page Title:");
    if (title && title.trim()) {
      const newPage: CMSPage = {
        id: pagesList.length > 0 ? Math.max(...pagesList.map((p) => p.id)) + 1 : 1,
        title: title.trim(),
        language: "English",
        location: "Information",
        isVisible: true,
        pageType: "Custom",
        date: new Date().toISOString().slice(0, 16).replace("T", " / "),
      };
      setPagesList((prev) => [newPage, ...prev]);
    }
  };

  const handleToggleVisibility = (id: number) => {
    setPagesList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isVisible: !p.isVisible } : p))
    );
  };

  const handleEdit = (page: CMSPage) => {
    const newTitle = window.prompt("Edit Page Title:", page.title);
    if (newTitle && newTitle.trim()) {
      setPagesList((prev) =>
        prev.map((p) => (p.id === page.id ? { ...p, title: newTitle.trim() } : p))
      );
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      setPagesList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-4 max-w-[1440px] mx-auto font-sans text-[#333]">
      {/* 1. Header with Add Page Button */}
      <PagesHeader onAddPage={handleAddPage} />

      {/* 2. White Card Container */}
      <div className="bg-white border border-[#d2d6de] rounded-[4px] p-5 shadow-xs">
        {/* Toolbar */}
        <PagesToolbar
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          selectedLanguage={selectedLanguage}
          onLanguageChange={(lang) => {
            setSelectedLanguage(lang);
            setCurrentPage(1);
          }}
          searchTerm={searchTerm}
          onSearchChange={(query) => {
            setSearchTerm(query);
            setCurrentPage(1);
          }}
        />

        {/* Table */}
        <PagesTable
          pages={paginatedPages}
          onToggleVisibility={handleToggleVisibility}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        <PagesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
