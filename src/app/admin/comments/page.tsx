import { redirect } from "next/navigation";

export default function AdminCommentsRedirectPage() {
  redirect("/admin/dashboard/comments");
}
