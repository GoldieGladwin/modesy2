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
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 sm:p-7 shadow-xs font-sans">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-[18px] font-bold text-[#2d3748]">
          Refund Requests
        </h1>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="mb-4 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-2xs">
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
      />

      {/* Number of Entries */}
      <div className="mt-6 text-xs text-[#333e48]">
        Number of Entries:{" "}
        <strong className="font-bold">{refunds.length}</strong>
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
