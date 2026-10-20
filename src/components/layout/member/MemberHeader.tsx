"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CATEGORIES, getCategorySlug } from "@/data/categories";
import LocationModal from "@/components/modals/LocationModal";
import {
  User,
  ShoppingBag,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  ShoppingCart,
  Heart,
  Store,
  Layers,
  Wallet,
  Tag,
  MessageSquare,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";

export default function MemberHeader() {
  const { user, logout } = useAuth();
  const { totalCartItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { currency, currencies, setCurrencyCode } = useCurrency();
  const { language, languages, setLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/products");
    }
  };
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"menu" | "categories">("menu");
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);

  // Location state
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Location");

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const memberMenuItems = [
    { title: "Profile", href: "/member/profile", icon: User },
    { title: "Wallet", href: "/member/wallet", icon: Wallet },
    { title: "Orders", href: "/member/orders", icon: ShoppingBag },
    { title: "My Coupons", href: "/member/my-coupons", icon: Tag },
    { title: "Messages", href: "/member/messages", icon: MessageSquare },
    { title: "Profile Settings", href: "/member/settings", icon: Settings },
  ];

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
        userRef.current &&
        !userRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
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
          {/* Left links */}
          <div className="flex items-center space-x-5">
            <Link
              href="/guest/contact"
              className="text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer text-[14px]"
            >
              {t("Contact")}
            </Link>
            <Link
              href="/member/start-selling"
              className="text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer text-[14px]"
            >
              {t("Start Selling")}
            </Link>
          </div>

          {/* Right links */}
          <div className="flex items-center space-x-4">
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
                <span className="max-w-[260px] truncate">{currentLocation === "Location" ? t("Location") : currentLocation}</span>
              </button>
              {currentLocation !== "Location" && (
                <button
                  type="button"
                  onClick={() => setCurrentLocation("Location")}
                  className="ml-2 inline-flex items-center bg-[#e3e3e7] hover:bg-[#d6d6da] text-[#515660] text-[12px] px-2 py-[2px] rounded-[3px] border-0 cursor-pointer"
                >
                  {t("Reset")}
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
                <span>{currency.label}</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-500" />
              </button>
              {currencyDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-[#ebebeb] rounded shadow-md z-50 py-1">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      type="button"
                      onClick={() => {
                        setCurrencyCode(curr.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-gray-100 cursor-pointer ${
                        currency.code === curr.code ? "text-[#00a99d] font-semibold" : "text-[#555]"
                      }`}
                    >
                      {curr.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Dropdown */}
            <div className="relative" ref={languageRef}>
              <button
                type="button"
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0 text-[14px]"
              >
                <img
                  src={language.flag}
                  alt={language.name}
                  className="w-[18px] h-auto mr-1.5 border border-gray-200"
                />
                <span>{language.name}</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-500" />
              </button>
              {languageDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-[#ebebeb] rounded shadow-md z-50 py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setLanguageDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-[13px] flex items-center hover:bg-gray-100 text-[#555] cursor-pointer"
                    >
                      <img src={lang.flag} alt={lang.name} className="w-[18px] h-auto mr-2" />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Member Profile Dropdown (Modesy Style) */}
            <div className="relative" ref={userRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 text-[#333] hover:text-[#00a99d] font-medium text-[14px] cursor-pointer bg-transparent border-0 p-0"
              >
                <img
                  src={user?.avatar || "/images/peter-jone-avatar.jpg"}
                  alt={user?.name || "Member"}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-black/10"
                />
                <span>{user?.name || "Member"}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-[#ebebeb] rounded-sm shadow-md z-50 py-1.5 text-[13px]">
                  <Link
                    href="/member/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>{t("Profile")}</span>
                  </Link>
                  <Link
                    href="/member/wallet"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition-colors"
                  >
                    <Wallet className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>{t("Wallet")}</span>
                  </Link>
                  <Link
                    href="/member/orders"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>{t("Orders")}</span>
                  </Link>
                  <Link
                    href="/member/my-coupons"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition-colors"
                  >
                    <Tag className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>{t("My Coupons")}</span>
                  </Link>
                  <Link
                    href="/member/messages"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>{t("Messages")}</span>
                  </Link>
                  <Link
                    href="/member/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>{t("Profile Settings")}</span>
                  </Link>
                  <Link
                    href="/guest"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>{t("Logout")}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAV / LOGO & SEARCH */}
      <div className="hidden lg:block bg-white py-[15px]">
        <div className="max-w-[1320px] mx-auto px-4 flex items-center justify-between">
          {/* Logo & Search Bar */}
          <div className="flex items-center flex-1 mr-8">
            <div className="shrink-0 mr-6">
              <Link href="/member" className="block">
                <img
                  src="/assets/img/logo.svg"
                  alt="Modesy"
                  width={160}
                  height={60}
                  className="w-[160px] h-[60px] object-contain"
                />
              </Link>
            </div>

            <form onSubmit={handleSearch} className="flex-1 max-w-[620px]">
              <div className="relative flex items-center bg-[#f6f6f6] border border-[#f6f6f6] rounded-[4px] h-[46px] w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("Search for products, categories or brands")}
                  className="w-full h-full bg-transparent pl-5 pr-12 text-[14px] text-[#7b808a] placeholder-[#7b808a] outline-none"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-0 top-0 h-full w-[46px] flex items-center justify-center text-[#7b808a] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-none"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-7 shrink-0">
            <Link
              href="/member/cart"
              className="flex items-center text-[#555555] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0 relative group"
            >
              <div className="relative mr-1.5 flex items-center">
                <ShoppingCart className="w-6 h-6" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#00a99d] text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold">
                    {totalCartItems}
                  </span>
                )}
              </div>
              <span className="text-[14px] font-medium">{t("Cart")}</span>
            </Link>

            <Link
              href="/member/wishlist"
              className="flex items-center text-[#555555] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0 relative"
            >
              <div className="relative mr-1.5 flex items-center">
                <Heart className="w-6 h-6" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#f43f5e] text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold">
                    {totalWishlistItems}
                  </span>
                )}
              </div>
              <span className="text-[14px] font-medium">{t("Wishlist")}</span>
            </Link>

            <Link
              href="/member/start-selling"
              className="bg-[#00a99d] hover:brightness-95 text-white text-[14px] font-medium px-5 py-2 rounded-[3px] transition-all cursor-pointer border-0 leading-[22px] inline-block text-center"
            >
              {t("Start Selling")}
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
                pathname === `/member/category/${categorySlug}` ||
                pathname === `/category/${categorySlug}`;
              return (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => setHoveredCategoryId(category.id)}
                >
                  <Link
                    href={`/member/category/${categorySlug}`}
                    className={`group relative px-3.5 py-[14px] text-[14px] font-medium whitespace-nowrap transition-colors block ${
                      isHovered || isActive
                        ? "text-[#00a99d]"
                        : "text-[#222222] hover:text-[#00a99d]"
                    }`}
                  >
                    <span>{t(category.title)}</span>
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
                      href={`/member/category/${getCategorySlug(activeCategory)}?sub=${encodeURIComponent(sub.title)}`}
                      className="font-bold text-[#222] text-[14px] mb-2.5 cursor-pointer hover:text-[#00a99d] transition-colors leading-[22px] block"
                    >
                      {t(sub.title)}
                    </Link>
                    {sub.items.length > 0 && (
                      <ul className="space-y-1.5 list-none p-0 m-0">
                        {sub.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              href={`/member/category/${getCategorySlug(activeCategory)}?sub=${encodeURIComponent(sub.title)}&item=${encodeURIComponent(item)}`}
                              className="text-[13px] text-[#555] hover:text-[#00a99d] transition-colors cursor-pointer text-left block leading-[20px]"
                            >
                              {t(item)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {activeCategory.images && activeCategory.images.length > 0 && (
                <div className="flex items-center gap-4 shrink-0">
                  {activeCategory.images.map((img, imgIdx) => (
                    <Link
                      href={`/member/category/${getCategorySlug(activeCategory)}?sub=${encodeURIComponent(img.label)}`}
                      key={imgIdx}
                      className="w-[140px] h-[190px] relative rounded overflow-hidden group cursor-pointer shadow-sm border border-gray-100 block"
                    >
                      <img
                        src={img.image}
                        alt={img.label}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex items-end p-2.5">
                        <span className="text-white text-xs font-semibold leading-tight line-clamp-2">
                          {t(img.label)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE HEADER */}
      <div className="lg:hidden border-b border-gray-200 bg-white">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Hamburger Menu Toggle (Preserved on mobile for full navigation access) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-[#222] bg-transparent border-0 cursor-pointer flex items-center justify-center"
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

            <Link href="/member">
              <img src="/assets/img/logo.svg" alt="Modesy" className="h-8 object-contain" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-1 text-gray-700 bg-transparent border-0 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link href="/member/wishlist" className="text-gray-700 relative p-1">
              <Heart className="w-5 h-5" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f43f5e] text-white text-[9px] min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center font-bold">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            <Link href="/member/cart" className="text-gray-700 relative p-1">
              <ShoppingCart className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00a99d] text-white text-[9px] min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center font-bold">
                  {totalCartItems}
                </span>
              )}
            </Link>

            <Link href="/member/profile" className="w-7 h-7 rounded-full overflow-hidden border border-gray-200 block shrink-0">
              <img
                src={user?.avatar || "/images/peter-jone-avatar.jpg"}
                alt={user?.name || "Member"}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>

        {/* Mobile Search Row */}
        {mobileSearchOpen && (
          <form onSubmit={handleSearch} className="px-4 pb-3">
            <div className="relative flex items-center bg-[#f6f6f6] border border-[#f6f6f6] rounded-[4px] h-[40px] w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("Search for products, categories or brands")}
                className="w-full h-full bg-transparent pl-4 pr-10 text-[13px] text-[#333] placeholder-[#888] outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-0 top-0 h-full w-[40px] flex items-center justify-center text-[#777]"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white px-4 py-4 space-y-4 animate-fadeIn">
            {/* Tabs: Main Menu vs Categories */}
            <div className="flex border-b border-gray-200">
              <button
                type="button"
                onClick={() => setMobileTab("menu")}
                className={`flex-1 py-2 text-center text-[14px] font-semibold transition-colors border-b-2 cursor-pointer ${
                  mobileTab === "menu"
                    ? "border-[#00a99d] text-[#00a99d]"
                    : "border-transparent text-[#666]"
                }`}
              >
                {t("Main Menu")}
              </button>
              <button
                type="button"
                onClick={() => setMobileTab("categories")}
                className={`flex-1 py-2 text-center text-[14px] font-semibold transition-colors border-b-2 cursor-pointer ${
                  mobileTab === "categories"
                    ? "border-[#00a99d] text-[#00a99d]"
                    : "border-transparent text-[#666]"
                }`}
              >
                {t("Categories")}
              </button>
            </div>

            {mobileTab === "menu" ? (
              <div className="space-y-1 py-2">
                {/* Profile Summary Box */}
                <div className="p-3 bg-gray-50 rounded border border-gray-200 mb-3 flex items-center gap-3">
                  <img
                    src={user?.avatar || "/images/peter-jone-avatar.jpg"}
                    alt={user?.name || "Member"}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900 truncate">{user?.name || "Member"}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || "members@gmail.com"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pb-2 border-b border-gray-100">
                  {memberMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-2 text-xs text-gray-700 hover:text-[#00a99d] hover:bg-gray-50 rounded transition-colors"
                      >
                        <Icon className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="truncate">{t(item.title)}</span>
                      </Link>
                    );
                  })}
                </div>

                <Link
                  href="/member"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[14px] text-gray-800 hover:text-[#00a99d] border-b border-gray-100"
                >
                  {t("Home")}
                </Link>
                <Link
                  href="/member/start-selling"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[14px] text-gray-800 hover:text-[#00a99d] border-b border-gray-100"
                >
                  {t("Start Selling")}
                </Link>
                <Link
                  href="/member/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[14px] text-gray-800 hover:text-[#00a99d] border-b border-gray-100"
                >
                  {t("Orders")}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    router.push("/guest");
                  }}
                  className="w-full text-left py-2 text-[14px] text-red-600 hover:text-red-700 flex items-center gap-2 cursor-pointer bg-transparent border-0"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t("Logout")}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-1 py-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/member/category/${getCategorySlug(cat)}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-[14px] text-gray-700 hover:text-[#00a99d] border-b border-gray-100 last:border-0"
                  >
                    {t(cat.title)}
                  </Link>
                ))}
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
