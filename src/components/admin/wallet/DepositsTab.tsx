"use client";

import React from "react";
import { DepositRecord } from "./types";
import { Send, FileText } from "lucide-react";

interface DepositsTabProps {
  deposits: DepositRecord[];
  onReportBankTransfer: (deposit: DepositRecord) => void;
  onViewInvoice: (deposit: DepositRecord) => void;
}

export default function DepositsTab({
  deposits,
  onReportBankTransfer,
  onViewInvoice,
}: DepositsTabProps) {
  return (
    <div className="bg-white border border-gray-200/90 rounded-sm shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-800 font-semibold text-[11px] sm:text-xs">
              <th className="py-3 px-4 font-semibold">Payment Id</th>
              <th className="py-3 px-4 font-semibold">Payment Method</th>
              <th className="py-3 px-4 font-semibold">Deposit Amount</th>
              <th className="py-3 px-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {deposits.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-400 italic">
                  No records found!
                </td>
              </tr>
            ) : (
              deposits.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                  {/* Payment Id */}
                  <td className="py-4 px-4 font-normal text-gray-800 align-top">
                    {item.paymentId}
                  </td>

                  {/* Payment Method */}
                  <td className="py-4 px-4 text-gray-700 align-top">
                    {item.paymentMethod}
                  </td>

                  {/* Deposit Amount */}
                  <td className="py-4 px-4 align-top">
                    {item.status === "Pending Payment" ? (
                      <div>
                        <div className="text-gray-700 font-medium">
                          ${item.amount} ({item.currency}) - Pending Payment
                        </div>
                        <button
                          type="button"
                          onClick={() => onReportBankTransfer(item)}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[11px] font-semibold rounded-sm transition shadow-xs cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Report Bank Transfer</span>
                        </button>
                      </div>
                    ) : (
                      <span className="font-bold text-[#27ae60]">
                        ${item.amount} ({item.currency})
                      </span>
                    )}
                  </td>

                  {/* Date & Invoice */}
                  <td className="py-4 px-4 align-top">
                    <div className="text-gray-700">{item.date}</div>
                    <button
                      type="button"
                      onClick={() => onViewInvoice(item)}
                      className="text-[#007bff] hover:underline text-xs mt-1 block cursor-pointer"
                    >
                      View Invoice
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
