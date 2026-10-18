import React from "react";
import ModeratorOrdersHub from "@/components/moderator/orders/ModeratorOrdersHub";

export const metadata = {
  title: "Orders - Modesy",
  description: "View and manage moderator orders.",
};

export default function ModeratorOrdersPage() {
  return <ModeratorOrdersHub initialTab="orders" />;
}
