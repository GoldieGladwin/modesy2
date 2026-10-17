import React from "react";
import { Metadata } from "next";
import VendorPublicProfileView from "@/components/vendor/profile/VendorPublicProfileView";

export const metadata: Metadata = {
  title: "Trendshop - Reviews - Modesy",
  description: "View customer reviews and ratings for Trendshop on Modesy.",
};

export default async function ReviewsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <VendorPublicProfileView initialTab="reviews" slug={slug} />;
}
