import React from "react";
import { CacheSystem } from "@/components/admin/cache-system";

export const metadata = {
  title: "Cache System - Modesy Admin",
  description: "Purge application database query cache, static pages cache, and CDN assets",
};

export default function AdminCacheSystemPage() {
  return <CacheSystem />;
}
