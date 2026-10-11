"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { AdminTag } from "./types";

interface TagsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tagToEdit: AdminTag | null;
  onSave: (tagData: { id?: number; tag: string; slug: string; language: string }) => void;
}

export default function TagsModal({
  isOpen,
  onClose,
  tagToEdit,
  onSave,
}: TagsModalProps) {
  const [tagName, setTagName] = useState("");
  const [tagSlug, setTagSlug] = useState("");
  const [language, setLanguage] = useState("English");
  const [error, setError] = useState("");

  const isEditing = Boolean(tagToEdit);

  useEffect(() => {
    if (tagToEdit) {
      setTagName(tagToEdit.tag);
      setTagSlug(tagToEdit.slug || generateSlug(tagToEdit.tag));
      setLanguage(tagToEdit.language);
    } else {
      setTagName("");
      setTagSlug("");
      setLanguage("English");
    }
    setError("");
  }, [tagToEdit, isOpen]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTagNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTagName(val);
    if (!isEditing || !tagSlug) {
      setTagSlug(generateSlug(val));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) {
      setError("Tag name is required.");
      return;
    }

    onSave({
      id: tagToEdit?.id,
      tag: tagName.trim(),
      slug: tagSlug.trim() || generateSlug(tagName),
      language,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="bg-white rounded-[4px] shadow-xl w-full max-w-md overflow-hidden border border-gray-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-[#fafafa]">
          <h2 className="text-sm font-bold text-gray-800">
            {isEditing ? "Edit Tag" : "Add Tag"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-[3px] text-xs text-red-600">
              {error}
            </div>
          )}

          {/* Tag Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Tag Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. iPhone 15 Pro Max"
              value={tagName}
              onChange={handleTagNameChange}
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] focus:ring-1 focus:ring-[#00a99d] transition"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Slug
            </label>
            <input
              type="text"
              placeholder="e.g. iphone-15-pro-max"
              value={tagSlug}
              onChange={(e) => setTagSlug(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] focus:ring-1 focus:ring-[#00a99d] transition font-mono text-[11px]"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Language <span className="text-red-500">*</span>
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d] focus:ring-1 focus:ring-[#00a99d] transition cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Indonesian">Indonesian</option>
              <option value="Arabic">Arabic</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-3.5 py-1.5 text-xs font-medium rounded-[3px] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#00a99d] hover:bg-[#008f85] text-white px-4 py-1.5 text-xs font-semibold rounded-[3px] shadow-xs transition cursor-pointer"
            >
              {isEditing ? "Save Changes" : "Add Tag"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
