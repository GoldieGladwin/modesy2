"use client";

import React from "react";
import Link from "next/link";
import ModesyLogo from "./ModesyLogo";

interface ModesyHeaderProps {
  onOpenLoginModal?: () => void;
  currentUser?: { email: string; name: string } | null;
  onLogout?: () => void;
}

export default function ModesyHeader({
  onOpenLoginModal,
  currentUser,
  onLogout,
}: ModesyHeaderProps) {
  const categories = [
    "Clothing",
    "Shoes",
    "Home & Living",
    "Jewelry & Accessories",
    "Toys & Entertainment",
    "Graphics & Photos",
    "Video & Audio",
    "Web Templates & Code",
  ];

  return (
    <header className="w-full bg-white font-sans text-gray-700">
      {/* ================= TOP BAR ================= */}
      <div className="bg-white border-b border-gray-200 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#00a99d] transition">
              Contact
            </Link>
            <Link href="/" className="hover:text-[#00a99d] transition">
              Sell on Modesy
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex items-center gap-1 cursor-pointer hover:text-[#00a99d] transition"
            >
              <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
              <span>Location</span>
            </button>
            <span className="cursor-pointer hover:text-[#00a99d] transition">USD ($)</span>
            <span className="cursor-pointer hover:text-[#00a99d] transition">English</span>

            {/* Top Bar Auth Links */}
            <div className="flex items-center gap-1.5 pl-3 border-l border-gray-200">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#00a99d]">
                    Halo, {currentUser.name}
                  </span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="text-red-500 hover:underline cursor-pointer ml-1 text-xs"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onOpenLoginModal}
                    className="font-medium text-gray-700 hover:text-[#00a99d] cursor-pointer transition"
                  >
                    Login
                  </button>
                  <span className="text-gray-300">/</span>
                  <Link
                    href="/register"
                    className="font-medium text-gray-700 hover:text-[#00a99d] transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN BAR ================= */}
      <div className="border-b border-gray-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
          <Link href="/">
            <ModesyLogo />
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl relative hidden md:block">
            <input
              type="text"
              placeholder="Search for products, categories or brands"
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded focus:bg-white focus:outline-none focus:border-[#00a99d] focus:ring-1 focus:ring-[#00a99d] transition placeholder-gray-400"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00a99d]"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Nav Right */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-gray-600 hover:text-[#00a99d] cursor-pointer transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs font-semibold hidden sm:inline">Cart (0)</span>
            </div>

            <div className="flex items-center gap-1.5 text-gray-600 hover:text-[#00a99d] cursor-pointer transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs font-semibold hidden sm:inline">Wishlist</span>
            </div>

            <button
              type="button"
              onClick={onOpenLoginModal}
              className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-bold rounded shadow-xs transition cursor-pointer"
            >
              Sell Now
            </button>
          </div>
        </div>

        {/* Categories Mega Nav */}
        <div className="border-t border-gray-100 bg-white hidden lg:block overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6 py-2.5 text-xs font-semibold text-gray-700 whitespace-nowrap">
            {categories.map((cat, idx) => (
              <span key={idx} className="hover:text-[#00a99d] cursor-pointer transition">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
