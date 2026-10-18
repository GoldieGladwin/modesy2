"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ModeratorPanelRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/moderator/admin-panel");
  }, [router]);

  return null;
}
