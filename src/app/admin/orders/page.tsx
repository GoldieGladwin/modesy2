import React from "react";
import Orders from "@/components/admin/orders/Orders";

export const metadata = {
  title: "Orders - Modesy",
  description: "View and manage your orders, quote requests, and downloads.",
};

export default function AdminOrdersPage() {
  return <Orders />;
}
