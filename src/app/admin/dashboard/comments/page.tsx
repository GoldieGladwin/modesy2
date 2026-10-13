import React from "react";
import { CommentsTable } from "@/components/admin/dashboard/comments";

export const metadata = {
  title: "Comments - Admin Dashboard",
};

export default function AdminDashboardCommentsPage() {
  return (
    <div className="space-y-6">
      <CommentsTable />
    </div>
  );
}
