import React from "react";
import SalesContainer from "@/components/admin/dashboard/sales/SalesContainer";
import { initialCancelledSales } from "@/components/admin/dashboard/sales/mockData";

export const metadata = {
  title: "Cancelled Sales - Dashboard - Modesy",
  description: "View and manage cancelled store sales.",
};

export default function VendorCancelledSalesPage() {
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
