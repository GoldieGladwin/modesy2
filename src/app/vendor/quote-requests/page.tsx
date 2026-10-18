import { redirect } from "next/navigation";

export default function VendorQuoteRequestsRedirect() {
  redirect("/dashboard/quote_requests");
}
