import React from "react";
import VendorEditProductView from "@/components/vendor/products/VendorEditProductView";

export const metadata = {
  title: "Edit Product - Dashboard - Modesy",
  description: "Edit your product details.",
};

interface EditProductPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function DashboardEditProductPage({
  params,
}: EditProductPageProps) {
  const resolvedParams = await params;
  return <VendorEditProductView productId={resolvedParams.id} />;
}
