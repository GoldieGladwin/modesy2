"use client";

import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { initialMembershipPayments } from "./mockData";

export default function MembershipPaymentsView() {
  const payments = initialMembershipPayments;

  return (
    <div className="w-full">
      {/* Main Card */}
      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
        {/* Title */}
        <h1 className="text-[17px] font-semibold text-gray-800 mb-6">
          Membership Payments
        </h1>

        {/* Table Container */}
        <div className="overflow-x-auto min-h-[220px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-t border-b border-[#dee2e6] text-[#495057] text-[13px] font-semibold">
                <th className="py-3 px-3 w-12">Id</th>
                <th className="py-3 px-3 min-w-[210px]">Payment Id</th>
                <th className="py-3 px-3 min-w-[130px]">Payment Method</th>
                <th className="py-3 px-3 min-w-[340px]">Membership Plan</th>
                <th className="py-3 px-3 min-w-[130px]">Payment Amount</th>
                <th className="py-3 px-3 min-w-[110px]">Payment Status</th>
                <th className="py-3 px-3 min-w-[150px]">Date</th>
                <th className="py-3 px-3 min-w-[120px]">Options</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700 divide-y divide-[#dee2e6]/70">
              {payments.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#f8f9fa] transition-colors"
                >
                  {/* Id */}
                  <td className="py-4 px-3 text-gray-600 font-normal">
                    {item.id}
                  </td>

                  {/* Payment Id */}
                  <td className="py-4 px-3 text-gray-600 font-normal">
                    {item.paymentId}
                  </td>

                  {/* Payment Method */}
                  <td className="py-4 px-3 text-gray-600 font-normal">
                    {item.paymentMethod}
                  </td>

                  {/* Membership Plan */}
                  <td className="py-4 px-3 text-gray-700 font-normal">
                    {item.membershipPlan}
                  </td>

                  {/* Payment Amount */}
                  <td className="py-4 px-3 text-gray-700 font-normal">
                    {item.paymentAmount}
                  </td>

                  {/* Payment Status */}
                  <td className="py-4 px-3 text-gray-700 font-normal">
                    {item.paymentStatus}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-3 text-gray-600 whitespace-nowrap">
                    {item.date}
                  </td>

                  {/* Options: View Invoice */}
                  <td className="py-4 px-3">
                    <Link
                      href={`/invoice-membership/${item.id}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[12px] font-medium rounded transition-colors shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Invoice</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info: Number of Entries */}
        <div className="mt-5 text-[12.5px] text-gray-600 font-normal">
          Number of Entries: {payments.length}
        </div>
      </div>
    </div>
  );
}
