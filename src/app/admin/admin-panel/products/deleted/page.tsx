import React from "react";
import { DeletedProductsView } from "@/components/admin/products";

export const metadata = {
  title: "Deleted Products - Modesy Admin",
  description: "Archived and soft-deleted catalog products",
};

export default function DeletedProductsPage() {
  return <DeletedProductsView />;
}
