import React from "react";
import { SoldProductsView } from "@/components/admin/products";

export const metadata = {
  title: "Sold Products - Modesy Moderator Panel",
  description: "Products that have been marked as sold out",
};

export default function ModeratorSoldProductsPage() {
  return <SoldProductsView />;
}
