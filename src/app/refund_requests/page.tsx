import React from "react";
import Orders from "@/components/admin/orders/Orders";

export const metadata = {
  title: "Refund Requests - Modesy",
  description: "View and manage refund requests.",
};

export default function RefundRequestsUnderscorePage() {
  return <Orders initialTab="refund-requests" />;
}
