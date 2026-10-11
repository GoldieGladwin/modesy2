import React from "react";
import { FontSettings } from "@/components/admin/settings";

export const metadata = {
  title: "Font Settings - Modesy Admin",
  description: "Manage custom web fonts and typography preferences",
};

export default function AdminFontSettingsPage() {
  return <FontSettings />;
}
