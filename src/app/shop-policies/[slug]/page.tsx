import React from "react";
import { Metadata } from "next";
import VendorPublicProfileView from "@/components/vendor/profile/VendorPublicProfileView";

export const metadata: Metadata = {
  title: "Trendshop - Shop Policies - Modesy",
  description: "View Trendshop store policies, shipping, and returns on Modesy.",
};

export default async function ShopPoliciesSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <VendorPublicProfileView initialTab="policies" slug={slug} />;
}
