"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { initialVendorRefundRequests } from "./mockData";
import { VendorRefundRequest } from "./types";

export default function VendorRefundRequestsView() {
  const [requests] = useState<VendorRefundRequest[]>(initialVendorRefundRequests);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return (
          <span className="bg-[#85929e] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-[3px] inline-block whitespace-nowrap">
            Processing
          </span>
        );
      case "Approved":
        return (
          <span className="bg-[#27ae60] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-[3px] inline-block whitespace-nowrap">
            Approved
          </span>
        );
      case "Declined":
        return (
          <span className="bg-[#e74c3c] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-[3px] inline-block whitespace-nowrap">
            Declined
          </span>
        );
      default:
        return (
          <span className="bg-gray-400 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-[3px] inline-block">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Main Card */}
      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
        {/* Heading */}
        <h1 className="text-[17px] font-semibold text-gray-800 mb-6">
          Refund Requests
        </h1>

        {/* Table Container */}
        <div className="overflow-x-auto min-h-[160px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-t border-b border-[#dee2e6] text-[#495057] text-[13px] font-semibold">
                <th className="py-3 px-3 min-w-[320px]">Product</th>
                <th className="py-3 px-3 min-w-[100px]">Total</th>
                <th className="py-3 px-3 min-w-[140px]">Buyer</th>
                <th className="py-3 px-3 min-w-[120px]">Status</th>
                <th className="py-3 px-3 min-w-[130px]">Updated</th>
                <th className="py-3 px-3 min-w-[160px]">Date</th>
                <th className="py-3 px-3 min-w-[110px]">Options</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700 divide-y divide-[#dee2e6]/70">
              {requests.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#f8f9fa] transition-colors"
                >
                  {/* Product Title */}
                  <td className="py-3.5 px-3">
                    <Link
                      href={`/dashboard/refund-requests/${item.id}`}
                      className="text-[#2680eb] hover:underline font-normal text-[13px]"
                    >
                      {item.productTitle}
                    </Link>
                  </td>

                  {/* Total */}
                  <td className="py-3.5 px-3 text-gray-700 font-normal">
                    {item.total}
                  </td>

                  {/* Buyer */}
                  <td className="py-3.5 px-3">
                    <Link
                      href={`/dashboard/refund-requests/${item.id}`}
                      className="text-[#2680eb] hover:underline font-normal text-[13px]"
                    >
                      {item.buyer}
                    </Link>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3">
                    {getStatusBadge(item.status)}
                  </td>

                  {/* Updated */}
                  <td className="py-3.5 px-3 text-gray-600 whitespace-nowrap">
                    {item.updated}
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-3 text-gray-600 whitespace-nowrap">
                    {item.date}
                  </td>

                  {/* Options: Details Button */}
                  <td className="py-3.5 px-3">
                    <Link
                      href={`/dashboard/refund-requests/${item.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f1f2f4] hover:bg-[#e4e7ea] text-gray-700 text-[12px] font-medium rounded-[3px] border border-gray-200/80 transition-colors shadow-xs"
                    >
                      <Info className="w-3.5 h-3.5 text-gray-500 stroke-[2]" />
                      <span>Details</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info: Number of Entries */}
        <div className="mt-5 text-[12.5px] text-gray-600 font-normal">
          Number of Entries: {requests.length}
        </div>
      </div>
    </div>
  );
}
