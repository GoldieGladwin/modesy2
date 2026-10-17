import React from "react";
import { Metadata } from "next";
import { ProfileSettingsView } from "@/components/admin/profile-settings";

export const metadata: Metadata = {
  title: "Profile Settings - Update Profile | Modesy",
  description: "Update your profile settings and information on Modesy",
};

export default function AdminProfileSettingsPage() {
  return <ProfileSettingsView />;
}
