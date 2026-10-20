import React from "react";
import { Metadata } from "next";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";
import CheckoutPageView from "@/components/checkout/CheckoutPageView";

export const metadata: Metadata = {
  title: "Checkout - Modesy",
  description: "Secure Checkout and Order Confirmation",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800">
      <ModesyHeader />
      <main className="flex-1 w-full">
        <CheckoutPageView role="guest" />
      </main>
      <ModesyFooter />
    </div>
  );
}

