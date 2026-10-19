"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  FileText,
  UploadCloud,
  ShoppingBasket,
  ShoppingCart,
  MessageSquare,
  Tag,
  Ticket,
  Flag,
  Banknote,
  CreditCard,
  Star,
  Settings,
  Truck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface VendorDashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function VendorDashboardSidebarContent({
  isOpen,
  onClose,
}: VendorDashboardSidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isProductRoute = Boolean(pathname?.includes("/products"));
  const [productsOpen, setProductsOpen] = useState(isProductRoute || false);

  const isSalesRoute = Boolean(
    pathname?.includes("/sales") ||
      pathname?.includes("/orders") ||
      pathname?.includes("/sale/") ||
      pathname?.includes("/sale")
  );
  const [salesOpen, setSalesOpen] = useState(isSalesRoute || false);

  const isPaymentsRoute = Boolean(
    pathname?.includes("/payments") ||
      pathname?.includes("/wallet") ||
      pathname?.includes("/earnings") ||
      pathname?.includes("/payouts")
  );
  const [paymentsOpen, setPaymentsOpen] = useState(isPaymentsRoute || false);

  const isDashboardActive =
    pathname === "/vendor/dashboard" || pathname === "/dashboard";

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-[#ebebeb] flex flex-col h-screen transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* 1. Logo (Fixed at top of sidebar) */}
      <div className="h-16 px-6 flex items-center border-b border-[#f4f4f4] shrink-0 bg-white">
        <Link href="/vendor/dashboard" className="block">
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
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* User Profile Box */}
        <div className="p-6 flex flex-col items-center border-b border-[#f4f4f4]">
          <div className="w-[78px] h-[78px] rounded-full overflow-hidden shrink-0 shadow-xs border border-gray-200">
            <img
              src={user?.avatar || "/assets/img/trendshop-avatar.jpg"}
              alt={user?.name || "Trendshop"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-[15px] font-bold text-gray-800 mt-3 text-center">
            Hi, {user?.name || "Trendshop"}
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
              href="/vendor/dashboard"
              onClick={onClose}
              className={`flex items-center gap-3.5 px-6 py-2.5 text-[14px] transition-colors ${
                isDashboardActive
                  ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                  : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
              }`}
            >
              <Home
                className={`w-4 h-4 ${
                  isDashboardActive ? "text-[#00a99d]" : "text-[#8c94a0]"
                }`}
              />
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
                href="/dashboard/add-product"
                onClick={onClose}
                className={`flex items-center gap-3.5 px-6 py-2 text-[14px] transition-colors ${
                  pathname === "/dashboard/add-product" ||
                  pathname === "/vendor/dashboard/add-product" ||
                  pathname === "/vendor/products/add"
                    ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                    : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
                }`}
              >
                <FileText className="w-4 h-4 text-[#8c94a0]" />
                <span>Add Product</span>
              </Link>

              <Link
                href="/dashboard/bulk_product_upload"
                onClick={onClose}
                className={`flex items-center gap-3.5 px-6 py-2 text-[14px] transition-colors ${
                  pathname === "/dashboard/bulk_product_upload" ||
                  pathname === "/dashboard/bulk-product-upload" ||
                  pathname === "/vendor/dashboard/bulk-product-upload" ||
                  pathname === "/vendor/dashboard/bulk_product_upload"
                    ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                    : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
                }`}
              >
                <UploadCloud
                  className={`w-4 h-4 ${
                    pathname === "/dashboard/bulk_product_upload" ||
                    pathname === "/dashboard/bulk-product-upload" ||
                    pathname === "/vendor/dashboard/bulk-product-upload" ||
                    pathname === "/vendor/dashboard/bulk_product_upload"
                      ? "text-[#00a99d]"
                      : "text-[#8c94a0]"
                  }`}
                />
                <span>Bulk Product Upload</span>
              </Link>

              {/* Products Submenu Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="w-full flex items-center justify-between px-6 py-2 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <ShoppingBasket className="w-4 h-4 text-[#8c94a0]" />
                    <span>Products</span>
                  </div>
                  {productsOpen ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {productsOpen && (
                  <div className="py-1 space-y-0.5">
                    {[
                      { title: "Products", href: "/dashboard/products" },
                      {
                        title: "Pending Products",
                        href: "/dashboard/products?st=pending",
                      },
                      {
                        title: "Hidden Products",
                        href: "/dashboard/products?st=hidden",
                      },
                      {
                        title: "Sold Products",
                        href: "/dashboard/products?st=sold",
                      },
                      {
                        title: "Drafts",
                        href: "/dashboard/products?st=draft",
                      },
                    ].map((sub) => {
                      const st = searchParams?.get("st");
                      const isActive =
                        (sub.title === "Drafts" &&
                          (pathname.includes("/drafts") || (pathname === "/dashboard/products" && st === "draft"))) ||
                        (sub.title === "Pending Products" &&
                          (pathname.includes("/pending") || (pathname === "/dashboard/products" && st === "pending"))) ||
                        (sub.title === "Hidden Products" &&
                          (pathname.includes("/hidden") || (pathname === "/dashboard/products" && st === "hidden"))) ||
                        (sub.title === "Sold Products" &&
                          (pathname.includes("/sold") || (pathname === "/dashboard/products" && st === "sold"))) ||
                        (sub.title === "Products" &&
                          !st &&
                          !pathname.includes("/drafts") &&
                          !pathname.includes("/pending") &&
                          !pathname.includes("/hidden") &&
                          !pathname.includes("/sold") &&
                          (pathname === "/dashboard/products" ||
                            pathname === "/vendor/products" ||
                            pathname === "/admin/dashboard/products"));

                      return (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          onClick={onClose}
                          className={`block pl-[54px] pr-6 py-2 text-[13.5px] transition-colors ${
                            isActive
                              ? "text-[#00a99d] font-semibold"
                              : "text-[#556270] hover:text-[#00a99d]"
                          }`}
                        >
                          {sub.title}
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
              {/* Sales Submenu Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setSalesOpen(!salesOpen)}
                  className="w-full flex items-center justify-between px-6 py-2 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <ShoppingCart className="w-4 h-4 text-[#8c94a0]" />
                    <span>Sales</span>
                  </div>
                  {salesOpen ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {salesOpen && (
                  <div className="py-1 space-y-0.5">
                    {[
                      { title: "Active Sales", href: "/dashboard/sales" },
                      {
                        title: "Completed Sales",
                        href: "/dashboard/sales?st=completed",
                      },
                      {
                        title: "Cancelled Sales",
                        href: "/dashboard/sales?st=cancelled",
                      },
                    ].map((sub) => {
                      const st = searchParams?.get("st");
                      const isActive =
                        (sub.title === "Completed Sales" &&
                          (pathname.includes("/completed") ||
                            (pathname.includes("/sales") && st === "completed"))) ||
                        (sub.title === "Cancelled Sales" &&
                          (pathname.includes("/cancelled") ||
                            (pathname.includes("/sales") && st === "cancelled"))) ||
                        (sub.title === "Active Sales" &&
                          !st &&
                          !pathname.includes("/completed") &&
                          !pathname.includes("/cancelled") &&
                          (pathname === "/dashboard/sales" ||
                            pathname === "/vendor/dashboard/sales" ||
                            pathname?.startsWith("/dashboard/sale/")));

                      return (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          onClick={onClose}
                          className={`block pl-[54px] pr-6 py-2 text-[13.5px] transition-colors ${
                            isActive
                              ? "text-[#00a99d] font-semibold"
                              : "text-[#556270] hover:text-[#00a99d]"
                          }`}
                        >
                          {sub.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                href="/dashboard/quote_requests"
                onClick={onClose}
                className={`flex items-center justify-between px-6 py-2 text-[14px] transition-colors ${
                  pathname?.includes("/quote-requests") ||
                  pathname?.includes("/quote_requests")
                    ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                    : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Tag className="w-4 h-4 text-[#8c94a0]" />
                  <span>Quote Requests</span>
                </div>
                <span className="bg-[#00a99d] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  2
                </span>
              </Link>

              <Link
                href="/dashboard/coupons"
                onClick={onClose}
                className={`flex items-center gap-3.5 px-6 py-2 text-[14px] transition-colors ${
                  pathname?.includes("/coupons") ||
                  pathname?.includes("/coupon")
                    ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                    : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
                }`}
              >
                <Ticket className="w-4 h-4 text-[#8c94a0]" />
                <span>Coupons</span>
              </Link>

              <Link
                href="/dashboard/refund-requests"
                onClick={onClose}
                className={`flex items-center justify-between px-6 py-2 text-[14px] transition-colors ${
                  pathname?.includes("/refund_requests") ||
                  pathname?.includes("/refund-requests")
                    ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                    : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Flag className="w-4 h-4 text-[#8c94a0]" />
                  <span>Refund Requests</span>
                </div>
                <span className="bg-[#00a99d] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  2
                </span>
              </Link>

              <Link
                href="/dashboard/cash-on-delivery"
                onClick={onClose}
                className={`flex items-center gap-3.5 px-6 py-2 text-[14px] transition-colors ${
                  pathname?.includes("/cash-on-delivery") ||
                  pathname?.includes("/cash_on_delivery")
                    ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                    : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
                }`}
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

            <div className="space-y-0.5">
              <div>
                <button
                  type="button"
                  onClick={() => setPaymentsOpen(!paymentsOpen)}
                  className="w-full flex items-center justify-between px-6 py-2 text-[14px] text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <CreditCard className="w-4 h-4 text-[#8c94a0]" />
                    <span>Payments</span>
                  </div>
                  {paymentsOpen ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                 {paymentsOpen && (
                  <div className="py-1 space-y-0.5">
                    {[
                      {
                        title: "Membership Payments",
                        href: "/dashboard/payments?payment=membership",
                        isActive:
                          (pathname === "/dashboard/payments" &&
                            (searchParams?.get("payment") === "membership" ||
                              !searchParams?.get("payment"))) ||
                          pathname?.includes("/membership-payments") ||
                          pathname?.includes("/membership_payments"),
                      },
                      {
                        title: "Promotion Payments",
                        href: "/dashboard/payments?payment=promotion",
                        isActive:
                          pathname === "/dashboard/payments" &&
                          searchParams?.get("payment") === "promotion",
                      },
                    ].map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        onClick={onClose}
                        className={`block pl-[54px] pr-6 py-2 text-[13.5px] transition-colors ${
                          sub.isActive
                            ? "text-[#00a99d] font-semibold"
                            : "text-[#556270] hover:text-[#00a99d]"
                        }`}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
                href="/dashboard/comments"
                onClick={onClose}
                className={`flex items-center gap-3.5 px-6 py-2 text-[14px] transition-colors ${
                  pathname?.includes("/comments")
                    ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                    : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
                }`}
              >
                <MessageSquare className="w-4 h-4 text-[#8c94a0]" />
                <span>Comments</span>
              </Link>

              <Link
                href="/dashboard/reviews"
                onClick={onClose}
                className={`flex items-center gap-3.5 px-6 py-2 text-[14px] transition-colors ${
                  pathname?.includes("/reviews")
                    ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                    : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
                }`}
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
                href="/dashboard/shop_settings"
                onClick={onClose}
                className={`flex items-center gap-3.5 px-6 py-2 text-[14px] transition-colors ${
                  pathname?.includes("/shop-settings") ||
                  pathname?.includes("/shop_settings") ||
                  pathname === "/vendor/profile-settings" ||
                  pathname === "/vendor/settings"
                    ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                    : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
                }`}
              >
                <Settings className="w-4 h-4 text-[#8c94a0]" />
                <span>Shop Settings</span>
              </Link>

              <Link
                href="/dashboard/shop_policies"
                onClick={onClose}
                className={`flex items-center gap-3.5 px-6 py-2 text-[14px] transition-colors ${
                  pathname?.includes("/shop-policies") ||
                  pathname?.includes("/shop_policies")
                    ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                    : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
                }`}
              >
                <FileText className="w-4 h-4 text-[#8c94a0]" />
                <span>Shop Policies</span>
              </Link>

              <Link
                href="/dashboard/shipping_settings"
                onClick={onClose}
                className={`flex items-center gap-3.5 px-6 py-2 text-[14px] transition-colors ${
                  pathname?.includes("/shipping-settings") ||
                  pathname?.includes("/shipping_settings") ||
                  pathname?.includes("/shipping-zone") ||
                  pathname?.includes("/shipping_zone")
                    ? "bg-[#f4f5f7] text-[#333] font-semibold border-l-4 border-[#00a99d]"
                    : "text-[#555] hover:text-[#00a99d] hover:bg-gray-50 font-normal"
                }`}
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

export default function VendorDashboardSidebar(props: VendorDashboardSidebarProps) {
  return (
    <Suspense fallback={null}>
      <VendorDashboardSidebarContent {...props} />
    </Suspense>
  );
}
