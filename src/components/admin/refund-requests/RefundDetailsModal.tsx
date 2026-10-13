"use client";

import React from "react";
import { X, AlertCircle } from "lucide-react";
import { RefundRequestItem } from "./types";

interface RefundDetailsModalProps {
  refund: RefundRequestItem | null;
  onClose: () => void;
  onApprove: (id: number) => void;
}

export default function RefundDetailsModal({
  refund,
  onClose,
  onApprove,
}: RefundDetailsModalProps) {
  if (!refund) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-[3px] shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-bold text-gray-800">
            Refund Details - {refund.orderNumber}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-100">
            <div>
              <span className="text-gray-500 block">Product:</span>
              <span className="font-semibold text-gray-800">
                {refund.productTitle}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Total Amount:</span>
              <span className="font-bold text-gray-900">{refund.total}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Buyer:</span>
              <span className="font-semibold text-[#007bff]">{refund.buyer}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Seller:</span>
              <span className="font-semibold text-[#007bff]">{refund.seller}</span>
            </div>
          </div>

          <div>
            <span className="text-gray-500 block mb-1">Reason / Explanation:</span>
            <div className="bg-gray-50 border border-gray-200 rounded p-3 text-gray-700 leading-relaxed">
              {refund.reason || "No explicit reason provided by the buyer."}
            </div>
          </div>

          <div className="bg-[#d9edf7] border border-[#bce8f1] text-[#31708f] p-3 rounded text-[11px] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Approving this refund will adjust the seller balance and mark the
              order status as Refund Approved.
            </span>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-1.5 rounded-[3px] transition cursor-pointer"
            >
              Close
            </button>
            {refund.status === "Processing" && (
              <button
                type="button"
                onClick={() => {
                  onApprove(refund.id);
                  onClose();
                }}
                className="bg-[#28a745] hover:bg-[#218838] text-white font-semibold px-4 py-1.5 rounded-[3px] shadow-xs transition cursor-pointer"
              >
                Approve Refund
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
