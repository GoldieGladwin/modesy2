"use client";

import React, { useState } from "react";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ChevronDown,
  Trash2,
  Clock,
  Check,
} from "lucide-react";

interface BlogComment {
  id: number;
  name: string;
  email: string;
  comment: string;
  url: string;
  urlText: string;
  ipAddress: string;
  date: string;
  time: string;
  status: "pending" | "approved";
}

export default function PendingBlogCommentsPage() {
  const [viewMode, setViewMode] = useState<"pending" | "approved">("pending");
  const [entriesPerPage, setEntriesPerPage] = useState("15");
  const [searchQuery, setSearchQuery] = useState("");

  const [pendingComments, setPendingComments] = useState<BlogComment[]>([]);
  const [approvedComments, setApprovedComments] = useState<BlogComment[]>([]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const activeComments =
    viewMode === "pending" ? pendingComments : approvedComments;

  const filteredComments = activeComments.filter((c) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.comment.toLowerCase().includes(query) ||
      c.urlText.toLowerCase().includes(query) ||
      c.ipAddress.toLowerCase().includes(query)
    );
  });

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "pending" ? "approved" : "pending"));
    setSelectedIds([]);
    setOpenDropdownId(null);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredComments.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApprove = (id: number) => {
    const target = pendingComments.find((c) => c.id === id);
    if (target) {
      setPendingComments((prev) => prev.filter((c) => c.id !== id));
      setApprovedComments((prev) => [
        { ...target, status: "approved" },
        ...prev,
      ]);
    }
    setOpenDropdownId(null);
  };

  const handleMoveToPending = (id: number) => {
    const target = approvedComments.find((c) => c.id === id);
    if (target) {
      setApprovedComments((prev) => prev.filter((c) => c.id !== id));
      setPendingComments((prev) => [
        { ...target, status: "pending" },
        ...prev,
      ]);
    }
    setOpenDropdownId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      if (viewMode === "pending") {
        setPendingComments((prev) => prev.filter((c) => c.id !== id));
      } else {
        setApprovedComments((prev) => prev.filter((c) => c.id !== id));
      }
      setOpenDropdownId(null);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Page Title */}
      <h1 className="text-xl font-normal text-[#333333]">Blog Comments</h1>

      {/* Main Card Container */}
      <div className="bg-white border border-[#e4e6eb] rounded-sm shadow-xs">
        {/* Card Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e4e6eb]">
          <h2 className="text-base font-semibold text-[#333333]">
            {viewMode === "pending" ? "Pending Comments" : "Approved Comments"}
          </h2>

          {/* Toggle Button: In pending view shows 'Approved Comments', in approved view shows 'Pending Comments' */}
          <button
            type="button"
            onClick={toggleViewMode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-normal rounded-sm transition-colors shadow-xs cursor-pointer"
          >
            <Menu className="w-3.5 h-3.5" />
            <span>
              {viewMode === "pending"
                ? "Approved Comments"
                : "Pending Comments"}
            </span>
          </button>
        </div>

        {/* Filter Controls (Show entries & Search) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 pt-4 pb-3 text-xs text-[#333333]">
          {/* Left: Show Entries */}
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(e.target.value)}
              className="border border-[#cccccc] rounded-xs px-2.5 py-1 text-xs text-[#333333] bg-white focus:outline-hidden focus:border-[#17a2b8] cursor-pointer"
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="100">100</option>
            </select>
            <span>entries</span>
          </div>

          {/* Right: Search */}
          <div className="flex items-center gap-2">
            <span>Search:</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-[#cccccc] rounded-xs px-2.5 py-1 text-xs text-[#333333] w-48 sm:w-56 focus:outline-hidden focus:border-[#17a2b8]"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto px-5 pb-3">
          <table className="w-full text-left text-xs border border-[#e4e6eb] border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-[#e4e6eb] text-[#333333]">
                <th className="w-10 px-3 py-2.5 text-center border-r border-[#e4e6eb]">
                  <input
                    type="checkbox"
                    checked={
                      filteredComments.length > 0 &&
                      selectedIds.length === filteredComments.length
                    }
                    onChange={handleSelectAll}
                    disabled={filteredComments.length === 0}
                    className="w-4 h-4 rounded border-gray-300 text-[#17a2b8] focus:ring-0 cursor-pointer align-middle"
                  />
                </th>
                <th className="px-3 py-2.5 font-bold border-r border-[#e4e6eb] whitespace-nowrap cursor-pointer select-none">
                  <div className="flex items-center justify-between gap-2">
                    <span>Id</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-300 inline" />
                  </div>
                </th>
                <th className="px-3 py-2.5 font-bold border-r border-[#e4e6eb] whitespace-nowrap cursor-pointer select-none">
                  <div className="flex items-center justify-between gap-2">
                    <span>Name</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-300 inline" />
                  </div>
                </th>
                <th className="px-3 py-2.5 font-bold border-r border-[#e4e6eb] whitespace-nowrap cursor-pointer select-none">
                  <div className="flex items-center justify-between gap-2">
                    <span>Email</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-300 inline" />
                  </div>
                </th>
                <th className="px-3 py-2.5 font-bold border-r border-[#e4e6eb] cursor-pointer select-none">
                  <div className="flex items-center justify-between gap-2">
                    <span>Comment</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-300 inline" />
                  </div>
                </th>
                <th className="px-3 py-2.5 font-bold border-r border-[#e4e6eb] cursor-pointer select-none">
                  <div className="flex items-center justify-between gap-2">
                    <span>URL</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-300 inline" />
                  </div>
                </th>
                <th className="px-3 py-2.5 font-bold border-r border-[#e4e6eb] whitespace-nowrap cursor-pointer select-none">
                  <div className="flex items-center justify-between gap-2">
                    <span>Ip Address</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-300 inline" />
                  </div>
                </th>
                <th className="px-3 py-2.5 font-bold border-r border-[#e4e6eb] whitespace-nowrap cursor-pointer select-none">
                  <div className="flex items-center justify-between gap-2">
                    <span>Date</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-300 inline" />
                  </div>
                </th>
                <th className="px-3 py-2.5 font-bold text-center whitespace-nowrap w-36 cursor-pointer select-none">
                  <div className="flex items-center justify-center gap-2">
                    <span>Options</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-300 inline" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.length > 0 ? (
                filteredComments.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e4e6eb] hover:bg-gray-50/50 text-[#444444]"
                  >
                    <td className="px-3 py-3 text-center border-r border-[#e4e6eb]">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleSelectRow(item.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#17a2b8] focus:ring-0 cursor-pointer align-middle"
                      />
                    </td>
                    <td className="px-3 py-3 border-r border-[#e4e6eb] whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="px-3 py-3 border-r border-[#e4e6eb] whitespace-nowrap font-normal">
                      {item.name}
                    </td>
                    <td className="px-3 py-3 border-r border-[#e4e6eb] whitespace-nowrap text-gray-600">
                      {item.email}
                    </td>
                    <td className="px-3 py-3 border-r border-[#e4e6eb] text-gray-700">
                      {item.comment}
                    </td>
                    <td className="px-3 py-3 border-r border-[#e4e6eb]">
                      <a
                        href={item.url}
                        className="text-[#007bff] hover:underline hover:text-[#0056b3] font-normal"
                      >
                        {item.urlText}
                      </a>
                    </td>
                    <td className="px-3 py-3 border-r border-[#e4e6eb] whitespace-nowrap text-gray-600">
                      {item.ipAddress}
                    </td>
                    <td className="px-3 py-3 border-r border-[#e4e6eb] whitespace-nowrap text-gray-600 leading-tight">
                      <div>{item.date} /</div>
                      <div>{item.time}</div>
                    </td>
                    <td className="px-3 py-3 text-center relative">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdownId(
                              openDropdownId === item.id ? null : item.id
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6f42c1] hover:bg-[#5a32a3] text-white text-xs font-normal rounded-sm transition-colors cursor-pointer"
                        >
                          <span>Select an option</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>

                        {/* Options Dropdown Menu */}
                        {openDropdownId === item.id && (
                          <div className="absolute right-0 mt-1 w-40 bg-white border border-[#e4e6eb] rounded-sm shadow-md z-20 py-1 text-left text-xs">
                            {viewMode === "pending" ? (
                              <button
                                onClick={() => handleApprove(item.id)}
                                className="w-full px-3 py-1.5 text-left text-[#333333] hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5 text-green-600" />
                                <span>Approve</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleMoveToPending(item.id)}
                                className="w-full px-3 py-1.5 text-left text-[#333333] hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                              >
                                <Clock className="w-3.5 h-3.5 text-amber-500" />
                                <span>Move to Pending</span>
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="w-full px-3 py-1.5 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-3 py-4 text-center text-gray-500 bg-white border-b border-[#e4e6eb]"
                  >
                    No records found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Prev / Next Buttons (Right-aligned) */}
        <div className="flex justify-end px-5 py-2">
          <div className="inline-flex items-center border border-[#e4e6eb] rounded-xs bg-[#fdfdfd]">
            <button
              disabled
              className="p-1.5 px-2 text-gray-300 border-r border-[#e4e6eb] cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              disabled
              className="p-1.5 px-2 text-gray-300 cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Datatable Scrollbar / Slider Bar (Full Width Slider with < and > arrows) */}
        <div className="px-5 pb-5 pt-1">
          <div className="flex items-center gap-1.5 w-full">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 shrink-0"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Gray Slider Track and Thumb */}
            <div className="relative flex-1 h-2 bg-[#d1d5db] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#828282] rounded-full transition-all duration-150"
                style={{ width: "95%", marginLeft: "2%" }}
              />
            </div>

            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 shrink-0"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
