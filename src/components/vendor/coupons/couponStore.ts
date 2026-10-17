"use client";

import { VendorCoupon } from "./types";
import { INITIAL_VENDOR_COUPONS } from "./mockData";

let couponsState: VendorCoupon[] = [...INITIAL_VENDOR_COUPONS];
const listeners: Array<() => void> = [];

function notify() {
  listeners.forEach((l) => l());
}

export function subscribeCoupons(listener: () => void) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function getCoupons(): VendorCoupon[] {
  return couponsState;
}

export function getCouponById(id: string): VendorCoupon | undefined {
  return couponsState.find((c) => c.id === id);
}

export function addCoupon(coupon: Omit<VendorCoupon, "id" | "createdAt" | "usedCount">): VendorCoupon {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} / ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const newCoupon: VendorCoupon = {
    ...coupon,
    id: String(Date.now()),
    usedCount: 0,
    createdAt: dateStr,
  };
  couponsState = [newCoupon, ...couponsState];
  notify();
  return newCoupon;
}

export function updateCoupon(id: string, updated: Partial<VendorCoupon>) {
  couponsState = couponsState.map((c) =>
    c.id === id ? { ...c, ...updated } : c
  );
  notify();
}

export function deleteCoupon(id: string) {
  couponsState = couponsState.filter((c) => c.id !== id);
  notify();
}

export function toggleProductSelection(couponId: string, productId: number) {
  const coupon = getCouponById(couponId);
  if (!coupon) return;

  const exists = coupon.selectedProductIds.includes(productId);
  const updatedIds = exists
    ? coupon.selectedProductIds.filter((id) => id !== productId)
    : [...coupon.selectedProductIds, productId];

  updateCoupon(couponId, { selectedProductIds: updatedIds });
}

export function toggleCategorySelection(couponId: string, category: string, categoryProductIds: number[]) {
  const coupon = getCouponById(couponId);
  if (!coupon) return;

  const isCatSelected = coupon.selectedCategories.includes(category);
  const updatedCategories = isCatSelected
    ? coupon.selectedCategories.filter((c) => c !== category)
    : [...coupon.selectedCategories, category];

  let updatedProductIds = [...coupon.selectedProductIds];
  if (!isCatSelected) {
    // Select all products in this category
    categoryProductIds.forEach((id) => {
      if (!updatedProductIds.includes(id)) {
        updatedProductIds.push(id);
      }
    });
  } else {
    // Deselect all products in this category
    updatedProductIds = updatedProductIds.filter((id) => !categoryProductIds.includes(id));
  }

  updateCoupon(couponId, {
    selectedCategories: updatedCategories,
    selectedProductIds: updatedProductIds,
  });
}
