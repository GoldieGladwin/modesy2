"use client";

import React from "react";
import { RefundRequestsView } from "@/components/admin/refund-requests";

export default function DashboardRefundRequestsPage() {
  return (
    <div className="py-2 sm:py-4">
      <RefundRequestsView />
    </div>
  );
}
