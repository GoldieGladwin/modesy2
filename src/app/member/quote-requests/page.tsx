import React from "react";
import MemberOrdersView from "@/components/member/orders/MemberOrdersView";

export const metadata = {
  title: "Quote Requests - Modesy",
  description: "View custom pricing quote requests on Modesy.",
};

export default function MemberQuoteRequestsPage() {
  return <MemberOrdersView initialSection="quote-requests" />;
}
