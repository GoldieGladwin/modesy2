import React from "react";
import MemberOrdersView from "@/components/member/orders/MemberOrdersView";

export const metadata = {
  title: "Downloads - Modesy",
  description: "View and download your digital files on Modesy.",
};

export default function MemberDownloadsPage() {
  return <MemberOrdersView initialSection="downloads" />;
}
