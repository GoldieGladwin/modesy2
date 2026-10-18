"use client";

import React from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { SaleItem } from "./types";

interface SalesTableRowProps {
  sale: SaleItem;
  onViewDetails: (sale: SaleItem) => void;
}

export default function SalesTableRow({
  sale,
  onViewDetails,
}: SalesTableRowProps) {
  return (
    <tr className="border-b border-[#f4f4f4] hover:bg-[#fafafa]/80 transition-colors text-xs text-[#555] align-middle">
      {/* 1. Sale ID */}
      <td className="py-3.5 px-3 text-[#333] font-normal whitespace-nowrap">
        #{sale.id}
      </td>

      {/* 2. Total */}
      <td className="py-3.5 px-3 text-[#333] font-normal whitespace-nowrap">
        {sale.total}
      </td>

      {/* 3. Payment Status */}
      <td className="py-3.5 px-3 text-[#333] font-normal whitespace-nowrap">
        {sale.paymentStatus}
      </td>

      {/* 4. Status Badge */}
      <td className="py-3.5 px-3 whitespace-nowrap">
        {sale.status === "Processing" && (
          <span className="inline-block bg-[#00ab80] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[3px]">
            Processing
          </span>
        )}
        {sale.status === "Completed" && (
          <span className="inline-block bg-[#6c757d] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[3px]">
            Completed
          </span>
        )}
        {sale.status === "Cancelled" && (
          <span className="inline-block bg-[#dc3545] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[3px]">
            Cancelled
          </span>
        )}
      </td>

      {/* 5. Date */}
      <td className="py-3.5 px-3 text-[#333] whitespace-nowrap">
        {sale.date}
      </td>

      {/* 6. Options */}
      <td className="py-3.5 px-3 whitespace-nowrap">
        <Link
          href={`/dashboard/sale/${sale.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e2e5f1] hover:bg-[#d5d9e8] text-[#4a5568] text-xs font-medium rounded-[3px] transition cursor-pointer"
        >
          <Info className="w-3.5 h-3.5 text-[#4a5568]" />
          <span>Details</span>
        </Link>
      </td>
    </tr>
  );
}
