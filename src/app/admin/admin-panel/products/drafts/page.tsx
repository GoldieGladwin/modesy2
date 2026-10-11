import React from "react";
import { DraftsView } from "@/components/admin/products";

export const metadata = {
  title: "Draft Products - Modesy Admin",
  description: "Incomplete product drafts saved by sellers",
};

export default function DraftProductsPage() {
  return <DraftsView />;
}
