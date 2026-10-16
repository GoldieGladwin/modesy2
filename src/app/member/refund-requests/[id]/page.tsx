import React from "react";
import RefundDetailView from "@/components/member/orders/RefundDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Refund Request #${id} - Modesy`,
    description: `Refund request details for #${id}`,
  };
}

export default async function MemberRefundDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <RefundDetailView refundId={id} />;
}
