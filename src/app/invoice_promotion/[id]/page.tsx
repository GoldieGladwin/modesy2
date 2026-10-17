import React from "react";
import { Metadata } from "next";
import { PromotionInvoiceView } from "@/components/vendor/payments";

export const metadata: Metadata = {
  title: "Invoice - Modesy - Marketplace",
  description: "View and print promotion payment invoice.",
};

export default async function InvoicePromotionUnderscorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PromotionInvoiceView paymentId={id} />;
}
