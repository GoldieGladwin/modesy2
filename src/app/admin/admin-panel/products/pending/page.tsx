import React from "react";
import { PendingProductsView } from "@/components/admin/products";

export const metadata = {
  title: "Pending Products - Modesy Admin",
  description: "Review and approve products submitted by vendors",
};

export default function PendingProductsPage() {
  return <PendingProductsView />;
}
