"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Eye,
  ChevronDown,
  Shield,
  LayoutGrid,
  User,
  Wallet,
  ShoppingBasket,
  Tag,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

interface DashboardNavbarProps {
  onToggleSidebar: () => void;
}

export default function DashboardNavbar({ onToggleSidebar }: DashboardNavbarProps) {
  const pathname = usePathname();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const adminProfileMenus = [
    {
      title: "Admin Panel",
      href: "/admin/admin-panel",
      icon: Shield,
      match: (path: string) => path.startsWith("/admin/admin-panel"),
    },
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutGrid,
      match: (path: string) =>
        path === "/admin/dashboard" || path.startsWith("/admin/dashboard/"),
    },
    {
      title: "Profile",
      href: "/admin/profile",
      icon: User,
      match: (path: string) =>
        path === "/admin/profile" || path.startsWith("/admin/profile/"),
    },
    {
      title: "Wallet",
      href: "/admin/wallet",
      icon: Wallet,
      match: (path: string) =>
        path === "/admin/wallet" || path.startsWith("/admin/wallet/"),
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: ShoppingBasket,
      match: (path: string) =>
        path === "/admin/orders" || path.startsWith("/admin/orders/"),
    },
    {
      title: "My Coupons",
      href: "/admin/my-coupons",
      icon: Tag,
      match: (path: string) =>
        path.startsWith("/admin/my-coupons") ||
        path.startsWith("/admin/my-coupns"),
    },
    {
      title: "Messages",
      href: "/admin/messages",
      icon: MessageSquare,
      match: (path: string) =>
        path.startsWith("/admin/messages") ||
        path.startsWith("/admin/massages"),
    },
    {
      title: "Profile Settings",
      href: "/admin/profile-settings",
      icon: Settings,
      match: (path: string) => path.startsWith("/admin/profile-settings"),
    },
    {
      title: "Logout",
      href: "/guest",
      icon: LogOut,
      match: () => false,
    },
  ];

  const visibleMenus = adminProfileMenus.filter((item) => {
    // Sesuai aturan: jika sedang di halaman menu tersebut, sembunyikan menu itu
    return !item.match(pathname || "");
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      {/* 2. Right side: View Site, Language, Admin Profile */}
      <div className="flex items-center gap-4 sm:gap-6 text-xs">
        {/* View Site Button */}
        <Link
          href="/admin"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white rounded-[3px] text-xs font-semibold transition shadow-xs"
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
                <img src="/assets/img/flag_eng.jpg" alt="English" className="w-4 h-auto" />
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
                <img src="/assets/img/flag_ar.png" alt="Arabic" className="w-4 h-auto" />
                <span>Arabic</span>
              </button>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-gray-50 transition"
          >
            {/* Nebula Avatar */}
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 shadow-xs ring-1 ring-black/10 relative flex items-center justify-center bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 via-purple-600 to-pink-500 opacity-90" />
              <div className="absolute w-3 h-3 rounded-full bg-cyan-300/50 blur-[1px] -top-0.5 -left-0.5" />
              <div className="absolute w-3 h-3 rounded-full bg-pink-400/50 blur-[1px] bottom-0 right-0" />
            </div>

            <span className="font-medium text-xs text-gray-700 hidden sm:inline">
              Admin
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
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
