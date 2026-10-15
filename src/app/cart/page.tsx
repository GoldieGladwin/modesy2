import React from "react";
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
