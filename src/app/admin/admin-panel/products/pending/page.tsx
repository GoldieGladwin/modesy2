import React from "react";
import ProductsContainer from "@/components/admin/dashboard/products/ProductsContainer";

export const metadata = {
  title: "Pending Products - Modesy Admin",
  description: "Review and approve products submitted by vendors",
};

export default function PendingProductsPage() {
  return (
    <ProductsContainer
      title="Pending Products"
      initialItems={[]}
      emptyMessage="No records found!"
    />
  );
}
