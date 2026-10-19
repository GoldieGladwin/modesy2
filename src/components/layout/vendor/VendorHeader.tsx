"use client";

import React from "react";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import { useAuth } from "@/context/AuthContext";

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
  currentUser,
}: VendorHeaderProps = {}) {
  const { user } = useAuth();
  const effective = currentUser !== undefined ? currentUser : (user || DEFAULT_VENDOR);
  return <ModesyHeader currentUser={effective} />;
}
