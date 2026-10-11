import React from "react";
import { CacheSystem } from "@/components/admin/cache-system";

export const metadata = {
  title: "Cache System - Admin Panel | Modesy",
  description: "Manage product and static cache in Modesy Admin Panel",
};

export default function AdminCacheSystemPage() {
  return <CacheSystem />;
}
