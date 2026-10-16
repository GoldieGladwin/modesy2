import React from "react";
import MemberOrdersView from "@/components/member/orders/MemberOrdersView";

export const metadata = {
  title: "Refund Requests - Modesy",
  description: "View and submit refund requests on Modesy.",
};

export default function MemberRefundRequestsPage() {
  return <MemberOrdersView initialSection="refund-requests" />;
}
