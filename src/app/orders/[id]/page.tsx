import React from "react";
import OrderDetailView from "@/components/admin/orders/OrderDetailView";

export const metadata = {
  title: "Order Details - Modesy",
  description: "View order summary, items, payment and shipping details.",
};

export default async function OrdersIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderDetailView orderId={id} />;
}
