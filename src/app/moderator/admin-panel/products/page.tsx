import React from "react";
import ProductsContainer from "@/components/admin/dashboard/products/ProductsContainer";

export const metadata = {
  title: "Products - Modesy Moderator Panel",
  description: "Manage marketplace inventory, vendor listings, and catalog products",
};

export default function ModeratorProductsPage() {
  return <ProductsContainer />;
}
