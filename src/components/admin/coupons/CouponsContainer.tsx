"use client";

import React, { useState } from "react";
import CouponsTable from "./CouponsTable";
import AddCouponModal from "./AddCouponModal";
import SelectProductsModal from "./SelectProductsModal";
import { CouponItem } from "./types";
import { initialCoupons } from "./mockData";

export default function CouponsContainer() {
  const [coupons, setCoupons] = useState<CouponItem[]>(initialCoupons);
  const [notification, setNotification] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<CouponItem | null>(null);

  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponItem | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleSaveCoupon = (couponData: {
    id?: number;
    code: string;
    discountRate: string;
    numberOfCoupons: number;
    expiryDate: string;
    status: "Active" | "Inactive";
  }) => {
    if (couponData.id) {
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === couponData.id
            ? {
                ...c,
                code: couponData.code,
                discountRate: couponData.discountRate,
                numberOfCoupons: couponData.numberOfCoupons,
                expiryDate: couponData.expiryDate,
                status: couponData.status,
              }
            : c
        )
      );
      showNotification(`Coupon "${couponData.code}" updated successfully.`);
    } else {
      const newCoupon: CouponItem = {
        id: Date.now(),
        code: couponData.code,
        discountRate: couponData.discountRate,
        numberOfCoupons: couponData.numberOfCoupons,
        usedCoupons: 0,
        expiryDate: couponData.expiryDate,
        status: couponData.status,
        date: new Date().toISOString().slice(0, 10) + " / " + new Date().toTimeString().slice(0, 5),
        selectedProductIds: [],
      };
      setCoupons((prev) => [newCoupon, ...prev]);
      showNotification(`Coupon "${couponData.code}" created successfully.`);
    }
  };

  const handleDelete = (id: number) => {
    const target = coupons.find((c) => c.id === id);
    if (
      confirm(
        `Are you sure you want to delete coupon "${target?.code || id}"?`
      )
    ) {
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      showNotification(`Coupon "${target?.code}" deleted successfully.`);
    }
  };

  const handleSaveProducts = (couponId: number, productIds: number[]) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === couponId ? { ...c, selectedProductIds: productIds } : c
      )
    );
    showNotification("Products updated for coupon.");
  };

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 sm:p-7 shadow-xs font-sans">
      {/* Top Bar: Title + Add Coupon Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[18px] font-bold text-[#2d3748]">
          Coupons
        </h1>
        <button
          type="button"
          onClick={() => {
            setEditingCoupon(null);
            setIsAddModalOpen(true);
          }}
          className="bg-[#00a65a] hover:bg-[#008d4c] text-white text-xs sm:text-[13px] font-semibold px-4 py-2 rounded-[4px] inline-flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <span className="text-base font-bold leading-none">+</span>
          <span>Add Coupon</span>
        </button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="mb-4 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-2xs">
          <span>{notification}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-[#155724] font-bold text-sm cursor-pointer ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* Table */}
      <CouponsTable
        coupons={coupons}
        onSelectProducts={(coupon) => {
          setSelectedCoupon(coupon);
          setIsProductsModalOpen(true);
        }}
        onEdit={(coupon) => {
          setEditingCoupon(coupon);
          setIsAddModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {/* Add / Edit Modal */}
      <AddCouponModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveCoupon}
        initialData={editingCoupon}
      />

      {/* Select Products Modal */}
      <SelectProductsModal
        isOpen={isProductsModalOpen}
        onClose={() => setIsProductsModalOpen(false)}
        coupon={selectedCoupon}
        onSave={handleSaveProducts}
      />
    </div>
  );
}
