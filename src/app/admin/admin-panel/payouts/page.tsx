import React from "react";
import PayoutRequestsView from "@/components/admin/payouts/PayoutRequestsView";

export const metadata = {
  title: "Payout Requests - Modesy Admin",
  description: "Manage vendor and seller payout requests",
};

export default function AdminPayoutsPage() {
  return <PayoutRequestsView />;
}
