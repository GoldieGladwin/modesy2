import React from "react";
import VendorProfileSettingsView from "@/components/settings/VendorProfileSettingsView";

export const metadata = {
  title: "Delete Account - Modesy",
  description: "Delete your account and associated records.",
};

export default function SettingsDeleteAccountPage() {
  return <VendorProfileSettingsView initialTab="delete" />;
}
