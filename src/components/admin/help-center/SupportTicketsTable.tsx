"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import { SupportTicketItem } from "./types";
import {
  getStoredTickets,
  deleteStoredTicket,
} from "./helpCenterData";

export default function SupportTicketsTable() {
  const [tickets, setTickets] = useState<SupportTicketItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<"Open" | "Responded" | "Closed">("Open");
  const [deleteTarget, setDeleteTarget] = useState<SupportTicketItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setTickets(getStoredTickets());
  }, []);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Counts for tabs
  const openCount = useMemo(() => tickets.filter((t) => t.status === "Open").length, [tickets]);
  const respondedCount = useMemo(() => tickets.filter((t) => t.status === "Responded").length, [tickets]);
  const closedCount = useMemo(() => tickets.filter((t) => t.status === "Closed").length, [tickets]);

  // Filtered tickets by status tab
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => t.status === statusFilter);
  }, [tickets, statusFilter]);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const updated = deleteStoredTicket(deleteTarget.id);
    setTickets(updated);
    triggerToast(`Ticket "${deleteTarget.ticketNumber}" deleted successfully!`);
    setDeleteTarget(null);
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

      {/* TOP HEADER (Screenshot 1: "Support Tickets") */}
      <h1 className="text-[18px] font-normal text-[#333333] mb-4">
        Support Tickets
      </h1>

      {/* THREE STATUS TABS (Screenshot 1: Open, Responded, Closed) */}
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setStatusFilter("Open")}
          className={`px-4 py-1.5 text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer ${
            statusFilter === "Open"
              ? "bg-[#00a65a] text-white shadow-2xs"
              : "bg-white border border-[#00a65a] text-[#00a65a] hover:bg-[#00a65a]/10"
          }`}
        >
          Open ({openCount})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("Responded")}
          className={`px-4 py-1.5 text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer border ${
            statusFilter === "Responded"
              ? "bg-[#f39c12] text-white border-[#f39c12] shadow-2xs"
              : "bg-white border-[#f39c12] text-[#f39c12] hover:bg-[#f39c12]/10"
          }`}
        >
          Responded ({respondedCount})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("Closed")}
          className={`px-4 py-1.5 text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer border ${
            statusFilter === "Closed"
              ? "bg-gray-600 text-white border-gray-600 shadow-2xs"
              : "bg-white border-gray-400 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Closed ({closedCount})
        </button>
      </div>

      {/* TABLE (Screenshot 1: Id | Subject | User | Status | Date | Updated | Options) */}
      <div className="overflow-x-auto border-t border-gray-100">
        <table className="w-full text-left text-[13px] text-[#333333]">
          <thead>
            <tr className="border-b border-[#f4f4f4] text-[#444] font-semibold text-[13px]">
              <th className="py-2.5 px-3 w-16">Id</th>
              <th className="py-2.5 px-3">Subject</th>
              <th className="py-2.5 px-3 w-40">User</th>
              <th className="py-2.5 px-3 w-28">Status</th>
              <th className="py-2.5 px-3 w-44">Date</th>
              <th className="py-2.5 px-3 w-36">Updated</th>
              <th className="py-2.5 px-3 w-28 text-right sm:text-left">Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500 text-xs">
                  No records found
                </td>
              </tr>
            ) : (
              filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b border-[#f4f4f4] hover:bg-[#fcfcfc] transition-colors"
                >
                  <td className="py-3 px-3 text-[#555] font-normal">
                    {ticket.ticketNumber}
                  </td>
                  <td className="py-3 px-3 text-[#333] font-normal">
                    {ticket.subject}
                  </td>
                  <td className="py-3 px-3 text-[#555] font-normal">
                    {ticket.user}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-[3px] text-white ${
                        ticket.status === "Open"
                          ? "bg-[#00a65a]"
                          : ticket.status === "Responded"
                          ? "bg-[#f39c12]"
                          : "bg-gray-500"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#555] text-xs">
                    {ticket.date}
                  </td>
                  <td className="py-3 px-3 text-[#555] text-xs">
                    {ticket.updated}
                  </td>
                  <td className="py-3 px-3 text-right sm:text-left">
                    <div className="inline-flex items-center gap-1.5">
                      <Link
                        href={`/admin/admin-panel/help-center/support-tickets/${ticket.id}`}
                        className="px-2.5 py-1 bg-white border border-[#d2d6de] hover:bg-gray-50 text-[12px] text-gray-700 rounded-[3px] transition-colors cursor-pointer shadow-2xs inline-block"
                      >
                        Show
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(ticket)}
                        className="p-1.5 bg-white border border-[#d2d6de] hover:border-red-400 text-gray-600 hover:text-red-600 rounded-[3px] transition-colors cursor-pointer shadow-2xs"
                        title="Delete Ticket"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
