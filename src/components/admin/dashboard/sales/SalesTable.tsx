"use client";

import React from "react";
import { SaleItem } from "./types";
import SalesTableRow from "./SalesTableRow";

interface SalesTableProps {
  sales: SaleItem[];
  emptyMessage?: string;
  onViewDetails: (sale: SaleItem) => void;
}

export default function SalesTable({
  sales,
  emptyMessage = "No records found!",
  onViewDetails,
}: SalesTableProps) {
  return (
    <div className="w-full overflow-x-auto border-t border-[#f0f0f0]">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-[#e2e8f0] bg-white text-[#333] font-bold">
            <th className="py-3 px-3 min-w-[90px] font-bold">Sale</th>
            <th className="py-3 px-3 min-w-[90px] font-bold">Total</th>
            <th className="py-3 px-3 min-w-[150px] font-bold">Payment Status</th>
            <th className="py-3 px-3 min-w-[120px] font-bold">Status</th>
            <th className="py-3 px-3 min-w-[170px] font-bold">Date</th>
            <th className="py-3 px-3 min-w-[110px] font-bold">Options</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <SalesTableRow
                key={sale.id}
                sale={sale}
                onViewDetails={onViewDetails}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="py-12 text-center text-[#555] text-xs font-normal"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
