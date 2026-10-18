"use client";

import React from "react";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";

const DEFAULT_VENDOR = {
  name: "Trendshop",
  email: "trendshop@gmail.com",
  role: "vendor" as const,
  avatar: "/assets/img/trendshop-avatar.jpg",
};

interface VendorHeaderProps {
  currentUser?: {
    email: string;
    name: string;
    avatar?: string;
    role?: "admin" | "vendor" | "member" | "moderator";
  } | null;
}

export default function VendorHeader({
  currentUser = DEFAULT_VENDOR,
}: VendorHeaderProps = {}) {
  return <ModesyHeader currentUser={currentUser || DEFAULT_VENDOR} />;
}
