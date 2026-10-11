import React from "react";
import { HiddenProductsView } from "@/components/admin/products";

export const metadata = {
  title: "Hidden Products - Modesy Admin",
  description: "Products hidden from catalog search and storefront display",
};

export default function HiddenProductsPage() {
  return <HiddenProductsView />;
}
