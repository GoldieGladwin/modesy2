import React from "react";
import VendorProfileSettingsView from "@/components/settings/VendorProfileSettingsView";

export const metadata = {
  title: "Social Media - Modesy",
  description: "Link your social media profiles.",
};

export default function SettingsSocialMediaHyphenPage() {
  return <VendorProfileSettingsView initialTab="social" />;
}
