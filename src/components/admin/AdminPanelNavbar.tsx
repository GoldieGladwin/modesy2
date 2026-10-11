"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Eye,
  Globe,
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

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function AdminPanelNavbar({ onToggleSidebar }: NavbarProps) {
  const pathname = usePathname();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const languages = [
    { name: "English", code: "en" },
    { name: "Arabic", code: "ar" },
    { name: "Indonesian", code: "id" },
    { name: "French", code: "fr" },
  ];

  // Daftar menu dropdown profil admin sesuai urutan foto (Admin Panel berada di atas Dashboard)
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
      match: (path: string) => path === "/admin/dashboard" || path.startsWith("/admin/dashboard/"),
    },
    {
      title: "Profile",
      href: "/admin/profile",
      icon: User,
      match: (path: string) => path === "/admin/profile" || path.startsWith("/admin/profile/"),
    },
    {
      title: "Wallet",
      href: "/admin/wallet",
      icon: Wallet,
      match: (path: string) => path === "/admin/wallet" || path.startsWith("/admin/wallet/"),
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: ShoppingBasket,
      match: (path: string) => path === "/admin/orders" || path.startsWith("/admin/orders/"),
    },
    {
      title: "My Coupons",
      href: "/admin/my-coupons",
      icon: Tag,
      match: (path: string) =>
        path.startsWith("/admin/my-coupons") || path.startsWith("/admin/my-coupns"),
    },
    {
      title: "Messages",
      href: "/admin/messages",
      icon: MessageSquare,
      match: (path: string) =>
        path.startsWith("/admin/messages") || path.startsWith("/admin/massages"),
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

  // Aturan pengguna:
  // "di saat kita membuka salah satu menu tersebut menu itu akan hilang jika kita lihat, kecuali kita berpindah menu atau ke beranda dia akan muncul"
  const isHome = pathname === "/admin" || pathname === "/admin/";
  const visibleMenus = adminProfileMenus.filter((item) => {
    if (isHome) return true;
    return !item.match(pathname || "");
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-14 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 font-sans shadow-xs select-none">
      {/* 1. LEFT: Hamburger Menu Toggle Button (Garis 3) */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded cursor-pointer transition focus:outline-none"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* 2. RIGHT: View Site Button, English Language Dropdown, Admin Profile */}
      <div className="flex items-center gap-3 sm:gap-5 text-xs">
        {/* "View Site" Teal Button */}
        <Link
          href="/admin"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white rounded-[3px] text-xs font-semibold transition shadow-xs"
          title="View Marketplace Front"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Site</span>
        </Link>

        {/* Language Dropdown ("English ▾") */}
        <div className="relative" ref={langRef}>
          <button
            type="button"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 py-1.5 px-2 rounded hover:bg-gray-50 transition cursor-pointer"
          >
            <Globe className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="font-normal text-xs">{selectedLanguage}</span>
            <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-gray-200 rounded-sm shadow-lg z-50 py-1 text-xs">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setSelectedLanguage(lang.name);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 hover:bg-gray-50 transition flex items-center justify-between ${
                    selectedLanguage === lang.name
                      ? "text-[#00a99d] font-bold bg-teal-50/40"
                      : "text-gray-700"
                  }`}
                >
                  <span>{lang.name}</span>
                  {selectedLanguage === lang.name && (
                    <span className="text-[#00a99d] text-[10px]">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown (Nebula Avatar + "Admin ▾") */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 py-1 px-1.5 rounded hover:bg-gray-50 transition cursor-pointer"
          >
            {/* Nebula Avatar Circle (Exact match with Sidebar) */}
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 shadow-xs ring-1 ring-black/10 relative flex items-center justify-center bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 via-purple-600 to-pink-500 opacity-90" />
              <div className="absolute w-4 h-4 rounded-full bg-cyan-300/50 blur-[2px] -top-0.5 -left-0.5" />
              <div className="absolute w-4 h-4 rounded-full bg-pink-400/50 blur-[2px] bottom-0 right-0" />
            </div>

            <span className="font-medium text-xs text-gray-700 hidden sm:inline">
              Admin
            </span>
            <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
          </button>

          {/* Dropdown Menu Sesuai Foto User:
              Admin Panel (posisi di atas Dashboard), Dashboard, Profile, Wallet, Orders, My Coupons, Messages, Profile Settings, Logout.
              Sistem: Saat membuka salah satu menu, menu tersebut disembunyikan. Saat ke beranda (/admin), semua menu muncul. */}
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
