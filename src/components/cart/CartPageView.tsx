"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

interface CartPageViewProps {
  role?: "guest" | "member" | "vendor" | "admin" | "moderator";
}

export default function CartPageView({ role = "guest" }: CartPageViewProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { currency, formatPrice } = useCurrency();
  const { t } = useLanguage();
  const {
    cartItems,
    totalCartItems,
    totalCartPrice,
    formattedTotalPrice,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const homeUrl =
    role === "admin"
      ? "/admin"
      : role === "moderator"
      ? "/moderator"
      : role === "member"
      ? "/member"
      : role === "vendor"
      ? "/vendor"
      : "/guest";

  const checkoutUrl =
    role === "guest"
      ? "/guest/checkout"
      : role === "admin"
      ? "/admin/checkout"
      : role === "moderator"
      ? "/moderator/checkout"
      : role === "member"
      ? "/member/checkout"
      : "/checkout";

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    router.push(checkoutUrl);
  };

  if (cartItems.length === 0 && !checkoutSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
          <Link href={homeUrl} className="hover:text-[#00a99d]">
            {t("Home")}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{t("Cart")}</span>
        </nav>

        <div className="bg-white border border-gray-200 rounded-sm p-10 text-center max-w-lg mx-auto shadow-xs">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
            <ShoppingCart className="w-10 h-10 text-gray-400 stroke-[1.5]" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            {t("Your cart is currently empty")}
          </h1>
          <p className="text-xs text-gray-500 mb-6">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link
            href={homeUrl}
            className="inline-flex items-center gap-2 bg-[#00a99d] text-white px-6 py-2.5 rounded text-xs sm:text-sm font-bold hover:bg-[#008f85] transition shadow-xs"
          >
            <span>{t("Continue Shopping")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href={homeUrl} className="hover:text-[#00a99d]">
          {t("Home")}
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{t("Cart")} ({totalCartItems})</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t("Shopping Cart")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items Table */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="py-3 px-4">{t("Product")}</th>
                  <th className="py-3 px-4">{t("Price")}</th>
                  <th className="py-3 px-4 text-center">{t("Quantity")}</th>
                  <th className="py-3 px-4 text-right">{t("Total")}</th>
                  <th className="py-3 px-4 text-center">{t("Action", "Action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {cartItems.map((item) => {
                  const itemUnitPrice =
                    item.numericPrice > 0 ? formatPrice(item.numericPrice) : item.price;
                  const itemTotal =
                    item.numericPrice > 0
                      ? formatPrice(item.numericPrice * item.quantity)
                      : item.price;

                  return (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Product */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                            <img
                              src={
                                item.image ||
                                "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48029e507b3-80580535.webp"
                              }
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <Link
                              href={role === "guest" ? `/guest/product/${item.id}` : `/product/${item.id}`}
                              className="font-medium text-gray-800 hover:text-[#00a99d] transition line-clamp-2 text-xs sm:text-sm"
                            >
                              {item.title}
                            </Link>
                            {item.seller && (
                              <p className="text-[11px] text-gray-400 mt-0.5">
                                Seller: {item.seller}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Unit Price */}
                      <td className="py-4 px-4 font-semibold text-gray-800 whitespace-nowrap">
                        {itemUnitPrice}
                      </td>

                      {/* Quantity */}
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 transition cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 text-xs font-bold text-gray-800 min-w-8 text-center bg-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 transition cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="py-4 px-4 font-bold text-gray-900 text-right whitespace-nowrap">
                        {itemTotal}
                      </td>

                      {/* Remove */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition cursor-pointer"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
            <Link
              href={homeUrl}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#00a99d] transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t("Continue Shopping")}</span>
            </Link>

            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-red-600 hover:text-red-700 font-semibold transition cursor-pointer"
            >
              {t("Clear Cart")}
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-sm p-6 shadow-xs">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-3 mb-4">
            {t("Order Summary")}
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>{t("Items Total")} ({totalCartItems}):</span>
              <span className="font-semibold text-gray-900">
                {formattedTotalPrice}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>{t("Shipping")}:</span>
              <span className="text-xs text-gray-500">{t("Calculated at checkout")}</span>
            </div>

            <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-900">
              <span>{t("Estimated Total")}:</span>
              <span className="text-[#00a99d] text-lg font-bold">
                {formattedTotalPrice}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={isCheckingOut}
            onClick={handleCheckout}
            className="w-full mt-6 py-3 px-4 bg-[#00a99d] hover:bg-[#008f85] disabled:opacity-75 text-white font-bold text-sm rounded transition shadow-xs text-center cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{t("Proceed to Checkout")}</span>
          </button>

          <p className="text-[11px] text-gray-400 text-center mt-3">
            {t("Secure checkout powered by Modesy")}
          </p>
        </div>
      </div>
    </div>
  );
}
