import React from "react";
import { Metadata } from "next";
import { EditCouponView } from "@/components/vendor/coupons";

export const metadata: Metadata = {
  title: "Edit Coupon - Dashboard - Modesy",
  description: "Edit discount coupon details.",
};

export default async function DashboardEditCouponUnderscorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditCouponView couponId={id} />;
}
