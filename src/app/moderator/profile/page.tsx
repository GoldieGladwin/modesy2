"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type ProfileTab = "followers" | "following" | "reviews";

export default function ModeratorProfilePage() {
  const { user } = useAuth();
  const displayName = user?.name || "Roger Novak";
  const displayAvatar = user?.avatar || "/assets/img/roger-avatar.jpg";
  const [activeTab, setActiveTab] = useState<ProfileTab>("followers");

  const tabLabels: Record<ProfileTab, string> = {
    followers: "Followers",
    following: "Following",
    reviews: "My Reviews",
  };

  return (
    <div className="bg-white min-h-[600px] w-full">
      <div className="max-w-[1320px] mx-auto px-4 py-6 font-sans">
        {/* 1. Breadcrumb (Home / Followers) */}
        <nav className="text-[13px] text-[#777777] mb-6 flex items-center gap-1.5">
          <Link
            href="/moderator"
            className="text-[#666666] hover:text-[#00a99d] transition-colors"
          >
            Home
          </Link>
          <span className="text-[#999999]">/</span>
          <span className="text-[#333333] font-normal">
            {tabLabels[activeTab]}
          </span>
        </nav>

        {/* 2. User Info Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          {/* Avatar */}
          <div className="shrink-0">
            <img
              src={displayAvatar}
              alt={displayName}
              className="w-[135px] h-[135px] object-cover rounded-[4px] shadow-xs border border-gray-100"
            />
          </div>

          {/* Profile Name & Status */}
          <div className="space-y-2">
            <h1 className="text-[24px] font-bold text-[#222222] tracking-tight">
              {displayName}
            </h1>

            {/* Online Status Dot */}
            <div className="flex items-center gap-2 text-[13px] text-[#777777]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#28a745] inline-block shadow-2xs" />
              <span>
                Last seen: <span className="font-medium text-[#555555]">Just Now</span>
              </span>
            </div>

            {/* Member Since Date */}
            <div className="text-[13px] text-[#777777] pt-1">
              Member since July 2026
            </div>
          </div>
        </div>

        {/* 3. Profile Navigation Tabs */}
        <div className="border-b border-[#e5e5e5] mt-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {/* Followers Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("followers")}
              className={`pb-3 px-5 text-[14px] transition-colors cursor-pointer select-none font-medium relative ${
                activeTab === "followers"
                  ? "text-[#222222] font-semibold"
                  : "text-[#666666] hover:text-[#222222]"
              }`}
            >
              <span>Followers (0)</span>
              {activeTab === "followers" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#222222]" />
              )}
            </button>

            {/* Following Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("following")}
              className={`pb-3 px-5 text-[14px] transition-colors cursor-pointer select-none font-medium relative ${
                activeTab === "following"
                  ? "text-[#222222] font-semibold"
                  : "text-[#666666] hover:text-[#222222]"
              }`}
            >
              <span>Following (0)</span>
              {activeTab === "following" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#222222]" />
              )}
            </button>

            {/* My Reviews Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 px-5 text-[14px] transition-colors cursor-pointer select-none font-medium relative ${
                activeTab === "reviews"
                  ? "text-[#222222] font-semibold"
                  : "text-[#666666] hover:text-[#222222]"
              }`}
            >
              <span>My Reviews (0)</span>
              {activeTab === "reviews" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#222222]" />
              )}
            </button>
          </div>
        </div>

        {/* 4. Tab Content Area (Empty state) */}
        <div className="py-24 text-center">
          <p className="text-[14px] text-[#777777] font-normal">
            No records found!
          </p>
        </div>
      </div>
    </div>
  );
}
