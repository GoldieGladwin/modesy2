import React, { Suspense } from "react";
import ProductDetailView from "@/components/product/ProductDetailView";

export const metadata = {
  title: "Product Details - Modesy",
  description: "View product details, variants, reviews and seller information.",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#00a99d] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductDetailView productId={id} />
    </Suspense>
  );
}
