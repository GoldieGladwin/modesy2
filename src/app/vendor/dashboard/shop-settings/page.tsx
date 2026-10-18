import React from "react";
import { Metadata } from "next";
import { ShopSettingsView } from "@/components/vendor/shop-settings";

export const metadata: Metadata = {
  title: "Shop Settings - Dashboard - Modesy",
  description: "Manage your shop settings, VAT configuration, membership plan, and vacation mode.",
};

export default function VendorDashboardShopSettingsPage() {
  return <ShopSettingsView />;
}
