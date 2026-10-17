import React from "react";
import RefundDetailView from "@/components/member/orders/RefundDetailView";

export const metadata = {
  title: "Refund - Modesy",
  description: "Refund request details",
};

export default function MemberRefundPage() {
  return <RefundDetailView refundId="10007" />;
}
