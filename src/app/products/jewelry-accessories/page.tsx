import React from "react";
import CategoryPageView from "@/components/category/CategoryPageView";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";

export default function JewelryAccessoriesPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      <ModesyHeader />
      <div className="flex-1 w-full">
        <CategoryPageView slug="jewelry-accessories" role="guest" />
      </div>
      <ModesyFooter />
    </div>
  );
}
