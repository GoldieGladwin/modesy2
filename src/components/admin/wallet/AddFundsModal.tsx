"use client";

import React, { useState } from "react";
import { X, CreditCard, Landmark, DollarSign, Check } from "lucide-react";

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number, method: string) => void;
}

export default function AddFundsModal({
  isOpen,
  onClose,
  onConfirm,
}: AddFundsModalProps) {
  const [amount, setAmount] = useState<string>("100");
  const [method, setMethod] = useState<string>("Stripe");

  if (!isOpen) return null;

  const quickAmounts = ["50", "100", "250", "500", "1000"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) return;
    onConfirm(parsed, method);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-modal-backdrop">
      <div className="bg-white rounded-sm shadow-xl max-w-md w-full overflow-hidden animate-modal-dialog border border-gray-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Add Funds to Wallet
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
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Deposit Amount (USD)*
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                min="1"
                step="any"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100.00"
                className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] text-gray-800 font-semibold"
              />
            </div>

            {/* Quick amounts */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(q)}
                  className={`px-2.5 py-1 text-[11px] rounded-sm font-medium border transition cursor-pointer ${
                    amount === q
                      ? "bg-[#00a99d] text-white border-[#00a99d]"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                  }`}
                >
                  +${q}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Select Payment Gateway
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: "Stripe", name: "Credit / Debit Card (Stripe)", icon: CreditCard },
                { id: "PayPal", name: "PayPal", icon: DollarSign },
                { id: "Bank Transfer", name: "Bank Transfer", icon: Landmark },
              ].map((item) => {
                const isSelected = method === item.id;
                const IconComponent = item.icon;
                return (
                  <label
                    key={item.id}
                    onClick={() => setMethod(item.id)}
                    className={`flex items-center justify-between p-3 border rounded-sm cursor-pointer transition ${
                      isSelected
                        ? "border-[#00a99d] bg-teal-50/30 text-gray-900"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs font-medium">
                      <IconComponent className={`w-4 h-4 ${isSelected ? "text-[#00a99d]" : "text-gray-400"}`} />
                      <span>{item.name}</span>
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#00a99d] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submit */}
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
              Deposit Funds
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
