import React from "react";
import { SocialLoginSettings } from "@/components/admin/settings";

export const metadata = {
  title: "Social Login Settings - Modesy Admin",
  description: "Configure Google and social network OAuth login providers",
};

export default function AdminSocialLoginSettingsPage() {
  return <SocialLoginSettings />;
}
