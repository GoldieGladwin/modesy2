import { redirect } from "next/navigation";

export default function AdminPaymentsRedirectPage() {
  redirect("/admin/dashboard/payments/membership-payments");
}
