import React from "react";
import MemberProfileView from "@/components/member/profile/MemberProfileView";

export const metadata = {
  title: "Profile - Modesy",
  description: "Member profile, followers, following, and reviews on Modesy.",
};

export default function MemberProfilePage() {
  return <MemberProfileView />;
}
