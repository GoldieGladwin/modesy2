import React from "react";
import { Metadata } from "next";
import { VendorRefundDetailView } from "@/components/vendor/refund-requests";

export const metadata: Metadata = {
  title: "Refund - Dashboard - Modesy",
  description: "View refund request discussion and product summary.",
};

export default async function DashboardRefundDetailUnderscorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <VendorRefundDetailView refundId={id} />;
}
