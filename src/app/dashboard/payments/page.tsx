import React from "react";
import { Metadata } from "next";
import {
  MembershipPaymentsView,
  PromotionPaymentsView,
} from "@/components/vendor/payments";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}): Promise<Metadata> {
  const { payment } = await searchParams;
  if (payment === "promotion") {
    return {
      title: "Promotion Payments - Dashboard",
      description: "View and manage promotion payments.",
    };
  }
  return {
    title: "Membership Payments - Dashboard",
    description: "View and manage membership payments.",
  };
}

export default async function DashboardPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { payment } = await searchParams;

  if (payment === "promotion") {
    return <PromotionPaymentsView />;
  }

  return <MembershipPaymentsView />;
}
