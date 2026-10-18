"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  List,
  ChevronDown,
  User,
  Send,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { SupportTicketItem } from "./types";
import {
  getTicketById,
  updateTicketStatus,
  saveSingleTicketReply,
  INITIAL_SUPPORT_TICKETS,
} from "./helpCenterData";

export default function TicketDetailsView() {
  const params = useParams();
  const idParam = params?.id as string;
  const ticketId = parseInt(idParam, 10);

  const [ticket, setTicket] = useState<SupportTicketItem | null | undefined>(undefined);
  const [replyText, setReplyText] = useState("");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const statusDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isNaN(ticketId)) {
      const found =
        getTicketById(ticketId) ||
        INITIAL_SUPPORT_TICKETS.find((t) => t.id === ticketId);
      setTicket(found || null);
    } else {
      setTicket(null);
    }
  }, [ticketId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStatusChange = (newStatus: "Open" | "Responded" | "Closed") => {
    if (!ticket) return;
    const updated = updateTicketStatus(ticket.id, newStatus);
    if (updated) {
      setTicket({ ...updated });
      setIsStatusDropdownOpen(false);
      triggerToast(`Ticket status updated to "${newStatus}"!`);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket || !replyText.trim()) return;

    const updated = saveSingleTicketReply(ticket.id, replyText.trim());
    if (updated) {
      setTicket({ ...updated });
      setReplyText("");
      triggerToast("Reply sent successfully!");
    }
  };

  if (ticket === undefined) {
    return (
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-8 text-center text-gray-500 text-xs">
        Loading ticket #{idParam}...
      </div>
    );
  }

  if (ticket === null) {
    return (
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-8 text-center space-y-4">
        <h2 className="text-lg font-medium text-gray-800">Ticket Not Found</h2>
        <p className="text-sm text-gray-500">
          No support ticket was found with ID #{idParam}.
        </p>
        <Link
          href="/admin/admin-panel/help-center/support-tickets"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#00a65a] text-white text-xs rounded-[3px] hover:bg-[#008d4c]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Support Tickets</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER: Ticket: #1 & Green Support Tickets Button (Matches Screenshot) */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f4f4f4]">
        <h1 className="text-[17px] font-semibold text-[#333333]">
          Ticket: #{ticket.id}
        </h1>
        <Link
          href="/admin/admin-panel/help-center/support-tickets"
          className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-normal rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <List className="w-4 h-4" />
          <span>Support Tickets</span>
        </Link>
      </div>

      {/* SUBJECT */}
      <div className="mt-5 mb-4">
        <span className="text-[14px] font-semibold text-[#333333]">
          Subject: {ticket.subject}
        </span>
      </div>

      {/* METADATA ROW: Status | Date | Last Update (Matches Screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1 pb-5 border-b border-[#f4f4f4]">
        {/* Status */}
        <div>
          <div className="text-[13px] font-semibold text-[#333333] mb-1.5">
            Status
          </div>
          <div>
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
          </div>
        </div>

        {/* Date */}
        <div>
          <div className="text-[13px] font-semibold text-[#333333] mb-1.5">
            Date
          </div>
          <div className="text-[12.5px] text-[#555555]">{ticket.date}</div>
        </div>

        {/* Last Update */}
        <div>
          <div className="text-[13px] font-semibold text-[#333333] mb-1.5">
            Last Update
          </div>
          <div className="text-[12.5px] text-[#555555]">{ticket.updated}</div>
        </div>
      </div>

      {/* STATUS ACTION BUTTON (Right Aligned, Gray 'Status ▼' Button in Screenshot) */}
      <div className="flex justify-end pt-5 pb-3">
        <div className="relative inline-block text-left" ref={statusDropdownRef}>
          <button
            type="button"
            onClick={() => setIsStatusDropdownOpen((prev) => !prev)}
            className="bg-[#5c6873] hover:bg-[#4f5963] text-white text-[12px] px-3.5 py-1.5 rounded-[3px] inline-flex items-center gap-1.5 font-normal transition-colors cursor-pointer shadow-2xs"
          >
            <span>Status</span>
            <ChevronDown className="w-3.5 h-3.5 text-white/90" />
          </button>

          {isStatusDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-[#d2d6de] rounded-[3px] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              <button
                type="button"
                onClick={() => handleStatusChange("Open")}
                className={`w-full text-left px-3.5 py-1.5 text-[12px] hover:bg-gray-100 flex items-center justify-between cursor-pointer ${
                  ticket.status === "Open"
                    ? "font-semibold text-[#00a65a]"
                    : "text-gray-700"
                }`}
              >
                <span>Open</span>
                {ticket.status === "Open" && <span className="text-xs">✓</span>}
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange("Responded")}
                className={`w-full text-left px-3.5 py-1.5 text-[12px] hover:bg-gray-100 flex items-center justify-between cursor-pointer ${
                  ticket.status === "Responded"
                    ? "font-semibold text-[#f39c12]"
                    : "text-gray-700"
                }`}
              >
                <span>Responded</span>
                {ticket.status === "Responded" && <span className="text-xs">✓</span>}
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange("Closed")}
                className={`w-full text-left px-3.5 py-1.5 text-[12px] hover:bg-gray-100 flex items-center justify-between cursor-pointer ${
                  ticket.status === "Closed"
                    ? "font-semibold text-gray-600"
                    : "text-gray-700"
                }`}
              >
                <span>Closed</span>
                {ticket.status === "Closed" && <span className="text-xs">✓</span>}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CONVERSATION THREAD */}
      <div className="space-y-4 pt-1">
        {/* INITIAL USER MESSAGE (Exact layout from screenshot) */}
        <div className="flex items-start gap-4">
          {/* User Avatar Circle */}
          <div className="w-[46px] h-[46px] rounded-full bg-[#d2d6de] flex items-center justify-center text-white shrink-0 shadow-2xs">
            <User className="w-6 h-6 text-gray-500" />
          </div>

          {/* User Message Box */}
          <div className="flex-1 bg-white border border-[#d2d6de] rounded-[3px] p-4 text-[13px] shadow-[0_1px_1px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#333333] text-[13.5px]">
                  {ticket.userName || ticket.user}
                </span>
                <span className="bg-[#00c0ef] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] leading-tight">
                  Guest
                </span>
              </div>
              <span className="text-[12px] text-[#777777] font-normal">
                {ticket.updated}
              </span>
            </div>

            {/* Email */}
            <div className="text-[12px] text-[#666666] mt-0.5">
              {ticket.userEmail || `${(ticket.userName || ticket.user).toLowerCase()}@gmail.com`}
            </div>

            {/* Message Body */}
            <div className="text-[13px] text-[#333333] mt-3 whitespace-pre-wrap leading-relaxed">
              {ticket.message || "testing"}
            </div>
          </div>
        </div>

        {/* REPLIES THREAD */}
        {ticket.replies &&
          ticket.replies.map((reply, idx) => (
            <div key={idx} className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className={`w-[46px] h-[46px] rounded-full flex items-center justify-center text-white shrink-0 shadow-2xs ${
                  reply.isAdmin
                    ? "bg-gradient-to-tr from-purple-700 via-pink-500 to-cyan-400 ring-1 ring-white/10"
                    : "bg-[#d2d6de]"
                }`}
              >
                {reply.isAdmin ? (
                  <ShieldCheck className="w-6 h-6 text-white" />
                ) : (
                  <User className="w-6 h-6 text-gray-500" />
                )}
              </div>

              {/* Reply Box */}
              <div
                className={`flex-1 rounded-[3px] p-4 text-[13px] shadow-[0_1px_1px_rgba(0,0,0,0.02)] border ${
                  reply.isAdmin
                    ? "bg-[#fcfdfd] border-[#00a65a]/30"
                    : "bg-white border-[#d2d6de]"
                }`}
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#333333] text-[13.5px]">
                      {reply.sender}
                    </span>
                    <span
                      className={`text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] leading-tight ${
                        reply.isAdmin ? "bg-[#00a65a]" : "bg-[#00c0ef]"
                      }`}
                    >
                      {reply.isAdmin ? "Admin" : "User"}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#777777] font-normal">
                    {reply.date}
                  </span>
                </div>

                <div className="text-[13px] text-[#333333] mt-3 whitespace-pre-wrap leading-relaxed">
                  {reply.message}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* REPLY FORM */}
      <form onSubmit={handleSendReply} className="mt-8 pt-5 border-t border-[#f4f4f4]">
        <label className="block text-[13px] font-semibold text-[#333333] mb-2">
          Reply to Ticket
        </label>
        <textarea
          rows={4}
          required
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Type your reply message here..."
          className="w-full bg-white border border-[#d2d6de] rounded-[3px] p-3 text-[13px] text-[#444] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors"
        />
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="px-4 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-medium rounded-[3px] inline-flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Reply</span>
          </button>
        </div>
      </form>
    </div>
  );
}
