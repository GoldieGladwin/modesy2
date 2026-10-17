import React from "react";
import ModeratorOrdersHub from "@/components/moderator/orders/ModeratorOrdersHub";

export const metadata = {
  title: "Downloads - Modesy",
  description: "View and download digital files.",
};

export default function ModeratorDownloadsPage() {
  return <ModeratorOrdersHub initialTab="downloads" />;
}
