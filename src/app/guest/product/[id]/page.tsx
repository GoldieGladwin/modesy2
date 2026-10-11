"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Eye,
  Mail,
  Truck,
  Clock,
  Flag,
} from "lucide-react";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";
import LoginModal from "@/components/auth/LoginModal";
import ProductCard from "@/components/product/ProductCard";
import {
  jewelryProductsData,
  moreFromAdminProducts,
  Product,
} from "@/data/products";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  // Find product by id (default to product 1 if not found)
  const product: Product =
    jewelryProductsData.find((p) => p.id === parseInt(id, 10)) ||
    jewelryProductsData[0];

  // Gallery images
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : product.secondaryImage
        ? [product.image, product.secondaryImage]
        : [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : "Black"
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "additional" | "shipping" | "reviews" | "comments"
  >("description");

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setActiveImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  // "You may also like" products (items 6, 3, 9 from jewelry list)
  const youMayAlsoLikeProducts = jewelryProductsData
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="w-full">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2 w-full">
        <nav className="text-xs text-gray-500 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#00a99d]">
            Home
          </Link>
          <span>/</span>
          <Link href="/products/jewelry-accessories" className="hover:text-[#00a99d]">
            Jewelry &amp; Accessories
          </Link>
          <span>/</span>
          <Link href="/products/jewelry-accessories" className="hover:text-[#00a99d]">
            {product.category || "Bags & Purses"}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold truncate max-w-xs sm:max-w-md">
            {product.title}
          </span>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex-1 w-full space-y-10">
        {/* ========================================================================= */}
        {/* TOP PRODUCT DETAIL SHOWCASE (MATCHES SCREENSHOT EXACTLY)                 */}
        {/* ========================================================================= */}
        <div className="bg-white border border-gray-200 rounded-sm p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Left (Thumbnails + Main Image) */}
            <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-3">
              {/* Vertical Thumbnail List */}
              <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto shrink-0">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 sm:w-18 sm:h-18 rounded-sm overflow-hidden border transition cursor-pointer ${activeImageIndex === idx
                        ? "border-2 border-[#00a99d] shadow-2xs"
                        : "border-gray-200 opacity-70 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Product Image Container */}
              <div className="relative flex-1 aspect-square bg-gray-50 border border-gray-200 rounded-sm overflow-hidden flex items-center justify-center group select-none">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Left/Right Slider Controls */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-black hover:bg-white transition cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-black hover:bg-white transition cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Product Info Right */}
            <div className="lg:col-span-6 space-y-4">
              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {product.title}
              </h1>

              {/* Seller, Reviews, and Meta Counts Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span>
                    Seller:{" "}
                    <Link href="/" className="text-[#1963d8] hover:underline font-medium">
                      {product.seller}
                    </Link>
                  </span>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${star <= product.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300 stroke-[1.5]"
                            }`}
                        />
                      ))}
                    </div>
                    <span>Reviews ({product.reviewsCount ?? 0})</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-400">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {product.commentsCount ?? 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    {product.favorites}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {product.viewsCount ?? 187}
                  </span>
                </div>
              </div>

              {/* Price & Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-[#00a99d]">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-xs">
                      {product.discountPercent}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert("Open WhatsApp chat")}
                    className="px-3.5 py-1.5 bg-[#25d366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span>WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Open Ask Question modal")}
                    className="px-3.5 py-1.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-semibold rounded flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Ask Question</span>
                  </button>
                </div>
              </div>

              {/* Status & SKU */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                <div>
                  <span className="text-gray-400">Status: </span>
                  <span className="font-semibold text-emerald-600">
                    {product.status || "In Stock"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">SKU: </span>
                  <span className="font-medium text-gray-800">
                    {product.sku || "WT4283SHADB-Black"}
                  </span>
                </div>
              </div>

              {/* Color Swatch Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="pt-2">
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Color: <span className="font-bold">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 transition cursor-pointer flex items-center justify-center ${selectedColor === color.name
                            ? "border-[#00a99d] ring-2 ring-[#00a99d]/30"
                            : "border-gray-300 hover:border-gray-400"
                          }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity, Add to Cart & Wishlist */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                {/* Quantity Spinner */}
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-bold transition cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-bold text-gray-800 bg-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-bold transition cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={() => alert(`Added ${quantity} "${product.title}" to cart!`)}
                  className="flex-1 py-2.5 px-6 bg-[#00a99d] hover:bg-[#008f85] text-white font-bold text-xs sm:text-sm rounded flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                {/* Wishlist Link */}
                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-rose-600 font-medium transition cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""
                      }`}
                  />
                  <span>Add to wishlist</span>
                </button>
              </div>

              {/* Shipping & Estimated Delivery */}
              <div className="pt-3 space-y-1.5 text-xs text-gray-500 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-gray-400" />
                  <span>Ready to ship in 2-3 Business Days.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>
                    Estimated Delivery:{" "}
                    <button
                      type="button"
                      onClick={() => alert("Select Location")}
                      className="text-[#1963d8] hover:underline"
                    >
                      Select Location
                    </button>
                  </span>
                </div>
              </div>

              {/* Social Share Icons */}
              <div className="pt-3 flex items-center gap-3 text-xs text-gray-500 border-t border-gray-100">
                <span className="font-semibold text-gray-700">Share:</span>
                <div className="flex items-center gap-2 text-gray-600">
                  <button type="button" className="hover:text-blue-600 font-bold">f</button>
                  <button type="button" className="hover:text-black font-bold">𝕏</button>
                  <button type="button" className="hover:text-green-600 font-bold">whatsapp</button>
                  <button type="button" className="hover:text-red-600 font-bold">p</button>
                  <button type="button" className="hover:text-blue-700 font-bold">in</button>
                  <button type="button" className="hover:text-gray-900 font-bold">✉</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MIDDLE TABS: DESCRIPTION, ADDITIONAL INFO, REVIEWS, COMMENTS              */}
        {/* ========================================================================= */}
        <div className="bg-white border border-gray-200 rounded-sm p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 overflow-x-auto gap-8">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`pb-3 text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${activeTab === "description"
                  ? "text-[#00a99d] border-b-2 border-[#00a99d]"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("additional")}
              className={`pb-3 text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${activeTab === "additional"
                  ? "text-[#00a99d] border-b-2 border-[#00a99d]"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Additional Information
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("shipping")}
              className={`pb-3 text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${activeTab === "shipping"
                  ? "text-[#00a99d] border-b-2 border-[#00a99d]"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Shipping &amp; Location
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${activeTab === "reviews"
                  ? "text-[#00a99d] border-b-2 border-[#00a99d]"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Reviews ({product.reviewsCount ?? 0})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("comments")}
              className={`pb-3 text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${activeTab === "comments"
                  ? "text-[#00a99d] border-b-2 border-[#00a99d]"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Comments ({product.commentsCount ?? 0})
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-2">
            {activeTab === "description" && (
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product.description ||
                  "The Kipling Bailey Saddle Handbag for women combines chic style with functional design, perfect for daily use or casual outings. Crafted with Kipling's lightweight, durable fabric, this handbag features a classic saddle shape with a spacious main compartment and multiple pockets, keeping essentials organized and easily accessible."}
              </p>
            )}

            {activeTab === "additional" && (
              <div className="text-xs text-gray-600 space-y-2">
                <p><strong>Brand:</strong> {product.brand || "Modesy Brand"}</p>
                <p><strong>SKU:</strong> {product.sku || "N/A"}</p>
                <p><strong>Material:</strong> Premium Synthetic &amp; Leather</p>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="text-xs text-gray-600 space-y-2">
                <p>Standard delivery takes 2-5 business days depending on destination.</p>
                <p>Free returns within 14 days of purchase.</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-xs text-gray-500 py-4">
                No reviews yet. Be the first to review this product!
              </div>
            )}

            {activeTab === "comments" && (
              <div className="text-xs text-gray-500 py-4">
                No comments on this product yet.
              </div>
            )}
          </div>

          {/* Report product link */}
          <div className="pt-4 flex justify-end border-t border-gray-100">
            <button
              type="button"
              onClick={() => alert("Report modal opened")}
              className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition"
            >
              <Flag className="w-3 h-3" />
              <span>Report this product</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM SECTION 1: MORE FROM ADMIN (MATCHES SCREENSHOT)                    */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">
            More from {product.seller}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
            {moreFromAdminProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/products/jewelry-accessories"
              className="text-xs font-semibold text-[#1963d8] hover:underline"
            >
              View All &gt;
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM SECTION 2: YOU MAY ALSO LIKE (MATCHES SCREENSHOT)                  */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">
            You may also like
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
            {youMayAlsoLikeProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      {/* Modal khusus Login */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </div>
  );
}
