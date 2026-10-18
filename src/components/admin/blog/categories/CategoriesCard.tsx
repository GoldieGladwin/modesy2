"use client";

import React, { useState, useMemo } from "react";
import CategoryToolbar from "./CategoryToolbar";
import CategoryTable from "./CategoryTable";
import CategoryPagination from "./CategoryPagination";
import { BlogCategory } from "./types";

interface CategoriesCardProps {
  categories: BlogCategory[];
  onEdit?: (cat: BlogCategory) => void;
  onDelete?: (id: number) => void;
}

export default function CategoriesCard({
  categories,
  onEdit,
  onDelete,
}: CategoriesCardProps) {
  const [pageSize, setPageSize] = useState<number>(15);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter categories by language and search query
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesLang =
        selectedLanguage === "All" || cat.language.toLowerCase() === selectedLanguage.toLowerCase();
      const matchesSearch =
        !searchTerm.trim() ||
        cat.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        cat.id.toString().includes(searchTerm.trim());
      return matchesLang && matchesSearch;
    });
  }, [categories, selectedLanguage, searchTerm]);

  // Paginate
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredCategories.slice(startIndex, startIndex + pageSize);
  }, [filteredCategories, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredCategories.length / pageSize) || 1;

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[4px] shadow-2xs p-5">
      <h2 className="text-[15px] font-semibold text-[#333333] pb-3 border-b border-[#f0f0f0] mb-4">
        Categories
      </h2>

      {/* Toolbar */}
      <CategoryToolbar
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
      <CategoryTable
        categories={paginatedCategories}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      {/* Pagination */}
      <CategoryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
