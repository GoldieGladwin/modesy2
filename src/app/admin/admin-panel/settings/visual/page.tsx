import React from "react";
import { VisualSettings } from "@/components/admin/settings";

export const metadata = {
  title: "Visual Settings - Modesy Admin",
  description: "Customize theme appearance, colors, logo, and watermark",
};

export default function AdminVisualSettingsPage() {
  return <VisualSettings />;
}
