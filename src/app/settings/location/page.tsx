import React from "react";
import VendorProfileSettingsView from "@/components/settings/VendorProfileSettingsView";

export const metadata = {
  title: "Location - Modesy",
  description: "Update your store and personal location information.",
};

export default function SettingsLocationPage() {
  return <VendorProfileSettingsView initialTab="location" />;
}
