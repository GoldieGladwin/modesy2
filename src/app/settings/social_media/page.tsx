import React from "react";
import VendorProfileSettingsView from "@/components/settings/VendorProfileSettingsView";

export const metadata = {
  title: "Social Media - Modesy",
  description: "Link your social media profiles.",
};

export default function SettingsSocialMediaPage() {
  return <VendorProfileSettingsView initialTab="social" />;
}
