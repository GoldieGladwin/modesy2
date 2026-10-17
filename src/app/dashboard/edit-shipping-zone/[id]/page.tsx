import React from "react";
import { Metadata } from "next";
import { EditShippingZoneView } from "@/components/vendor/shipping";

export const metadata: Metadata = {
  title: "Edit Shipping Zone - Dashboard - Modesy",
  description: "Edit shipping zone details and shipping methods.",
};

export default async function DashboardEditShippingZoneHyphenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditShippingZoneView zoneId={id} />;
}
