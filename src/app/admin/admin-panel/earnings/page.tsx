"use client";

import React, { useState } from "react";
import { ChevronDown, Trash2, Edit, Eye } from "lucide-react";

interface EarningRecord {
  id: number;
  orderNumber: string;
  user: string;
  total: string;
  vat: string;
  commission: string;
  commissionRate: string;
  referrerCommission: string;
  referrerCommissionRate: string;
  referralDiscount: string;
  referralDiscountRate: string;
  discountCoupon: string;
  shippingCost: string;
  earnedAmount: string;
  date: string;
  time: string;
}

const mockEarningsData: EarningRecord[] = [
  {
    id: 24,
    orderNumber: "#10033",
    user: "Admin",
    total: "$80",
    vat: "$0",
    commission: "$12",
    commissionRate: "15%",
    referrerCommission: "$0",
    referrerCommissionRate: "0%",
    referralDiscount: "$0",
    referralDiscountRate: "0%",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$68",
    date: "2026-10-04",
    time: "20:20",
  },
  {
    id: 23,
    orderNumber: "#10033",
    user: "Trendshop",
    total: "$69",
    vat: "$6.90 (10%)",
    commission: "$6.90",
    commissionRate: "10%",
    referrerCommission: "$0",
    referrerCommissionRate: "0%",
    referralDiscount: "$0",
    referralDiscountRate: "0%",
    discountCoupon: "$0",
    shippingCost: "$2",
    earnedAmount: "$71",
    date: "2026-10-04",
    time: "20:20",
  },
  {
    id: 22,
    orderNumber: "#10010",
    user: "Trendshop",
    total: "$69",
    vat: "$6.90 (10%)",
    commission: "$6.90",
    commissionRate: "10%",
    referrerCommission: "$0",
    referrerCommissionRate: "0%",
    referralDiscount: "$0",
    referralDiscountRate: "0%",
    discountCoupon: "$0",
    shippingCost: "$1.67",
    earnedAmount: "$70.67",
    date: "2026-09-25",
    time: "14:03",
  },
  {
    id: 21,
    orderNumber: "#10010",
    user: "Trendshop",
    total: "$40",
    vat: "$4 (10%)",
    commission: "$6",
    commissionRate: "15%",
    referrerCommission: "$0",
    referrerCommissionRate: "0%",
    referralDiscount: "$0",
    referralDiscountRate: "0%",
    discountCoupon: "$0",
    shippingCost: "$1.67",
    earnedAmount: "$39.67",
    date: "2026-09-25",
    time: "14:03",
  },
];

export default function EarningsPage() {
  const [earnings, setEarnings] = useState<EarningRecord[]>(mockEarningsData);
  const [showCount, setShowCount] = useState("15");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const filtered = earnings.filter((e) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.orderNumber.toLowerCase().includes(q) ||
      e.user.toLowerCase().includes(q)
    );
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this earning record?")) {
      setEarnings((prev) => prev.filter((item) => item.id !== id));
      setOpenDropdownId(null);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Page Title */}
      <h1 className="text-xl font-normal text-[#333333]">Earnings</h1>

      {/* Main Card Container */}
      <div className="bg-white border border-[#e4e6eb] rounded-sm shadow-xs p-5 space-y-4">
        {/* Filter Controls: Show & Search (Order Number) + Purple Filter Button */}
        <div className="flex flex-wrap items-end gap-3 text-xs text-[#333333]">
          {/* Show */}
          <div>
            <label className="block text-xs font-normal text-[#333333] mb-1">
              Show
            </label>
            <select
              value={showCount}
              onChange={(e) => setShowCount(e.target.value)}
              className="border border-[#cccccc] rounded-xs px-3 py-1.5 text-xs text-[#333333] bg-white min-w-[70px] focus:outline-hidden focus:border-[#17a2b8] cursor-pointer"
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="100">100</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-xs font-normal text-[#333333] mb-1">
              Search
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                placeholder="Order Number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 sm:w-56 border border-[#cccccc] rounded-xs px-2.5 py-1.5 text-xs text-[#333333] focus:outline-hidden focus:border-[#17a2b8]"
              />
              <button
                type="button"
                className="px-4 py-1.5 bg-[#6f42c1] hover:bg-[#5a32a3] text-white text-xs font-normal rounded-sm transition-colors cursor-pointer shrink-0"
              >
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Table Container (table-bordered, responsive) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#e4e6eb] border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#e4e6eb] text-[#333333]">
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-12">
                  Id
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-24">
                  Order
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[120px]">
                  User
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-20">
                  Total
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[100px]">
                  VAT
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] min-w-[240px]">
                  Commissions & Discounts
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-28">
                  Shipping Cost
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-28">
                  Earned Amount
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-36">
                  Date
                </th>
                <th className="px-3 py-3 font-bold text-center whitespace-nowrap w-36">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e4e6eb] hover:bg-gray-50/50 text-[#333333]"
                  >
                    {/* Id */}
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle whitespace-nowrap">
                      {item.id}
                    </td>

                    {/* Order */}
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle whitespace-nowrap font-normal text-[#007bff] hover:underline cursor-pointer">
                      {item.orderNumber}
                    </td>

                    {/* User */}
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle font-normal text-[#333333]">
                      {item.user}
                    </td>

                    {/* Total */}
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle whitespace-nowrap font-normal">
                      {item.total}
                    </td>

                    {/* VAT */}
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle whitespace-nowrap font-normal text-gray-700">
                      {item.vat}
                    </td>

                    {/* Commissions & Discounts (Stacked lines with percentages & amounts in red) */}
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle text-[11px] leading-relaxed">
                      <div className="space-y-0.5">
                        <div className="text-gray-500">
                          Commission:{" "}
                          <span className="text-red-500 font-semibold">
                            {item.commission} ({item.commissionRate})
                          </span>
                        </div>
                        <div className="text-gray-500">
                          Referrer Commission:{" "}
                          <span className="text-red-500 font-semibold">
                            {item.referrerCommission} ({item.referrerCommissionRate})
                          </span>
                        </div>
                        <div className="text-gray-500">
                          Referral Discount:{" "}
                          <span className="text-red-500 font-semibold">
                            {item.referralDiscount} ({item.referralDiscountRate})
                          </span>
                        </div>
                        <div className="text-gray-500">
                          Discount Coupon:{" "}
                          <span className="text-red-500 font-semibold">
                            {item.discountCoupon}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Shipping Cost */}
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle whitespace-nowrap font-normal">
                      {item.shippingCost}
                    </td>

                    {/* Earned Amount */}
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle whitespace-nowrap font-normal">
                      {item.earnedAmount}
                    </td>

                    {/* Date */}
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle whitespace-nowrap text-gray-600">
                      {item.date} / {item.time}
                    </td>

                    {/* Options: Purple Button */}
                    <td className="px-3 py-3.5 text-center align-middle relative">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdownId(
                              openDropdownId === item.id ? null : item.id
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6f42c1] hover:bg-[#5a32a3] text-white text-xs font-normal rounded-sm transition-colors cursor-pointer"
                        >
                          <span>Select an option</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdownId === item.id && (
                          <div className="absolute right-0 mt-1 w-40 bg-white border border-[#e4e6eb] rounded-sm shadow-md z-20 py-1 text-left text-xs">
                            <button
                              onClick={() => {
                                alert(`View details for Order ${item.orderNumber}`);
                                setOpenDropdownId(null);
                              }}
                              className="w-full px-3 py-1.5 text-left text-[#333333] hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-blue-600" />
                              <span>View Details</span>
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="w-full px-3 py-1.5 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="px-3 py-6 text-center text-gray-500 bg-white border-b border-[#e4e6eb]"
                  >
                    No records found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
