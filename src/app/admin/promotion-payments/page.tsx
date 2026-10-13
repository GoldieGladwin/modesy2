import { redirect } from "next/navigation";

export default function AdminPromotionPaymentsRedirectPage() {
  redirect("/admin/dashboard/payments/promotion-payments");
}
