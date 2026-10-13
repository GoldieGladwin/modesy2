"use client";

import React from "react";
import { Plus, CreditCard } from "lucide-react";

interface WalletBalanceCardProps {
  balance: number;
  currency?: string;
  onAddFunds: () => void;
}

export default function WalletBalanceCard({
  balance,
  currency = "USD",
  onAddFunds,
}: WalletBalanceCardProps) {
  // Format balance e.g. 1,130.85
  const formattedBalance = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);

  return (
    <div className="bg-white border border-gray-200/90 rounded-sm shadow-xs p-6 sm:p-8 max-w-xl mx-auto relative text-center">
      {/* Top right Add Funds button */}
      <button
        type="button"
        onClick={onAddFunds}
        className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f8f9fa] hover:bg-gray-100 text-gray-700 text-xs font-medium rounded-sm border border-gray-300 transition shadow-xs cursor-pointer"
        title="Add Funds to Wallet"
      >
        <CreditCard className="w-3.5 h-3.5 text-gray-500" />
        <span>Add Funds</span>
      </button>

      {/* Centered Wallet Icon */}
      <div className="flex justify-center mb-2.5">
        <svg
          className="w-12 h-10"
          viewBox="0 0 44 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="4" width="40" height="26" rx="4" fill="#00a99d" />
          <path
            d="M28 11C28 9.89543 28.8954 9 30 9H42V25H30C28.8954 25 28 24.1046 28 23V11Z"
            fill="#008d83"
          />
          <circle cx="34" cy="17" r="2.2" fill="#ffffff" />
        </svg>
      </div>

      {/* Balance Label */}
      <div className="text-xs text-gray-500 font-medium mb-1 tracking-wide">
        Wallet Balance
      </div>

      {/* Balance Amount */}
      <div className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
        ${formattedBalance}
      </div>
    </div>
  );
}
