import React from "react";
import { Metadata } from "next";
import VendorPublicProfileView from "@/components/vendor/profile/VendorPublicProfileView";

export const metadata: Metadata = {
  title: "Trendshop - My Reviews - Modesy",
  description: "View Trendshop reviews on customer orders.",
};

export default async function MyReviewsUnderscoreSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <VendorPublicProfileView initialTab="my_reviews" slug={slug} />;
}
