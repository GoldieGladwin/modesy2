"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface MemberAddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (amount: number) => void;
}

export default function MemberAddFundsModal({
  isOpen,
  onClose,
  onConfirm,
}: MemberAddFundsModalProps) {
  const router = useRouter();
  const [amount, setAmount] = useState<string>("12");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed < 10) {
      setError("The minimum deposit amount is $10");
      return;
    }
    setError(null);
    if (onConfirm) onConfirm(parsed);
    onClose();
    router.push(`/member/wallet/deposit?amount=${parsed}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[1px] animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-[4px] shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-150 border border-gray-200">
        {/* Header */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between relative">
          <h3 className="text-[20px] font-bold text-[#222] tracking-tight w-full text-center">
            Add Funds
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1 cursor-pointer absolute right-5 top-5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Enter Amount
            </label>
            <div className="flex border border-gray-300 rounded-[2px] overflow-hidden focus-within:border-[#00a99d] transition">
              <span className="bg-[#f2f4f6] px-4 py-2.5 text-gray-700 font-bold text-sm border-r border-gray-300 flex items-center justify-center select-none">
                $
              </span>
              <input
                type="number"
                min="10"
                step="any"
                required
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError(null);
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-white outline-none text-gray-800 font-medium"
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>
            )}
            <p className="text-xs text-gray-600 font-medium mt-2">
              Minimum Deposit Amount: <span className="font-bold text-gray-800">$10</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full mt-3 py-3 bg-[#00a99d] hover:bg-[#008f85] text-white font-semibold text-sm rounded-[2px] transition-colors cursor-pointer border-0 outline-none shadow-sm"
          >
            Continue to Checkout
          </button>
        </form>
      </div>
    </div>
  );
}
