import React from "react";
import SellerInvoiceView from "@/components/vendor/invoice/SellerInvoiceView";

export const metadata = {
  title: "Invoice - Modesy",
  description: "Print and view seller order invoice.",
};

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SellerInvoiceView invoiceId={id} />;
}
