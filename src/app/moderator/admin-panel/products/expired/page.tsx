import React from "react";
import { ExpiredProductsView } from "@/components/admin/products";

export const metadata = {
  title: "Expired Products - Modesy Moderator Panel",
  description: "Products with expired promotion or listing duration",
};

export default function ModeratorExpiredProductsPage() {
  return <ExpiredProductsView />;
}
