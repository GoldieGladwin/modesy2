"use client";

import React from "react";
import { PayoutRequestRecord } from "./types";
import { Plus } from "lucide-react";

interface PayoutsTabProps {
  payouts: PayoutRequestRecord[];
  onNewPayoutRequest: () => void;
}

export default function PayoutsTab({
  payouts,
  onNewPayoutRequest,
}: PayoutsTabProps) {
  return (
    <div className="bg-white border border-gray-200/90 rounded-sm shadow-xs overflow-hidden">
      {/* Top right Action Button Bar */}
      <div className="p-4 flex justify-end border-b border-gray-100">
        <button
          type="button"
          onClick={onNewPayoutRequest}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-sm transition shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Payout Request</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-800 font-semibold text-[11px] sm:text-xs">
              <th className="py-3 px-4 font-semibold">Withdrawal Method</th>
              <th className="py-3 px-4 font-semibold">Withdrawal Amount</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {payouts.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-gray-400 font-normal">
                  No records found!
                </td>
              </tr>
            ) : (
              payouts.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-gray-900">
                    {item.withdrawalMethod}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    ${item.withdrawalAmount.toFixed(2)} ({item.currency})
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Approved"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">{item.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
