"use client";

import React from "react";
import SalesContainer from "@/components/admin/dashboard/sales/SalesContainer";
import { initialCancelledSales } from "@/components/admin/dashboard/sales/mockData";

export default function CancelledSalesPage() {
  return (
    <div className="py-2 sm:py-4">
      <SalesContainer
        title="Cancelled Sales"
        initialItems={initialCancelledSales}
        showPaymentStatus={false}
        emptyMessage="No records found!"
        pageSize={15}
      />
    </div>
  );
}
