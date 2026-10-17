"use client";

import React, { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";

interface Transaction {
  id: string;
  orderNumber: string;
  commission: string;
  date: string;
}

export default function CashOnDeliveryView() {
  const [status, setStatus] = useState<"enable" | "disable">("disable");
  const [transactions] = useState<Transaction[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("Cash on delivery settings saved successfully!");
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-xs font-medium px-4 py-3 rounded shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Title & Subtitle */}
      <div className="mb-6">
        <h1 className="text-[17px] font-semibold text-gray-800 leading-tight">
          Cash on Delivery
        </h1>
        <p className="text-[12.5px] text-gray-500 mt-1">
          Sell your products with pay on delivery option
        </p>
      </div>

      {/* Responsive Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Transactions & Warning Banner (Col Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Transactions Card */}
          <div className="bg-white rounded border border-[#e4e7ea] p-5 shadow-sm">
            <h2 className="text-[14px] font-semibold text-gray-800 mb-4">
              Transactions
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-t border-b border-[#dee2e6] text-[#495057] text-[13px] font-semibold">
                    <th className="py-3 px-3 w-1/3">Order</th>
                    <th className="py-3 px-3 w-1/3">Commission</th>
                    <th className="py-3 px-3 w-1/3">Date</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-gray-700 divide-y divide-[#dee2e6]/70">
                  {transactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-12 text-center text-gray-400 text-[13px]"
                      >
                        No records found!
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="hover:bg-[#f8f9fa] transition-colors"
                      >
                        <td className="py-3.5 px-3 text-[#2680eb] hover:underline cursor-pointer">
                          {tx.orderNumber}
                        </td>
                        <td className="py-3.5 px-3">{tx.commission}</td>
                        <td className="py-3.5 px-3 text-gray-600">{tx.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Warning Banner Callout */}
          <div className="bg-[#e8f8f0] border border-[#cdeedb] rounded p-4 text-[12.5px] text-[#13775a] leading-relaxed">
            <span className="font-bold text-[#155724]">Warning! </span>
            Cash on Delivery commissions will be automatically deducted from your
            wallet balance. If your wallet has insufficient funds, the commission
            will be added as a debt. When these debts exceed the specified debt
            limit, this payment option will be automatically disabled for your
            store.
          </div>
        </div>

        {/* Right Column: Commission Debt & Status Cards (Col Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Commission Debt Card */}
          <div className="bg-white rounded border border-[#e4e7ea] p-5 shadow-sm">
            <h2 className="text-[14px] font-semibold text-gray-800 mb-3">
              Commission Debt
            </h2>
            <div className="text-[13px]">
              <p className="font-semibold text-[#20c997] mb-1">
                You have no debt.
              </p>
              <p className="text-gray-500 text-[12.5px]">
                Commission Debt Limit:{" "}
                <span className="font-bold text-gray-800">$30</span>
              </p>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded border border-[#e4e7ea] p-5 shadow-sm">
            <h2 className="text-[14px] font-semibold text-gray-800 mb-4">
              Status
            </h2>

            <form onSubmit={handleSave}>
              <div className="flex items-center gap-10 mb-6">
                {/* Enable Radio */}
                <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#444] font-normal group">
                  <input
                    type="radio"
                    name="cod_status"
                    value="enable"
                    checked={status === "enable"}
                    onChange={() => setStatus("enable")}
                    className="sr-only"
                  />
                  <div
                    className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                      status === "enable"
                        ? "bg-[#20c997] border border-[#20c997]"
                        : "border border-[#c2c5c9] bg-white group-hover:border-[#999]"
                    }`}
                  >
                    {status === "enable" && (
                      <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                    )}
                  </div>
                  <span>Enable</span>
                </label>

                {/* Disable Radio */}
                <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#444] font-normal group">
                  <input
                    type="radio"
                    name="cod_status"
                    value="disable"
                    checked={status === "disable"}
                    onChange={() => setStatus("disable")}
                    className="sr-only"
                  />
                  <div
                    className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                      status === "disable"
                        ? "bg-[#20c997] border border-[#20c997]"
                        : "border border-[#c2c5c9] bg-white group-hover:border-[#999]"
                    }`}
                  >
                    {status === "disable" && (
                      <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                    )}
                  </div>
                  <span>Disable</span>
                </label>
              </div>

              {/* Save Changes Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#20c997] hover:bg-[#1bb285] text-white text-[13px] font-medium rounded transition-colors shadow-sm cursor-pointer"
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
