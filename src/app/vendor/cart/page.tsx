import React from "react";
import { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Shopping Cart - Modesy",
  description: "View and manage items in your shopping cart.",
};

export default function VendorCartPage() {
  return <CartView />;
}
