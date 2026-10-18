import React from "react";
import VendorProfileSettingsView from "@/components/settings/VendorProfileSettingsView";

export const metadata = {
  title: "Update Profile - Modesy",
  description: "Update your profile settings, contact information, and security credentials.",
};

export default function SettingsEditProfileUnderscorePage() {
  return <VendorProfileSettingsView initialTab="profile" />;
}
