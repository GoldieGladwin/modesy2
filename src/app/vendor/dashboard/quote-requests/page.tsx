import React from "react";
import { Metadata } from "next";
import { VendorQuoteRequestsView } from "@/components/vendor/quote-requests";

export const metadata: Metadata = {
  title: "Quote Requests - Dashboard",
  description: "View and manage custom quote requests from customers.",
};

export default function VendorDashboardQuoteRequestsPage() {
  return <VendorQuoteRequestsView />;
}
