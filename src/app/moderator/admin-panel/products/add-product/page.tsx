"use client";

import React from "react";
import AddProductWizard from "@/components/admin/dashboard/add-product/AddProductWizard";

export default function ModeratorAddProductPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-xl font-bold text-gray-800">Add Product</h1>
        <p className="text-xs text-gray-500 mt-1">
          Create and publish a new item into the marketplace catalog
        </p>
      </div>
      <AddProductWizard />
    </div>
  );
}
