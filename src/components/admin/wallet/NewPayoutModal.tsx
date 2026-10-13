"use client";

import React, { useState } from "react";
import { X, DollarSign, Wallet, AlertCircle } from "lucide-react";
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
  const [amount, setAmount] = useState("100");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      setError("Please enter a valid amount.");
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

  const getRecipientAccountSummary = () => {
    switch (method) {
      case "PayPal":
        return `PayPal Account: ${settings.paypalEmail || "Not configured"}`;
      case "Bitcoin (BTC)":
        return `BTC Address: ${settings.btcAddress || "Not configured"}`;
      case "IBAN":
        return `IBAN: ${settings.iban.ibanNumber || "Not configured"} (${settings.iban.bankName})`;
      case "SWIFT":
        return `SWIFT Code: ${settings.swift.swiftCode || "Not configured"} (${settings.swift.bankName})`;
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-modal-backdrop">
      <div className="bg-white rounded-sm shadow-xl max-w-md w-full overflow-hidden animate-modal-dialog border border-gray-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            New Payout Request
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Available balance indicator */}
          <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-sm flex items-center justify-between text-xs">
            <span className="text-gray-600 font-medium">Available Balance:</span>
            <span className="font-bold text-[#00a99d] text-sm">
              ${availableBalance.toFixed(2)} USD
            </span>
          </div>

          {error && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Withdrawal Method*
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] text-gray-800"
            >
              <option value="PayPal">PayPal</option>
              <option value="Bitcoin (BTC)">Bitcoin (BTC)</option>
              <option value="IBAN">IBAN</option>
              <option value="SWIFT">SWIFT</option>
            </select>
          </div>

          <div className="text-[11px] text-gray-500 bg-gray-50 p-2 rounded border border-gray-200">
            {getRecipientAccountSummary()}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Withdrawal Amount (USD)*
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500 font-bold text-xs">
                $
              </span>
              <input
                type="number"
                min="10"
                max={availableBalance}
                step="any"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] text-gray-800 font-semibold"
                placeholder="100.00"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Minimum withdrawal amount: $50.00 USD</p>
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
              className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-sm transition shadow-xs cursor-pointer"
            >
              Submit Payout Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
