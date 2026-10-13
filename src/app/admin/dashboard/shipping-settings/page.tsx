import React from "react";
import { ShippingSettingsView } from "@/components/admin/dashboard/shipping-settings";

export const metadata = {
  title: "Shipping Settings - Admin Dashboard",
};

export default function AdminDashboardShippingSettingsPage() {
  return <ShippingSettingsView />;
}
