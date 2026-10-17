"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { CodTransactionItem, CodStatus } from "./types";
import { initialCodTransactions, initialCodSettings } from "./mockData";

export default function CashOnDeliveryView() {
  const [transactions] = useState<CodTransactionItem[]>(initialCodTransactions);
  const [status, setStatus] = useState<CodStatus>(initialCodSettings.status);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Cash on Delivery settings saved successfully.");
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <div className="font-sans max-w-7xl">
      {/* 1. Page Header */}
      <div className="mb-6">
        <h1 className="text-[20px] font-bold text-[#2d3748]">
          Cash on Delivery
        </h1>
        <p className="text-[13px] text-gray-500 mt-0.5">
          Sell your products with pay on delivery option
        </p>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="mb-6 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-2xs">
          <span>{notification}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-[#155724] font-bold text-sm cursor-pointer ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* 2. Grid Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-6">
          {/* Card: Transactions */}
          <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs">
            <h2 className="text-[16px] font-bold text-[#2d3748] mb-4">
              Transactions
            </h2>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#e9ecef] text-[#333e48] font-bold">
                    <th className="py-3 px-3 font-bold w-1/3">Order</th>
                    <th className="py-3 px-3 font-bold w-1/3">Commission</th>
                    <th className="py-3 px-3 font-bold w-1/3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-12 text-center text-[#555] text-xs font-normal"
                      >
                        No records found!
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="border-b border-[#e9ecef] hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-3 px-3 text-[#337ab7] hover:underline cursor-pointer font-normal">
                          #{tx.orderNumber}
                        </td>
                        <td className="py-3 px-3 text-[#333e48]">
                          {tx.commission}
                        </td>
                        <td className="py-3 px-3 text-[#333e48]">
                          {tx.date}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Warning Box */}
          <div className="bg-[#e2f0d9]/90 border border-[#b7eb8f] rounded-[4px] p-5 text-xs text-[#155724] leading-relaxed shadow-2xs">
            <p>
              <strong className="font-bold">Warning!</strong> Cash on Delivery
              commissions will be automatically deducted from your wallet balance.
              If your wallet has insufficient funds, the commission will be
              added as a debt. When these debts exceed the specified debt limit,
              this payment option will be automatically disabled for your store.
            </p>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-6">
          {/* Card: Commission Debt */}
          <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs">
            <h2 className="text-[16px] font-bold text-[#2d3748] mb-5">
              Commission Debt
            </h2>

            <div className="space-y-2">
              <p className="text-[13px] font-medium text-[#00a99d]">
                You have no debt.
              </p>
              <p className="text-[13px] text-gray-500">
                Commission Debt Limit:{" "}
                <strong className="font-bold text-[#333e48]">
                  {initialCodSettings.debtLimit}
                </strong>
              </p>
            </div>
          </div>

          {/* Card: Status */}
          <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs">
            <h2 className="text-[16px] font-bold text-[#2d3748] mb-5">
              Status
            </h2>

            <form onSubmit={handleSaveStatus}>
              {/* Radio Group */}
              <div className="flex items-center gap-12 mb-8">
                {/* Enable Radio */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setStatus("enable")}
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition ${
                      status === "enable"
                        ? "bg-[#00a99d] border-[#00a99d] text-white"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    {status === "enable" && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#333e48]">
                    Enable
                  </span>
                </label>

                {/* Disable Radio */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setStatus("disable")}
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition ${
                      status === "disable"
                        ? "bg-[#00a99d] border-[#00a99d] text-white"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    {status === "disable" && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#333e48]">
                    Disable
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#00a99d] hover:bg-[#008f85] text-white text-xs sm:text-[13px] font-semibold px-5 py-2 rounded-[4px] transition cursor-pointer shadow-2xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
