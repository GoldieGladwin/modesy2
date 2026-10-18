"use client";

import React from "react";
import { X } from "lucide-react";
import { DigitalSale } from "./types";

interface DigitalSaleDetailModalProps {
  sale: DigitalSale | null;
  onClose: () => void;
}

export default function DigitalSaleDetailModal({
  sale,
  onClose,
}: DigitalSaleDetailModalProps) {
  if (!sale) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-md shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-800">
            Sale Details ({sale.order})
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3 text-sm text-gray-700">
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500 font-medium">Sale ID:</span>
            <span className="font-semibold text-gray-800">{sale.id}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500 font-medium">Order Number:</span>
            <span className="font-semibold text-gray-800">{sale.order}</span>
          </div>
          <div className="py-1.5 border-b border-gray-100">
            <span className="text-gray-500 font-medium block mb-1">Purchase Code:</span>
            <span className="font-mono text-xs text-gray-800 bg-gray-50 p-2 rounded block break-all">
              {sale.purchaseCode}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500 font-medium">Seller:</span>
            <span className="font-medium text-gray-800">{sale.seller}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500 font-medium">Buyer:</span>
            <span className="font-medium text-gray-800">{sale.buyer}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500 font-medium">Total Price:</span>
            <span className="font-bold text-gray-900">{sale.total} {sale.currency}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-gray-500 font-medium">Purchase Date:</span>
            <span className="text-gray-600">{sale.date}</span>
          </div>
        </div>

        <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm rounded font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
