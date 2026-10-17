"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Ban, CheckCircle2 } from "lucide-react";
import { initialVendorRefundRequests } from "./mockData";
import { VendorRefundRequest, RefundMessage, RefundStatus } from "./types";

interface VendorRefundDetailViewProps {
  refundId: string;
}

export default function VendorRefundDetailView({
  refundId,
}: VendorRefundDetailViewProps) {
  const currentItem =
    initialVendorRefundRequests.find((r) => r.id === refundId) ||
    initialVendorRefundRequests[0];

  const [refundData, setRefundData] = useState<VendorRefundRequest>(currentItem);
  const [messages, setMessages] = useState<RefundMessage[]>(currentItem.messages);
  const [newMessage, setNewMessage] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: RefundMessage = {
      id: `msg-${Date.now()}`,
      sender: "Trendshop",
      avatar: "/assets/img/trendshop-avatar.jpg",
      time: "Just now",
      text: newMessage.trim(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setRefundData((prev) => ({
      ...prev,
      updated: "Just now",
    }));
    setNewMessage("");
    showToast("Message sent successfully!");
  };

  const handleApprove = () => {
    setRefundData((prev) => ({
      ...prev,
      status: "Approved" as RefundStatus,
      updated: "Just now",
    }));
    showToast("Refund request approved successfully.");
  };

  const handleDecline = () => {
    setRefundData((prev) => ({
      ...prev,
      status: "Declined" as RefundStatus,
      updated: "Just now",
    }));
    showToast("Refund request declined.");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return (
          <span className="bg-[#85929e] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-[3px] inline-block whitespace-nowrap">
            Processing
          </span>
        );
      case "Approved":
        return (
          <span className="bg-[#27ae60] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-[3px] inline-block whitespace-nowrap">
            Approved
          </span>
        );
      case "Declined":
        return (
          <span className="bg-[#e74c3c] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-[3px] inline-block whitespace-nowrap">
            Declined
          </span>
        );
      default:
        return (
          <span className="bg-gray-400 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-[3px] inline-block">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 bg-emerald-600 text-white text-xs font-medium rounded shadow-lg flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
        {/* Title */}
        <h1 className="text-[17px] font-semibold text-gray-800 mb-4">
          Refund
        </h1>

        {/* Product Line */}
        <div className="text-[13.5px] text-gray-800 mb-5">
          <span className="font-bold">Product: </span>
          <Link
            href={`/dashboard/refund-requests/${refundData.id}`}
            className="text-[#2680eb] hover:underline font-bold"
          >
            {refundData.productTitle}
          </Link>
        </div>

        {/* Metadata Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 pb-6 text-[13px]">
          <div>
            <span className="font-semibold text-gray-800 block mb-1">
              Status
            </span>
            <div>{getStatusBadge(refundData.status)}</div>
          </div>

          <div>
            <span className="font-semibold text-gray-800 block mb-1">
              Total
            </span>
            <span className="text-gray-800 font-normal">
              {refundData.total}
            </span>
          </div>

          <div>
            <span className="font-semibold text-gray-800 block mb-1">
              Buyer
            </span>
            <Link
              href="#"
              className="text-[#2680eb] hover:underline font-normal"
            >
              {refundData.buyer}
            </Link>
          </div>

          <div>
            <span className="font-semibold text-gray-800 block mb-1">
              Last Update
            </span>
            <span className="text-gray-600 font-normal">
              {refundData.updated}
            </span>
          </div>

          <div>
            <span className="font-semibold text-gray-800 block mb-1">
              Date
            </span>
            <span className="text-gray-600 font-normal">
              {refundData.date}
            </span>
          </div>
        </div>

        {/* Discussion Area */}
        <div className="mt-4 pt-6 border-t border-gray-150 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-4">
              {/* Circular Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-200 bg-gray-100 relative">
                <Image
                  src={msg.avatar}
                  alt={msg.sender}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Message Header & Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[13.5px] text-gray-900">
                    {msg.sender}
                  </span>
                  <span className="text-[12px] text-gray-400">
                    {msg.time}
                  </span>
                </div>
                <p className="text-[13.5px] text-gray-700 mt-1 leading-relaxed">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {/* Reply Form */}
          <form onSubmit={handleSendMessage} className="space-y-3 pt-2">
            <textarea
              rows={4}
              placeholder="Message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-[3px] p-3 text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2680eb] resize-y min-h-[90px]"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-[#007bff] hover:bg-[#0069d9] text-white text-[13px] font-medium rounded-[3px] transition-colors cursor-pointer shadow-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Action Buttons: Approve Refund & Decline */}
        <div className="flex items-center justify-center gap-3 pt-8 pb-4">
          <button
            type="button"
            onClick={handleApprove}
            className="px-5 py-2.5 bg-[#20c997] hover:bg-[#1bb285] text-white text-[13px] font-medium rounded-[3px] flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Approve Refund</span>
          </button>

          <button
            type="button"
            onClick={handleDecline}
            className="px-5 py-2.5 bg-[#dc3545] hover:bg-[#c82333] text-white text-[13px] font-medium rounded-[3px] flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Ban className="w-4 h-4 stroke-[2.5]" />
            <span>Decline</span>
          </button>
        </div>
      </div>
    </div>
  );
}
