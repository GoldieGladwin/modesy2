"use client";

import React, { useState } from "react";
import { FileText } from "lucide-react";
import { PromotionPaymentItem } from "./types";
import { initialPromotionPayments } from "./mockData";
import InvoiceModal from "./InvoiceModal";

export default function PromotionPaymentsTable() {
  const [payments] = useState<PromotionPaymentItem[]>(
    initialPromotionPayments
  );
  const [selectedInvoice, setSelectedInvoice] =
    useState<PromotionPaymentItem | null>(null);

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs font-sans">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-[18px] font-bold text-[#2d3748]">
          Promotion Payments
        </h1>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#e9ecef] text-[#333e48] font-bold">
              <th className="py-3 px-3 font-bold w-10">Id</th>
              <th className="py-3 px-3 font-bold min-w-[200px]">Payment Id</th>
              <th className="py-3 px-3 font-bold min-w-[120px]">
                Payment Method
              </th>
              <th className="py-3 px-3 font-bold min-w-[90px]">Product Id</th>
              <th className="py-3 px-3 font-bold min-w-[130px]">
                Payment Amount
              </th>
              <th className="py-3 px-3 font-bold min-w-[110px]">
                Payment Status
              </th>
              <th className="py-3 px-3 font-bold min-w-[150px]">
                Purchased Plan
              </th>
              <th className="py-3 px-3 font-bold min-w-[140px]">Date</th>
              <th className="py-3 px-3 font-bold min-w-[120px]">Options</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-12 text-center text-[#555] text-xs font-normal"
                >
                  No records found!
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-[#f1f3f5] hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-3.5 px-3 text-[#333e48]">{p.id}</td>
                  <td className="py-3.5 px-3 text-[#333e48] font-normal break-all">
                    {p.paymentId}
                  </td>
                  <td className="py-3.5 px-3 text-[#333e48]">
                    {p.paymentMethod}
                  </td>
                  <td className="py-3.5 px-3 text-[#333e48]">{p.productId}</td>
                  <td className="py-3.5 px-3 text-[#333e48]">
                    {p.paymentAmount}
                  </td>
                  <td className="py-3.5 px-3 text-[#333e48]">
                    {p.paymentStatus}
                  </td>
                  <td className="py-3.5 px-3 text-[#333e48] leading-snug">
                    {p.purchasedPlan}
                  </td>
                  <td className="py-3.5 px-3 text-[#333e48] whitespace-nowrap">
                    {p.date}
                  </td>
                  <td className="py-3.5 px-3">
                    <button
                      type="button"
                      onClick={() => setSelectedInvoice(p)}
                      className="inline-flex items-center gap-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-3 py-1.5 rounded-[4px] transition cursor-pointer shadow-2xs whitespace-nowrap"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Invoice</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        payment={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
}
