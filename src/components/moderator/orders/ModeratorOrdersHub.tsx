"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  X,
  Plus,
  Clock,
  Info,
  CheckCircle2,
  Check,
} from "lucide-react";

export type OrdersHubTab =
  | "orders"
  | "quote-requests"
  | "downloads"
  | "refund-requests";

export interface RefundItem {
  id: string;
  orderId: string;
  productTitle: string;
  productImage: string;
  amount: number;
  status: "Pending" | "Approved" | "Declined";
  date: string;
  reason: string;
  response?: string;
}

interface ModeratorOrdersHubProps {
  initialTab?: OrdersHubTab;
}

export default function ModeratorOrdersHub({
  initialTab = "orders",
}: ModeratorOrdersHubProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab from pathname if possible
  const getTabFromPath = (): OrdersHubTab => {
    if (pathname?.includes("refund-requests")) return "refund-requests";
    if (pathname?.includes("quote-requests")) return "quote-requests";
    if (pathname?.includes("downloads")) return "downloads";
    if (pathname?.includes("orders")) return "orders";
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<OrdersHubTab>(getTabFromPath());
  const [refunds, setRefunds] = useState<RefundItem[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedRefundDetails, setSelectedRefundDetails] =
    useState<RefundItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for Submit Refund Request Modal
  const [selectedProductKey, setSelectedProductKey] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // Synchronize with route changes
  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [pathname]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleTabClick = (tab: OrdersHubTab) => {
    setActiveTab(tab);
    router.push(`/moderator/${tab}`);
  };

  // Mock eligible products for the refund request modal
  const eligibleProducts = [
    {
      key: "ORD-9082",
      orderId: "9082",
      title: "Handmade Ceramic Coffee Mug Set",
      amount: 56.0,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80",
    },
    {
      key: "ORD-9079",
      orderId: "9079",
      title: "Vintage Bohemian Silver Earrings",
      amount: 42.0,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80",
    },
    {
      key: "ORD-9065",
      orderId: "9065",
      title: "Custom Leather Card Wallet",
      amount: 19.5,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&q=80",
    },
    {
      key: "ORD-9051",
      orderId: "9051",
      title: "Linen Minimalist Summer Dress",
      amount: 65.0,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",
    },
  ];

  const handleSubmitRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductKey) {
      setFormError("Please select a product.");
      return;
    }
    if (!refundReason.trim()) {
      setFormError("Please explain why you want a refund.");
      return;
    }

    const product = eligibleProducts.find((p) => p.key === selectedProductKey);
    if (!product) return;

    const newRefund: RefundItem = {
      id: `RF-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: product.orderId,
      productTitle: product.title,
      productImage: product.image,
      amount: product.amount,
      status: "Pending",
      date: "Just now",
      reason: refundReason.trim(),
      response:
        "Your refund request has been received and is currently under review by our moderation team.",
    };

    setRefunds((prev) => [newRefund, ...prev]);
    setShowSubmitModal(false);
    setSelectedProductKey("");
    setRefundReason("");
    setFormError(null);
    showToast("Your refund request has been submitted successfully!");
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "quote-requests":
        return "Quote Requests";
      case "downloads":
        return "Downloads";
      case "refund-requests":
        return "Refund Requests";
      case "orders":
      default:
        return "Orders";
    }
  };

  return (
    <div className="bg-white min-h-[600px] w-full font-sans text-gray-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4 py-6">
        {/* Breadcrumb matching Screenshots 1, 2, 3, 4 */}
        <nav className="text-[13px] text-[#777777] mb-6 flex items-center gap-1.5">
          <Link
            href="/moderator"
            className="text-[#666666] hover:text-[#00a99d] transition-colors"
          >
            Home
          </Link>
          <span className="text-[#999999]">/</span>
          <span className="text-[#333333] font-normal">{getPageTitle()}</span>
        </nav>

        {/* Page Title matching Screenshots */}
        <h1 className="text-[26px] font-bold text-[#222222] mb-6 tracking-tight">
          {getPageTitle()}
        </h1>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical Nav Tabs matching Screenshots 1, 2, 3, 4 */}
          <div className="md:col-span-3 lg:col-span-3 space-y-1">
            {/* 1. Orders */}
            <button
              type="button"
              onClick={() => handleTabClick("orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-[3px] text-[14px] transition cursor-pointer text-left ${
                activeTab === "orders"
                  ? "bg-[#f0f2f5] text-[#222222] font-semibold"
                  : "text-[#555555] hover:bg-[#f8f9fa] hover:text-[#222222]"
              }`}
            >
              {/* Basket Icon matching screenshot */}
              <svg
                className="w-4 h-4 shrink-0 text-[#444]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>Orders</span>
            </button>

            {/* 2. Quote Requests */}
            <button
              type="button"
              onClick={() => handleTabClick("quote-requests")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-[3px] text-[14px] transition cursor-pointer text-left ${
                activeTab === "quote-requests"
                  ? "bg-[#f0f2f5] text-[#222222] font-semibold"
                  : "text-[#555555] hover:bg-[#f8f9fa] hover:text-[#222222]"
              }`}
            >
              {/* Tag Icon matching screenshot */}
              <svg
                className="w-4 h-4 shrink-0 text-[#444]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              <span>Quote Requests</span>
            </button>

            {/* 3. Downloads */}
            <button
              type="button"
              onClick={() => handleTabClick("downloads")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-[3px] text-[14px] transition cursor-pointer text-left ${
                activeTab === "downloads"
                  ? "bg-[#f0f2f5] text-[#222222] font-semibold"
                  : "text-[#555555] hover:bg-[#f8f9fa] hover:text-[#222222]"
              }`}
            >
              {/* Download Icon matching screenshot */}
              <svg
                className="w-4 h-4 shrink-0 text-[#444]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Downloads</span>
            </button>

            {/* 4. Refund Requests */}
            <button
              type="button"
              onClick={() => handleTabClick("refund-requests")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-[3px] text-[14px] transition cursor-pointer text-left ${
                activeTab === "refund-requests"
                  ? "bg-[#f0f2f5] text-[#222222] font-semibold"
                  : "text-[#555555] hover:bg-[#f8f9fa] hover:text-[#222222]"
              }`}
            >
              {/* Refund Request Icon matching screenshot: rectangle with left arrow inside */}
              <svg
                className="w-4 h-4 shrink-0 text-[#444]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M14 12H8m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Refund Requests</span>
            </button>
          </div>

          {/* Right Column: Tab Content Area */}
          <div className="md:col-span-9 lg:col-span-9 min-h-[300px]">
            {/* 1. ORDERS TAB (Screenshot 1) */}
            {activeTab === "orders" && (
              <div className="py-20 text-center text-[#777777] text-[14px]">
                No records found!
              </div>
            )}

            {/* 2. QUOTE REQUESTS TAB (Screenshot 3) */}
            {activeTab === "quote-requests" && (
              <div className="py-20 text-center text-[#777777] text-[14px]">
                No records found!
              </div>
            )}

            {/* 3. DOWNLOADS TAB (Screenshot 2) */}
            {activeTab === "downloads" && (
              <div className="py-20 text-center text-[#777777] text-[14px]">
                You don&apos;t have any downloadable files.
              </div>
            )}

            {/* 4. REFUND REQUESTS TAB (Screenshot 4) */}
            {activeTab === "refund-requests" && (
              <div className="space-y-6">
                {/* Top Action Row: + Submit a Refund Request Button matching Screenshot 4 */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setFormError(null);
                      setShowSubmitModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-[13px] font-medium rounded-[3px] transition cursor-pointer shadow-xs active:scale-95"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Submit a Refund Request</span>
                  </button>
                </div>

                {/* Refund Requests List or Empty State */}
                {refunds.length === 0 ? (
                  <div className="py-16 text-center text-[#777777] text-[14px]">
                    No records found!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {refunds.map((refund) => (
                      <div
                        key={refund.id}
                        className="bg-white border border-[#e5e5e5] rounded-[4px] p-5 shadow-2xs hover:border-gray-300 transition"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Product Thumbnail and Info */}
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div className="w-[72px] h-[72px] rounded-[3px] border border-gray-100 overflow-hidden shrink-0 bg-gray-50 flex items-center justify-center">
                              <img
                                src={refund.productImage}
                                alt={refund.productTitle}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[13px] font-bold text-gray-900 leading-tight">
                                Order: #{refund.orderId}
                              </div>
                              <div className="text-[13px] text-gray-700 truncate mt-1">
                                {refund.productTitle}
                              </div>
                              <div className="text-[12px] text-gray-500 mt-1">
                                Refund Amount:{" "}
                                <span className="font-bold text-gray-900">
                                  ${refund.amount.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="shrink-0">
                            {refund.status === "Pending" && (
                              <span className="inline-block px-3 py-1 rounded-[3px] text-xs font-semibold bg-[#fffbe6] text-[#faad14] border border-[#ffe58f]">
                                Pending
                              </span>
                            )}
                            {refund.status === "Approved" && (
                              <span className="inline-block px-3 py-1 rounded-[3px] text-xs font-semibold bg-[#f6ffed] text-[#52c41a] border border-[#b7eb8f]">
                                Approved
                              </span>
                            )}
                            {refund.status === "Declined" && (
                              <span className="inline-block px-3 py-1 rounded-[3px] text-xs font-semibold bg-[#fff1f0] text-[#f5222d] border border-[#ffa39e]">
                                Declined
                              </span>
                            )}
                          </div>

                          {/* Date */}
                          <div className="shrink-0 flex items-center gap-1.5 text-gray-500 text-xs">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span>{refund.date}</span>
                          </div>

                          {/* Details Button */}
                          <div className="shrink-0">
                            <button
                              type="button"
                              onClick={() => setSelectedRefundDetails(refund)}
                              className="px-3 py-1.5 bg-[#f8f9fa] hover:bg-[#edf0f2] border border-[#d5dadf] text-gray-700 text-xs font-medium rounded-[3px] transition inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <Info className="w-3.5 h-3.5 text-gray-500" />
                              <span>Details</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL: SUBMIT A REFUND REQUEST (1:1 MATCHING SCREENSHOT) */}
      {/* ======================================================== */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in">
          <div className="bg-white rounded-[6px] shadow-2xl w-full max-w-[620px] p-7 sm:p-9 relative animate-in zoom-in-95">
            {/* Close Button X matching screenshot */}
            <button
              type="button"
              onClick={() => {
                setShowSubmitModal(false);
                setFormError(null);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition cursor-pointer p-1"
            >
              <X className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* Centered Modal Title */}
            <h3 className="text-[22px] font-bold text-[#222222] text-center mb-7 tracking-tight">
              Submit a Refund Request
            </h3>

            {formError && (
              <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[3px]">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmitRefund} className="text-[14px]">
              {/* Product Select Field */}
              <div>
                <label className="block text-[#222222] font-semibold mb-2 text-[14px]">
                  Product
                </label>
                <div className="relative">
                  <select
                    value={selectedProductKey}
                    onChange={(e) => {
                      setSelectedProductKey(e.target.value);
                      setFormError(null);
                    }}
                    className="w-full bg-white border border-[#d5dadf] rounded-[4px] px-4 py-2.5 text-[14px] text-gray-800 appearance-none focus:outline-none focus:border-[#00a99d] cursor-pointer"
                  >
                    <option value="">Select</option>
                    {eligibleProducts.map((p) => (
                      <option key={p.key} value={p.key}>
                        Order #{p.orderId} - {p.title} (${p.amount.toFixed(2)})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-600">
                    <svg
                      className="w-4 h-4 stroke-[2]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Reason Textarea Field */}
              <div className="mt-5">
                <label className="block text-[#222222] font-semibold mb-2 text-[14px]">
                  Why do you want a refund? Explain in detail.
                </label>
                <textarea
                  rows={6}
                  value={refundReason}
                  onChange={(e) => {
                    setRefundReason(e.target.value);
                    setFormError(null);
                  }}
                  className="w-full border border-[#d5dadf] rounded-[4px] p-3.5 text-[14px] text-gray-800 focus:outline-none focus:border-[#00a99d] resize-y min-h-[160px]"
                />
              </div>

              {/* Submit Button right-aligned matching screenshot */}
              <div className="flex justify-end pt-5">
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[14px] font-medium rounded-[4px] transition cursor-pointer shadow-xs active:scale-[0.99]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: VIEW REFUND DETAILS                               */}
      {/* ======================================================== */}
      {selectedRefundDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="bg-white rounded-[4px] shadow-2xl max-w-md w-full p-6 text-gray-800 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#00a99d]" />
                Refund Request #{selectedRefundDetails.id}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedRefundDetails(null)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-[3px] border overflow-hidden shrink-0 bg-gray-50 flex items-center justify-center">
                  <img
                    src={selectedRefundDetails.productImage}
                    alt={selectedRefundDetails.productTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {selectedRefundDetails.productTitle}
                  </h4>
                  <p className="text-gray-500">
                    Order: #{selectedRefundDetails.orderId}
                  </p>
                  <p className="text-gray-900 font-bold mt-0.5">
                    Amount: ${selectedRefundDetails.amount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Reason for Refund:
                </label>
                <p className="bg-gray-50 p-3 rounded-[3px] text-gray-700 border border-gray-100 leading-relaxed">
                  {selectedRefundDetails.reason}
                </p>
              </div>

              {selectedRefundDetails.response && (
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Moderation Note:
                  </label>
                  <p className="bg-teal-50/60 p-3 rounded-[3px] text-teal-800 border border-teal-100 leading-relaxed">
                    {selectedRefundDetails.response}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedRefundDetails(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-[3px] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
