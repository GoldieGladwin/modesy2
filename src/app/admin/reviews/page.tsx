import { redirect } from "next/navigation";

export const metadata = {
  title: "Reviews - Admin Dashboard - Modesy",
};

export default function AdminReviewsPage() {
  redirect("/admin/dashboard/reviews");
}
