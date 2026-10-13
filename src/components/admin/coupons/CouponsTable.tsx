"use client";

import React from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { CouponItem } from "./types";

interface CouponsTableProps {
  coupons: CouponItem[];
  onSelectProducts: (coupon: CouponItem) => void;
  onEdit: (coupon: CouponItem) => void;
  onDelete: (id: number) => void;
}

export default function CouponsTable({
  coupons,
  onSelectProducts,
  onEdit,
  onDelete,
}: CouponsTableProps) {
  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse border border-[#e9ecef] text-xs">
          <thead>
            <tr className="bg-white text-[#333e48] font-bold">
              <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[130px]">
                Coupon Code
              </th>
              <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[120px]">
                Discount Rate
              </th>
              <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[160px]">
                Number of Coupons
              </th>
              <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[160px]">
                Expiry Date
              </th>
              <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[90px]">
                Status
              </th>
              <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[160px]">
                Date
              </th>
              <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[140px]">
                Products
              </th>
              <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[90px]">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-sm text-gray-500 font-medium border border-[#e9ecef]"
                >
                  No records found!
                </td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr
                  key={coupon.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Coupon Code */}
                  <td className="py-3 px-3 align-middle border border-[#e9ecef] text-[#333e48] text-xs font-normal">
                    {coupon.code}
                  </td>

                  {/* Discount Rate */}
                  <td className="py-3 px-3 align-middle border border-[#e9ecef] text-[#333e48] text-xs font-normal">
                    {coupon.discountRate}
                  </td>

                  {/* Number of Coupons */}
                  <td className="py-3 px-3 align-middle border border-[#e9ecef] text-[#333e48] text-xs font-normal">
                    {coupon.numberOfCoupons}{" "}
                    <span className="text-[#d9534f]">
                      (Used: {coupon.usedCoupons})
                    </span>
                  </td>

                  {/* Expiry Date */}
                  <td className="py-3 px-3 align-middle border border-[#e9ecef] text-[#333e48] text-xs font-normal">
                    {coupon.expiryDate}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 align-middle border border-[#e9ecef]">
                    <span
                      className={`inline-block text-white text-[11px] font-bold px-2.5 py-1 rounded-[4px] ${
                        coupon.status === "Active"
                          ? "bg-[#00a65a]"
                          : "bg-gray-400"
                      }`}
                    >
                      {coupon.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-3 align-middle border border-[#e9ecef] text-[#333e48] text-xs font-normal">
                    {coupon.date}
                  </td>

                  {/* Products */}
                  <td className="py-3 px-3 align-middle border border-[#e9ecef]">
                    <button
                      type="button"
                      onClick={() => onSelectProducts(coupon)}
                      className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-3 py-1.5 rounded-[4px] transition cursor-pointer shadow-2xs whitespace-nowrap"
                    >
                      Select Products
                    </button>
                  </td>

                  {/* Options */}
                  <td className="py-3 px-3 align-middle border border-[#e9ecef]">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onEdit(coupon)}
                        className="w-7 h-7 bg-[#eaedf1] hover:bg-[#dde1e7] text-[#495057] rounded-[3px] flex items-center justify-center transition cursor-pointer"
                        title="Edit"
                      >
                        <SquarePen className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(coupon.id)}
                        className="w-7 h-7 bg-[#eaedf1] hover:bg-red-50 hover:text-red-600 text-[#495057] rounded-[3px] flex items-center justify-center transition cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Number of Entries */}
      <div className="mt-6 text-xs text-[#333e48]">
        Number of Entries:{" "}
        <strong className="font-bold">{coupons.length}</strong>
      </div>
    </div>
  );
}
