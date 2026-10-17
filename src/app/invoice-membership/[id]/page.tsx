import React from "react";
import { Metadata } from "next";
import { MembershipInvoiceView } from "@/components/vendor/payments";

export const metadata: Metadata = {
  title: "Invoice - Modesy - Marketplace",
  description: "View and print membership payment invoice.",
};

export default async function InvoiceMembershipPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MembershipInvoiceView paymentId={id} />;
}
