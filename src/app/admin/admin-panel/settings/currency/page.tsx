import React from "react";
import { CurrencySettings } from "@/components/admin/settings";

export const metadata = {
  title: "Currency Settings - Modesy Admin",
  description: "Manage supported currencies, exchange rates, and currency converter",
};

export default function AdminCurrencySettingsPage() {
  return <CurrencySettings />;
}
