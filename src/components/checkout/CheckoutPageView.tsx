"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Check,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Loader2,
  Download,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

interface CheckoutPageViewProps {
  role?: "guest" | "member" | "vendor" | "admin" | "moderator";
}

type PaymentMethodType = "paypal" | "card" | "bank_transfer";

export default function CheckoutPageView({ role = "guest" }: CheckoutPageViewProps) {
  const router = useRouter();
  const { cartItems, totalCartItems, clearCart, addToCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const { t, language } = useLanguage();
  const { user } = useAuth();

  // Checkout flow state
  // Step 1 = Choose Payment Method
  // Step 2 = Confirm and Pay (matches screenshot)
  const [step, setStep] = useState<1 | 2>(2);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>("paypal");
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Card form state
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState(user?.name || "");

  // Processing & completion
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string>("");

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

  const cartUrl =
    role === "guest"
      ? "/guest/cart"
      : role === "admin"
      ? "/admin/cart"
      : role === "moderator"
      ? "/moderator/cart"
      : role === "member"
      ? "/member/cart"
      : "/cart";

  const ordersUrl =
    role === "guest"
      ? `/order-details/${completedOrderNumber || "100001"}`
      : `/${role}/orders`;

  // Exact math from user's screenshot:
  // Subtotal: sum of (item.numericPrice * item.quantity)
  // VAT: 10% of subtotal
  // Sale Tax (5%): 5% of subtotal
  // Transaction Fee (3%): 3% of (subtotal + VAT + Sale Tax)
  // Total: subtotal + VAT + Sale Tax + Transaction Fee
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.numericPrice || 0) * (item.quantity || 1),
    0
  );
  const vat = subtotal * 0.1;
  const saleTax = subtotal * 0.05;
  const transactionFee = (subtotal + vat + saleTax) * 0.03;
  const grandTotal = subtotal + vat + saleTax + transactionFee;

  const handleExecutePayment = (paymentMethodUsed: string) => {
    if (cartItems.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const orderNum = String(Math.floor(100000 + Math.random() * 900000));
      const orderDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const newOrder = {
        id: Number(orderNum),
        orderNumber: orderNum,
        total: grandTotal,
        formattedTotal: formatPrice(grandTotal),
        currency: currency.symbol.trim() || "$",
        paymentMethod: paymentMethodUsed,
        paymentStatus: "Payment Received",
        orderStatus: "Processing",
        date: orderDate,
        itemsCount: totalCartItems,
        items: [...cartItems],
        costs: {
          subtotal,
          vat,
          saleTax,
          transactionFee,
          total: grandTotal,
        },
      };

      try {
        const key = `modesy_orders_${role}`;
        const existing = localStorage.getItem(key);
        const parsed = existing ? JSON.parse(existing) : [];
        localStorage.setItem(key, JSON.stringify([newOrder, ...parsed]));
      } catch (e) {
        console.error("Failed to save order to localStorage", e);
      }

      setCompletedOrderNumber(orderNum);
      clearCart();
      setIsProcessing(false);
      setOrderCompleted(true);
    }, 1500);
  };

  if (orderCompleted) {
    return (
      <div className="min-h-[70vh] bg-[#f8f9fa] py-12 px-4 sm:px-6">
        <div className="max-w-[700px] mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-[#e8f7f5] text-[#00a99d] rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("Order Completed Successfully!")}
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            {t("Thank you for your purchase.")} {t("Order Number:")}{" "}
            <span className="font-bold text-[#00a99d]">#{completedOrderNumber}</span>
          </p>

          <div className="bg-gray-50 border border-gray-100 rounded-md p-4 mb-6 text-left text-xs text-gray-600 space-y-1.5">
            <div className="flex justify-between">
              <span>{t("Payment")}:</span>
              <span className="font-semibold text-gray-800 capitalize">
                {selectedMethod === "paypal" ? "PayPal" : t("Kartu Debit atau Kredit")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t("Total")}:</span>
              <span className="font-bold text-gray-900">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={ordersUrl}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white font-medium text-sm rounded transition"
            >
              {t("View Orders")}
            </Link>
            <Link
              href={homeUrl}
              className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded transition"
            >
              {t("Continue Shopping")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] bg-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("Checkout")}</h1>
          <p className="text-gray-500 mb-6">{t("Your cart is currently empty")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={homeUrl}
              className="inline-block px-6 py-2.5 bg-[#00a99d] text-white text-sm font-semibold rounded hover:bg-[#008f85] transition"
            >
              {t("Continue Shopping")}
            </Link>
            <button
              type="button"
              onClick={() => {
                addToCart(
                  {
                    id: "demo-infinite",
                    title: "Infinite - Blog & Magazine Script",
                    price: 36,
                    image: "/images/products/women-lace-blouse.webp",
                    seller: "Trendshop",
                  },
                  1
                );
                addToCart(
                  {
                    id: "demo-varient",
                    title: "Varient - News & Magazine Script",
                    price: 200,
                    image: "/images/products/midi-skirt.webp",
                    seller: "Trendshop",
                  },
                  1
                );
              }}
              className="inline-block px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded transition cursor-pointer"
            >
              + {t("Load Demo Items")} (Demo)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1240px] mx-auto">
        {/* Page Title */}
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-2xl font-bold text-[#222]">{t("Checkout")}</h1>
        </div>

        {/* 2-Column Grid: Left (Checkout Steps) | Right (Order Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Steps 1 & 2 matching user screenshot         */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* STEP 1: Payment Method */}
            <div className="bg-[#fcfcfc] border border-gray-200/80 rounded-sm">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <h2 className="text-[17px] font-bold text-gray-900">
                    {t("1. Payment Method")}
                  </h2>
                </div>
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[#00a99d] hover:underline text-[14px] font-medium bg-transparent border-0 cursor-pointer"
                  >
                    {t("Edit")}
                  </button>
                )}
              </div>

              {/* Step 1 Content: Payment Options Selection */}
              {step === 1 ? (
                <div className="p-6 space-y-4">
                  <p className="text-xs text-gray-500 mb-3">
                    {t("Select a payment method")}:
                  </p>

                  {/* Option 1: PayPal */}
                  <label
                    className={`flex items-center justify-between p-3.5 border rounded cursor-pointer transition ${
                      selectedMethod === "paypal"
                        ? "border-[#00a99d] bg-[#f0faf9]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedMethod === "paypal"}
                        onChange={() => setSelectedMethod("paypal")}
                        className="w-4 h-4 text-[#00a99d] focus:ring-[#00a99d]"
                      />
                      <span className="text-sm font-semibold text-gray-800">
                        PayPal
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#003087] font-black italic text-base">Pay</span>
                      <span className="text-[#0079c1] font-black italic text-base">Pal</span>
                    </div>
                  </label>

                  {/* Option 2: Debit or Credit Card */}
                  <label
                    className={`flex items-center justify-between p-3.5 border rounded cursor-pointer transition ${
                      selectedMethod === "card"
                        ? "border-[#00a99d] bg-[#f0faf9]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedMethod === "card"}
                        onChange={() => setSelectedMethod("card")}
                        className="w-4 h-4 text-[#00a99d] focus:ring-[#00a99d]"
                      />
                      <span className="text-sm font-semibold text-gray-800">
                        {t("Kartu Debit atau Kredit")}
                      </span>
                    </div>
                    <CreditCard className="w-5 h-5 text-gray-500" />
                  </label>

                  {/* Option 3: Bank Transfer / Cash on Delivery */}
                  <label
                    className={`flex items-center justify-between p-3.5 border rounded cursor-pointer transition ${
                      selectedMethod === "bank_transfer"
                        ? "border-[#00a99d] bg-[#f0faf9]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedMethod === "bank_transfer"}
                        onChange={() => setSelectedMethod("bank_transfer")}
                        className="w-4 h-4 text-[#00a99d] focus:ring-[#00a99d]"
                      />
                      <span className="text-sm font-semibold text-gray-800">
                        {t("Bank Transfer")}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">Offline / Wire</span>
                  </label>

                  {/* Terms & Conditions agreement */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedTerms}
                        onChange={(e) => setAgreedTerms(e.target.checked)}
                        className="mt-0.5 rounded text-[#00a99d] focus:ring-[#00a99d]"
                      />
                      <span>
                        {t("I have read and agree to the")}{" "}
                        <Link href="/terms" className="text-[#00a99d] hover:underline font-medium">
                          {t("Terms & Conditions")}
                        </Link>
                      </span>
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      disabled={!agreedTerms}
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 bg-[#00a99d] hover:bg-[#008f85] disabled:opacity-50 text-white font-semibold text-sm rounded transition cursor-pointer"
                    >
                      {t("Continue to Payment")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-6 py-3 text-xs text-gray-500 bg-gray-50/50 flex items-center justify-between">
                  <span>
                    {selectedMethod === "paypal"
                      ? "PayPal"
                      : selectedMethod === "card"
                      ? t("Kartu Debit atau Kredit")
                      : t("Bank Transfer")}
                  </span>
                  <span className="text-green-600 flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5" /> Selected
                  </span>
                </div>
              )}
            </div>

            {/* STEP 2: Payment (Active View matching user screenshot) */}
            <div className="border border-gray-200/80 rounded-sm bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-white">
                <h2 className="text-[17px] font-bold text-gray-900">
                  {t("2. Payment")}
                </h2>
              </div>

              {step === 2 && (
                <div className="p-8">
                  {/* Inner Container: Confirm and Pay */}
                  <div className="max-w-[420px] mx-auto text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">
                      {t("Confirm and Pay")}
                    </h3>

                    {/* PayPal Button (matching exact golden/amber style in screenshot) */}
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => handleExecutePayment("PayPal")}
                      className="w-full h-[46px] bg-[#ffc439] hover:bg-[#f4ba30] active:scale-[0.99] text-gray-900 rounded-[5px] flex items-center justify-center transition-all shadow-xs cursor-pointer mb-3 border-0"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin text-[#003087]" />
                          <span className="text-sm font-bold text-[#003087]">
                            {t("Processing Payment...")}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span className="text-[#003087] font-black italic text-xl tracking-tight">
                            Pay
                          </span>
                          <span className="text-[#0079c1] font-black italic text-xl tracking-tight">
                            Pal
                          </span>
                        </div>
                      )}
                    </button>

                    {/* Dark Card Button: Kartu Debit atau Kredit (matching screenshot) */}
                    <button
                      type="button"
                      onClick={() => setShowCardForm(!showCardForm)}
                      className="w-full h-[46px] bg-[#2c2e2f] hover:bg-[#202122] active:scale-[0.99] text-white rounded-[5px] flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer border-0"
                    >
                      <CreditCard className="w-5 h-5 text-white stroke-[1.8]" />
                      <span className="text-[14px] font-semibold tracking-wide">
                        {t("Kartu Debit atau Kredit")}
                      </span>
                    </button>

                    {/* Powered by PayPal footer (matching screenshot text) */}
                    <p className="text-[12px] text-gray-500 italic mt-3 mb-4">
                      {t("Ditunjang teknologi PayPal")}
                    </p>

                    {/* Credit Card Details Form (Expands on clicking card button) */}
                    {showCardForm && (
                      <div className="mt-6 pt-5 border-t border-gray-200 text-left animate-fadeIn">
                        <div className="space-y-3.5">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              {t("Card Number")}
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="4000 1234 5678 9010"
                                maxLength={19}
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full h-10 px-3 border border-gray-300 rounded text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
                              />
                              <CreditCard className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                {t("Expiration Date")}
                              </label>
                              <input
                                type="text"
                                placeholder="MM / YY"
                                maxLength={5}
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                className="w-full h-10 px-3 border border-gray-300 rounded text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                {t("CVC")}
                              </label>
                              <input
                                type="text"
                                placeholder="123"
                                maxLength={4}
                                value={cardCvc}
                                onChange={(e) => setCardCvc(e.target.value)}
                                className="w-full h-10 px-3 border border-gray-300 rounded text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              {t("Cardholder Name")}
                            </label>
                            <input
                              type="text"
                              placeholder="Name on card"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              className="w-full h-10 px-3 border border-gray-300 rounded text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
                            />
                          </div>

                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() => handleExecutePayment("Credit/Debit Card")}
                            className="w-full mt-4 h-11 bg-[#00a99d] hover:bg-[#008f85] disabled:opacity-60 text-white font-bold text-sm rounded transition cursor-pointer flex items-center justify-center gap-2"
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>{t("Processing Payment...")}</span>
                              </>
                            ) : (
                              <span>
                                {t("Pay")} {formatPrice(grandTotal)}
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Back link */}
            <div className="pt-2">
              <Link
                href={cartUrl}
                className="inline-flex items-center gap-1.5 text-xs text-[#666] hover:text-[#00a99d] transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t("Back to Cart")}</span>
              </Link>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Order Summary matching user screenshot      */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 bg-[#fafafa] border border-gray-200/80 rounded-sm p-6 shadow-xs">
            <h2 className="text-[17px] font-bold text-gray-900 mb-6">
              {t("Order Summary")} ({cartItems.length})
            </h2>

            {/* Cart Items List */}
            <div className="space-y-6 divide-y divide-gray-200/80">
              {cartItems.map((item, idx) => {
                const itemQty = item.quantity || 1;
                const itemTotalPrice = (item.numericPrice || 0) * itemQty;
                const itemVat = itemTotalPrice * 0.1;

                return (
                  <div key={item.id || idx} className={idx > 0 ? "pt-5" : ""}>
                    <div className="flex items-start gap-3.5">
                      {/* Thumbnail Image */}
                      <div className="w-[72px] h-[72px] rounded border border-gray-200 overflow-hidden shrink-0 bg-white">
                        <img
                          src={item.image || "/images/products/women-lace-blouse.webp"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        {/* Instant download badge */}
                        <div className="inline-flex items-center gap-1 bg-[#e8f7f5] text-[#00a99d] text-[11px] font-medium px-2 py-0.5 rounded mb-1">
                          <Download className="w-3 h-3" />
                          <span>{t("Instant download")}</span>
                        </div>

                        {/* Title */}
                        <h4 className="text-[13px] font-bold text-gray-900 leading-snug truncate">
                          {item.title}
                        </h4>

                        {/* License */}
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          {t("License:")} Regular License
                        </p>

                        {/* Seller */}
                        <p className="text-[11px] text-gray-500">
                          {t("Seller:")}{" "}
                          <span className="text-[#007bff] hover:underline cursor-pointer">
                            {item.seller || "Trendshop"}
                          </span>
                        </p>

                        {/* Breakdown: Quantity, Price, VAT (10%) */}
                        <div className="mt-2 space-y-0.5 text-[12px] text-gray-700">
                          <div className="flex justify-between">
                            <span className="text-gray-500">{t("Quantity:")}</span>
                            <span className="font-medium text-gray-900">{itemQty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">{t("Price:")}</span>
                            <span className="font-semibold text-gray-900">
                              {formatPrice(itemTotalPrice)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">{t("VAT (10%):")}</span>
                            <span className="font-medium text-gray-800">
                              {formatPrice(itemVat)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtotal & Taxes Breakdown matching exact screenshot */}
            <div className="mt-6 pt-5 border-t border-gray-200 space-y-2 text-[13px]">
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">{t("Subtotal")}</span>
                <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>{t("VAT")}</span>
                <span className="font-medium text-gray-900">{formatPrice(vat)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>{t("Sale Tax (5%)")}</span>
                <span className="font-medium text-gray-900">{formatPrice(saleTax)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>{t("Transaction Fee (3%)")}</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(transactionFee)}
                </span>
              </div>

              {/* Total Line with Divider */}
              <div className="border-t border-gray-300 pt-3.5 mt-3 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">{t("Total")}</span>
                <span className="text-lg font-extrabold text-gray-900">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {/* Secure note */}
            <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00a99d]" />
              <span>{t("Secure checkout powered by Modesy")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
