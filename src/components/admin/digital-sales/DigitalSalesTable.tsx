"use client";

import React from "react";
import { DigitalSale } from "./types";
import DigitalSalesRowOptions from "./DigitalSalesRowOptions";

interface DigitalSalesTableProps {
  sales: DigitalSale[];
  onViewDetails?: (sale: DigitalSale) => void;
  onDelete?: (saleId: number) => void;
}

export default function DigitalSalesTable({
  sales,
  onViewDetails,
  onDelete,
}: DigitalSalesTableProps) {
  if (sales.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500 bg-white border border-gray-100 rounded-[4px]">
        <p className="text-[14px]">No records found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-[#333333] text-[14px] font-semibold">
            <th className="py-3 px-3.5 font-semibold w-12">Id</th>
            <th className="py-3 px-3.5 font-semibold">Order</th>
            <th className="py-3 px-3.5 font-semibold">Purchase Code</th>
            <th className="py-3 px-3.5 font-semibold">Seller</th>
            <th className="py-3 px-3.5 font-semibold">Buyer</th>
            <th className="py-3 px-3.5 font-semibold">Total</th>
            <th className="py-3 px-3.5 font-semibold">Currency</th>
            <th className="py-3 px-3.5 font-semibold">Date</th>
            <th className="py-3 px-3.5 font-semibold">Options</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-[14px]">
          {sales.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-[#fbfcfd] transition-colors text-[#555555]"
            >
              <td className="py-3.5 px-3.5 text-[#6c757d]">{item.id}</td>
              <td className="py-3.5 px-3.5 text-[#333333] font-medium whitespace-nowrap">
                {item.order}
              </td>
              <td className="py-3.5 px-3.5 text-[#6c757d] text-[13px] font-mono break-all max-w-[280px]">
                {item.purchaseCode}
              </td>
              <td className="py-3.5 px-3.5 whitespace-nowrap">{item.seller}</td>
              <td className="py-3.5 px-3.5 whitespace-nowrap">{item.buyer}</td>
              <td className="py-3.5 px-3.5 font-bold text-[#212529] whitespace-nowrap">
                {item.total}
              </td>
              <td className="py-3.5 px-3.5 whitespace-nowrap">{item.currency}</td>
              <td className="py-3.5 px-3.5 text-[13px] text-[#777777] whitespace-nowrap">
                {item.date}
              </td>
              <td className="py-3.5 px-3.5 whitespace-nowrap">
                <DigitalSalesRowOptions
                  sale={item}
                  onViewDetails={onViewDetails}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
