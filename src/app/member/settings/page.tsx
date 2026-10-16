import React, { Suspense } from "react";
import MemberSettingsView from "@/components/member/settings/MemberSettingsView";

export const metadata = {
  title: "Profile Settings - Modesy",
  description: "Manage your profile, shipping address, social media and account settings.",
};

export default function MemberSettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[500px] flex items-center justify-center text-sm text-gray-500">
          Loading settings...
        </div>
      }
    >
      <MemberSettingsView />
    </Suspense>
  );
}

