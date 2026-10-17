import React from "react";
import ModeratorOrdersHub from "@/components/moderator/orders/ModeratorOrdersHub";

export const metadata = {
  title: "Quote Requests - Modesy",
  description: "View and manage quote requests.",
};

export default function ModeratorQuoteRequestsPage() {
  return <ModeratorOrdersHub initialTab="quote-requests" />;
}
