"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  UploadCloud,
  ShoppingBasket,
  ShoppingCart,
  Tag,
  Ticket,
  Flag,
  Banknote,
  CreditCard,
  MessageSquare,
  Star,
  Settings,
  Truck,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const isProductRoute = Boolean(pathname?.includes("/products"));
  const [productsOpen, setProductsOpen] = useState(isProductRoute || false);
  const isSalesRoute = Boolean(pathname?.includes("/sales") || pathname?.includes("/orders"));
  const [salesOpen, setSalesOpen] = useState(isSalesRoute || false);
  const [paymentsOpen, setPaymentsOpen] = useState(false);

  const isDashboardActive = pathname === "/admin/dashboard";

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-[#ebebeb] flex flex-col h-screen transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* 1. Logo (Fixed at top of sidebar, shrink-0) */}
      <div className="h-16 px-6 flex items-center border-b border-[#f4f4f4] shrink-0 bg-white">
        <Link href="/admin/dashboard" className="block">
          <img
            src="/assets/img/logo.svg"
            alt="Modesy"
            width={135}
            height={42}
            className="w-[135px] h-auto object-contain"
          />
        </Link>
      </div>

      {/* 2. Scrollable Body: Profile Box + All Menu Sections */}
      <div className="flex-1 overflow-y-auto">
        {/* User Profile Box (Hi, Admin) */}
        <div className="p-6 flex flex-col items-center border-b border-[#f4f4f4]">
          {/* Nebula Avatar Circle */}
          <div className="w-[78px] h-[78px] rounded-full overflow-hidden shrink-0 shadow-xs ring-2 ring-teal-400/25 relative flex items-center justify-center bg-slate-900">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 via-purple-600 to-pink-500 opacity-90" />
            <div className="absolute w-8 h-8 rounded-full bg-cyan-300/50 blur-[3px] -top-1 -left-1" />
            <div className="absolute w-8 h-8 rounded-full bg-pink-400/50 blur-[3px] bottom-0 right-0" />
          </div>
          <div className="text-[15px] font-bold text-gray-800 mt-3 text-center">
            Hi, Admin
          </div>
        </div>

        {/* Navigation Links */}
        <div className="py-4 space-y-6">
          {/* ========================================================= */}
          {/* SECTION: NAVIGATION */}
          {/* ========================================================= */}
          <div>
            <div className="px-6 text-[11px] font-bold text-[#8c94a0] uppercase tracking-wider mb-2">
              NAVIGATION
            </div>
            <Link
              href="/admin/dashboard"
              onClick={onClose}
              className={`flex items-center gap-3.5 px-6 py-2.5 text-[14px] transition-colors ${
                isDashboardActive
                  ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                  : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
              }`}
            >
              <Home className="w-4 h-4 text-[#8c94a0]" />
              <span>Dashboard</span>
            </Link>
          </div>

          {/* ========================================================= */}
          {/* SECTION: PRODUCTS */}
          {/* ========================================================= */}
          <div>
            <div className="px-6 text-[11px] font-bold text-[#8c94a0] uppercase tracking-wider mb-2">
              PRODUCTS
            </div>
            <div className="space-y-0.5">
              <Link
                href="/admin/dashboard/add-product"
                onClick={onClose}
                className={`flex items-center gap-3.5 px-6 py-2.5 text-[14px] transition-colors ${
                  pathname === "/admin/dashboard/add-product"
                    ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                    : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
                }`}
              >
                <FileText className={`w-4 h-4 ${pathname === "/admin/dashboard/add-product" ? "text-[#00a99d]" : "text-[#8c94a0]"}`} />
                <span>Add Product</span>
              </Link>

              <Link
                href="/admin/dashboard/bulk-product-upload"
                onClick={onClose}
                className={`flex items-center gap-3.5 px-6 py-2.5 text-[14px] transition-colors ${
                  pathname === "/admin/dashboard/bulk-product-upload"
                    ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                    : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
                }`}
              >
                <UploadCloud className={`w-4 h-4 ${pathname === "/admin/dashboard/bulk-product-upload" ? "text-[#00a99d]" : "text-[#8c94a0]"}`} />
                <span>Bulk Product Upload</span>
              </Link>

              {/* Products Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="w-full flex items-center justify-between px-6 py-2.5 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <ShoppingBasket className="w-4 h-4 text-[#8c94a0]" />
                    <span>Products</span>
                  </div>
                  {productsOpen ? (
                    <ChevronDown className="w-4 h-4 text-[#555]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                {productsOpen && (
                  <div className="py-1 space-y-0.5">
                    {[
                      { title: "Products", href: "/admin/dashboard/products" },
                      { title: "Pending Products", href: "/admin/dashboard/products/pending" },
                      { title: "Hidden Products", href: "/admin/dashboard/products/hidden" },
                      { title: "Sold Products", href: "/admin/dashboard/products/sold" },
                      { title: "Drafts", href: "/admin/dashboard/products/drafts" },
                    ].map((item) => {
                      const isActive =
                        pathname === item.href ||
                        pathname === item.href.replace("/dashboard/", "/admin-panel/");
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className={`block pl-[54px] pr-6 py-2 text-[13.5px] transition-colors ${
                            isActive
                              ? "text-[#00a99d] font-semibold"
                              : "text-[#556270] hover:text-[#00a99d]"
                          }`}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION: SALES */}
          {/* ========================================================= */}
          <div>
            <div className="px-6 text-[11px] font-bold text-[#8c94a0] uppercase tracking-wider mb-2">
              SALES
            </div>
            <div className="space-y-0.5">
              {/* Sales Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setSalesOpen(!salesOpen)}
                  className="w-full flex items-center justify-between px-6 py-2.5 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <ShoppingCart className="w-4 h-4 text-[#8c94a0]" />
                    <span>Sales</span>
                  </div>
                  {salesOpen ? (
                    <ChevronDown className="w-4 h-4 text-[#555]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                {salesOpen && (
                  <div className="py-1 space-y-0.5">
                    {[
                      { title: "Active Sales", href: "/admin/dashboard/sales/active" },
                      { title: "Completed Sales", href: "/admin/dashboard/sales/completed" },
                      { title: "Cancelled Sales", href: "/admin/dashboard/sales/cancelled" },
                    ].map((item) => {
                      const isActive =
                        pathname === item.href ||
                        pathname === item.href.replace("/dashboard/", "/admin-panel/");
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className={`block pl-[54px] pr-6 py-2 text-[13.5px] transition-colors ${
                            isActive
                              ? "text-[#00a99d] font-semibold"
                              : "text-[#556270] hover:text-[#00a99d]"
                          }`}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                href="/admin/dashboard/quote-requests"
                onClick={onClose}
                className="flex items-center gap-3.5 px-6 py-2.5 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 transition-colors"
              >
                <Tag className="w-4 h-4 text-[#8c94a0]" />
                <span>Quote Requests</span>
              </Link>

              <Link
                href="/admin/my-coupons"
                onClick={onClose}
                className="flex items-center gap-3.5 px-6 py-2.5 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 transition-colors"
              >
                <Ticket className="w-4 h-4 text-[#8c94a0]" />
                <span>Coupons</span>
              </Link>

              {/* Refund Requests (Badge hijau toska '1') */}
              <Link
                href="/admin/admin-panel/refund-requests"
                onClick={onClose}
                className="flex items-center justify-between px-6 py-2.5 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <Flag className="w-4 h-4 text-[#8c94a0]" />
                  <span>Refund Requests</span>
                </div>
                <span className="bg-[#00a99d] text-white text-[11px] font-bold px-2 py-0.5 rounded-[3px]">
                  1
                </span>
              </Link>

              {/* Cash on Delivery */}
              <Link
                href="/admin/dashboard/cash-on-delivery"
                onClick={onClose}
                className="flex items-center gap-3.5 px-6 py-2.5 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 transition-colors"
              >
                <Banknote className="w-4 h-4 text-[#8c94a0]" />
                <span>Cash on Delivery</span>
              </Link>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION: PAYMENTS */}
          {/* ========================================================= */}
          <div>
            <div className="px-6 text-[11px] font-bold text-[#8c94a0] uppercase tracking-wider mb-2">
              PAYMENTS
            </div>
            <div>
              <button
                type="button"
                onClick={() => setPaymentsOpen(!paymentsOpen)}
                className="w-full flex items-center justify-between px-6 py-2.5 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <CreditCard className="w-4 h-4 text-[#8c94a0]" />
                  <span>Payments</span>
                </div>
                {paymentsOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                )}
              </button>
              {paymentsOpen && (
                <div className="pl-13 pr-4 py-1.5 space-y-1 bg-gray-50/50">
                  <Link
                    href="/admin/wallet"
                    onClick={onClose}
                    className="block py-1 text-xs text-[#666] hover:text-[#00a99d]"
                  >
                    Wallet
                  </Link>
                  <Link
                    href="/admin/earnings"
                    onClick={onClose}
                    className="block py-1 text-xs text-[#666] hover:text-[#00a99d]"
                  >
                    Earnings
                  </Link>
                  <Link
                    href="/admin/payouts"
                    onClick={onClose}
                    className="block py-1 text-xs text-[#666] hover:text-[#00a99d]"
                  >
                    Payouts
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION: COMMENTS */}
          {/* ========================================================= */}
          <div>
            <div className="px-6 text-[11px] font-bold text-[#8c94a0] uppercase tracking-wider mb-2">
              COMMENTS
            </div>
            <div className="space-y-0.5">
              <Link
                href="/admin/comments"
                onClick={onClose}
                className="flex items-center gap-3.5 px-6 py-2.5 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#8c94a0]" />
                <span>Comments</span>
              </Link>

              <Link
                href="/admin/reviews"
                onClick={onClose}
                className="flex items-center gap-3.5 px-6 py-2.5 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 transition-colors"
              >
                <Star className="w-4 h-4 text-[#8c94a0]" />
                <span>Reviews</span>
              </Link>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION: SETTINGS */}
          {/* ========================================================= */}
          <div>
            <div className="px-6 text-[11px] font-bold text-[#8c94a0] uppercase tracking-wider mb-2">
              SETTINGS
            </div>
            <div className="space-y-0.5">
              <Link
                href="/admin/dashboard/shop-settings"
                onClick={onClose}
                className="flex items-center gap-3.5 px-6 py-2.5 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4 text-[#8c94a0]" />
                <span>Shop Settings</span>
              </Link>

              <Link
                href="/admin/dashboard/shop-policies"
                onClick={onClose}
                className="flex items-center gap-3.5 px-6 py-2.5 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-4 h-4 text-[#8c94a0]" />
                <span>Shop Policies</span>
              </Link>

              <Link
                href="/admin/dashboard/shipping-settings"
                onClick={onClose}
                className="flex items-center gap-3.5 px-6 py-2.5 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 transition-colors"
              >
                <Truck className="w-4 h-4 text-[#8c94a0]" />
                <span>Shipping Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
