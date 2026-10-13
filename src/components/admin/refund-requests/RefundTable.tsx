"use client";

import React from "react";
import { Info } from "lucide-react";
import { RefundRequestItem } from "./types";

interface RefundTableProps {
  refunds: RefundRequestItem[];
  onOpenDetails: (item: RefundRequestItem) => void;
}

export default function RefundTable({
  refunds,
  onOpenDetails,
}: RefundTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse border border-[#e9ecef] text-xs">
        <thead>
          <tr className="bg-white text-[#333e48] font-bold">
            <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[280px]">
              Product
            </th>
            <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[90px]">
              Total
            </th>
            <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[110px]">
              Buyer
            </th>
            <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[110px]">
              Status
            </th>
            <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[130px]">
              Updated
            </th>
            <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[150px]">
              Date
            </th>
            <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[110px]">
              Options
            </th>
          </tr>
        </thead>

        <tbody>
          {refunds.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-12 text-center text-sm text-gray-500 font-medium border border-[#e9ecef]"
              >
                No records found!
              </td>
            </tr>
          ) : (
            refunds.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                {/* Product */}
                <td className="py-3 px-3 align-middle border border-[#e9ecef]">
                  <span
                    onClick={() => onOpenDetails(item)}
                    className="text-[#337ab7] hover:underline cursor-pointer font-normal text-xs"
                  >
                    {item.orderNumber} - {item.productTitle}
                  </span>
                </td>

                {/* Total */}
                <td className="py-3 px-3 align-middle border border-[#e9ecef] text-[#333e48] font-normal text-xs">
                  {item.total}
                </td>

                {/* Buyer */}
                <td className="py-3 px-3 align-middle border border-[#e9ecef]">
                  <span className="text-[#337ab7] font-semibold text-xs cursor-pointer">
                    {item.buyer}
                  </span>
                </td>

                {/* Status */}
                <td className="py-3 px-3 align-middle border border-[#e9ecef]">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-[4px] text-[11px] font-semibold whitespace-nowrap ${
                      item.status === "Processing"
                        ? "bg-[#cbd5e1] text-[#334155]"
                        : item.status === "Refund Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Updated */}
                <td className="py-3 px-3 align-middle border border-[#e9ecef] text-[#333e48] text-xs whitespace-nowrap font-normal">
                  {item.updated}
                </td>

                {/* Date */}
                <td className="py-3 px-3 align-middle border border-[#e9ecef] text-[#333e48] text-xs whitespace-nowrap font-normal">
                  {item.date}
                </td>

                {/* Options */}
                <td className="py-3 px-3 align-middle border border-[#e9ecef]">
                  <button
                    type="button"
                    onClick={() => onOpenDetails(item)}
                    className="inline-flex items-center gap-1.5 bg-[#eaedf1] hover:bg-[#dde1e7] text-[#495057] text-xs font-semibold px-3 py-1.5 rounded-[4px] transition cursor-pointer shadow-2xs whitespace-nowrap"
                  >
                    <Info className="w-3.5 h-3.5 fill-[#495057] text-[#eaedf1]" />
                    <span>Details</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
