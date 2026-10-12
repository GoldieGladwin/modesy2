"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SalesIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard/sales/active");
  }, [router]);

  return null;
}
