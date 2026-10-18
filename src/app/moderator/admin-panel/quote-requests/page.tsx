import React from "react";
import { QuoteRequestsView } from "@/components/admin/quote-requests";

export const metadata = {
  title: "Quote Requests - Modesy Moderator Panel",
  description: "B2B and custom bulk order price negotiation requests",
};

export default function ModeratorQuoteRequestsPage() {
  return <QuoteRequestsView />;
}
