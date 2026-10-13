"use client";

import React from "react";
import { X, Printer, Download, CheckCircle, Receipt } from "lucide-react";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    paymentId: string;
    title: string;
    amount: number;
    currency: string;
    date: string;
    type: "deposit" | "expense";
  } | null;
}

export default function InvoiceModal({
  isOpen,
  onClose,
  data,
}: InvoiceModalProps) {
  if (!isOpen || !data) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-modal-backdrop">
      <div className="bg-white rounded-sm shadow-2xl max-w-2xl w-full overflow-hidden animate-modal-dialog border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#00a99d]" />
            <span className="font-bold text-gray-800 text-sm">
              Invoice #{data.paymentId.substring(0, 12)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs rounded-sm hover:bg-gray-50 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-gray-500" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-gray-700 bg-white">
          {/* Top Brand & Metadata */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-gray-200">
            <div>
              <div className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-0.5">
                <span>Mode</span>
                <span className="text-[#00a99d]">sy</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Official Marketplace Transaction Receipt
              </p>
              <p className="text-[11px] text-gray-400">support@modesy.com</p>
            </div>
            <div className="text-left sm:text-right space-y-1">
              <div className="text-xs font-semibold text-gray-900">
                Transaction Date:
              </div>
              <div className="text-gray-600">{data.date}</div>
              <div className="inline-block mt-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                PAID &amp; SETTLED
              </div>
            </div>
          </div>

          {/* Parties Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3.5 rounded-sm border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                Issued To / Client
              </span>
              <div className="font-bold text-gray-900">Admin Account</div>
              <div className="text-gray-600">Administrator User (Master Storefront)</div>
              <div className="text-gray-500 text-[11px] mt-1 font-mono">
                Ref ID: {data.paymentId}
              </div>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-sm border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                Payment Channel
              </span>
              <div className="font-bold text-gray-900">
                {data.type === "deposit" ? "Wallet Deposit" : "Wallet Expense"}
              </div>
              <div className="text-gray-600 font-mono text-[11px]">
                Tx: {data.paymentId}
              </div>
              <div className="text-emerald-600 font-medium text-[11px] mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Verified by System
              </div>
            </div>
          </div>

          {/* Line items table */}
          <div className="border border-gray-200 rounded-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-4 text-center">Type</th>
                  <th className="py-2.5 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {data.title}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-500 uppercase text-[11px]">
                    {data.type}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-gray-900">
                    ${data.amount.toFixed(2)} ({data.currency})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total summary */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${data.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>VAT / Tax (0%):</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200 text-sm">
                <span>Total Amount:</span>
                <span className="text-[#00a99d]">
                  ${data.amount.toFixed(2)} {data.currency}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold rounded-sm transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
