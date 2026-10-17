import React from "react";
import { Metadata } from "next";
import { VendorRefundRequestsView } from "@/components/vendor/refund-requests";

export const metadata: Metadata = {
  title: "Refund Requests - Dashboard - Modesy",
  description: "View and manage refund requests.",
};

export default function DashboardRefundRequestsPage() {
  return <VendorRefundRequestsView />;
}
