import React from "react";
import Orders from "@/components/admin/orders/Orders";

export const metadata = {
  title: "Quote Requests - Modesy",
  description: "View and manage custom quote requests.",
};

export default function QuoteRequestsHyphenPage() {
  return <Orders initialTab="quote-requests" />;
}
