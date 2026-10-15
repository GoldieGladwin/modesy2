"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

export default function AddToCartModal() {
  const { isAddedModalOpen, closeAddedModal, lastAddedItem } = useCart();
  const [imageError, setImageError] = useState(false);
  const pathname = usePathname();

  // Reset image error on new item
  useEffect(() => {
    setImageError(false);
  }, [lastAddedItem?.product.image]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAddedModalOpen) {
        closeAddedModal();
      }
    };
    if (isAddedModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent body scrolling while modal is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isAddedModalOpen, closeAddedModal]);

  if (!isAddedModalOpen || !lastAddedItem) {
    return null;
  }

  // Determine cart url based on current area
  let cartUrl = "/cart";
  let checkoutUrl = "/cart";
  if (pathname.startsWith("/member")) {
    cartUrl = "/member/cart";
    checkoutUrl = "/member/cart";
  } else if (pathname.startsWith("/vendor")) {
    cartUrl = "/vendor/cart";
    checkoutUrl = "/vendor/cart";
  } else if (pathname.startsWith("/guest")) {
    cartUrl = "/guest/cart";
    checkoutUrl = "/guest/cart";
  }

  const { product, quantity, subtotal } = lastAddedItem;

  // Fallback image if broken or empty
  const fallbackImg =
    "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48029e507b3-80580535.webp";
  const displayImage =
    !imageError && product.image ? product.image : fallbackImg;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
      onClick={closeAddedModal}
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Container */}
      <div
        className="relative bg-white rounded-md shadow-2xl w-full max-w-[680px] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Circular Close Button at top-right */}
        <button
          type="button"
          onClick={closeAddedModal}
          className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Modal Header: Success message with green checkmark */}
        <div className="flex items-center gap-2 text-[#00a99d] sm:text-[19px] text-[17px] font-semibold tracking-tight pb-6">
          <div className="w-5 h-5 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-[#00a99d] stroke-[3]" />
          </div>
          <h2>Product successfully added to your cart!</h2>
        </div>

        {/* Content Body: Left = Product Info, Right = Cart Summary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-1">
          {/* Left Column: Product Thumbnail + Details */}
          <div className="md:col-span-7 flex items-start gap-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-md overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
              <img
                src={displayImage}
                alt={product.title}
                className="w-full h-full object-cover object-center"
                onError={() => setImageError(true)}
              />
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="text-sm sm:text-[15px] font-medium text-gray-800 leading-snug line-clamp-2">
                {product.title}
              </h3>
              <p className="text-lg sm:text-[22px] font-bold text-gray-900 mt-2 sm:mt-3">
                {product.price}
              </p>
            </div>
          </div>

          {/* Vertical Divider (desktop) / Horizontal Divider (mobile) */}
          <div className="hidden md:block md:col-span-1 h-full flex justify-center">
            <div className="w-px h-full min-h-[140px] bg-gray-200 mx-auto" />
          </div>

          {/* Right Column: Product cart summary + Actions */}
          <div className="md:col-span-4 flex flex-col justify-between h-full pt-1 sm:pt-0">
            <div>
              <h4 className="text-xs sm:text-[14px] text-gray-500 font-normal mb-2.5">
                Product cart summary:
              </h4>

              <div className="space-y-1.5 text-xs sm:text-[14px]">
                <div className="flex items-center justify-between font-bold text-gray-800">
                  <span>Quantity:</span>
                  <span className="text-gray-900">{quantity}</span>
                </div>
                <div className="flex items-center justify-between font-bold text-gray-800">
                  <span>Subtotal:</span>
                  <span className="text-gray-900">{subtotal}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 sm:mt-6 space-y-2">
              <Link
                href={cartUrl}
                onClick={closeAddedModal}
                className="block w-full py-2.5 px-4 text-center bg-[#00a99d] hover:bg-[#008f85] text-white font-medium text-xs sm:text-[14px] rounded transition shadow-xs cursor-pointer"
              >
                View Cart
              </Link>
              <Link
                href={checkoutUrl}
                onClick={closeAddedModal}
                className="block w-full py-2.5 px-4 text-center bg-white hover:bg-gray-50 text-gray-800 border border-[#00a99d] font-medium text-xs sm:text-[14px] rounded transition cursor-pointer"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
