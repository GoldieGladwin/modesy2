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
    <div className="space-y-4">
      {/* Top right Action Button Bar */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNewPayoutRequest}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-[13px] font-medium rounded-[3px] transition shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Payout Request</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200/90 rounded-sm shadow-xs overflow-hidden">
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
                    <td className="py-3.5 px-4 font-normal text-gray-800">
                      {item.withdrawalMethod}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#e74c3c]">
                      ${item.withdrawalAmount.toFixed(0)} ({item.currency})
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-normal ${
                          item.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : item.status === "Approved"
                            ? "bg-blue-50 text-blue-700"
                            : item.status === "Rejected"
                            ? "bg-red-50 text-red-700"
                            : "bg-[#f1f3f5] text-[#495057]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">{item.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
