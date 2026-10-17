import React from "react";
import { Metadata } from "next";
import VendorPublicProfileView from "@/components/vendor/profile/VendorPublicProfileView";

export const metadata: Metadata = {
  title: "Trendshop - Following - Modesy",
  description: "View users followed by Trendshop on Modesy.",
};

export default async function FollowingSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <VendorPublicProfileView initialTab="following" slug={slug} />;
}
