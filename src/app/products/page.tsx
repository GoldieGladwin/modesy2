import React, { Suspense } from "react";
import { Metadata } from "next";
import CategoryPageView from "@/components/category/CategoryPageView";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";

export const metadata: Metadata = {
  title: "Products - Modesy - Marketplace",
  description: "Search and browse all products on Modesy Marketplace.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      <ModesyHeader />
      <div className="flex-1 w-full">
        <Suspense
          fallback={
            <div className="max-w-[1320px] mx-auto px-4 py-16 text-center text-gray-500 text-sm">
              Loading products...
            </div>
          }
        >
          <CategoryPageView slug="all" role="guest" />
        </Suspense>
      </div>
      <ModesyFooter />
    </div>
  );
}
