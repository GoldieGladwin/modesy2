import React from "react";
import ModeratorHeader from "@/components/layout/moderator/ModeratorHeader";
import ModeratorFooter from "@/components/layout/moderator/ModeratorFooter";

export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      <ModeratorHeader />
      <div className="flex-1 w-full">{children}</div>
      <ModeratorFooter />
    </div>
  );
}
