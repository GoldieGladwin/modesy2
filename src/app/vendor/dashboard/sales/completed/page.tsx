import React from "react";
import SalesContainer from "@/components/admin/dashboard/sales/SalesContainer";
import { initialCompletedSales } from "@/components/admin/dashboard/sales/mockData";

export const metadata = {
  title: "Completed Sales - Dashboard - Modesy",
  description: "View and manage completed store sales.",
};

export default function VendorCompletedSalesPage() {
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
