import React from "react";
import { FeaturedProductsView } from "@/components/admin/products";

export const metadata = {
  title: "Featured Products - Modesy Admin",
  description: "Manage highlighted and sponsored marketplace products",
};

export default function FeaturedProductsPage() {
  return <FeaturedProductsView />;
}
