"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ChevronDown,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  Mail,
  Plus,
} from "lucide-react";
import { ContactMessageItem } from "./types";
import {
  getStoredContactMessages,
  deleteStoredContactMessage,
  saveStoredContactMessages,
  seedDemoContactMessages,
} from "./contactMessagesData";

export default function ContactMessagesTable() {
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sort state: field and direction ('asc' | 'desc')
  const [sortField, setSortField] = useState<keyof ContactMessageItem>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Options dropdown state
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [viewMessage, setViewMessage] = useState<ContactMessageItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessageItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(getStoredContactMessages());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle sort field and direction (asc <-> desc)
  const handleSort = (field: keyof ContactMessageItem) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleLoadDemo = () => {
    const demo = seedDemoContactMessages();
    setMessages(demo);
    triggerToast("Sample contact messages loaded for testing sort!");
  };

  const handleClearAll = () => {
    saveStoredContactMessages([]);
    setMessages([]);
    triggerToast("All messages cleared!");
  };

  // Filter & Sort
  const filteredMessages = useMemo(() => {
    let result = [...messages];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.message.toLowerCase().includes(q) ||
          m.id.toString().includes(q) ||
          m.date.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      // 1. Numerical ID Sort
      if (sortField === "id") {
        return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
      }

      // 2. Date Sort (chronological)
      if (sortField === "date") {
        const cleanA = a.date.replace(" / ", " ");
        const cleanB = b.date.replace(" / ", " ");
        const timeA = new Date(cleanA).getTime();
        const timeB = new Date(cleanB).getTime();
        if (!isNaN(timeA) && !isNaN(timeB)) {
          return sortDirection === "asc" ? timeA - timeB : timeB - timeA;
        }
      }

      // 3. String Sort (name, email, message)
      const aVal = String(a[sortField] || "").toLowerCase();
      const bVal = String(b[sortField] || "").toLowerCase();
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

    return result;
  }, [messages, searchQuery, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredMessages.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const displayedMessages = filteredMessages.slice(
    startIndex,
    startIndex + pageSize
  );

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const updated = deleteStoredContactMessage(deleteTarget.id);
    setMessages(updated);
    triggerToast(`Message #${deleteTarget.id} deleted successfully!`);
    setDeleteTarget(null);
  };

  // Visual double-triangle sort indicator (Active direction turns dark, inactive is muted)
  const renderSortIndicator = (field: keyof ContactMessageItem) => {
    const isActive = sortField === field;
    const isAsc = isActive && sortDirection === "asc";
    const isDesc = isActive && sortDirection === "desc";

    return (
      <span className="inline-flex flex-col items-center justify-center ml-1.5 text-[8px] leading-[6px] select-none shrink-0">
        <span
          className={`transition-colors duration-150 ${
            isAsc ? "text-[#111111] font-black" : "text-[#c2c5c9]"
          }`}
        >
          ▲
        </span>
        <span
          className={`transition-colors duration-150 mt-[1px] ${
            isDesc ? "text-[#111111] font-black" : "text-[#c2c5c9]"
          }`}
        >
          ▼
        </span>
      </span>
    );
  };

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
                Delete Message
              </h3>
            </div>
            <p className="text-xs text-gray-600 mb-5 leading-relaxed">
              Are you sure you want to delete message from{" "}
              <strong>"{deleteTarget.name}"</strong>?
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

      {/* View Message Modal */}
      {viewMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[3px] shadow-xl max-w-lg w-full p-6 border border-gray-200">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#0073b7]" />
                <h3 className="text-[16px] font-medium text-gray-800">
                  Contact Message #{viewMessage.id}
                </h3>
              </div>
              <button
                onClick={() => setViewMessage(null)}
                className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-[13px]">
              <div>
                <span className="font-semibold text-gray-700">From: </span>
                <span className="text-gray-900">{viewMessage.name}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Email: </span>
                <span className="text-blue-600">{viewMessage.email}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Date: </span>
                <span className="text-gray-500">{viewMessage.date}</span>
              </div>
              <div className="border-t pt-3">
                <div className="font-semibold text-gray-700 mb-1.5">
                  Message:
                </div>
                <div className="bg-[#f9fafb] p-3.5 rounded border border-gray-200 text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {viewMessage.message}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5 pt-3 border-t">
              <button
                type="button"
                onClick={() => setViewMessage(null)}
                className="px-4 py-1.5 text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[3px] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER (Screenshot: "Contact Messages") */}
      <div className="flex items-center justify-between pb-1 mb-3">
        <h1 className="text-[18px] font-normal text-[#333333]">
          Contact Messages
        </h1>
        {/* Subtle quick test buttons */}
        <div className="flex items-center gap-2 text-xs">
          {messages.length === 0 ? (
            <button
              type="button"
              onClick={handleLoadDemo}
              className="text-[#0073b7] hover:underline text-[12px] cursor-pointer flex items-center gap-1"
              title="Click to populate demo messages to test asc/desc sorting"
            >
              <Plus className="w-3 h-3" />
              <span>Load sample messages</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-gray-400 hover:text-red-500 text-[11px] cursor-pointer"
            >
              Clear to empty
            </button>
          )}
        </div>
      </div>

      {/* CONTROLS ROW: Show [ 15 ▼ ] on left, Search: [   ] on right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-[13px]">
        {/* Left: Show */}
        <div className="flex items-center gap-2">
          <span className="text-[#555]">Show</span>
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-[#d2d6de] text-[13px] text-[#444] px-2.5 py-1.5 rounded-[3px] appearance-none pr-7 focus:outline-none focus:border-[#0073b7]"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={100}>100</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Right: Search */}
        <div className="flex items-center gap-2">
          <span className="text-[#555]">Search:</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-[#d2d6de] rounded-[3px] px-2.5 py-1 text-[13px] text-[#444] focus:outline-none focus:border-[#0073b7] min-w-[150px]"
          />
        </div>
      </div>

      {/* TABLE WITH ASC / DESC SORTABLE HEADERS */}
      <div className="overflow-x-auto border-t border-gray-100" ref={dropdownRef}>
        <table className="w-full text-left text-[13px] text-[#333333]">
          <thead>
            <tr className="border-b border-[#f4f4f4] text-[#444] font-semibold text-[13px]">
              {/* Id */}
              <th
                onClick={() => handleSort("id")}
                className={`py-2.5 px-3 w-16 cursor-pointer select-none transition-colors hover:bg-gray-50 ${
                  sortField === "id" ? "text-gray-900 bg-gray-50/50" : ""
                }`}
                title={`Sort by Id (${
                  sortField === "id" && sortDirection === "asc"
                    ? "click for descending"
                    : "click for ascending"
                })`}
              >
                <div className="flex items-center justify-between">
                  <span>Id</span>
                  {renderSortIndicator("id")}
                </div>
              </th>

              {/* Name */}
              <th
                onClick={() => handleSort("name")}
                className={`py-2.5 px-3 w-52 cursor-pointer select-none transition-colors hover:bg-gray-50 ${
                  sortField === "name" ? "text-gray-900 bg-gray-50/50" : ""
                }`}
                title={`Sort by Name (${
                  sortField === "name" && sortDirection === "asc"
                    ? "click for descending"
                    : "click for ascending"
                })`}
              >
                <div className="flex items-center justify-between">
                  <span>Name</span>
                  {renderSortIndicator("name")}
                </div>
              </th>

              {/* Email */}
              <th
                onClick={() => handleSort("email")}
                className={`py-2.5 px-3 w-56 cursor-pointer select-none transition-colors hover:bg-gray-50 ${
                  sortField === "email" ? "text-gray-900 bg-gray-50/50" : ""
                }`}
                title={`Sort by Email (${
                  sortField === "email" && sortDirection === "asc"
                    ? "click for descending"
                    : "click for ascending"
                })`}
              >
                <div className="flex items-center justify-between">
                  <span>Email</span>
                  {renderSortIndicator("email")}
                </div>
              </th>

              {/* Message */}
              <th
                onClick={() => handleSort("message")}
                className={`py-2.5 px-3 cursor-pointer select-none transition-colors hover:bg-gray-50 ${
                  sortField === "message" ? "text-gray-900 bg-gray-50/50" : ""
                }`}
                title={`Sort by Message (${
                  sortField === "message" && sortDirection === "asc"
                    ? "click for descending"
                    : "click for ascending"
                })`}
              >
                <div className="flex items-center justify-between">
                  <span>Message</span>
                  {renderSortIndicator("message")}
                </div>
              </th>

              {/* Date */}
              <th
                onClick={() => handleSort("date")}
                className={`py-2.5 px-3 w-44 cursor-pointer select-none transition-colors hover:bg-gray-50 ${
                  sortField === "date" ? "text-gray-900 bg-gray-50/50" : ""
                }`}
                title={`Sort by Date (${
                  sortField === "date" && sortDirection === "asc"
                    ? "click for descending"
                    : "click for ascending"
                })`}
              >
                <div className="flex items-center justify-between">
                  <span>Date</span>
                  {renderSortIndicator("date")}
                </div>
              </th>

              {/* Options */}
              <th className="py-2.5 px-3 w-36 text-right sm:text-left select-none">
                <div className="flex items-center justify-between">
                  <span>Options</span>
                  <span className="inline-flex flex-col items-center justify-center ml-1.5 text-[8px] leading-[6px] text-[#c2c5c9] select-none">
                    <span>▲</span>
                    <span className="mt-[1px]">▼</span>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedMessages.length === 0 ? (
              /* Exact Empty State from Screenshot: "No records found!" centered */
              <tr>
                <td
                  colSpan={6}
                  className="py-4 text-center text-[13px] text-[#555] bg-[#f9f9f9]"
                >
                  No records found!
                </td>
              </tr>
            ) : (
              displayedMessages.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#f4f4f4] hover:bg-[#fcfcfc] transition-colors"
                >
                  <td className="py-2.5 px-3 text-[#555] font-normal">
                    {item.id}
                  </td>
                  <td className="py-2.5 px-3 text-[#333] font-normal">
                    {item.name}
                  </td>
                  <td className="py-2.5 px-3 text-[#555]">{item.email}</td>
                  <td className="py-2.5 px-3 text-[#555] max-w-xs truncate">
                    {item.message}
                  </td>
                  <td className="py-2.5 px-3 text-[#555] text-xs">
                    {item.date}
                  </td>
                  <td className="py-2.5 px-3 text-right sm:text-left">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === item.id ? null : item.id
                          )
                        }
                        className="bg-[#605ca8] hover:bg-[#545096] text-white text-[12px] px-3 py-1.5 rounded-[3px] inline-flex items-center gap-2 font-normal transition-colors cursor-pointer focus:outline-none shadow-2xs"
                      >
                        <span>Select an option</span>
                        <span className="text-[9px] leading-none">▼</span>
                      </button>

                      {openDropdownId === item.id && (
                        <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-[3px] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                          <button
                            type="button"
                            onClick={() => {
                              setOpenDropdownId(null);
                              setViewMessage(item);
                            }}
                            className="w-full text-left px-3.5 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-gray-500" />
                            <span>View</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOpenDropdownId(null);
                              setDeleteTarget(item);
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

      {/* PAGINATION CONTROLS ON BOTTOM RIGHT (Exact "<" and ">" from screenshot) */}
      <div className="mt-4 flex justify-end">
        <div className="inline-flex items-center -space-x-px select-none">
          <button
            type="button"
            disabled={currentPage <= 1 || displayedMessages.length === 0}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1.5 text-[12px] border border-[#ddd] bg-white text-[#777] rounded-l-[3px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
          >
            &lt;
          </button>
          <button
            type="button"
            disabled={
              currentPage >= totalPages || displayedMessages.length === 0
            }
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1.5 text-[12px] border border-[#ddd] bg-white text-[#777] rounded-r-[3px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
