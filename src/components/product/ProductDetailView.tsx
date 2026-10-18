"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingCart,
  MessageCircle,
  Eye,
  Mail,
  Truck,
  Clock,
  Flag,
  ChevronRight,
  ChevronUp,
  Pencil,
  X,
  Check,
  MapPin,
  ExternalLink,
  Navigation,
} from "lucide-react";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";
import LoginModal from "@/components/auth/LoginModal";
import { useAuth } from "@/context/AuthContext";
import { toggleWishlist, getLocalWishlistIds } from "@/lib/supabase/wishlist";
import {
  getProductReviews,
  addProductReview,
  getProductComments,
  addProductComment,
} from "@/lib/supabase/reviews";
import {
  getProductByIdOrSlug,
  DetailedProduct,
  DETAILED_PRODUCTS,
} from "@/data/productsRegistry";
import { getProductBySlugOrId } from "@/lib/supabase/products";
import { isSupabaseConfigured } from "@/lib/supabase/client";

interface ProductDetailViewProps {
  productId?: number | string;
}

const COUNTRIES_DATA: Record<string, string[]> = {
  Germany: ["Berlin", "Bavaria", "Hamburg", "Hesse", "Saxony", "North Rhine-Westphalia"],
  Albania: ["Diber", "Tirana", "Durres", "Shkoder", "Vlore", "Korce"],
  "United States": ["California", "New York", "Texas", "Florida", "Washington", "Illinois"],
  Indonesia: ["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Bali"],
  Afghanistan: ["Kabul", "Herat", "Kandahar", "Balkh"],
  Algeria: ["Algiers", "Oran", "Constantine"],
  Australia: ["New South Wales", "Victoria", "Queensland", "Western Australia"],
  France: ["Ile-de-France", "Auvergne-Rhone-Alpes", "Provence-Alpes-Cote d'Azur"],
  Italy: ["Lombardy", "Lazio", "Campania", "Veneto"],
  "United Kingdom": ["Greater London", "Manchester", "West Midlands", "Scotland"],
};

export default function ProductDetailView({
  productId = 41,
}: ProductDetailViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Resolve current product from registry or dynamic state
  const initialProduct = getProductByIdOrSlug(productId);
  const [product, setProduct] = useState<DetailedProduct>(initialProduct);

  // Gallery
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Sizing & Variants
  const initialSkuParam = searchParams.get("sku");
  const [selectedSize, setSelectedSize] = useState<string>(
    initialProduct.sizes && initialProduct.sizes.length > 0 ? initialProduct.sizes[0] : ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    initialProduct.colors && initialProduct.colors.length > 0 ? initialProduct.colors[0].name : ""
  );

  useEffect(() => {
    const resolved = getProductByIdOrSlug(productId);
    setProduct(resolved);
    setActiveImageIndex(0);
    setSelectedSize(resolved.sizes && resolved.sizes.length > 0 ? resolved.sizes[0] : "");
    setSelectedColor(resolved.colors && resolved.colors.length > 0 ? resolved.colors[0].name : "");

    if (isSupabaseConfigured() && typeof productId === "string") {
      getProductBySlugOrId(productId).then(({ data }) => {
        if (data) {
          const imgs =
            data.product_images && data.product_images.length > 0
              ? data.product_images.map((i: any) => i.image_url)
              : [resolved.image];

          setProduct((prev) => ({
            ...prev,
            slug: data.slug || prev.slug,
            title: data.title || prev.title,
            price: `$${Number(data.price).toFixed(2)}`,
            sku: data.sku || prev.sku,
            description: data.description || data.short_description || prev.description,
            image: imgs[0] || prev.image,
            images: imgs,
            seller: data.profiles?.username || prev.seller,
            category: data.categories?.name || prev.category,
            rating: Number(data.rating_avg) || prev.rating,
            reviewsCount: data.review_count || prev.reviewsCount,
            status: data.stock > 0 ? "In Stock" : "Out of Stock",
          }));
        }
      });
    }
  }, [productId]);

  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const initialTabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<
    "description" | "additional" | "shipping" | "reviews" | "comments"
  >(
    initialTabParam &&
      ["description", "additional", "shipping", "reviews", "comments"].includes(
        initialTabParam
      )
      ? (initialTabParam as any)
      : "description"
  );

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (
      tab &&
      ["description", "additional", "shipping", "reviews", "comments"].includes(
        tab
      )
    ) {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  // Shipping & Location Tab States (Exact match to screenshot)
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [calculatedShipping, setCalculatedShipping] = useState<string | null>(null);

  // Delivery location for the estimate line
  const [deliveryLocation, setDeliveryLocation] = useState("Diber, Albania");

  // Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Contact form
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Review form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewsList, setReviewsList] = useState(product.reviews || []);

  // Comment form
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentsList, setCommentsList] = useState(product.comments || []);

  // Scroll to top
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset product state when product changes & load persistent reviews/comments
  useEffect(() => {
    setActiveImageIndex(0);
    let isMounted = true;

    getProductReviews(product.id, product.reviews || []).then((revs) => {
      if (isMounted) setReviewsList(revs);
    });

    getProductComments(product.id, product.comments || []).then((cmts) => {
      if (isMounted) setCommentsList(cmts);
    });

    setIsWishlisted(getLocalWishlistIds().includes(String(product.id)));

    if (product.sizes && product.sizes.length > 0) {
      if (initialSkuParam) {
        const foundSize = product.sizes.find((s) => initialSkuParam.endsWith(`-${s}`));
        setSelectedSize(foundSize || product.sizes[0]);
      } else {
        setSelectedSize(product.sizes[0]);
      }
    } else {
      setSelectedSize("");
    }

    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    } else {
      setSelectedColor("");
    }

    return () => {
      isMounted = false;
    };
  }, [product.id, initialSkuParam]);

  // Compute SKU
  const currentSku = selectedSize
    ? `${product.baseSku}-${selectedSize}`
    : selectedColor
    ? `${product.baseSku}-${selectedColor}`
    : product.sku;

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    const newSku = `${product.baseSku}-${size}`;
    router.replace(`?sku=${newSku}`, { scroll: false });
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedState("");
    if (country && COUNTRIES_DATA[country]) {
      setAvailableStates(COUNTRIES_DATA[country]);
    } else {
      setAvailableStates([]);
    }
    setCalculatedShipping(null);
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    if (state && selectedCountry) {
      setCalculatedShipping("Standard Shipping: $10.00 (2-5 Business Days)");
      setDeliveryLocation(`${state}, ${selectedCountry}`);
    } else {
      setCalculatedShipping(null);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = () => {
    triggerToast(`Added ${quantity} "${product.title}" to Cart!`);
  };

  const handleToggleWishlist = async () => {
    const res = await toggleWishlist(product.id, user?.id);
    setIsWishlisted(res.isWishlisted);
    triggerToast(
      res.isWishlisted ? "Added to wishlist!" : "Removed from wishlist!"
    );
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const authorName = commentName.trim() || user?.name || "Guest";
    const updated = await addProductComment(
      product.id,
      {
        name: authorName,
        email: commentEmail,
        text: commentText,
      },
      user?.id
    );
    setCommentsList(updated);
    setCommentName("");
    setCommentEmail("");
    setCommentText("");
    triggerToast("Comment submitted successfully!");
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    const authorName = user?.name || "You";
    const updated = await addProductReview(
      product.id,
      {
        author: authorName,
        rating: reviewRating,
        text: reviewText,
        avatar: user?.avatar,
      },
      user?.id
    );
    setReviewsList(updated);
    setReviewText("");
    setIsReviewModalOpen(false);
    triggerToast("Thank you for your review!");
  };

  // 6 products for "More from Trendshop" (excluding current product)
  const moreProducts = Object.values(DETAILED_PRODUCTS)
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800 antialiased">
      {/* Header (Logged in as Trendshop matching Screenshot) */}
      <ModesyHeader
        currentUser={{
          name: "Trendshop",
          email: "trendshop@gmail.com",
          avatar: "/assets/img/trendshop-avatar.jpg",
          role: "vendor",
        }}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#00a99d] text-white px-5 py-3 rounded shadow-lg text-sm font-medium flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BREADCRUMB                                                                */}
      {/* ========================================================================= */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-3.5 pb-2.5 w-full">
        <nav
          className="text-[12px] text-gray-500 flex items-center gap-1.5 flex-wrap"
          aria-label="Breadcrumb"
        >
          {product.breadcrumb.map((crumb, idx) => {
            const isLast = idx === product.breadcrumb.length - 1;
            return (
              <React.Fragment key={idx}>
                {isLast ? (
                  <span className="text-gray-900 font-semibold truncate max-w-xs sm:max-w-md">
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.href}
                      className="hover:text-[#00a99d] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                    <span>/</span>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 py-2 flex-1 w-full space-y-8">
        {/* ========================================================================= */}
        {/* TOP PRODUCT DETAIL CONTAINER                                              */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#e4e7ea] rounded-[4px] p-5 sm:p-7 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Left (Thumbnails + Main Showcase Image) */}
            <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-3">
              {/* Vertical Thumbnail List */}
              <div className="flex sm:flex-col gap-2 shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-[72px] h-[72px] sm:w-[82px] sm:h-[82px] rounded-[3px] overflow-hidden border-2 transition cursor-pointer shadow-2xs ${
                      activeImageIndex === idx
                        ? "border-[#00a99d]"
                        : "border-gray-200 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} thumb ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Product Image Container */}
              <div className="relative flex-1 aspect-square bg-[#fbfbfb] border border-[#e4e7ea] rounded-[3px] overflow-hidden flex items-center justify-center">
                <img
                  src={product.images[activeImageIndex] || product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* Product Info Right Column */}
            <div className="lg:col-span-6 space-y-3.5">
              {/* Product Title + Edit Pencil Icon */}
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-[20px] sm:text-[23px] font-bold text-gray-900 leading-snug">
                  {product.title}
                </h1>
                <Link
                  href={`/vendor/dashboard/edit-product/${product.id}`}
                  className="inline-flex items-center justify-center w-5 h-5 text-gray-400 hover:text-[#00a99d] hover:bg-gray-100 rounded transition-colors"
                  title="Edit product"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Seller, Rating, Reviews and Analytics Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-gray-500 pb-2.5 border-b border-gray-100">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span>
                    Seller:{" "}
                    <Link
                      href="/vendor/profile"
                      className="text-gray-900 font-semibold hover:text-[#00a99d] hover:underline"
                    >
                      {product.seller}
                    </Link>
                  </span>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= product.rating
                              ? "fill-[#ffc107] text-[#ffc107]"
                              : "text-gray-300 stroke-[1.5]"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("reviews")}
                      className="text-gray-600 hover:text-[#00a99d] hover:underline cursor-pointer"
                    >
                      Reviews ({reviewsList.length})
                    </button>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-center gap-3.5 text-gray-400 text-[12px]">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                    <span>{commentsList.length}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-gray-400" />
                    <span>{product.favoritesCount + (isWishlisted ? 1 : 0)}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-gray-400" />
                    <span>{product.viewsCount}</span>
                  </span>
                </div>
              </div>

              {/* Price & Action Buttons (WhatsApp + Ask Question) */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-1">
                <div className="flex items-center gap-2">
                  {product.isQuote ? (
                    <span className="text-[22px] sm:text-[24px] font-bold text-gray-900">
                      Request a Quote
                    </span>
                  ) : (
                    <>
                      <span className="text-[26px] sm:text-[28px] font-bold text-[#00a99d]">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-base text-gray-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                      {product.discountPercent && (
                        <span className="bg-[#e74c3c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-[2px]">
                          {product.discountPercent}
                        </span>
                      )}
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* WhatsApp button */}
                  <a
                    href={`https://wa.me/123?text=${encodeURIComponent(product.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-[#25d366] hover:bg-[#20ba5a] text-white text-[12px] font-medium rounded-[3px] flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>

                  {/* Ask Question button */}
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(true)}
                    className="px-3.5 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-[12px] font-medium rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <span>Ask Question</span>
                  </button>
                </div>
              </div>

              {/* Status & SKU */}
              <div className="space-y-1.5 text-[12.5px] text-gray-600 pt-0.5">
                <div>
                  <span className="text-gray-400 w-16 inline-block">Status:</span>
                  <span className="font-semibold text-[#00a99d]">
                    {product.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 w-16 inline-block">SKU:</span>
                  <span className="font-medium text-gray-800">{currentSku}</span>
                </div>
              </div>

              {/* Color Options if available */}
              {product.colors && product.colors.length > 0 && (
                <div className="pt-1.5">
                  <label className="block text-[12.5px] text-gray-700 font-medium mb-2">
                    Color: <span className="font-bold text-gray-900">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition cursor-pointer flex items-center justify-center ${
                          selectedColor === c.name
                            ? "border-[#00a99d] ring-2 ring-[#00a99d]/30"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Options if available */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="pt-1.5">
                  <label className="block text-[12.5px] text-gray-700 font-medium mb-2">
                    Size: <span className="font-bold text-gray-900">{selectedSize}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeSelect(size)}
                        className={`min-w-[38px] h-[36px] px-3.5 rounded-[3px] text-[12.5px] font-medium transition cursor-pointer flex items-center justify-center ${
                          selectedSize === size
                            ? "border-2 border-[#00a99d] text-[#00a99d] bg-white font-bold shadow-2xs"
                            : "border border-gray-300 text-gray-700 bg-white hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity, Add to Cart & Wishlist */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {product.isQuote ? (
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(true)}
                    className="px-8 h-[38px] bg-[#00a99d] hover:bg-[#008f85] text-white font-semibold text-[13px] rounded-[3px] flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>Request a Quote</span>
                  </button>
                ) : (
                  <>
                    {/* Quantity Spinner */}
                    <div className="flex items-center border border-gray-300 rounded-[3px] overflow-hidden h-[38px]">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-9 h-full bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-bold flex items-center justify-center transition cursor-pointer select-none"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-12 h-full text-center text-[13px] font-bold text-gray-800 bg-white border-x border-gray-300 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-9 h-full bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-bold flex items-center justify-center transition cursor-pointer select-none"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="px-8 h-[38px] bg-[#00a99d] hover:bg-[#008f85] text-white font-semibold text-[13px] rounded-[3px] flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4 fill-white/20" />
                      <span>Add to Cart</span>
                    </button>
                  </>
                )}

                {/* Wishlist Link */}
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  className="flex items-center gap-1.5 text-[12.5px] text-gray-600 hover:text-red-500 font-medium transition cursor-pointer ml-1"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-500"
                    }`}
                  />
                  <span>
                    {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  </span>
                </button>
              </div>

              {/* Shipping & Estimated Delivery */}
              <div className="pt-2.5 space-y-2 text-[12.5px] text-gray-600 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{product.readyToShip}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>
                    Estimated Delivery: 3-4 Days{" "}
                    <button
                      type="button"
                      onClick={() => setIsLocationModalOpen(true)}
                      className="text-[#00a99d] hover:underline cursor-pointer inline-flex items-center gap-1 font-medium"
                    >
                      {deliveryLocation} &gt;
                    </button>
                  </span>
                </div>
              </div>

              {/* Social Share Icons */}
              <div className="pt-2 flex items-center gap-2.5 text-[12px] text-gray-500 border-t border-gray-100">
                <span className="font-semibold text-gray-700">Share:</span>
                <div className="flex items-center gap-2 text-gray-600">
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/sharer/sharer.php?u=" +
                          encodeURIComponent(window.location.href),
                        "_blank"
                      )
                    }
                    className="w-6 h-6 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                    title="Share on Facebook"
                  >
                    f
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/share?text=${encodeURIComponent(
                          product.title
                        )}&url=` + encodeURIComponent(window.location.href),
                        "_blank"
                      )
                    }
                    className="w-6 h-6 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                    title="Share on X"
                  >
                    𝕏
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        `https://api.whatsapp.com/send?text=${encodeURIComponent(
                          product.title
                        )} - ` + encodeURIComponent(window.location.href),
                        "_blank"
                      )
                    }
                    className="w-6 h-6 rounded-full bg-gray-100 hover:bg-[#25d366] hover:text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                    title="Share on WhatsApp"
                  >
                    w
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        "http://pinterest.com/pin/create/button/?url=" +
                          encodeURIComponent(window.location.href),
                        "_blank"
                      )
                    }
                    className="w-6 h-6 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                    title="Share on Pinterest"
                  >
                    p
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        "http://www.linkedin.com/shareArticle?mini=true&url=" +
                          encodeURIComponent(window.location.href),
                        "_blank"
                      )
                    }
                    className="w-6 h-6 rounded-full bg-gray-100 hover:bg-blue-700 hover:text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                    title="Share on LinkedIn"
                  >
                    in
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        `https://t.me/share/url?url=${encodeURIComponent(
                          window.location.href
                        )}&text=${encodeURIComponent(product.title)}`,
                        "_blank"
                      )
                    }
                    className="w-6 h-6 rounded-full bg-gray-100 hover:bg-sky-500 hover:text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                    title="Share on Telegram"
                  >
                    tg
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TABS CONTAINER: DESCRIPTION, ADDITIONAL INFO, SHIPPING, REVIEWS, COMMENTS */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#e4e7ea] rounded-[4px] p-5 sm:p-7 shadow-2xs space-y-6">
          {/* Tab Navigation Horizontal */}
          <div className="flex border-b border-gray-200 overflow-x-auto gap-8 sm:gap-10">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`pb-3 text-[13.5px] font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === "description"
                  ? "text-[#00a99d] border-b-2 border-[#00a99d]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("additional")}
              className={`pb-3 text-[13.5px] font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === "additional"
                  ? "text-[#00a99d] border-b-2 border-[#00a99d]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Additional Information
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("shipping")}
              className={`pb-3 text-[13.5px] font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === "shipping"
                  ? "text-[#00a99d] border-b-2 border-[#00a99d]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Shipping &amp; Location
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-[13.5px] font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === "reviews"
                  ? "text-[#00a99d] border-b-2 border-[#00a99d]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Reviews ({reviewsList.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("comments")}
              className={`pb-3 text-[13.5px] font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === "comments"
                  ? "text-[#00a99d] border-b-2 border-[#00a99d]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Comments ({commentsList.length})
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="pt-1">
            {/* 1. Description Tab */}
            {activeTab === "description" && (
              <div className="space-y-4">
                <p className="text-[13px] sm:text-[13.5px] text-gray-700 leading-relaxed font-normal">
                  {product.description}
                </p>

                {/* Report Product */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => triggerToast("Report received")}
                    className="text-[12px] text-gray-400 hover:text-red-500 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Report this product</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. Additional Information Tab */}
            {activeTab === "additional" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[12.5px] border border-gray-200">
                  <tbody>
                    {product.brand && (
                      <tr className="border-b border-gray-200 bg-gray-50/60">
                        <td className="py-2.5 px-4 font-semibold text-gray-700 w-1/3">
                          Brand
                        </td>
                        <td className="py-2.5 px-4 text-gray-600">{product.brand}</td>
                      </tr>
                    )}
                    {product.fabric && (
                      <tr className="border-b border-gray-200">
                        <td className="py-2.5 px-4 font-semibold text-gray-700 w-1/3">
                          Fabric
                        </td>
                        <td className="py-2.5 px-4 text-gray-600">{product.fabric}</td>
                      </tr>
                    )}
                    {product.material && (
                      <tr className="border-b border-gray-200 bg-gray-50/60">
                        <td className="py-2.5 px-4 font-semibold text-gray-700 w-1/3">
                          Material
                        </td>
                        <td className="py-2.5 px-4 text-gray-600">{product.material}</td>
                      </tr>
                    )}
                    {product.format && (
                      <tr className="border-b border-gray-200">
                        <td className="py-2.5 px-4 font-semibold text-gray-700 w-1/3">
                          File Formats
                        </td>
                        <td className="py-2.5 px-4 text-gray-600">{product.format}</td>
                      </tr>
                    )}
                    <tr className="border-b border-gray-200">
                      <td className="py-2.5 px-4 font-semibold text-gray-700 w-1/3">
                        SKU
                      </td>
                      <td className="py-2.5 px-4 text-gray-600">{currentSku}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* =================================================================== */}
            {/* 3. Shipping & Location Tab (EXACT MATCH TO USER SCREENSHOT)          */}
            {/* =================================================================== */}
            {activeTab === "shipping" && (
              <div className="space-y-6">
                <table className="w-full text-left text-[13px] border border-gray-200">
                  <tbody>
                    {/* Row 1: Shipping Cost */}
                    <tr className="border-b border-gray-200 bg-white">
                      <td className="py-3 px-4 font-semibold text-gray-800 w-[160px] sm:w-[220px] align-top">
                        Shipping Cost
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <div className="space-y-2">
                          <label className="block text-[12.5px] font-semibold text-gray-800">
                            Select Your Location
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                            {/* Country Dropdown */}
                            <select
                              value={selectedCountry}
                              onChange={(e) => handleCountryChange(e.target.value)}
                              className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-700 bg-white focus:outline-none focus:border-[#00a99d]"
                            >
                              <option value="">Country</option>
                              {Object.keys(COUNTRIES_DATA).map((country) => (
                                <option key={country} value={country}>
                                  {country}
                                </option>
                              ))}
                            </select>

                            {/* State Dropdown */}
                            <select
                              value={selectedState}
                              onChange={(e) => handleStateChange(e.target.value)}
                              disabled={!selectedCountry}
                              className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-700 bg-white focus:outline-none focus:border-[#00a99d] disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                              <option value="">State</option>
                              {availableStates.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Calculated Shipping Result */}
                          {calculatedShipping && (
                            <div className="pt-1.5 text-xs font-semibold text-[#00a99d]">
                              {calculatedShipping}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Row 2: Shipping */}
                    <tr className="border-b border-gray-200 bg-white">
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        Shipping
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <span>{product.readyToShip}</span>
                      </td>
                    </tr>

                    {/* Row 3: Product Location */}
                    <tr className="border-b border-gray-200 bg-white">
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        Product Location
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <span>{product.location}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Google Map Box matching screenshot */}
                <div className="relative w-full h-[320px] sm:h-[350px] rounded-[4px] overflow-hidden border border-gray-200 shadow-2xs">
                  {/* Google Map Overlay Card (as shown on Screenshot) */}
                  <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-xs rounded-[4px] p-3 shadow-md border border-gray-200 flex flex-col gap-2 max-w-[220px]">
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-900 leading-tight">
                        Berlin
                      </h4>
                      <p className="text-[11.5px] text-gray-500">Berlin, Germany</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://maps.google.com/?q=Berlin,Germany"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-[#1a73e8] hover:bg-blue-700 text-white rounded text-[11px] font-medium flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open in Maps</span>
                      </a>
                      <a
                        href="https://maps.google.com/?q=Berlin,Germany"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-600 flex items-center justify-center transition-colors"
                        title="Directions"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Real Interactive Google Maps Embed */}
                  <iframe
                    title="Product Location Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      product.mapQuery || "Berlin, Germany"
                    )}&t=&z=9&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* 4. Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= product.rating
                              ? "fill-[#ffc107] text-[#ffc107]"
                              : "text-gray-300 stroke-[1.5]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-800">
                      Reviews ({reviewsList.length})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(true)}
                    className="px-4 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition cursor-pointer"
                  >
                    Rate this product
                  </button>
                </div>

                <div className="space-y-4">
                  {reviewsList.length === 0 ? (
                    <p className="text-[12.5px] text-gray-400 py-3">
                      No reviews yet. Be the first to review this product!
                    </p>
                  ) : (
                    reviewsList.map((rev, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3.5 pb-4 border-b border-gray-100 last:border-0"
                      >
                        <img
                          src={rev.avatar || "/images/avatars/admin-avatar.jpg"}
                          alt={rev.author}
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = "/assets/img/trendshop-avatar.jpg";
                          }}
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= rev.rating
                                    ? "fill-[#ffc107] text-[#ffc107]"
                                    : "text-gray-300 stroke-[1.5]"
                                }`}
                              />
                            ))}
                          </div>
                          <h4 className="text-[13px] font-bold text-gray-900">
                            {rev.author}
                          </h4>
                          <p className="text-[12.5px] text-gray-700 leading-relaxed">
                            {rev.text}
                          </p>
                          <span className="text-[11px] text-gray-400 block pt-0.5">
                            {rev.date}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* 5. Comments Tab */}
            {activeTab === "comments" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-2">
                    Comments ({commentsList.length})
                  </h3>
                  {commentsList.length === 0 ? (
                    <p className="text-[12.5px] text-gray-400">
                      No comments found for this product. Be the first to comment!
                    </p>
                  ) : (
                    <div className="space-y-3 pt-2">
                      {commentsList.map((cmt, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 border border-gray-200 p-3 rounded"
                        >
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span className="font-bold text-gray-800">
                              {cmt.name}
                            </span>
                            <span>{cmt.date}</span>
                          </div>
                          <p className="text-[12.5px] text-gray-700">{cmt.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add Comment Form */}
                <form
                  onSubmit={handleAddComment}
                  className="space-y-3 pt-4 border-t border-gray-100 max-w-xl"
                >
                  <h4 className="text-[13px] font-semibold text-gray-800">
                    Add Comment
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded p-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                  <div className="text-right">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition cursor-pointer"
                    >
                      Post Comment
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM SECTION: MORE FROM TRENDSHOP                                       */}
        {/* ========================================================================= */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center gap-1.5">
            <h2 className="text-[18px] font-bold text-gray-900">
              More from{" "}
              <Link
                href="/vendor/profile"
                className="hover:text-[#00a99d] hover:underline"
              >
                {product.seller}
              </Link>
            </h2>
          </div>

          {/* 6 Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 sm:gap-4">
            {moreProducts.map((p) => {
              const productDetailHref = `/${p.slug}`;

              return (
                <div
                  key={p.id}
                  onClick={() => router.push(productDetailHref)}
                  className="group relative bg-white border border-[#ebebeb] rounded-[4px] overflow-hidden flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg hover:border-gray-300 cursor-pointer"
                >
                  {/* Image Container with cross-fade */}
                  <div className="relative w-full aspect-square bg-[#fbfbfb] overflow-hidden">
                    <Link
                      href={productDetailHref}
                      onClick={(e) => e.stopPropagation()}
                      className="block w-full h-full"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                          p.secondaryImage
                            ? "group-hover:opacity-0 group-hover:scale-105"
                            : "scale-100 group-hover:scale-108"
                        }`}
                      />
                      {p.secondaryImage && (
                        <img
                          src={p.secondaryImage}
                          alt={p.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-105 transition-all duration-500 ease-out"
                        />
                      )}
                    </Link>

                    {/* Floating Action Buttons */}
                    <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerToast(`Added "${p.title}" to cart!`);
                        }}
                        className="w-7 h-7 rounded-full bg-white/95 hover:bg-white text-gray-600 hover:text-[#00a99d] shadow-sm flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerToast(`Added "${p.title}" to wishlist!`);
                        }}
                        className="w-7 h-7 rounded-full bg-white/95 hover:bg-white text-gray-600 hover:text-red-500 shadow-sm flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                        title="Add to Wishlist"
                      >
                        <Heart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        href={productDetailHref}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-[12.5px] font-medium text-gray-800 line-clamp-2 leading-tight group-hover:text-[#00a99d] transition-colors h-[2rem] overflow-hidden">
                          {p.title}
                        </h3>
                      </Link>
                      <Link
                        href="/vendor/profile"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] text-gray-400 hover:underline block mt-1"
                      >
                        {p.seller}
                      </Link>

                      {/* Star Rating & Wishlist Count */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= p.rating
                                  ? "fill-[#ffc107] text-[#ffc107]"
                                  : "text-gray-300 stroke-[1.5]"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Heart className="w-3 h-3 text-gray-400" />
                          <span>{p.favoritesCount}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-2 pt-0.5">
                      {p.isQuote ? (
                        <span className="text-[12px] font-semibold text-gray-800">
                          Request a Quote
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[13.5px] font-bold text-[#00a99d]">
                            {p.price}
                          </span>
                          {p.originalPrice && (
                            <span className="text-[11.5px] text-gray-400 line-through">
                              {p.originalPrice}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All > Link */}
          <div className="text-center pt-3 pb-6">
            <Link
              href="/vendor/profile"
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-gray-600 hover:text-[#00a99d] transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded bg-[#222] text-white hover:bg-black shadow-lg flex items-center justify-center transition-all cursor-pointer"
          title="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Footer */}
      <ModesyFooter />

      {/* Contact Seller / Ask Question Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] max-w-md w-full p-5 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Contact Seller</h3>
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded">
              <img
                src="/assets/img/trendshop-avatar.jpg"
                alt="Trendshop"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-bold text-gray-900">{product.seller}</h4>
                <p className="text-xs text-gray-500">
                  Product: {product.title}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#00a99d]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Write your message..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#00a99d]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsContactModalOpen(false);
                  triggerToast("Message sent to seller!");
                }}
                className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white rounded text-xs font-semibold cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Select Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] max-w-sm w-full p-5 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00a99d]" />
                <span>Select Location</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Country
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                >
                  <option value="">Country</option>
                  {Object.keys(COUNTRIES_DATA).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  State / City
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  disabled={!selectedCountry}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                >
                  <option value="">State</option>
                  {availableStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (selectedState && selectedCountry) {
                    setDeliveryLocation(`${selectedState}, ${selectedCountry}`);
                  }
                  setIsLocationModalOpen(false);
                  triggerToast("Delivery location updated!");
                }}
                className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white rounded text-xs font-semibold cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] max-w-md w-full p-5 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Rate this product
              </h3>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Your Rating:
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 transition-colors ${
                          star <= reviewRating
                            ? "fill-[#ffc107] text-[#ffc107]"
                            : "text-gray-300 stroke-[1.5]"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder="Write a Review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded p-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  *If you have already added a review, your review will be updated.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
