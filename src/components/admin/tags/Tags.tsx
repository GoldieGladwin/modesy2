"use client";

import React, { useState, useMemo } from "react";
import { AdminTag } from "./types";
import { initialAdminTags } from "./mockData";
import TagsHeader from "./TagsHeader";
import TagsFilterBar from "./TagsFilterBar";
import TagsTable from "./TagsTable";
import TagsPagination from "./TagsPagination";
import TagsModal from "./TagsModal";

export default function Tags() {
  const [tags, setTags] = useState<AdminTag[]>(initialAdminTags);

  // Filters state
  const [pageSize, setPageSize] = useState<number>(15);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tagToEdit, setTagToEdit] = useState<AdminTag | null>(null);

  // Delete state / toast
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Filter application
  const handleApplyFilter = () => {
    setAppliedSearch(searchInput.trim());
    setCurrentPage(1);
  };

  // Filtered dataset
  const filteredTags = useMemo(() => {
    return tags.filter((item) => {
      // Language filter
      if (selectedLanguage !== "All" && item.language !== selectedLanguage) {
        return false;
      }
      // Search term filter
      if (appliedSearch) {
        const query = appliedSearch.toLowerCase();
        const matchTag = item.tag.toLowerCase().includes(query);
        const matchId = String(item.id).includes(query);
        if (!matchTag && !matchId) {
          return false;
        }
      }
      return true;
    });
  }, [tags, selectedLanguage, appliedSearch]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredTags.length / pageSize) || 1;
  const paginatedTags = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredTags.slice(startIndex, startIndex + pageSize);
  }, [filteredTags, currentPage, pageSize]);

  // Actions
  const handleOpenAdd = () => {
    setTagToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AdminTag) => {
    setTagToEdit(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: AdminTag) => {
    if (confirm(`Are you sure you want to delete tag "${item.tag}"?`)) {
      setTags((prev) => prev.filter((t) => t.id !== item.id));
      showNotification(`Tag "${item.tag}" successfully deleted.`);
    }
  };

  const handleSaveTag = (data: { id?: number; tag: string; slug: string; language: string }) => {
    if (data.id) {
      // Edit existing
      setTags((prev) =>
        prev.map((t) =>
          t.id === data.id
            ? { ...t, tag: data.tag, slug: data.slug, language: data.language }
            : t
        )
      );
      showNotification(`Tag "${data.tag}" successfully updated.`);
    } else {
      // Add new
      const nextId = tags.length > 0 ? Math.max(...tags.map((t) => t.id)) + 1 : 1;
      const newTag: AdminTag = {
        id: nextId,
        tag: data.tag,
        slug: data.slug,
        language: data.language,
        posts: 0,
      };
      setTags((prev) => [newTag, ...prev]);
      showNotification(`Tag "${data.tag}" successfully created.`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-xs">
          <span>{notification}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-[#155724] font-bold text-sm cursor-pointer ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Card (Modesy AdminLTE Box style) */}
      <div className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5">
        {/* Header with Title and Add Tag button */}
        <TagsHeader onAddTag={handleOpenAdd} />

        {/* Toolbar: Show count, Language, Search, Filter */}
        <TagsFilterBar
          pageSize={pageSize}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
          selectedLanguage={selectedLanguage}
          onLanguageChange={(newLang) => {
            setSelectedLanguage(newLang);
            setCurrentPage(1);
          }}
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onApplyFilter={handleApplyFilter}
        />

        {/* Tags Table */}
        <TagsTable
          tags={paginatedTags}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        <TagsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Add / Edit Tag Modal */}
      <TagsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tagToEdit={tagToEdit}
        onSave={handleSaveTag}
      />
    </div>
  );
}
