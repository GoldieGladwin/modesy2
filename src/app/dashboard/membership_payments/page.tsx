import React from "react";
import { Metadata } from "next";
import { MembershipPaymentsView } from "@/components/vendor/payments";

export const metadata: Metadata = {
  title: "Membership Payments - Dashboard",
  description: "View and manage membership payments.",
};

export default function MembershipPaymentsUnderscorePage() {
  return <MembershipPaymentsView />;
}
