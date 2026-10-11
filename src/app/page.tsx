"use client";

import React, { useState } from "react";
import ModesyHeader from "@/components/layout/header/ModesyHeader";
import ModesyFooter from "@/components/layout/footer/ModesyFooter";
import LoginModal from "@/components/auth/LoginModal";
import JewelrySection from "@/components/home/JewelrySection";
import BlogSection from "@/components/home/BlogSection";
import FeaturedProducts from "@/components/layout/Featured-Products";
import NewArrivals from "@/components/layout/New-Arrivals";
import ShopByBrand from "@/components/layout/shop/Shop-By-Brand";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      {/* Header Modesy */}
      <ModesyHeader
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-8">
        {/* ========================================================================= */}
        {/* SECTION ATAS (SKELETON / PLACEHOLDER SESUAI STRUKTUR MODESY WEBSITE)     */}
        {/* ========================================================================= */}

        {/* 1. Hero Slider Banner (Skeleton) */}
        <div className="w-full h-48 sm:h-72 bg-gray-200/80 rounded-sm border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
          <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
            [ Skeleton: Hero Slider Carousel Banner ]
          </span>
          <span className="text-xs text-gray-400 mt-1">
            Area banner promosi utama (Placeholder)
          </span>
        </div>

        {/* 2. Shop By Category (Skeleton) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              [ Skeleton: Shop By Category ]
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white border border-dashed border-gray-200 rounded-sm p-3 flex flex-col items-center justify-center gap-2 h-24"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
                  ≡ƒôü
                </div>
                <div className="w-12 h-2.5 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Special Offers (Skeleton) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              [ Skeleton: Special Offers ]
            </span>
            <div className="w-16 h-3 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white border border-dashed border-gray-200 rounded-sm p-2.5 space-y-2 h-44 flex flex-col justify-between"
              >
                <div className="w-full h-24 bg-gray-100 rounded-xs"></div>
                <div className="w-3/4 h-2.5 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-2.5 bg-teal-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Featured Products */}
        <FeaturedProducts />

        {/* 5. New Arrivals */}
        <NewArrivals />

        {/* 5. Clothing Section (Skeleton) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              [ Skeleton: Clothing ]
            </span>
            <div className="w-16 h-3 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white border border-dashed border-gray-200 rounded-sm p-2.5 space-y-2 h-44 flex flex-col justify-between"
              >
                <div className="w-full h-24 bg-gray-100 rounded-xs"></div>
                <div className="w-3/4 h-2.5 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-2.5 bg-teal-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3 SECTION UTAMA DI PALING BAWAH SESUAI REQUEST & GAMBAR REFERENSI          */}
        {/* ========================================================================= */}

        {/* 1. Section: Jewelry & Accessories */}
        <JewelrySection />

        {/* 1.5 Section: Shop By Brand */}
        <ShopByBrand />

        {/* 2. Section: Latest Blog Posts */}
        <BlogSection />
      </main>

      {/* Footer */}
      <ModesyFooter />

      {/* Modal khusus Login */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </div>
  );
}
