import React from "react";
import RefundDetailView from "@/components/admin/orders/RefundDetailView";

export const metadata = {
  title: "Refund - Modesy",
  description: "View refund request details and messages.",
};

export default async function RefundDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RefundDetailView refundId={id} />;
}
