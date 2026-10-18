import React from "react";
import MemberHeader from "@/components/layout/member/MemberHeader";
import MemberFooter from "@/components/layout/member/MemberFooter";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      <MemberHeader />
      <div className="flex-1 w-full">{children}</div>
      <MemberFooter />
    </div>
  );
}
