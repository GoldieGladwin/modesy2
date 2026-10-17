import React from "react";
import { FeaturedProductsView } from "@/components/admin/products";

export const metadata = {
  title: "Featured Products - Modesy Moderator Panel",
  description: "Manage highlighted and sponsored marketplace products",
};

export default function ModeratorFeaturedProductsPage() {
  return <FeaturedProductsView />;
}
