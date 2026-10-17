import React from "react";
import { DeletedProductsView } from "@/components/admin/products";

export const metadata = {
  title: "Deleted Products - Modesy Moderator Panel",
  description: "Products moved to trash/deleted catalog",
};

export default function ModeratorDeletedProductsPage() {
  return <DeletedProductsView />;
}
