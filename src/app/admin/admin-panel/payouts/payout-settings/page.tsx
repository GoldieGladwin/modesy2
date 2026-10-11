import React from "react";
import PayoutSettingsView from "@/components/admin/payouts/PayoutSettingsView";

export const metadata = {
  title: "Payout Settings - Modesy Admin",
  description: "Configure minimum payout amounts and payment options",
};

export default function AdminPayoutSettingsPage() {
  return <PayoutSettingsView />;
}
