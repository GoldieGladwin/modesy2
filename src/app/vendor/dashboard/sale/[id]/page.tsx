import React from "react";
import VendorSaleDetailView from "@/components/vendor/sales/VendorSaleDetailView";

export const metadata = {
  title: "Sale - Dashboard - Modesy",
  description: "View sale and order details.",
};

export default async function VendorDashboardSaleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <VendorSaleDetailView saleId={id} />;
}
