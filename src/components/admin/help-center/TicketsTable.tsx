"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Trash2, ChevronDown } from "lucide-react";
import { SupportTicket } from "./types";
import {
  getStoredTickets,
  deleteStoredTicket,
} from "./helpCenterData";

export default function TicketsTable() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<SupportTicket | null>(null);

  useEffect(() => {
    setTickets(getStoredTickets());
  }, []);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchInput.trim());
    setCurrentPage(1);
  };

  const filteredTickets = useMemo(() => {
    if (!appliedSearch) return tickets;
    const q = appliedSearch.toLowerCase();
    return tickets.filter(
      (t) =>
        t.ticketNumber.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.userName.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [tickets, appliedSearch]);

  const totalPages = Math.ceil(filteredTickets.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentTickets = filteredTickets.slice(startIndex, startIndex + pageSize);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const updated = deleteStoredTicket(deleteTarget.id);
    setTickets(updated);
    triggerToast(`Ticket "${deleteTarget.ticketNumber}" deleted successfully!`);
    setDeleteTarget(null);
  };

  return (
    <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5 relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[3px] shadow-xl max-w-sm w-full p-5 border border-gray-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-[15px] font-semibold text-gray-800">
                Delete Ticket
              </h3>
            </div>
            <p className="text-xs text-gray-600 mb-5 leading-relaxed">
              Are you sure you want to delete ticket{" "}
              <strong>"{deleteTarget.ticketNumber}"</strong>?
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

      {/* HEADER & TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f4f4f4]">
        <div className="flex items-center gap-4">
          <h1 className="text-[18px] font-normal text-[#333333]">Support Tickets</h1>
          <div className="flex items-center text-[12px] bg-gray-100 p-0.5 rounded-[3px]">
            <Link
              href="/admin/admin-panel/help-center"
              className="px-3 py-1 text-gray-600 hover:text-black rounded-[2px] transition-colors"
            >
              Knowledge Base
            </Link>
            <span className="px-3 py-1 font-semibold text-white bg-[#0073b7] rounded-[2px] shadow-2xs">
              Support Tickets
            </span>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <form onSubmit={handleApplyFilter} className="py-4 flex flex-wrap items-end gap-4 text-[13px]">
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
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[12px] text-[#444444] font-medium mb-1">
            Search
          </label>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search tickets..."
            className="border border-[#d2d6de] rounded-[3px] px-3 py-1.5 text-[13px] text-[#444] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] min-w-[180px]"
          />
        </div>

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
              <th className="py-2.5 px-3 w-24">Ticket #</th>
              <th className="py-2.5 px-3">Subject</th>
              <th className="py-2.5 px-3 w-48">User</th>
              <th className="py-2.5 px-3 w-36">Category</th>
              <th className="py-2.5 px-3 w-24">Priority</th>
              <th className="py-2.5 px-3 w-28">Status</th>
              <th className="py-2.5 px-3 w-20 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500 text-xs">
                  No support tickets found
                </td>
              </tr>
            ) : (
              currentTickets.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-[#f4f4f4] hover:bg-[#fcfcfc] transition-colors"
                >
                  <td className="py-2.5 px-3 font-mono font-medium text-[#0073b7]">
                    {t.ticketNumber}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-[#333]">
                    {t.subject}
                    <div className="text-[11px] text-gray-400 font-normal mt-0.5">
                      Updated {t.lastUpdated}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-xs text-gray-600">
                    <div>{t.userName}</div>
                    <div className="text-[11px] text-gray-400">{t.userEmail}</div>
                  </td>
                  <td className="py-2.5 px-3 text-xs text-gray-600">
                    {t.category}
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-[3px] ${
                        t.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : t.priority === "Medium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-[3px] ${
                        t.status === "Open"
                          ? "bg-[#00a65a] text-white"
                          : t.status === "In Progress"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(t)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete Ticket"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
