import React, { Suspense } from "react";
import ProductDetailView from "@/components/product/ProductDetailView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Black midi skirt with white flowers - Modesy",
  description:
    "Featuring a soft black fabric adorned with delicate white floral patterns, this skirt brings a touch of romance to any outfit",
};

export default function BlackMidiSkirtPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#00a99d] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductDetailView productId={41} />
    </Suspense>
  );
}
