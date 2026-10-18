import { redirect } from "next/navigation";

export default function AdminMembershipPaymentsRedirectPage() {
  redirect("/admin/dashboard/payments/membership-payments");
}
