"use client";

import React from "react";
import ProductsContainer from "@/components/admin/dashboard/products/ProductsContainer";

export default function HiddenProductsPage() {
  return (
    <div className="py-2 sm:py-4">
      <ProductsContainer
        title="Hidden Products"
        initialItems={[]}
        emptyMessage="No records found!"
      />
    </div>
  );
}
