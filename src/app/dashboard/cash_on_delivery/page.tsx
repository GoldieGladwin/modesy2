import React from "react";
import { Metadata } from "next";
import { CashOnDeliveryView } from "@/components/vendor/cash-on-delivery";

export const metadata: Metadata = {
  title: "Cash on Delivery - Dashboard",
  description: "Sell your products with pay on delivery option.",
};

export default function DashboardCashOnDeliveryUnderscorePage() {
  return <CashOnDeliveryView />;
}
