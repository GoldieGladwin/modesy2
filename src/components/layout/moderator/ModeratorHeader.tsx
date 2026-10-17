"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES, getCategorySlug } from "@/data/categories";
import LocationModal from "@/components/modals/LocationModal";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  Layers,
  User,
  Wallet,
  ShoppingBasket,
  Tag,
  MessageSquareText,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  ShoppingCart,
  Heart,
} from "lucide-react";

export default function ModeratorHeader() {
  const { totalCartItems } = useCart();
  const { logout } = useAuth();
  const pathname = usePathname();

  // Dropdown states
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD ($)");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "English",
    flag: "/assets/img/flag_eng.jpg",
  });
  const [modDropdownOpen, setModDropdownOpen] = useState(false);

  // Mobile navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"menu" | "categories">("menu");
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

  // Category hover for Mega Menu
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);

  // Location state
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Location");

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const modRef = useRef<HTMLDivElement>(null);

  const currencies = [
    "USD ($)",
    "EUR (€)",
    "BRL (R$)",
    "GBP (£)",
    "IDR (Rp)",
    "INR (₹)",
    "NGN (₦)",
    "RUB (₽)",
    "TRY (₺)",
  ];

  const languages = [
    { name: "English", flag: "/assets/img/flag_eng.jpg" },
    { name: "Arabic", flag: "/assets/img/flag_ar.png" },
  ];

  // Moderator / User Dropdown items matching the image exactly, strictly pointing to moderator routes
  const profileMenuItems = [
    {
      title: "Admin Panel",
      href: "/moderator/admin-panel",
      icon: Layers,
    },
    {
      title: "Profile",
      href: "/moderator/profile",
      icon: User,
    },
    {
      title: "Wallet",
      href: "/moderator/wallet",
      icon: Wallet,
    },
    {
      title: "Orders",
      href: "/moderator/orders",
      icon: ShoppingBasket,
    },
    {
      title: "My Coupons",
      href: "/moderator/my-coupons",
      icon: Tag,
    },
    {
      title: "Messages",
      href: "/moderator/messages",
      icon: MessageSquareText,
    },
    {
      title: "Profile Settings",
      href: "/moderator/profile-settings",
      icon: Settings,
    },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        currencyRef.current &&
        !currencyRef.current.contains(event.target as Node)
      ) {
        setCurrencyDropdownOpen(false);
      }
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setLanguageDropdownOpen(false);
      }
      if (
        modRef.current &&
        !modRef.current.contains(event.target as Node)
      ) {
        setModDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeCategory = CATEGORIES.find((c) => c.id === hoveredCategoryId);

  return (
    <header id="header" className="w-full bg-white font-sans text-[#222]">
      {/* 1. TOP BAR */}
      <div className="hidden lg:block border-b border-[#ebebeb] bg-white text-[14px]">
        <div className="max-w-[1320px] mx-auto px-4 py-[7px] flex items-center justify-between">
          {/* Left links: Contact, Sell on Modesy */}
          <div className="flex items-center space-x-6">
            <Link
              href="/guest/contact"
              className="text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer text-[14px]"
            >
              Contact
            </Link>
            <Link
              href="/moderator/dashboard"
              className="text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer text-[14px]"
            >
              Sell on Modesy
            </Link>
          </div>

          {/* Right links: Location, Currency, Language, Roger Novak */}
          <div className="flex items-center space-x-5">
            {/* Location Button */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setLocationModalOpen(true)}
                className="flex items-center text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0 text-[14px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="#888888"
                  className="mr-1.5 shrink-0"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                <span className="max-w-[260px] truncate">{currentLocation}</span>
              </button>
              {currentLocation !== "Location" && (
                <button
                  type="button"
                  onClick={() => setCurrentLocation("Location")}
                  className="ml-2 inline-flex items-center bg-[#e3e3e7] hover:bg-[#d6d6da] text-[#515660] text-[12px] px-2 py-[2px] rounded-[3px] border-0 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Currency Dropdown */}
            <div className="relative" ref={currencyRef}>
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0 text-[14px]"
              >
                <span>{selectedCurrency}</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-500" />
              </button>
              {currencyDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-[#ebebeb] rounded shadow-md z-50 py-1">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => {
                        setSelectedCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-gray-100 transition-colors ${
                        selectedCurrency === curr ? "text-[#00a99d] font-semibold" : "text-[#555]"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Dropdown */}
            <div className="relative" ref={languageRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLanguageDropdownOpen(!languageDropdownOpen);
                }}
                className="flex items-center text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0 text-[14px]"
              >
                <img
                  src={selectedLanguage.flag}
                  alt={selectedLanguage.name}
                  className="w-[18px] h-auto mr-1.5 border border-gray-200"
                />
                <span>{selectedLanguage.name}</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-500" />
              </button>
              {languageDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-[#ebebeb] rounded shadow-md z-50 py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.name}
                      type="button"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setLanguageDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-[13px] flex items-center hover:bg-gray-100 transition-colors text-[#555] cursor-pointer"
                    >
                      <img src={lang.flag} alt={lang.name} className="w-[18px] h-auto mr-2 border border-gray-200" />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Roger Novak User Profile Dropdown */}
            <div className="relative" ref={modRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModDropdownOpen(!modDropdownOpen);
                }}
                className="flex items-center gap-2 text-[#333] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0 text-[14px]"
              >
                <img
                  src="/assets/img/roger-avatar.jpg"
                  alt="Roger Novak"
                  className="w-[26px] h-[26px] rounded-full object-cover shrink-0 ring-1 ring-black/10"
                />
                <span className="font-normal text-[14px] text-[#333]">Roger Novak</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform ${
                    modDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu matching Image 2 */}
              {modDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-[190px] bg-white border border-[#ebebeb] rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] z-50 py-1.5 text-[14px]">
                  {profileMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setModDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-[#444] hover:bg-gray-50 hover:text-[#00a99d] transition-colors font-normal group"
                      >
                        <Icon className="w-[18px] h-[18px] text-[#666] group-hover:text-[#00a99d] transition-colors shrink-0 stroke-[1.7]" />
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}

                  <div className="border-t border-[#f0f0f0] my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      setModDropdownOpen(false);
                      if (logout) logout();
                      window.location.href = "/guest";
                    }}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-[#444] hover:bg-gray-50 hover:text-[#00a99d] transition-colors font-normal group bg-transparent border-0 cursor-pointer"
                  >
                    <LogOut className="w-[18px] h-[18px] text-[#666] group-hover:text-[#00a99d] transition-colors shrink-0 stroke-[1.7]" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAV / LOGO, SEARCH & ACTIONS */}
      <div className="hidden lg:block bg-white py-[15px]">
        <div className="max-w-[1320px] mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center flex-1 mr-8">
            {/* Modesy Logo */}
            <div className="shrink-0 mr-6">
              <Link href="/moderator" className="block">
                <img
                  src="/assets/img/logo.svg"
                  alt="Modesy"
                  width={160}
                  height={60}
                  className="w-[160px] h-[60px] object-contain"
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-[620px]">
              <div className="relative flex items-center bg-[#f6f6f6] border border-[#f6f6f6] rounded-[4px] h-[46px] w-full">
                <input
                  type="text"
                  placeholder="Search for products, categories or brands"
                  className="w-full h-full bg-transparent pl-5 pr-12 text-[14px] text-[#7b808a] placeholder-[#7b808a] outline-none"
                />
                <button
                  type="button"
                  aria-label="Search"
                  className="absolute right-0 top-0 h-full w-[46px] flex items-center justify-center text-[#7b808a] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-none"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Actions: Cart (with badge 4), Wishlist, Sell Now */}
          <div className="flex items-center space-x-7 shrink-0">
            {/* Cart with red 4 badge */}
            <Link
              href="/cart"
              className="flex items-center text-[#555555] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0 relative group"
            >
              <div className="relative mr-1.5 flex items-center">
                <ShoppingCart className="w-6 h-6 stroke-[1.7]" />
                <span className="absolute -top-1.5 -right-2 bg-[#e74c3c] text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold">
                  {totalCartItems > 1 ? totalCartItems : 4}
                </span>
              </div>
              <span className="text-[14px] font-medium leading-[26px]">Cart</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/guest/wishlist"
              className="flex items-center text-[#555555] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              <div className="mr-1.5 flex items-center">
                <Heart className="w-6 h-6 stroke-[1.7]" />
              </div>
              <span className="text-[14px] font-medium leading-[26px]">Wishlist</span>
            </Link>

            {/* Sell Now Button (matches photo green/teal button) */}
            <Link
              href="/moderator/dashboard"
              className="bg-[#00a99d] hover:brightness-95 text-white text-[14px] font-medium px-5 py-2 rounded-[3px] transition-all cursor-pointer border-0 leading-[22px] inline-block text-center shadow-xs"
            >
              Sell Now
            </Link>
          </div>
        </div>
      </div>

      {/* 3. CATEGORIES MEGA NAV */}
      <div
        className="hidden lg:block border-b border-[rgba(0,0,0,0.05)] bg-white relative"
        onMouseLeave={() => setHoveredCategoryId(null)}
      >
        <div className="max-w-[1320px] mx-auto px-4">
          <nav className="flex items-center space-x-1 overflow-x-auto">
            {CATEGORIES.map((category) => {
              const categorySlug = getCategorySlug(category);
              const isHovered = hoveredCategoryId === category.id;
              const isActive =
                pathname === `/moderator/category/${categorySlug}` ||
                pathname === `/category/${categorySlug}`;
              return (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => setHoveredCategoryId(category.id)}
                >
                  <Link
                    href={`/moderator/category/${categorySlug}`}
                    className={`group relative px-3.5 py-[14px] text-[14px] font-medium whitespace-nowrap transition-colors block ${
                      isHovered || isActive
                        ? "text-[#00a99d]"
                        : "text-[#222222] hover:text-[#00a99d]"
                    }`}
                  >
                    <span>{category.title}</span>
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#00a99d] transition-opacity ${
                        isHovered || isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Mega Menu Dropdown */}
        {activeCategory && activeCategory.subcategories && activeCategory.subcategories.length > 0 && (
          <div
            className="absolute top-full left-0 right-0 w-full bg-white z-50 border-t border-[#f0f0f0] border-b border-[#e5e5e5] shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all"
            onMouseEnter={() => setHoveredCategoryId(activeCategory.id)}
            onMouseLeave={() => setHoveredCategoryId(null)}
          >
            <div className="max-w-[1320px] mx-auto px-4 py-6 flex items-start justify-between gap-8">
              <div className="flex-1 flex flex-wrap gap-x-12 gap-y-6">
                {activeCategory.subcategories.map((sub, idx) => (
                  <div key={idx} className="min-w-[150px] max-w-[200px]">
                    <Link
                      href={`/moderator/category/${getCategorySlug(activeCategory)}?sub=${encodeURIComponent(sub.title)}`}
                      className="font-bold text-[#222] text-[14px] mb-2.5 cursor-pointer hover:text-[#00a99d] transition-colors leading-[22px] block"
                    >
                      {sub.title}
                    </Link>
                    {sub.items.length > 0 && (
                      <ul className="space-y-1.5 list-none p-0 m-0">
                        {sub.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              href={`/moderator/category/${getCategorySlug(activeCategory)}?sub=${encodeURIComponent(sub.title)}&item=${encodeURIComponent(item)}`}
                              className="text-[13px] text-[#555] hover:text-[#00a99d] transition-colors cursor-pointer text-left block leading-[20px]"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {activeCategory.images && activeCategory.images.length > 0 && (
                <div className="w-[390px] shrink-0 grid grid-cols-2 gap-3">
                  {activeCategory.images.map((img, imgIdx) => (
                    <Link
                      href={`/moderator/category/${getCategorySlug(activeCategory)}?sub=${encodeURIComponent(img.label)}`}
                      key={imgIdx}
                      className="relative h-[120px] rounded-[3px] overflow-hidden group cursor-pointer bg-[#f4f4f4] block"
                    >
                      <img
                        src={img.image}
                        alt={img.label}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                      <span className="absolute bottom-0 left-0 right-0 p-2.5 text-white text-[13px] font-semibold text-left drop-shadow-sm select-none">
                        {img.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4. MOBILE NAVIGATION (Screen < 1024px) */}
      <div className="block lg:hidden bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-[#222] bg-transparent border-0 cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/moderator" className="p-0 border-0 bg-transparent cursor-pointer block">
            <img
              src="/assets/img/logo.svg"
              alt="Modesy"
              width={140}
              height={45}
              className="h-[38px] w-auto object-contain"
            />
          </Link>

          {/* Right Mobile Icons: Search & Cart */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-1 text-[#555] bg-transparent border-0 cursor-pointer"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5 text-[#555]" />
            </button>

            <Link
              href="/cart"
              className="p-1 text-[#555] bg-transparent border-0 cursor-pointer relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-[#555]" />
              <span className="absolute -top-1 -right-1 bg-[#e74c3c] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {totalCartItems > 1 ? totalCartItems : 4}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Row */}
        {mobileSearchOpen && (
          <div className="px-4 pb-3">
            <div className="relative flex items-center bg-[#f6f6f6] border border-[#f6f6f6] rounded-[4px] h-[40px] w-full">
              <input
                type="text"
                placeholder="Search for products, categories or brands"
                className="w-full h-full bg-transparent pl-4 pr-10 text-[13px] text-[#7b808a] placeholder-[#7b808a] outline-none"
              />
              <button
                type="button"
                className="absolute right-0 top-0 h-full w-[40px] flex items-center justify-center text-[#7b808a] bg-transparent border-none"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white px-4 py-4 space-y-4">
            <Link
              href="/moderator/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full bg-[#00a99d] text-white font-medium py-2.5 rounded-[3px] text-[14px] text-center"
            >
              Sell Now
            </Link>

            <div className="flex border-b border-gray-200">
              <button
                type="button"
                onClick={() => setMobileTab("menu")}
                className={`flex-1 py-2 text-center text-[14px] font-semibold transition-colors border-b-2 ${
                  mobileTab === "menu"
                    ? "border-[#00a99d] text-[#00a99d]"
                    : "border-transparent text-[#666]"
                }`}
              >
                Main Menu
              </button>
              <button
                type="button"
                onClick={() => setMobileTab("categories")}
                className={`flex-1 py-2 text-center text-[14px] font-semibold transition-colors border-b-2 ${
                  mobileTab === "categories"
                    ? "border-[#00a99d] text-[#00a99d]"
                    : "border-transparent text-[#666]"
                }`}
              >
                Categories
              </button>
            </div>

            {mobileTab === "menu" ? (
              <div className="space-y-2 py-2">
                {/* User Profile Box in Mobile */}
                <div className="p-3 bg-gray-50 rounded border border-gray-200 mb-2">
                  <div className="flex items-center space-x-2.5 mb-2.5 pb-2.5 border-b border-gray-200">
                    <img
                      src="/assets/img/roger-avatar.jpg"
                      alt="Roger Novak"
                      className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-black/10"
                    />
                    <div>
                      <div className="text-[14px] font-semibold text-gray-800">
                        Roger Novak
                      </div>
                      <div className="text-[11px] text-gray-500">
                        Member / Moderator
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {profileMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 p-1.5 text-[12px] text-gray-700 hover:text-[#00a99d] hover:bg-white rounded transition-colors"
                        >
                          <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="truncate">{item.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {["Home", "Wishlist", "Contact", "Blog", "Sell on Modesy"].map(
                  (item) => (
                    <Link
                      key={item}
                      href={
                        item === "Home"
                          ? "/moderator"
                          : item === "Sell on Modesy"
                          ? "/moderator/dashboard"
                          : item === "Blog"
                          ? "/guest/blog"
                          : item === "Contact"
                          ? "/guest/contact"
                          : "/guest/wishlist"
                      }
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left py-2 text-[14px] text-[#333] hover:text-[#00a99d] transition-colors border-b border-gray-100 last:border-0"
                    >
                      {item}
                    </Link>
                  )
                )}

                {/* Mobile Location */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[14px]">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLocationModalOpen(true);
                    }}
                    className="flex items-center text-[#666] hover:text-[#00a99d]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 16 16"
                      fill="#888888"
                      className="mr-1.5 shrink-0"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                    <span className="truncate">{currentLocation}</span>
                  </button>

                  {currentLocation !== "Location" && (
                    <button
                      type="button"
                      onClick={() => setCurrentLocation("Location")}
                      className="bg-[#e3e3e7] text-[#515660] text-[12px] px-2 py-0.5 rounded-[3px]"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-1 py-2">
                {CATEGORIES.map((cat) => {
                  const isExpanded = expandedMobileCategory === cat.id;
                  const catSlug = getCategorySlug(cat);
                  return (
                    <div key={cat.id} className="border-b border-gray-100 pb-1">
                      <div className="flex items-center justify-between py-2">
                        <Link
                          href={`/moderator/category/${catSlug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-left text-[14px] font-medium text-[#333] hover:text-[#00a99d]"
                        >
                          {cat.title}
                        </Link>
                        {cat.subcategories.length > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedMobileCategory(
                                isExpanded ? null : cat.id
                              )
                            }
                            className="p-1 text-gray-500"
                          >
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="pl-4 space-y-2 pb-2">
                          {cat.subcategories.map((sub, sIdx) => (
                            <div key={sIdx}>
                              <Link
                                href={`/moderator/category/${catSlug}?sub=${encodeURIComponent(sub.title)}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-[13px] font-semibold text-[#222] hover:text-[#00a99d] block"
                              >
                                {sub.title}
                              </Link>
                              {sub.items.length > 0 && (
                                <div className="pl-2 space-y-1 mt-1">
                                  {sub.items.map((it, itIdx) => (
                                    <Link
                                      key={itIdx}
                                      href={`/moderator/category/${catSlug}?sub=${encodeURIComponent(sub.title)}&item=${encodeURIComponent(it)}`}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="block text-[12px] text-[#666] hover:text-[#00a99d] py-0.5"
                                    >
                                      {it}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSelectLocation={(loc) => setCurrentLocation(loc)}
      />
    </header>
  );
}
