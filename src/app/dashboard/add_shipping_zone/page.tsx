import React from "react";
import { Metadata } from "next";
import { AddShippingZoneView } from "@/components/vendor/shipping";

export const metadata: Metadata = {
  title: "Add Shipping Zone - Dashboard - Modesy",
  description: "Create a new shipping zone.",
};

export default function DashboardAddShippingZoneUnderscorePage() {
  return <AddShippingZoneView />;
}
