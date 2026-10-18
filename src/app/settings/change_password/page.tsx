import React from "react";
import VendorProfileSettingsView from "@/components/settings/VendorProfileSettingsView";

export const metadata = {
  title: "Change Password - Modesy",
  description: "Update your account password.",
};

export default function SettingsChangePasswordPage() {
  return <VendorProfileSettingsView initialTab="password" />;
}
