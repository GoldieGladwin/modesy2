import React from "react";
import { Metadata } from "next";
import CheckoutPageView from "@/components/checkout/CheckoutPageView";

export const metadata: Metadata = {
  title: "Checkout - Modesy",
  description: "Secure Checkout and Order Confirmation",
};

export default function ModeratorCheckoutPage() {
  return <CheckoutPageView role="moderator" />;
}
