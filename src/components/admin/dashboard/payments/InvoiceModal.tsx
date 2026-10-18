"use client";

import React from "react";
import { X, Printer, Download } from "lucide-react";
import { PromotionPaymentItem } from "./types";

interface InvoiceModalProps {
  payment: PromotionPaymentItem | null;
  onClose: () => void;
}

export default function InvoiceModal({ payment, onClose }: InvoiceModalProps) {
  if (!payment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-[6px] max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-[#2d3748]">
            Invoice #{payment.id}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-gray-700">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <div>
              <p className="font-bold text-gray-900 text-sm">Modesy Promotion</p>
              <p className="text-gray-500 text-[11px] mt-0.5">Payment Id: {payment.paymentId}</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold uppercase">
              {payment.paymentStatus}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-gray-500 text-[11px]">Payment Method</p>
              <p className="font-semibold text-gray-800">{payment.paymentMethod}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[11px]">Product Id</p>
              <p className="font-semibold text-[#007bff]">#{payment.productId}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[11px]">Purchased Plan</p>
              <p className="font-semibold text-gray-800">{payment.purchasedPlan}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[11px]">Date</p>
              <p className="font-semibold text-gray-800">{payment.date}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-sm">
            <span className="font-bold text-gray-800">Total Paid:</span>
            <span className="font-bold text-[#00a99d] text-base">{payment.paymentAmount}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-3.5 bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-[4px] inline-flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-gray-500" />
            <span>Print</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[4px] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
