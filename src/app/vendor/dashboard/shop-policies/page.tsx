import React from "react";
import { Metadata } from "next";
import { ShopPoliciesView } from "@/components/vendor/shop-policies";

export const metadata: Metadata = {
  title: "Shop Policies - Dashboard - Modesy",
  description: "Set and customize your store policies.",
};

export default function VendorDashboardShopPoliciesPage() {
  return <ShopPoliciesView />;
}
