"use client";

import React, { useState } from "react";
import RefundTable from "./RefundTable";
import RefundDetailsModal from "./RefundDetailsModal";
import { RefundRequestItem } from "./types";
import { initialRefundRequests } from "./mockData";

export default function RefundRequestsView() {
  const [refunds, setRefunds] =
    useState<RefundRequestItem[]>(initialRefundRequests);
  const [selectedRefund, setSelectedRefund] =
    useState<RefundRequestItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleApproveRefund = (id: number) => {
    const target = refunds.find((r) => r.id === id);
    if (
      confirm(
        `Are you sure you want to approve refund for order "${target?.orderNumber}"? The order amount will be deducted from the seller's balance.`
      )
    ) {
      setRefunds((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: "Refund Approved" } : r
        )
      );
      showNotification(
        `Refund for order "${target?.orderNumber}" approved successfully.`
      );
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
        Refund Requests
      </h1>

      {/* Notification Toast */}
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

      {/* Refund Table */}
      <RefundTable
        refunds={refunds}
        onOpenDetails={(item) => setSelectedRefund(item)}
        onApprove={handleApproveRefund}
      />

      {/* Entries Counter */}
      <div className="text-xs text-gray-600 font-medium pt-1">
        Number of Entries: {refunds.length}
      </div>

      {/* Warning Alert Banner */}
      <div className="bg-[#d9edf7] border border-[#bce8f1] text-[#31708f] p-4 rounded-[3px] text-xs leading-relaxed shadow-2xs">
        <strong className="font-bold">Warning!</strong> To complete a refund
        request, you must return the buyer's money. If you click the "Approve
        Refund" button, the system will change the order status to "Refund
        Approved" and deduct the order amount from the seller's balance.
      </div>

      {/* Refund Details Modal */}
      <RefundDetailsModal
        refund={selectedRefund}
        onClose={() => setSelectedRefund(null)}
        onApprove={handleApproveRefund}
      />
    </div>
  );
}
