import React from "react";
import CategoryPageView from "@/components/category/CategoryPageView";

export default async function GuestCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CategoryPageView slug={slug} role="guest" />;
}
