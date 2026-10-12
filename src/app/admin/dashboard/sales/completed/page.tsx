"use client";

import React from "react";
import SalesContainer from "@/components/admin/dashboard/sales/SalesContainer";
import { initialCompletedSales } from "@/components/admin/dashboard/sales/mockData";

export default function CompletedSalesPage() {
  return (
    <div className="py-2 sm:py-4">
      <SalesContainer
        title="Completed Sales"
        initialItems={initialCompletedSales}
        showPaymentStatus={false}
        pageSize={15}
      />
    </div>
  );
}
