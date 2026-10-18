import React from "react";
import { HiddenProductsView } from "@/components/admin/products";

export const metadata = {
  title: "Hidden Products - Modesy Moderator Panel",
  description: "Products hidden from public marketplace browsing",
};

export default function ModeratorHiddenProductsPage() {
  return <HiddenProductsView />;
}
