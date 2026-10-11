"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES, CategoryItem } from "@/data/categories";
import LocationModal from "@/components/modals/LocationModal";

interface HeaderProps {
  onOpenLoginModal?: () => void;
  currentUser?: { email: string; name: string } | null;
  onLogout?: () => void;
}

export default function Header({
  onOpenLoginModal,
  currentUser,
  onLogout,
}: HeaderProps = {}) {
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD ($)");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "English",
    flag: "/assets/img/flag_eng.jpg",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"menu" | "categories">("menu");
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    string | null
  >(null);

  // Location state
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Location");

  // Hovered category state for Mega Menu
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null
  );

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

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
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeCategory = CATEGORIES.find((c) => c.id === hoveredCategoryId);

  return (
    <header id="header" className="w-full bg-white font-sans text-[#222]">
      {/* 1. TOP BAR (Desktop only, hidden on mobile) */}
      <div className="hidden lg:block border-b border-[#ebebeb] bg-white text-[14px]">
        <div className="max-w-[1320px] mx-auto px-4 py-[7px] flex items-center justify-between">
          {/* Left links */}
          <div className="flex items-center space-x-5">
            <Link
              href="/"
              className="text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer text-[14px]"
            >
              Contact
            </Link>
            <Link
              href="/"
              className="text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer text-[14px]"
            >
              Sell on Modesy
            </Link>
          </div>

          {/* Right links */}
          <div className="flex items-center space-x-4">
            {/* Location Button & Reset */}
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
                  className="ml-2 inline-flex items-center bg-[#e3e3e7] hover:bg-[#d6d6da] text-[#515660] text-[12px] px-2 py-[2px] rounded-[3px] border-0 cursor-pointer transition-colors"
                  title="Reset Location"
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
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  className="ml-1.5"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="#888888"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                        selectedCurrency === curr
                          ? "text-[#00a99d] font-semibold"
                          : "text-[#555]"
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
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  className="ml-1.5"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="#888888"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                      className={`w-full text-left px-3 py-1.5 text-[13px] flex items-center hover:bg-gray-100 transition-colors ${
                        selectedLanguage.name === lang.name
                          ? "text-[#00a99d] font-semibold"
                          : "text-[#555]"
                      }`}
                    >
                      <img
                        src={lang.flag}
                        alt={lang.name}
                        className="w-[18px] h-auto mr-2 border border-gray-200"
                      />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login / Register or Logged In User */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="text-[#333] font-medium text-[14px]">
                  {currentUser.name}
                </span>
                <span className="text-[#333e48] text-[13px]">/</span>
                <button
                  type="button"
                  onClick={onLogout}
                  className="text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0 text-[14px]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                {onOpenLoginModal ? (
                  <button
                    type="button"
                    onClick={onOpenLoginModal}
                    className="text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0 text-[14px]"
                  >
                    Login
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer text-[14px]"
                  >
                    Login
                  </Link>
                )}
                <span className="text-[#333e48] text-[13px] mx-2">/</span>
                <Link
                  href="/register"
                  className="text-[#666666] hover:text-[#00a99d] transition-colors cursor-pointer text-[14px]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. NAV TOP / MAIN MENU (Desktop) */}
      <div className="hidden lg:block bg-white py-[15px]">
        <div className="max-w-[1320px] mx-auto px-4 flex items-center justify-between">
          {/* Logo & Search Bar */}
          <div className="flex items-center flex-1 mr-8">
            {/* Logo */}
            <div className="shrink-0 mr-6">
              <Link href="/" className="block">
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
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Actions: Cart, Wishlist, Sell Now */}
          <div className="flex items-center space-x-7 shrink-0">
            {/* Cart */}
            <Link
              href="/"
              className="flex items-center text-[#555555] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0 relative group"
            >
              <div className="relative mr-1.5 flex items-center">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                  <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                  <path d="M2 3h3.5l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h9.5a1.5 1.5 0 0 0 1.5-1.2L22 6H6" />
                </svg>
                <span className="hidden group-hover:flex absolute -top-1.5 -right-2 bg-[#00a99d] text-white text-[10px] w-4 h-4 rounded-full items-center justify-center font-bold">
                  0
                </span>
              </div>
              <span className="text-[14px] font-medium leading-[26px]">
                Cart
              </span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/"
              className="flex items-center text-[#555555] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              <div className="mr-1.5 flex items-center">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <span className="text-[14px] font-medium leading-[26px]">
                Wishlist
              </span>
            </Link>

            {/* Sell Now Button */}
            {onOpenLoginModal ? (
              <button
                type="button"
                onClick={onOpenLoginModal}
                className="bg-[#00a99d] hover:brightness-95 text-white text-[14px] font-medium px-5 py-2 rounded-[3px] transition-all cursor-pointer border-0 leading-[22px]"
              >
                Sell Now
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-[#00a99d] hover:brightness-95 text-white text-[14px] font-medium px-5 py-2 rounded-[3px] transition-all cursor-pointer border-0 leading-[22px] inline-block text-center"
              >
                Sell Now
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 3. NAV MAIN / CATEGORIES BAR WITH HOVER MEGA MENU (Desktop) */}
      <div
        className="hidden lg:block border-b border-[rgba(0,0,0,0.05)] bg-white relative"
        onMouseLeave={() => setHoveredCategoryId(null)}
      >
        <div className="max-w-[1320px] mx-auto px-4">
          <nav className="flex items-center space-x-1 overflow-x-auto">
            {CATEGORIES.map((category) => {
              const isHovered = hoveredCategoryId === category.id;
              return (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => setHoveredCategoryId(category.id)}
                >
                  <button
                    type="button"
                    className={`group relative px-3.5 py-[14px] text-[14px] font-medium whitespace-nowrap transition-colors bg-transparent border-0 cursor-pointer ${
                      isHovered
                        ? "text-[#00a99d]"
                        : "text-[#222222] hover:text-[#00a99d]"
                    }`}
                  >
                    <span>{category.title}</span>
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#00a99d] transition-opacity ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        {/* MEGA MENU DROPDOWN PANEL */}
        {activeCategory && (
          <div
            className="absolute top-full left-0 right-0 w-full bg-white z-50 border-t border-[#f0f0f0] border-b border-[#e5e5e5] shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all"
            onMouseEnter={() => setHoveredCategoryId(activeCategory.id)}
            onMouseLeave={() => setHoveredCategoryId(null)}
          >
            <div className="max-w-[1320px] mx-auto px-4 py-6 flex items-start justify-between gap-8">
              {/* Left Column: Subcategories & Items */}
              <div className="flex-1 flex flex-wrap gap-x-12 gap-y-6">
                {activeCategory.subcategories.map((sub, idx) => (
                  <div key={idx} className="min-w-[150px] max-w-[200px]">
                    <h4 className="font-bold text-[#222] text-[14px] mb-2.5 cursor-pointer hover:text-[#00a99d] transition-colors leading-[22px]">
                      {sub.title}
                    </h4>
                    {sub.items.length > 0 && (
                      <ul className="space-y-1.5 list-none p-0 m-0">
                        {sub.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <button
                              type="button"
                              className="text-[13px] text-[#555] hover:text-[#00a99d] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block leading-[20px]"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Column: Category Image Cards */}
              {activeCategory.images.length > 0 && (
                <div className="w-[390px] shrink-0 grid grid-cols-2 gap-3">
                  {activeCategory.images.map((imgItem, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative h-[120px] rounded-[3px] overflow-hidden group/card cursor-pointer bg-[#f4f4f4]"
                    >
                      <img
                        src={imgItem.image}
                        alt={imgItem.label}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />
                      {/* Label Text */}
                      <span className="absolute bottom-0 left-0 right-0 p-2.5 text-white text-[13px] font-semibold text-left drop-shadow-sm select-none">
                        {imgItem.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4. MOBILE NAVIGATION (Screen < 992px) */}
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
          <button
            type="button"
            className="p-0 border-0 bg-transparent cursor-pointer"
          >
            <img
              src="/assets/img/logo.svg"
              alt="Modesy"
              width={140}
              height={45}
              className="h-[38px] w-auto object-contain"
            />
          </button>

          {/* Right Mobile Icons */}
          <div className="flex items-center space-x-3">
            {/* Search Icon */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-1 text-[#555] bg-transparent border-0 cursor-pointer"
              aria-label="Toggle Search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Cart Icon */}
            <button
              type="button"
              className="p-1 text-[#555] bg-transparent border-0 cursor-pointer relative"
              aria-label="Cart"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                <path d="M2 3h3.5l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h9.5a1.5 1.5 0 0 0 1.5-1.2L22 6H6" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#00a99d] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input Row */}
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
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Mobile Sidebar / Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white px-4 py-4 space-y-4">
            {/* Sell Now Mobile Button */}
            <button
              type="button"
              className="w-full bg-[#00a99d] text-white font-medium py-2.5 rounded-[3px] text-[14px]"
            >
              Sell Now
            </button>

            {/* Mobile Nav Tabs */}
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

            {/* Tab Content */}
            {mobileTab === "menu" ? (
              <div className="space-y-2 py-2">
                {["Home", "Wishlist", "Contact", "Blog", "Sell on Modesy"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      className="block w-full text-left py-2 text-[14px] text-[#333] hover:text-[#00a99d] transition-colors border-b border-gray-100 last:border-0"
                    >
                      {item}
                    </button>
                  )
                )}
                <div className="pt-2 flex items-center space-x-3 text-[14px]">
                  {currentUser ? (
                    <>
                      <span className="text-[#333] font-medium">
                        {currentUser.name}
                      </span>
                      <span className="text-gray-400">/</span>
                      <button
                        type="button"
                        onClick={onLogout}
                        className="text-[#666] hover:text-[#00a99d]"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenLoginModal?.();
                        }}
                        className="text-[#666] hover:text-[#00a99d]"
                      >
                        Login
                      </button>
                      <span className="text-gray-400">/</span>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenLoginModal?.();
                        }}
                        className="text-[#666] hover:text-[#00a99d]"
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>

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
                  return (
                    <div key={cat.id} className="border-b border-gray-100 pb-1">
                      <div className="flex items-center justify-between py-2">
                        <button
                          type="button"
                          className="text-left text-[14px] font-medium text-[#333] hover:text-[#00a99d]"
                        >
                          {cat.title}
                        </button>
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
                            <svg
                              width="12"
                              height="8"
                              viewBox="0 0 10 6"
                              fill="none"
                              className={`transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                d="M1 1L5 5L9 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="pl-4 space-y-2 pb-2">
                          {cat.subcategories.map((sub, sIdx) => (
                            <div key={sIdx}>
                              <div className="text-[13px] font-semibold text-[#222]">
                                {sub.title}
                              </div>
                              <div className="pl-2 space-y-1 mt-1">
                                {sub.items.map((it, itIdx) => (
                                  <div
                                    key={itIdx}
                                    className="text-[12px] text-[#666]"
                                  >
                                    {it}
                                  </div>
                                ))}
                              </div>
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
        onSelectLocation={(loc) => setCurrentLocation(loc)}
        currentLocation={currentLocation}
      />
    </header>
  );
}