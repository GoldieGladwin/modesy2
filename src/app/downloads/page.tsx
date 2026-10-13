import React from "react";
import Orders from "@/components/admin/orders/Orders";

export const metadata = {
  title: "Downloads - Modesy",
  description: "View and manage digital product downloads.",
};

export default function DownloadsPage() {
  return <Orders initialTab="downloads" />;
}
