import React from "react";
import { PaymentSettings } from "@/components/admin/settings";

export const metadata = {
  title: "Payment Settings - Modesy Admin",
  description: "Configure payment gateways, commission rates, VAT, and payout limits",
};

export default function AdminPaymentSettingsPage() {
  return <PaymentSettings />;
}
