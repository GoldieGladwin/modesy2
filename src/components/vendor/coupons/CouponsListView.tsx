"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Edit3, Trash2, CheckCircle2 } from "lucide-react";
import { getCoupons, deleteCoupon, subscribeCoupons } from "./couponStore";
import { VendorCoupon } from "./types";

export default function CouponsListView() {
  const [coupons, setCoupons] = useState<VendorCoupon[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const sync = () => setCoupons([...getCoupons()]);
    sync();
    return subscribeCoupons(sync);
  }, []);

  const handleDeleteCoupon = (id: string, code: string) => {
    if (confirm(`Are you sure you want to delete coupon "${code}"?`)) {
      deleteCoupon(id);
      showToast("Coupon deleted successfully!");
    }
  };

  return (
    <div className="w-full">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-xs font-medium px-4 py-3 rounded shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100">
          <h1 className="text-[16px] font-semibold text-gray-800">Coupons</h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-700 text-[12.5px] font-semibold">
                <th className="py-3 px-3.5">Coupon Code</th>
                <th className="py-3 px-3.5">Discount Rate</th>
                <th className="py-3 px-3.5">Number of Coupons</th>
                <th className="py-3 px-3.5">Expiry Date</th>
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5">Date</th>
                <th className="py-3 px-3.5">Products</th>
                <th className="py-3 px-3.5 text-center">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[13px]">
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400">
                    No coupons found.
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr
                    key={coupon.id}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-3.5 font-normal text-gray-800 align-middle">
                      {coupon.code}
                    </td>
                    <td className="py-3.5 px-3.5 text-gray-700 align-middle">
                      {coupon.discountRate}%
                    </td>
                    <td className="py-3.5 px-3.5 text-gray-700 align-middle">
                      <span>{coupon.numberOfCoupons} </span>
                      <span className="text-[#e74c3c]">
                        (Used: {coupon.usedCount})
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5 text-gray-700 align-middle whitespace-nowrap">
                      {coupon.expiryDate}
                    </td>
                    <td className="py-3.5 px-3.5 align-middle">
                      <span className="inline-block bg-[#20c997] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-[3px] capitalize">
                        {coupon.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5 text-gray-700 align-middle whitespace-nowrap">
                      {coupon.createdAt}
                    </td>
                    <td className="py-3.5 px-3.5 align-middle">
                      <Link
                        href={`/dashboard/coupon_products/${coupon.id}`}
                        className="inline-block px-3 py-1 bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-[12px] font-medium rounded-[3px] transition-colors shadow-2xs text-center whitespace-nowrap"
                      >
                        Select Products
                      </Link>
                    </td>
                    <td className="py-3.5 px-3.5 align-middle text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          href={`/dashboard/edit_coupon/${coupon.id}`}
                          className="w-7 h-7 rounded border border-gray-200 bg-gray-50/80 flex items-center justify-center text-gray-600 hover:text-[#20c997] hover:bg-gray-100 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteCoupon(coupon.id, coupon.code)
                          }
                          className="w-7 h-7 rounded border border-gray-200 bg-gray-50/80 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-gray-100 transition-colors cursor-pointer"
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

        {/* Footer Entry Count */}
        <div className="pt-6 text-[12.5px] text-gray-700">
          <span>Number of Entries: </span>
          <span className="font-semibold">{coupons.length}</span>
        </div>
      </div>
    </div>
  );
}
