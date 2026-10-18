"use client";

import React, { useState } from "react";
import { MembershipPaymentItem } from "./types";
import { initialMembershipPayments } from "./mockData";

export default function MembershipPaymentsTable() {
  const [payments] = useState<MembershipPaymentItem[]>(
    initialMembershipPayments
  );

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs font-sans">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-[18px] font-bold text-[#2d3748]">
          Membership Payments
        </h1>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#e9ecef] text-[#333e48] font-bold">
              <th className="py-3 px-3 font-bold">Id</th>
              <th className="py-3 px-3 font-bold">Payment Id</th>
              <th className="py-3 px-3 font-bold">Payment Method</th>
              <th className="py-3 px-3 font-bold">Membership Plan</th>
              <th className="py-3 px-3 font-bold">Payment Amount</th>
              <th className="py-3 px-3 font-bold">Payment Status</th>
              <th className="py-3 px-3 font-bold">Date</th>
              <th className="py-3 px-3 font-bold">Options</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
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
                  <td className="py-3 px-3 text-[#333e48]">{p.id}</td>
                  <td className="py-3 px-3 text-[#333e48]">{p.paymentId}</td>
                  <td className="py-3 px-3 text-[#333e48]">{p.paymentMethod}</td>
                  <td className="py-3 px-3 text-[#333e48]">{p.membershipPlan}</td>
                  <td className="py-3 px-3 text-[#333e48]">{p.paymentAmount}</td>
                  <td className="py-3 px-3 text-[#333e48]">{p.paymentStatus}</td>
                  <td className="py-3 px-3 text-[#333e48]">{p.date}</td>
                  <td className="py-3 px-3">
                    <button
                      type="button"
                      className="bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-3 py-1.5 rounded-[4px] transition cursor-pointer"
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
