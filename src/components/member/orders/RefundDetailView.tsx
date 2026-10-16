"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, Send, CheckCircle2 } from "lucide-react";

interface RefundMessage {
  id: string;
  sender: string;
  avatar: string;
  timestamp: string;
  text: string;
}

interface RefundDetailViewProps {
  refundId?: string;
}

export default function RefundDetailView({ refundId = "10007" }: RefundDetailViewProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const [messages, setMessages] = useState<RefundMessage[]>([
    {
      id: "msg-1",
      sender: "Peter Jone",
      avatar: "/images/peter-jone-avatar.jpg",
      timestamp: "1 month ago",
      text: "Us",
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg: RefundMessage = {
      id: `msg-${Date.now()}`,
      sender: "Peter Jone",
      avatar: "/images/peter-jone-avatar.jpg",
      timestamp: "Just Now",
      text: replyText.trim(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setReplyText("");
    showToast("Message sent successfully!");
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-8 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4">
        {/* Breadcrumb matching Screenshot */}
        <nav className="text-[13px] text-gray-500 mb-5 flex items-center gap-1.5 font-normal">
          <Link href="/member" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/member/refund-requests" className="hover:text-[#00a99d] transition-colors">
            Refund Requests
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">Refund</span>
        </nav>

        {/* Page Title & Top Button */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-[22px] font-bold text-gray-900 leading-tight">Refund</h1>

          <Link
            href="/member/refund-requests"
            className="px-3.5 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-medium rounded-[2px] transition inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Menu className="w-3.5 h-3.5" />
            <span>Refund Requests</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
          {/* Header Product Info */}
          <div>
            <h2 className="font-bold text-[14px] text-gray-900 pb-3 border-b border-gray-100">
              Product: #10007 - Animal colorful digital prints
            </h2>

            {/* 5-Column Meta Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-4 text-xs">
              {/* Status */}
              <div>
                <p className="font-semibold text-gray-800 mb-1.5">Status</p>
                <span className="inline-block px-2.5 py-0.5 bg-[#5a6268] text-white text-[11px] font-medium rounded-[2px]">
                  Processing
                </span>
              </div>

              {/* Total */}
              <div>
                <p className="font-semibold text-gray-800 mb-1.5">Total</p>
                <p className="text-gray-900 font-normal">$31.90</p>
              </div>

              {/* Seller */}
              <div>
                <p className="font-semibold text-gray-800 mb-1.5">Seller</p>
                <p className="text-gray-900 font-normal">Trendshop</p>
              </div>

              {/* Last Update */}
              <div>
                <p className="font-semibold text-gray-800 mb-1.5">Last Update</p>
                <p className="text-gray-900 font-normal">1 month ago</p>
              </div>

              {/* Date */}
              <div>
                <p className="font-semibold text-gray-800 mb-1.5">Date</p>
                <p className="text-gray-900 font-normal">2026-09-09 / 11:12</p>
              </div>
            </div>
          </div>

          {/* Messages Thread matching Screenshot */}
          <div className="space-y-4 pt-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-[#f8f9fa] border border-[#ebebeb] rounded-[2px] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-gray-200">
                      <img
                        src={msg.avatar}
                        alt={msg.sender}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-bold text-xs text-gray-900">
                      {msg.sender}
                    </span>
                  </div>

                  <span className="text-[11px] text-gray-400">
                    {msg.timestamp}
                  </span>
                </div>

                <div className="pl-12 pt-1 text-xs text-gray-800 leading-relaxed font-normal">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendMessage} className="space-y-3">
            <textarea
              rows={4}
              placeholder="Write a message..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border border-gray-300 rounded-[2px] p-3 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="bg-[#00a99d] hover:bg-[#008f85] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium text-xs px-6 py-2 rounded-[2px] transition shadow-2xs cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
