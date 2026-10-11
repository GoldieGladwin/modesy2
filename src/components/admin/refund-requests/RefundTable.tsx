"use client";

import React from "react";
import Link from "next/link";
import { Info, Check } from "lucide-react";
import { RefundRequestItem } from "./types";

interface RefundTableProps {
  refunds: RefundRequestItem[];
  onOpenDetails: (item: RefundRequestItem) => void;
  onApprove: (id: number) => void;
}

export default function RefundTable({
  refunds,
  onOpenDetails,
  onApprove,
}: RefundTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-[3px] shadow-2xs overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-200 bg-white text-[#333333] font-semibold">
              <th className="py-3 px-3 min-w-[220px]">Product</th>
              <th className="py-3 px-3 w-20">Total</th>
              <th className="py-3 px-3 w-32">Commission Rate</th>
              <th className="py-3 px-3 w-44">Earned Amount</th>
              <th className="py-3 px-3 w-28">Buyer</th>
              <th className="py-3 px-3 w-28">Seller</th>
              <th className="py-3 px-3 w-28">Status</th>
              <th className="py-3 px-3 w-28">Updated</th>
              <th className="py-3 px-3 w-36">Date</th>
              <th className="py-3 px-3 w-48 text-right">Options</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-gray-700">
            {refunds.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="py-12 text-center text-sm text-gray-500 font-medium"
                >
                  No records found!
                </td>
              </tr>
            ) : (
              refunds.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  {/* Product */}
                  <td className="py-3 px-3 font-medium">
                    <span className="text-[#007bff] hover:underline cursor-pointer">
                      {item.orderNumber} - {item.productTitle}
                    </span>
                  </td>

                  {/* Total */}
                  <td className="py-3 px-3 font-semibold text-gray-800">
                    {item.total}
                  </td>

                  {/* Commission Rate */}
                  <td className="py-3 px-3 text-gray-600">
                    {item.commissionRate}
                  </td>

                  {/* Earned Amount */}
                  <td className="py-3 px-3">
                    {item.earnedAmount.startsWith("$") ? (
                      <span className="font-semibold text-gray-800">
                        {item.earnedAmount}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-[11px]">
                        {item.earnedAmount}
                      </span>
                    )}
                  </td>

                  {/* Buyer */}
                  <td className="py-3 px-3">
                    <span className="text-[#007bff] hover:underline font-medium cursor-pointer">
                      {item.buyer}
                    </span>
                  </td>

                  {/* Seller */}
                  <td className="py-3 px-3">
                    <span className="text-[#007bff] hover:underline font-medium cursor-pointer">
                      {item.seller}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-[3px] text-[11px] font-semibold ${
                        item.status === "Processing"
                          ? "bg-[#e4e7ea] text-gray-700"
                          : item.status === "Refund Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Updated */}
                  <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                    {item.updated}
                  </td>

                  {/* Date */}
                  <td className="py-3 px-3 text-gray-500 font-mono text-[11px] whitespace-nowrap">
                    {item.date}
                  </td>

                  {/* Options */}
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onOpenDetails(item)}
                        className="inline-flex items-center gap-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-[3px] shadow-2xs transition cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-gray-600" />
                        <span>Details</span>
                      </button>

                      {item.status === "Processing" && (
                        <button
                          type="button"
                          onClick={() => onApprove(item.id)}
                          className="inline-flex items-center gap-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-[3px] shadow-2xs transition cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5 text-gray-600" />
                          <span>Approve Refund</span>
                        </button>
                      )}
                    </div>
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
