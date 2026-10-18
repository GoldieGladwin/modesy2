import React from "react";
import { RefundRequestsView } from "@/components/admin/refund-requests";

export const metadata = {
  title: "Refund Requests - Modesy Admin",
  description: "Review and resolve buyer dispute refund applications",
};

export default function AdminRefundRequestsPage() {
  return <RefundRequestsView />;
}
