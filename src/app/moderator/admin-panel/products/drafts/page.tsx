import React from "react";
import { DraftsView } from "@/components/admin/products";

export const metadata = {
  title: "Drafts - Modesy Moderator Panel",
  description: "Unpublished product listings saved as drafts",
};

export default function ModeratorDraftsPage() {
  return <DraftsView />;
}
