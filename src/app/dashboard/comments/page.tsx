import React from "react";
import VendorCommentsView from "@/components/vendor/comments/VendorCommentsView";

export const metadata = {
  title: "Comments - Dashboard - Modesy",
  description: "View customer comments on your products.",
};

export default function DashboardCommentsPage() {
  return <VendorCommentsView />;
}
