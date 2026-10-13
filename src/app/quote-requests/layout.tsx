import React from "react";
import AdminHeader from "@/components/layout/admin/AdminHeader";
import AdminFooter from "@/components/layout/admin/AdminFooter";

export default function QuoteRequestsHyphenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      <AdminHeader />
      <div className="flex-1 w-full">{children}</div>
      <AdminFooter />
    </div>
  );
}
