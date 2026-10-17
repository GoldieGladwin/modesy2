import React from "react";
import { Metadata } from "next";
import VendorProfileSettingsView from "@/components/settings/VendorProfileSettingsView";

export const metadata: Metadata = {
  title: "Profile Settings - Modesy",
  description: "Update your vendor profile settings, contact information, and security credentials.",
};

export default function SettingsPage() {
  return <VendorProfileSettingsView />;
}
