"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { PayoutAccountSettings } from "./types";

interface NewPayoutModalProps {
  isOpen: boolean;
  availableBalance: number;
  settings: PayoutAccountSettings;
  onClose: () => void;
  onSubmitPayout: (method: string, amount: number) => void;
}

export default function NewPayoutModal({
  isOpen,
  availableBalance,
  settings,
  onClose,
  onSubmitPayout,
}: NewPayoutModalProps) {
  const [method, setMethod] = useState("PayPal");
  const [amount, setAmount] = useState("0.00");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed < 500) {
      setError("Minimum payout amount for " + method + " is $500.");
      return;
    }
    if (parsed > availableBalance) {
      setError("Withdrawal amount cannot exceed available wallet balance.");
      return;
    }
    setError("");
    onSubmitPayout(method, parsed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-modal-backdrop">
      <div className="bg-white rounded-[4px] shadow-2xl max-w-[500px] w-full overflow-hidden animate-modal-dialog border border-gray-200 relative p-6 sm:p-8">
        {/* Close Button top-right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-xl leading-none cursor-pointer p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title (Centered) */}
        <h3 className="text-[17px] font-semibold text-[#333333] text-center mb-6">
          New Payout Request
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded">
              {error}
            </div>
          )}

          {/* Withdrawal Amount */}
          <div>
            <label className="block text-[13px] text-gray-700 mb-1.5 font-normal">
              Withdrawal Amount
            </label>
            <div className="flex rounded-[3px] shadow-2xs overflow-hidden border border-gray-300 focus-within:border-[#00a99d]">
              <span className="inline-flex items-center px-3.5 bg-[#f8f9fa] border-r border-gray-300 text-gray-600 text-sm">
                $
              </span>
              <input
                type="number"
                step="any"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Withdrawal Method */}
          <div>
            <label className="block text-[13px] text-gray-700 mb-1.5 font-normal">
              Withdrawal Method
            </label>
            <div className="relative">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#00a99d] transition cursor-pointer"
              >
                <option value="PayPal">PayPal</option>
                <option value="Bitcoin (BTC)">Bitcoin (BTC)</option>
                <option value="IBAN">IBAN</option>
                <option value="SWIFT">SWIFT</option>
              </select>
            </div>
          </div>

          {/* Submit Button (Aligned Right under Method) */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-6 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-[13px] font-medium rounded-[3px] transition shadow-xs cursor-pointer"
            >
              Submit
            </button>
          </div>

          {/* Bottom Info Section */}
          <div className="pt-4 mt-6 border-t border-gray-200/80 text-[12px] text-gray-700">
            <div className="font-semibold text-gray-800 mb-1.5">
              Minimum Payout Amounts
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-600 mb-4">
              <span>
                PayPal: <strong className="text-gray-800 font-semibold">$500</strong>
              </span>
              <span>
                Bitcoin (BTC): <strong className="text-gray-800 font-semibold">$500</strong>
              </span>
              <span>
                IBAN: <strong className="text-gray-800 font-semibold">$500</strong>
              </span>
              <span>
                SWIFT: <strong className="text-gray-800 font-semibold">$500</strong>
              </span>
            </div>

            <div className="border-t border-gray-200/70 pt-3">
              <span>Your Balance: </span>
              <span className="font-bold text-[#27ae60]">
                ${availableBalance.toFixed(2)}
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
