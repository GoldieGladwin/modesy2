"use client";

import React from "react";
import { ExpenseRecord } from "./types";

interface ExpensesTabProps {
  expenses: ExpenseRecord[];
  onViewInvoice: (expense: ExpenseRecord) => void;
}

export default function ExpensesTab({
  expenses,
  onViewInvoice,
}: ExpensesTabProps) {
  return (
    <div className="bg-white border border-gray-200/90 rounded-sm shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-800 font-semibold text-[11px] sm:text-xs">
              <th className="py-3 px-4 font-semibold">Payment Id</th>
              <th className="py-3 px-4 font-semibold">Expense</th>
              <th className="py-3 px-4 font-semibold">Expense Amount</th>
              <th className="py-3 px-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-400 italic">
                  No records found!
                </td>
              </tr>
            ) : (
              expenses.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                  {/* Payment Id */}
                  <td className="py-3.5 px-4 font-normal text-gray-800 align-top">
                    {item.paymentId}
                  </td>

                  {/* Expense Title */}
                  <td className="py-3.5 px-4 text-gray-800 align-top font-medium">
                    {item.expenseTitle}
                  </td>

                  {/* Expense Amount */}
                  <td className="py-3.5 px-4 align-top whitespace-nowrap">
                    <span className="font-semibold text-[#e74c3c]">
                      ${item.amount % 1 === 0 ? item.amount.toFixed(0) : item.amount.toFixed(2)} ({item.currency})
                    </span>
                  </td>

                  {/* Date & Invoice */}
                  <td className="py-3.5 px-4 align-top">
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
