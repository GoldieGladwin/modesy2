import React from "react";
import { Metadata } from "next";
import CartPageView from "@/components/cart/CartPageView";

export const metadata: Metadata = {
  title: "Shopping Cart - Modesy - Moderator",
  description: "View and manage products in your shopping cart.",
};

export default function ModeratorCartPage() {
  return <CartPageView role="moderator" />;
}
