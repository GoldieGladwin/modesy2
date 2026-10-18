"use client";

import React from "react";
import ProductsContainer from "@/components/admin/dashboard/products/ProductsContainer";
import { initialDraftProducts } from "@/components/admin/dashboard/products/draftsMockData";

export default function VendorDraftsPage() {
  return (
    <div className="py-2 sm:py-4">
      <ProductsContainer
        title="Drafts"
        initialItems={initialDraftProducts}
        pageSize={15}
        showPromote={false}
      />
    </div>
  );
}
