"use client";

import React, { useState } from "react";
import { X, Send, Upload, FileCheck, CheckCircle } from "lucide-react";
import { DepositRecord } from "./types";

interface ReportBankTransferModalProps {
  isOpen: boolean;
  deposit: DepositRecord | null;
  onClose: () => void;
  onSubmitReport: (depositId: string, referenceNo: string, note: string) => void;
}

export default function ReportBankTransferModal({
  isOpen,
  deposit,
  onClose,
  onSubmitReport,
}: ReportBankTransferModalProps) {
  const [referenceNo, setReferenceNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState("");

  if (!isOpen || !deposit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport(deposit.id, referenceNo, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-modal-backdrop">
      <div className="bg-white rounded-sm shadow-xl max-w-lg w-full overflow-hidden animate-modal-dialog border border-gray-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
            <Send className="w-4 h-4 text-[#00a99d]" />
            Report Bank Transfer
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Summary Box */}
          <div className="bg-teal-50/40 border border-teal-100 p-3.5 rounded-sm text-xs text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Payment ID:</span>
              <span className="font-mono font-medium text-gray-900">{deposit.paymentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Due:</span>
              <span className="font-bold text-[#27ae60]">${deposit.amount} ({deposit.currency})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="text-amber-600 font-semibold">{deposit.status}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Transaction / Reference Number*
            </label>
            <input
              type="text"
              required
              placeholder="e.g. TR-998822019"
              value={referenceNo}
              onChange={(e) => setReferenceNo(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] text-gray-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Sending Bank & Account Name
            </label>
            <input
              type="text"
              placeholder="e.g. Chase Bank - John Doe"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] text-gray-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Upload Payment Receipt (Optional)
            </label>
            <div className="border border-dashed border-gray-300 rounded-sm p-4 text-center hover:border-[#00a99d] transition cursor-pointer bg-gray-50/50 relative">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFileName(e.target.files[0].name);
                  }
                }}
              />
              <Upload className="w-5 h-5 mx-auto text-gray-400 mb-1.5" />
              <div className="text-xs text-gray-600">
                {fileName ? (
                  <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" /> {fileName}
                  </span>
                ) : (
                  <span>Click or drag bank receipt image (JPG, PNG, PDF)</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              rows={2}
              placeholder="Any details to help verify this transfer..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] text-gray-800"
            />
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-sm transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-sm transition shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <Send className="w-3 h-3" />
              <span>Submit Transfer Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
