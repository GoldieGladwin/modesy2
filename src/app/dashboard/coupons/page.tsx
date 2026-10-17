import React from "react";
import { Metadata } from "next";
import { CouponsListView } from "@/components/vendor/coupons";

export const metadata: Metadata = {
  title: "Coupons - Dashboard - Modesy",
  description: "View and manage store discount coupons.",
};

export default function DashboardCouponsPage() {
  return <CouponsListView />;
}
