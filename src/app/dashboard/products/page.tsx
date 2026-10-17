import React from "react";
import ProductsContainer from "@/components/admin/dashboard/products/ProductsContainer";

export const metadata = {
  title: "Products - Dashboard - Modesy",
  description: "Manage your marketplace products.",
};

export default function DashboardProductsPage() {
  return <ProductsContainer />;
}
