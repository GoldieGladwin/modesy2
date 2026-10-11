import React from "react";
import { ExpiredProductsView } from "@/components/admin/products";

export const metadata = {
  title: "Expired Products - Modesy Admin",
  description: "Products with expired listing plan or validity duration",
};

export default function ExpiredProductsPage() {
  return <ExpiredProductsView />;
}
