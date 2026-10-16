"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

export default function MemberHeader() {
  const { totalCartItems } = useCart();
  const pathname = usePathname();
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD ($)");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "English",
    flag: "/assets/img/flag_eng.jpg",
  });
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"menu" | "categories">("menu");
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);

  // Location state
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Location");

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

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
              Contact
            </Link>
            <Link
              href="/member/start-selling"
              className="text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer text-[14px]"
            >
              Start Selling
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
                      className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-gray-100 ${
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
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
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
                      className="w-full text-left px-3 py-1.5 text-[13px] flex items-center hover:bg-gray-100 text-[#555]"
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
                  src="/images/peter-jone-avatar.jpg"
                  alt="Peter Jone"
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-black/10"
                />
                <span>Peter Jone</span>
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
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/member/wallet"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition-colors"
                  >
                    <Wallet className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>Wallet</span>
                  </Link>
                  <Link
                    href="/member/orders"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>Orders</span>
                  </Link>
                  <Link
                    href="/member/my-coupons"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition-colors"
                  >
                    <Tag className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>My Coupons</span>
                  </Link>
                  <Link
                    href="/member/messages"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>Messages</span>
                  </Link>
                  <Link
                    href="/member/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>Profile Settings</span>
                  </Link>
                  <Link
                    href="/guest"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>Logout</span>
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
              <span className="text-[14px] font-medium">Cart</span>
            </Link>

            <Link
              href="/member/wishlist"
              className="flex items-center text-[#555555] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              <div className="mr-1.5 flex items-center">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-[14px] font-medium">Wishlist</span>
            </Link>

            <Link
              href="/member/start-selling"
              className="bg-[#00a99d] hover:brightness-95 text-white text-[14px] font-medium px-5 py-2 rounded-[3px] transition-all cursor-pointer border-0 leading-[22px] inline-block text-center"
            >
              Start Selling
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
                      href={`/member/category/${getCategorySlug(activeCategory)}?sub=${encodeURIComponent(sub.title)}`}
                      className="font-bold text-[#222] text-[14px] mb-2.5 cursor-pointer hover:text-[#00a99d] transition-colors leading-[22px] block"
                    >
                      {sub.title}
                    </Link>
                    {sub.items.length > 0 && (
                      <ul className="space-y-1.5 list-none p-0 m-0">
                        {sub.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              href={`/member/category/${getCategorySlug(activeCategory)}?sub=${encodeURIComponent(sub.title)}&item=${encodeURIComponent(item)}`}
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
                          {img.label}
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
      <div className="lg:hidden border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Link href="/member">
          <img src="/assets/img/logo.svg" alt="Modesy" className="h-8 object-contain" />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/member/cart" className="text-gray-700 relative">
            <ShoppingCart className="w-5 h-5" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#00a99d] text-white text-[9px] min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center font-bold">
                {totalCartItems}
              </span>
            )}
          </Link>
          <Link href="/member/profile" className="w-7 h-7 rounded-full overflow-hidden border border-gray-200 block">
            <img
              src="/images/peter-jone-avatar.jpg"
              alt="Peter Jone"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
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
