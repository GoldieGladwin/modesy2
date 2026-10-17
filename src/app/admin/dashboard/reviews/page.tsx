import React from "react";
import VendorReviewsView from "@/components/vendor/reviews/VendorReviewsView";

export const metadata = {
  title: "Reviews - Dashboard - Modesy",
  description: "View customer product reviews.",
};

export default function AdminDashboardReviewsPage() {
  return <VendorReviewsView />;
import { ReviewsTable } from "@/components/admin/dashboard/reviews";

export const metadata = {
  title: "Reviews - Admin Dashboard",
};

export default function AdminDashboardReviewsPage() {
  return (
    <div className="space-y-6">
      <ReviewsTable />
    </div>
  );
}
