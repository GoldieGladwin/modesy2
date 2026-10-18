"use client";

import React from "react";
import { QuoteRequestsView } from "@/components/admin/quote-requests";

export default function DashboardQuoteRequestsPage() {
  return (
    <div className="py-2 sm:py-4">
      <QuoteRequestsView />
    </div>
  );
}
