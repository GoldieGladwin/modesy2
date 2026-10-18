import React from "react";
import { Metadata } from "next";
import VendorPublicProfileView from "@/components/vendor/profile/VendorPublicProfileView";

export const metadata: Metadata = {
  title: "Trendshop - Followers - Modesy",
  description: "View Trendshop followers on Modesy.",
};

export default async function FollowersSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <VendorPublicProfileView initialTab="followers" slug={slug} />;
}
