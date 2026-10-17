import React from "react";
import { Metadata } from "next";
import VendorPublicProfileView from "@/components/vendor/profile/VendorPublicProfileView";

export const metadata: Metadata = {
  title: "Trendshop - Modesy - Marketplace",
  description: "View Trendshop profile, ratings, and products on Modesy.",
};

export default function VendorProfilePage() {
  return <VendorPublicProfileView />;
}
