import React from "react";
import { Metadata } from "next";
import { CouponSelectProductsView } from "@/components/vendor/coupons";

export const metadata: Metadata = {
  title: "Coupon Select Products - Dashboard - Modesy",
  description: "Select products and categories for this discount coupon.",
};

export default async function DashboardCouponProductsUnderscorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CouponSelectProductsView couponId={id} />;
}
