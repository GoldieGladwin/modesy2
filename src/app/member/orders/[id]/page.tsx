import React from "react";
import OrderDetailView from "@/components/member/orders/OrderDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Order: #${id} - Modesy`,
    description: `Order #${id} details and summary`,
  };
}

export default async function MemberOrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <OrderDetailView orderId={id} />;
}
