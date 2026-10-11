import React from "react";
import { ProductSettings } from "@/components/admin/settings";

export const metadata = {
  title: "Product Settings - Modesy Admin",
  description: "Configure marketplace listing settings, marketplace modes, and digital product rules",
};

export default function AdminProductSettingsPage() {
  return <ProductSettings />;
}
