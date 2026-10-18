"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { ProfileTab } from "./types";
import { ProfileSettingsSidebar } from "./ProfileSettingsSidebar";
import { UpdateProfileForm } from "./UpdateProfileForm";
import { LocationForm } from "./LocationForm";
import { ShippingAddressView } from "./ShippingAddressView";
import { AffiliateLinksView } from "./AffiliateLinksView";
import { SocialMediaForm } from "./SocialMediaForm";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { DeleteAccountForm } from "./DeleteAccountForm";

const TAB_TITLES: Record<ProfileTab, string> = {
  "update-profile": "Update Profile",
  location: "Location",
  "shipping-address": "Shipping Address",
  "affiliate-links": "Affiliate Links",
  "social-media": "Social Media",
  "change-password": "Change Password",
  "delete-account": "Delete Account",
};

export const ProfileSettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("update-profile");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb matching Screenshots */}
        <nav className="text-[13px] text-[#777777] mb-6 flex items-center gap-1.5 font-normal">
          <Link href="/admin" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span>/</span>
          <button
            type="button"
            onClick={() => setActiveTab("update-profile")}
            className="hover:text-[#00a99d] transition-colors cursor-pointer"
          >
            Profile Settings
          </button>
          <span>/</span>
          <span className="text-[#333333] font-normal">
            {TAB_TITLES[activeTab]}
          </span>
        </nav>

        {/* Page Title */}
        <h1 className="text-[22px] font-bold text-[#222222] mb-6">
          Profile Settings
        </h1>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3">
            <ProfileSettingsSidebar
              activeTab={activeTab}
              onSelectTab={setActiveTab}
            />
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-9">
            {activeTab === "update-profile" && <UpdateProfileForm />}
            {activeTab === "location" && <LocationForm />}
            {activeTab === "shipping-address" && <ShippingAddressView />}
            {activeTab === "affiliate-links" && <AffiliateLinksView />}
            {activeTab === "social-media" && <SocialMediaForm />}
            {activeTab === "change-password" && <ChangePasswordForm />}
            {activeTab === "delete-account" && <DeleteAccountForm />}
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          title="Scroll to Top"
          className="fixed bottom-6 right-6 w-9 h-9 bg-[#222222] hover:bg-black text-white flex items-center justify-center rounded-[3px] shadow-lg transition-all z-40 cursor-pointer"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
};
