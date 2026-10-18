import React from "react";
import { Metadata } from "next";
import { ShippingSettingsView } from "@/components/vendor/shipping";

export const metadata: Metadata = {
  title: "Shipping Settings - Dashboard - Modesy",
  description: "Manage your shipping zones and delivery times.",
};

export default function VendorDashboardShippingSettingsPage() {
  return <ShippingSettingsView />;
}
