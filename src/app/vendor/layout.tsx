import React from "react";
import VendorHeader from "@/components/layout/vendor/VendorHeader";
import VendorFooter from "@/components/layout/vendor/VendorFooter";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      <VendorHeader />
      <div className="flex-1 w-full">{children}</div>
      <VendorFooter />
    </div>
  );
}
