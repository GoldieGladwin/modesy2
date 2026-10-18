import React from "react";
import MemberOrdersView from "@/components/member/orders/MemberOrdersView";

export const metadata = {
  title: "Orders - Modesy",
  description: "View and manage your member orders on Modesy.",
};

export default function MemberOrdersPage() {
  return <MemberOrdersView initialSection="orders" />;
}
