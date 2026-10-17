"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Eye,
  Globe,
  ChevronDown,
  Layers,
  User,
  Wallet,
  ShoppingBasket,
  Tag,
  MessageSquareText,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function ModeratorPanelNavbar({ onToggleSidebar }: NavbarProps) {
  const pathname = usePathname();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "English",
    flag: "/assets/img/flag_eng.jpg",
  });
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const languages = [
    { name: "English", flag: "/assets/img/flag_eng.jpg" },
    { name: "Arabic", flag: "/assets/img/flag_ar.png" },
  ];

  const { logout } = useAuth();

  // Moderator dropdown menus (strictly pointing to /moderator/*)
  const profileMenus = [
    {
      title: "Admin Panel",
      href: "/moderator/admin-panel",
      icon: Layers,
      match: (path: string) => path.startsWith("/moderator/admin-panel") || path.startsWith("/moderator/moderator-panel"),
    },
    {
      title: "Profile",
      href: "/moderator/profile",
      icon: User,
      match: (path: string) => path === "/moderator/profile" || path.startsWith("/moderator/profile/"),
    },
    {
      title: "Wallet",
      href: "/moderator/wallet",
      icon: Wallet,
      match: (path: string) => path === "/moderator/wallet" || path.startsWith("/moderator/wallet/"),
    },
    {
      title: "Orders",
      href: "/moderator/orders",
      icon: ShoppingBasket,
      match: (path: string) => path === "/moderator/orders" || path.startsWith("/moderator/orders/"),
    },
    {
      title: "My Coupons",
      href: "/moderator/my-coupons",
      icon: Tag,
      match: (path: string) => path.startsWith("/moderator/my-coupons"),
    },
    {
      title: "Messages",
      href: "/moderator/messages",
      icon: MessageSquareText,
      match: (path: string) => path === "/moderator/messages" || path.startsWith("/moderator/messages/"),
    },
    {
      title: "Profile Settings",
      href: "/moderator/profile-settings",
      icon: Settings,
      match: (path: string) => path.startsWith("/moderator/profile-settings"),
    },
  ];

  const isHome = pathname === "/moderator" || pathname === "/moderator/";
  const visibleMenus = profileMenus.filter((item) => {
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
      {/* Left: Hamburger Button */}
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

      {/* Right: View Site, Language, Profile */}
      <div className="flex items-center gap-3 sm:gap-5 text-xs">
        {/* View Site Button (matches screenshot teal/green button) */}
        <Link
          href="/moderator"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white rounded-[3px] text-xs font-semibold transition shadow-xs"
          title="View Marketplace Front"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Site</span>
        </Link>

        {/* Language Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLangDropdownOpen(!langDropdownOpen);
            }}
            className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 py-1.5 px-2 rounded hover:bg-gray-50 transition cursor-pointer"
          >
            <img
              src={selectedLanguage.flag}
              alt={selectedLanguage.name}
              className="w-4 h-auto border border-gray-200 shrink-0"
            />
            <span className="font-normal text-xs">{selectedLanguage.name}</span>
            <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-32 bg-white border border-gray-200 rounded-sm shadow-lg z-50 py-1 text-xs">
              {languages.map((l) => (
                <button
                  key={l.name}
                  type="button"
                  onClick={() => {
                    setSelectedLanguage(l);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-gray-50 transition flex items-center justify-between cursor-pointer ${
                    selectedLanguage.name === l.name
                      ? "text-[#00a99d] font-semibold bg-teal-50/40"
                      : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img src={l.flag} alt={l.name} className="w-4 h-auto border border-gray-200" />
                    <span>{l.name}</span>
                  </div>
                  {selectedLanguage.name === l.name && (
                    <span className="text-[#00a99d] text-[10px]">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Roger Novak User Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setProfileDropdownOpen(!profileDropdownOpen);
            }}
            className="flex items-center gap-2 py-1 px-1.5 rounded hover:bg-gray-50 transition cursor-pointer"
          >
            <img
              src="/assets/img/roger-avatar.jpg"
              alt="Roger Novak"
              className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-black/10"
            />
            <span className="font-medium text-xs text-gray-700 hidden sm:inline">
              Roger Novak
            </span>
            <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
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

              <div className="border-t border-gray-100 my-1" />

              <button
                type="button"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  if (logout) logout();
                  window.location.href = "/guest";
                }}
                className="w-full text-left flex items-center gap-3 px-4 py-2 text-[14px] text-gray-700 hover:text-[#00a99d] hover:bg-gray-50/80 transition-colors font-normal group cursor-pointer border-0 bg-transparent"
              >
                <LogOut
                  className="w-[18px] h-[18px] text-gray-500 group-hover:text-[#00a99d] transition-colors shrink-0"
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

