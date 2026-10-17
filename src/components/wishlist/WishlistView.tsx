"use client";

import React from "react";
import Link from "next/link";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";

export default function WishlistView() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800 antialiased">
      {/* 1. Modesy Header (Trendshop vendor profile matching screenshot) */}
      <ModesyHeader
        currentUser={{
          name: "Trendshop",
          email: "trendshop@codingest.net",
          avatar: "/assets/img/trendshop-avatar.jpg",
          role: "vendor",
        }}
        cartCount={3}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb: Home / Wishlist */}
        <nav
          className="text-[12px] text-gray-500 mb-3 flex items-center gap-1.5 font-normal"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="text-gray-500 hover:text-[#00a99d] transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Wishlist</span>
        </nav>

        {/* Heading: Wishlist */}
        <h1 className="text-[22px] font-bold text-[#222222] mb-12">
          Wishlist
        </h1>

        {/* Empty state: No products found! (Persis seperti di website Modesy) */}
        <div className="py-20 text-center">
          <p className="text-[#666666] text-[14px]">No products found!</p>
        </div>
      </main>

      {/* 3. Footer */}
      <ModesyFooter />
    </div>
  );
}
