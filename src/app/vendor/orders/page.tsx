import React from "react";
import Orders from "@/components/admin/orders/Orders";

export const metadata = {
  title: "Orders - Modesy",
  description: "View and manage your store sales orders, quote requests, and refunds.",
};

export default function VendorOrdersPage() {
  return <Orders />;
}
