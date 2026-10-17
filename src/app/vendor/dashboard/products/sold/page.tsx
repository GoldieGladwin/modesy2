"use client";

import React from "react";
import ProductsContainer from "@/components/admin/dashboard/products/ProductsContainer";

export default function VendorSoldProductsPage() {
  return (
    <div className="py-2 sm:py-4">
      <ProductsContainer
        title="Sold Products"
        initialItems={[]}
        emptyMessage="No records found!"
        showPromote={false}
      />
    </div>
  );
}
