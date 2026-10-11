import React from "react";
import AddPayoutView from "@/components/admin/payouts/AddPayoutView";

export const metadata = {
  title: "Add Payout - Modesy Admin",
  description: "Disburse payout to seller or vendor",
};

export default function AdminAddPayoutPage() {
  return <AddPayoutView />;
}
