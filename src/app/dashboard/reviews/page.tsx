import React from "react";
import VendorReviewsView from "@/components/vendor/reviews/VendorReviewsView";

export const metadata = {
  title: "Reviews - Dashboard - Modesy",
  description: "View customer product reviews.",
};

export default function DashboardReviewsPage() {
  return <VendorReviewsView />;
}
