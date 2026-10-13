"use client";

import React, { useState } from "react";
import { Copy, Check, Edit2, Trash2, Clock, Ticket } from "lucide-react";
import { Coupon } from "./types";

interface CouponTableProps {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
  onCopy: (code: string) => void;
  copiedCode: string | null;
}

export default function CouponTable({
  coupons,
  onEdit,
  onDelete,
  onCopy,
  copiedCode,
}: CouponTableProps) {
  const [localCopiedId, setLocalCopiedId] = useState<string | null>(null);

  const handleCopyCode = (coupon: Coupon) => {
    onCopy(coupon.code);
    setLocalCopiedId(coupon.id);
    setTimeout(() => {
      setLocalCopiedId(null);
    }, 2000);
  };

  const getStatusBadge = (status: Coupon["status"]) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active
          </span>
        );
      case "Scheduled":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            Scheduled
          </span>
        );
      case "Expired":
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-gray-100 text-gray-500 border border-gray-200">
            Expired
          </span>
        );
    }
  };

  if (coupons.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded p-12 text-center shadow-xs">
        <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-sm font-semibold text-gray-800">No coupons found</h3>
        <p className="text-xs text-gray-500 mt-1">
          No promotional coupons match the selected search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Coupon Code</th>
              <th className="py-3 px-4">Coupon Name</th>
              <th className="py-3 px-4">Discount</th>
              <th className="py-3 px-4">Minimum Purchase</th>
              <th className="py-3 px-4">Valid Until</th>
              <th className="py-3 px-4">Usage</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {coupons.map((coupon) => {
              const isCopied =
                copiedCode === coupon.code || localCopiedId === coupon.id;
              const usagePercent = Math.min(
                100,
                Math.round((coupon.usageCount / (coupon.usageLimit || 1)) * 100)
              );

              return (
                <tr
                  key={coupon.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  {/* Coupon Code */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-gray-900 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded text-xs">
                        {coupon.code}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(coupon)}
                        className="text-gray-400 hover:text-[#00a99d] transition cursor-pointer p-1"
                        title="Copy Code"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Coupon Name */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-gray-900">{coupon.name}</div>
                    <div className="text-[11px] text-gray-500">
                      {coupon.shopName} • {coupon.category}
                    </div>
                  </td>

                  {/* Discount */}
                  <td className="py-3.5 px-4 font-bold text-[#00a99d]">
                    {coupon.discountType === "percentage"
                      ? `${coupon.discountValue}% OFF`
                      : `$${coupon.discountValue}.00 OFF`}
                  </td>

                  {/* Minimum Purchase */}
                  <td className="py-3.5 px-4 text-gray-600">
                    {coupon.minPurchase > 0 ? (
                      <span className="font-medium text-gray-800">
                        ${coupon.minPurchase}.00
                      </span>
                    ) : (
                      <span className="text-gray-400">No minimum</span>
                    )}
                  </td>

                  {/* Valid Until */}
                  <td className="py-3.5 px-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400 shrink-0" />
                      <span className="font-medium">{coupon.expirationDate}</span>
                    </div>
                    {coupon.status === "Scheduled" && (
                      <div className="text-[10px] text-blue-600">
                        Starts: {coupon.startDate}
                      </div>
                    )}
                  </td>

                  {/* Usage */}
                  <td className="py-3.5 px-4 min-w-[130px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-medium text-gray-800">
                        {coupon.usageCount} / {coupon.usageLimit}
                      </span>
                      <span className="text-gray-500">{usagePercent}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          usagePercent >= 100
                            ? "bg-red-500"
                            : usagePercent >= 75
                            ? "bg-amber-500"
                            : "bg-[#00a99d]"
                        }`}
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">{getStatusBadge(coupon.status)}</td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onEdit(coupon)}
                        className="px-2.5 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-gray-200 rounded font-medium transition cursor-pointer flex items-center gap-1 text-[11px]"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(coupon)}
                        className="px-2.5 py-1 text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-200 rounded font-medium transition cursor-pointer flex items-center gap-1 text-[11px]"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
