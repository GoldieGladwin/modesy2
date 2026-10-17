import React from "react";
import ModeratorOrdersHub from "@/components/moderator/orders/ModeratorOrdersHub";

export const metadata = {
  title: "Refund Requests - Modesy",
  description: "View and submit refund requests.",
};

export default function ModeratorRefundRequestsPage() {
  return <ModeratorOrdersHub initialTab="refund-requests" />;
}
