"use client";

import React, { use, Suspense } from "react";
import ProductDetailView from "@/components/product/ProductDetailView";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);

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
