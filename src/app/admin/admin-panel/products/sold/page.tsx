import React from "react";
import { SoldProductsView } from "@/components/admin/products";

export const metadata = {
  title: "Sold Products - Modesy Admin",
  description: "Products with depleted stock or marked as completely sold",
};

export default function SoldProductsPage() {
  return <SoldProductsView />;
}
