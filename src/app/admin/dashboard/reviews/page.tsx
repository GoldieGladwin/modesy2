import React from "react";
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
