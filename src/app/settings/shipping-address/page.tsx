import React from "react";
import VendorProfileSettingsView from "@/components/settings/VendorProfileSettingsView";

export const metadata = {
  title: "Shipping Address - Modesy",
  description: "Manage your shipping and billing address records.",
};

export default function SettingsShippingAddressHyphenPage() {
  return <VendorProfileSettingsView initialTab="shipping" />;
}
