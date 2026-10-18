import React from "react";
import { Metadata } from "next";
import { PromotionPaymentsView } from "@/components/vendor/payments";

export const metadata: Metadata = {
  title: "Promotion Payments - Dashboard",
  description: "View and manage promotion payments.",
};

export default function PromotionPaymentsHyphenPage() {
  return <PromotionPaymentsView />;
}
