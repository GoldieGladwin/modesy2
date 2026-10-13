import React from "react";
import RefundDetailView from "@/components/admin/orders/RefundDetailView";

export const metadata = {
  title: "Refund Request Details - Modesy",
  description: "View refund request discussion and product summary.",
};

export default async function RefundDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RefundDetailView refundId={id} />;
}
