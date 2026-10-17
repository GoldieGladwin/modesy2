import { redirect } from "next/navigation";

export const metadata = {
  title: "Comments - Admin Dashboard - Modesy",
};

export default function AdminCommentsPage() {
  redirect("/admin/dashboard/comments");
}
