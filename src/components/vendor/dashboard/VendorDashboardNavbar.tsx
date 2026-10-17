"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Eye,
  ChevronDown,
  LayoutGrid,
  User,
  Wallet,
  ShoppingBag,
  Tag,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface VendorDashboardNavbarProps {
  onToggleSidebar: () => void;
}

export default function VendorDashboardNavbar({
  onToggleSidebar,
}: VendorDashboardNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Exact 8 vendor menu items matching Modesy vendor profile dropdown
  const vendorMenus = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutGrid,
      match: (path: string) =>
        path === "/dashboard" || path === "/vendor/dashboard",
    },
    {
      title: "Profile",
      href: "/profile/daniel-jones",
      icon: User,
      match: (path: string) =>
        path.startsWith("/profile") || path.startsWith("/vendor/profile"),
    },
    {
      title: "Wallet",
      href: "/wallet",
      icon: Wallet,
      match: (path: string) =>
        path.startsWith("/wallet") || path.startsWith("/vendor/wallet"),
    },
    {
      title: "Orders",
      href: "/orders",
      icon: ShoppingBag,
      match: (path: string) =>
        path.startsWith("/orders") || path.startsWith("/vendor/orders"),
    },
    {
      title: "My Coupons",
      href: "/my-coupons",
      icon: Tag,
      match: (path: string) =>
        path.startsWith("/my-coupons") || path.startsWith("/vendor/my-coupons"),
    },
    {
      title: "Messages",
      href: "/messages",
      icon: MessageSquare,
      match: (path: string) =>
        path.startsWith("/messages") || path.startsWith("/vendor/messages"),
    },
    {
      title: "Profile Settings",
      href: "/settings",
      icon: Settings,
      match: (path: string) =>
        path.startsWith("/settings") ||
        path.startsWith("/vendor/profile-settings") ||
        path.startsWith("/vendor/settings"),
    },
  ];

  // In Modesy, if you are currently on the page, that item is hidden or active
  const visibleMenus = vendorMenus.filter((item) => !item.match(pathname || ""));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    logout();
    router.push("/");
  };

  return (
    <header className="h-16 bg-white border-b border-[#ebebeb] px-5 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* 1. Left side: Hamburger button */}
      <button
        type="button"
        onClick={onToggleSidebar}
        className="p-1.5 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
        aria-label="Toggle Sidebar"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* 2. Right side: View Site, Language, Vendor Profile */}
      <div className="flex items-center gap-4 sm:gap-6 text-xs">
        {/* View Site Button (matches screenshot green pill button) */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#20c997] hover:bg-[#1baa80] text-white rounded-[3px] text-xs font-semibold transition shadow-xs"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Site</span>
        </Link>

        {/* Language Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            type="button"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            <img
              src="/assets/img/flag_eng.jpg"
              alt="English"
              className="w-[18px] h-auto border border-gray-200"
            />
            <span className="font-normal text-xs">{selectedLanguage}</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>
          {langDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-[#ebebeb] rounded shadow-md z-50 py-1 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSelectedLanguage("English");
                  setLangDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-[#00a99d] font-semibold hover:bg-gray-50 flex items-center gap-2"
              >
                <img
                  src="/assets/img/flag_eng.jpg"
                  alt="English"
                  className="w-4 h-auto"
                />
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedLanguage("Arabic");
                  setLangDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-gray-600 hover:bg-gray-50 flex items-center gap-2"
              >
                <img
                  src="/assets/img/flag_ar.png"
                  alt="Arabic"
                  className="w-4 h-auto"
                />
                <span>Arabic</span>
              </button>
            </div>
          )}
        </div>

        {/* Vendor Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-gray-50 transition"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-gray-200">
              <img
                src="/assets/img/trendshop-avatar.jpg"
                alt="Trendshop"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="font-medium text-xs text-gray-700 hidden sm:inline">
              Trendshop
            </span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-[3px] shadow-lg z-50 py-2">
              {visibleMenus.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-[14px] text-gray-700 hover:text-[#00a99d] hover:bg-gray-50/80 transition-colors font-normal group"
                  >
                    <Icon
                      className="w-[18px] h-[18px] text-gray-500 group-hover:text-[#00a99d] transition-colors shrink-0"
                      strokeWidth={1.75}
                    />
                    <span className="truncate">{item.title}</span>
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-red-600 hover:bg-red-50/80 transition-colors font-normal group border-t border-gray-100 mt-1 cursor-pointer"
              >
                <LogOut
                  className="w-[18px] h-[18px] text-red-500 group-hover:text-red-600 transition-colors shrink-0"
                  strokeWidth={1.75}
                />
                <span className="truncate">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
