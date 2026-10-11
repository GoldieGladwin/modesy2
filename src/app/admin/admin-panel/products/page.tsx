import React from "react";
import { ProductsView } from "@/components/admin/products";

export const metadata = {
  title: "Products - Modesy Admin",
  description: "Manage marketplace inventory, vendor listings, and catalog products",
};

export default function AdminProductsPage() {
  return <ProductsView />;
}
