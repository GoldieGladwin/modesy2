"use client";

import React from "react";
import Link from "next/link";
import { CouponsContainer } from "@/components/admin/coupons";

export default function AdminMyCouponsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/admin" className="hover:text-[#00a99d]">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Coupons</span>
      </nav>

      <CouponsContainer />
    </div>
  );
}
