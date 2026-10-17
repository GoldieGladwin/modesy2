import React, { Suspense } from "react";
import ProductDetailView from "@/components/product/ProductDetailView";
import { getProductByIdOrSlug } from "@/data/productsRegistry";
import type { Metadata } from "next";

interface SlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductByIdOrSlug(slug);
  return {
    title: `${product.title} - Modesy`,
    description: product.description,
  };
}

export default async function SlugProductPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const product = getProductByIdOrSlug(slug);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#00a99d] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductDetailView productId={product.id} />
    </Suspense>
  );
}
