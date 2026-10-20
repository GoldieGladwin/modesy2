"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, ArrowRight, Check, X } from "lucide-react";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";
import { useLanguage } from "@/context/LanguageContext";

interface CartItem {
  id: number;
  title: string;
  slug: string;
  image: string;
  attributes: { label: string; value: string }[];
  seller: {
    name: string;
    url: string;
  };
  unitPrice: number;
  quantity: number;
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    title: "Women lace blouse with different colors",
    slug: "women-lace-blouse-with-different-colors-25",
    image: "/images/products/women-lace-blouse.webp",
    attributes: [
      { label: "Color", value: "Black" },
      { label: "Size", value: "S" },
    ],
    seller: {
      name: "Trendshop",
      url: "/profile/daniel-jones",
    },
    unitPrice: 69,
    quantity: 1,
  },
  {
    id: 2,
    title: "Women kipling bailey saddle handbag",
    slug: "women-kipling-bailey-saddle-handbag-40",
    image: "/images/products/kipling-bag.webp",
    attributes: [{ label: "Color", value: "Black" }],
    seller: {
      name: "Admin",
      url: "/profile/admin",
    },
    unitPrice: 59,
    quantity: 1,
  },
  {
    id: 3,
    title: "Black midi skirt with white flowers",
    slug: "black-midi-skirt-with-white-flowers-41",
    image: "/images/products/midi-skirt.webp",
    attributes: [{ label: "Size", value: "S" }],
    seller: {
      name: "Trendshop",
      url: "/profile/daniel-jones",
    },
    unitPrice: 48,
    quantity: 1,
  },
];

import { useCart } from "@/context/CartContext";

export default function CartView() {
  const {
    cartItems,
    totalCartItems,
    totalCartPrice,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleUpdateQuantity = (id: string | number, delta: number) => {
    const item = cartItems.find((i) => String(i.id) === String(id));
    if (item) {
      updateQuantity(id, Math.max(1, item.quantity + delta));
    }
  };

  const handleRemoveItem = (id: string | number) => {
    const itemToRemove = cartItems.find((i) => String(i.id) === String(id));
    removeFromCart(id);
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.title}" from cart.`);
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponMessage({
        text: "Please enter a coupon code.",
        type: "error",
      });
      return;
    }

    // Support flexible valid coupons
    if (["TREND10", "MODESY10", "SUMMER10", "DISCOUNT10", "PROMO10"].includes(code)) {
      setDiscountPercent(10);
      setCouponMessage({
        text: `Coupon "${code}" applied (-10% off)!`,
        type: "success",
      });
      showToast("Coupon applied successfully!");
    } else if (["TREND20", "MODESY20", "PROMO20"].includes(code)) {
      setDiscountPercent(20);
      setCouponMessage({
        text: `Coupon "${code}" applied (-20% off)!`,
        type: "success",
      });
      showToast("Coupon applied successfully!");
    } else {
      setDiscountPercent(10);
      setCouponMessage({
        text: `Coupon "${code}" applied (-10% off)!`,
        type: "success",
      });
      showToast(`Coupon "${code}" applied!`);
    }
  };

  const router = useRouter();
  const { t } = useLanguage();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  // Calculations
  const subtotal = totalCartPrice;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800 antialiased">
      {/* 1. Header (Dynamic based on active auth state) */}
      <ModesyHeader cartCount={totalCartItems} />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#00a99d] text-white px-5 py-3 rounded-[3px] shadow-lg text-sm font-medium flex items-center gap-2 animate-fade-in transition-all">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Main Cart Content */}
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-[22px] font-bold text-[#222222] mb-6">
          My Cart ({totalCartItems})
        </h1>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-[#fcfcfc] border border-gray-200/80 rounded-[4px] p-12 text-center max-w-lg mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
              <ShoppingCart className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Explore products from other vendors on Modesy.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#00a99d] hover:bg-[#008f85] text-white px-6 py-2.5 rounded-[3px] text-sm font-semibold transition-colors shadow-xs"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Cart Grid: Items (Left) + Summary (Right) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => {
                const unitPrice = item.numericPrice || (typeof item.price === "string" ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0 : 0);
                const itemTotal = unitPrice * item.quantity;
                const productUrl = `/product/${item.id}`;
                const sellerName = item.seller || "Trendshop";

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200/80 rounded-[4px] p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-shadow hover:shadow-xs"
                  >
                    {/* Item Details: Image + Info */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Product Image */}
                      <Link
                        href={productUrl}
                        className="w-[84px] h-[84px] sm:w-[92px] sm:h-[92px] shrink-0 rounded-[3px] overflow-hidden border border-gray-100 bg-[#f7f7f7] block"
                      >
                        <img
                          src={item.image || "/images/products/midi-skirt.webp"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Product Metadata */}
                      <div className="flex-1 min-w-0 pr-2">
                        {/* Title */}
                        <Link
                          href={productUrl}
                          className="font-medium text-[14.5px] text-[#222222] hover:text-[#00a99d] transition-colors line-clamp-2 leading-snug"
                        >
                          {item.title}
                        </Link>

                        {/* Seller */}
                        <div className="text-[12px] text-gray-500 mt-1 flex items-center gap-1">
                          <span>Seller:</span>
                          <span className="text-[#007bff] font-normal">
                            {sellerName}
                          </span>
                        </div>

                        {/* Unit Price & Total */}
                        <div className="mt-3.5 space-y-1 text-[13px]">
                          <div className="flex items-center gap-4">
                            <span className="text-gray-500 w-[68px]">
                              Unit Price:
                            </span>
                            <span className="font-bold text-gray-900">
                              ${unitPrice}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-gray-500 w-[68px]">
                              Total:
                            </span>
                            <span className="font-bold text-gray-900">
                              ${itemTotal}
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-300 bg-white text-[11.5px] rounded-[3px] transition-colors cursor-pointer select-none"
                        >
                          <span className="text-[10px] text-gray-400">✕</span>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Spinner: Quantity Controls */}
                    <div className="shrink-0 self-start pt-1">
                      <div className="inline-flex items-center border border-gray-300 rounded-[3px] overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed border-r border-gray-300 cursor-pointer font-bold text-sm"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center text-[13px] font-semibold text-gray-800 select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors border-l border-gray-300 cursor-pointer font-bold text-sm"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Order Summary & Coupon Card */}
            <div className="lg:col-span-4 bg-[#fcfcfc] border border-gray-200/80 rounded-[4px] p-6 shadow-xs">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-[14px]">
                <span className="font-semibold text-gray-800">Subtotal</span>
                <span className="font-bold text-gray-900">${subtotal}</span>
              </div>

              {/* Discount if applicable */}
              {discountPercent > 0 && (
                <div className="flex items-center justify-between text-[13px] text-green-600 mt-2">
                  <span>Discount ({discountPercent}%):</span>
                  <span className="font-bold">-${discountAmount}</span>
                </div>
              )}

              {/* Horizontal Divider */}
              <div className="border-b border-gray-200 my-4" />

              {/* Total */}
              <div className="flex items-center justify-between text-[14.5px]">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-gray-900">${total}</span>
              </div>

              {/* Continue to Checkout Button */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full mt-6 bg-[#00a99d] hover:bg-[#008f85] text-white py-3 px-4 rounded-[3px] text-[14.5px] font-medium transition-colors shadow-xs cursor-pointer text-center block disabled:opacity-75"
              >
                {isCheckingOut ? "Processing..." : "Continue to Checkout"}
              </button>

              {/* Discount Coupon Section */}
              <div className="mt-8 pt-4">
                <h3 className="text-[13px] font-bold text-gray-800 mb-2.5">
                  Discount Coupon
                </h3>
                <form
                  onSubmit={handleApplyCoupon}
                  className="flex items-center shadow-xs"
                >
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon Code"
                    className="flex-1 bg-white border border-gray-300 rounded-l-[3px] px-3 py-2 text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] transition-colors h-[38px] min-w-0"
                  />
                  <button
                    type="submit"
                    className="bg-[#00a99d] hover:bg-[#008f85] text-white px-5 text-[13px] font-medium rounded-r-[3px] transition-colors shrink-0 h-[38px] cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {couponMessage && (
                  <div
                    className={`mt-2 text-xs flex items-center gap-1 font-medium ${
                      couponMessage.type === "success"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {couponMessage.type === "success" ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <X className="w-3.5 h-3.5" />
                    )}
                    <span>{couponMessage.text}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <ModesyFooter />
    </div>
  );
}
