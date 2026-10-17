import React from "react";
import { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Shopping Cart - Modesy",
  description: "View and manage items in your shopping cart.",
};

export default function CartPage() {
  return <CartView />;
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";
import CartPageView from "@/components/cart/CartPageView";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      <ModesyHeader />
      <div className="flex-1 w-full">
        <CartPageView role="guest" />
      </div>
      <ModesyFooter />
    </div>
  );
}
