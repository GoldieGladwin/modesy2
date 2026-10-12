"use client";

import React from "react";
import SalesContainer from "@/components/admin/dashboard/sales/SalesContainer";
import { initialActiveSales } from "@/components/admin/dashboard/sales/mockData";

export default function ActiveSalesPage() {
  return (
    <div className="py-2 sm:py-4">
      <SalesContainer
        title="Sales"
        initialItems={initialActiveSales}
        showPaymentStatus={true}
        pageSize={15}
      />
    </div>
  );
}
