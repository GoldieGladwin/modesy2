"use client";

import React, { useState } from "react";
import { EarningsRecord } from "./types";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface EarningsTabProps {
  earnings: EarningsRecord[];
}

export default function EarningsTab({ earnings }: EarningsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEarnings = earnings.filter((item) =>
    item.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.total.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.earnedAmount.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.date.includes(searchQuery)
  );

  return (
    <div className="bg-white border border-gray-200/90 rounded-sm shadow-xs overflow-hidden">
      {/* Optional search / quick filter bar for high usability */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/40">
        <div className="text-xs text-gray-500 font-medium">
          Showing <span className="text-gray-900 font-bold">{filteredEarnings.length}</span> recorded earnings
        </div>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by order #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-[#00a99d] transition"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-800 font-semibold text-[11px] sm:text-xs">
              <th className="py-3 px-4 font-semibold">Order</th>
              <th className="py-3 px-4 font-semibold">Total</th>
              <th className="py-3 px-4 font-semibold">VAT</th>
              <th className="py-3 px-4 font-semibold">Commissions & Discounts</th>
              <th className="py-3 px-4 font-semibold">Shipping Cost</th>
              <th className="py-3 px-4 font-semibold">Earned Amount</th>
              <th className="py-3 px-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {filteredEarnings.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-400 italic">
                  No records found!
                </td>
              </tr>
            ) : (
              filteredEarnings.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                  {/* Order */}
                  <td className="py-3.5 px-4 font-medium text-gray-900 align-top">
                    {item.orderNumber}
                  </td>

                  {/* Total */}
                  <td className="py-3.5 px-4 font-medium text-gray-800 align-top whitespace-nowrap">
                    {item.total} ({item.currency})
                  </td>

                  {/* VAT */}
                  <td className="py-3.5 px-4 text-gray-600 align-top">
                    {item.vat}
                  </td>

                  {/* Commissions & Discounts */}
                  <td className="py-3.5 px-4 align-top">
                    <div className="space-y-0.5 text-[#e74c3c] text-[11px]">
                      <div>
                        Commission: {item.commissions.commission} ({item.commissions.commissionRate})
                      </div>
                      <div>
                        Referrer Commission: {item.commissions.referrerCommission} ({item.commissions.referrerCommissionRate})
                      </div>
                      <div>
                        Referral Discount: {item.commissions.referralDiscount} ({item.commissions.referralDiscountRate})
                      </div>
                      <div>
                        Discount Coupon: {item.commissions.discountCoupon}
                      </div>
                    </div>
                  </td>

                  {/* Shipping Cost */}
                  <td className="py-3.5 px-4 text-gray-700 align-top">
                    {item.shippingCost}
                  </td>

                  {/* Earned Amount */}
                  <td className="py-3.5 px-4 align-top whitespace-nowrap">
                    <span className="font-bold text-[#27ae60]">
                      {item.earnedAmount}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-gray-600 align-top whitespace-nowrap">
                    {item.date}
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
