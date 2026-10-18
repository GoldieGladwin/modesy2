"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Plus,
  Trash2,
  DollarSign,
  Package,
  Truck,
  Layers,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Upload,
} from "lucide-react";
import AddProductWizard from "@/components/admin/dashboard/add-product/AddProductWizard";
import ProductImageUploader, {
  UploadedImage,
} from "@/components/admin/dashboard/add-product/ProductImageUploader";
import ProductTypeSelector, {
  ProductType,
} from "@/components/admin/dashboard/add-product/ProductTypeSelector";
import ListingTypeSelector, {
  ListingType,
} from "@/components/admin/dashboard/add-product/ListingTypeSelector";
import CategorySelector from "@/components/admin/dashboard/add-product/CategorySelector";
import ProductDetailsEnglish, {
  EnglishDetailsData,
} from "@/components/admin/dashboard/add-product/ProductDetailsEnglish";
import { createProduct } from "@/lib/supabase/products";

interface ProductVariation {
  id: string;
  name: string;
  options: string;
}

export default function VendorAddProductView() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [images, setImages] = useState<UploadedImage[]>([]);

  // Step 1: General Information
  const [productType, setProductType] = useState<ProductType | null>(null);
  const [listingType, setListingType] = useState<ListingType | null>(null);
  const [category, setCategory] = useState("");

  const [englishDetails, setEnglishDetails] = useState<EnglishDetailsData>({
    title: "",
    shortDescription: "",
    tags: [],
    description: "",
  });

  // Validation error field: "productType" | "listingType" | "category" | "title" | null
  const [errorField, setErrorField] = useState<string | null>(null);

  // Step 2: Details & Pricing
  const [price, setPrice] = useState<string>("");
  const [discountPrice, setDiscountPrice] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [stock, setStock] = useState<string>("10");
  const [isUnlimitedStock, setIsUnlimitedStock] = useState<boolean>(false);
  const [shippingCost, setShippingCost] = useState<string>("0");
  const [isFreeShipping, setIsFreeShipping] = useState<boolean>(true);
  const [deliveryTime, setDeliveryTime] = useState<string>("2-4 business days");
  const [digitalFileName, setDigitalFileName] = useState<string>("");
  const [variations, setVariations] = useState<ProductVariation[]>([
    { id: "1", name: "Size", options: "S, M, L, XL" },
  ]);

  // Success state & Loading
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate Product Type (Physical / Digital)
    if (!productType) {
      setErrorField("productType");
      window.scrollTo({ top: 100, behavior: "smooth" });
      return;
    }

    // 2. Validate Listing Type
    if (!listingType) {
      setErrorField("listingType");
      window.scrollTo({ top: 220, behavior: "smooth" });
      return;
    }

    // 3. Validate Category
    if (!category) {
      setErrorField("category");
      window.scrollTo({ top: 320, behavior: "smooth" });
      return;
    }

    // 4. Validate Title
    if (!englishDetails.title.trim()) {
      setErrorField("title");
      window.scrollTo({ top: 400, behavior: "smooth" });
      return;
    }

    setErrorField(null);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!price && listingType === "sell_on_site") {
      alert("Please enter a price for your product.");
      return;
    }

    setIsSubmitting(true);
    try {
      const numericPrice = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
      const numericDiscount = discountPrice ? parseFloat(discountPrice.replace(/[^0-9.]/g, "")) : 0;
      const discountRate =
        numericPrice > 0 && numericDiscount > 0
          ? Math.max(0, Math.round(((numericPrice - numericDiscount) / numericPrice) * 100))
          : 0;

      const imageUrls = images.map((img) => img.url).filter(Boolean);

      await createProduct({
        title: englishDetails.title,
        short_description: englishDetails.shortDescription,
        description: englishDetails.description,
        product_type: (productType?.toLowerCase() as any) || "physical",
        listing_type: listingType === "ordinary_listing" ? "ordinary_listing" : "sell_on_site",
        price: numericDiscount > 0 ? numericDiscount : numericPrice,
        discount_rate: discountRate,
        sku: sku || undefined,
        stock: isUnlimitedStock ? 9999 : parseInt(stock, 10) || 10,
        images: imageUrls.length > 0 ? imageUrls : ["/images/products/midi-skirt.webp"],
        status: "active",
      });

      setIsPublished(true);
    } catch (err) {
      console.error("Failed to add product:", err);
      setIsPublished(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addVariation = () => {
    setVariations((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "Color", options: "Black, White, Blue" },
    ]);
  };

  const removeVariation = (id: string) => {
    setVariations((prev) => prev.filter((v) => v.id !== id));
  };

  const updateVariation = (
    id: string,
    field: "name" | "options",
    val: string
  ) => {
    setVariations((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: val } : v))
    );
  };

  return (
    <div className="py-2 sm:py-4 font-sans text-gray-800">
      {/* Wizard Steps Indicator Header */}
      <AddProductWizard currentStep={currentStep} />

      {/* Main Container */}
      <div className="bg-white border border-[#ebebeb] rounded-[3px] p-6 sm:p-8 max-w-5xl mx-auto shadow-xs">
        {currentStep === 1 ? (
          /* ========================================================= */
          /* STEP 1: GENERAL INFORMATION (Matches Screenshots 1 & 2)  */
          /* ========================================================= */
          <form onSubmit={handleSaveAndContinue} className="space-y-8" noValidate>
            {/* 1. Images Section */}
            <ProductImageUploader
              images={images}
              onImagesChange={(newImgs) => setImages(newImgs)}
            />

            {/* 2. Product Type Section (Physical vs Digital) */}
            <ProductTypeSelector
              value={productType}
              onChange={(t) => {
                setProductType(t);
                if (errorField === "productType") setErrorField(null);
              }}
              showError={errorField === "productType"}
            />

            {/* 3. Listing Type Section (2x2 Grid) */}
            <ListingTypeSelector
              value={listingType}
              onChange={(t) => {
                setListingType(t);
                if (errorField === "listingType") setErrorField(null);
              }}
              showError={errorField === "listingType"}
            />

            {/* 4. Category Selector */}
            <CategorySelector
              value={category}
              onChange={(cat) => {
                setCategory(cat);
                if (errorField === "category") setErrorField(null);
              }}
              showError={errorField === "category"}
            />

            {/* 5. Details: English Accordion */}
            <ProductDetailsEnglish
              data={englishDetails}
              onChange={(d) => {
                setEnglishDetails(d);
                if (errorField === "title" && d.title.trim()) {
                  setErrorField(null);
                }
              }}
              showTitleError={errorField === "title"}
            />

            {/* 6. Save and Continue Button (Bottom Right) */}
            <div className="flex justify-end pt-4 border-t border-[#f4f4f4]">
              <button
                type="submit"
                className="bg-[#00a99d] hover:bg-[#008f85] text-white text-sm font-semibold px-6 py-2.5 rounded-[3px] inline-flex items-center gap-2 shadow-xs transition cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Save and Continue</span>
              </button>
            </div>
          </form>
        ) : (
          /* ========================================================= */
          /* STEP 2: DETAILS & PRICING                                  */
          /* ========================================================= */
          <form onSubmit={handlePublish} className="space-y-7">
            <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-800">
                  Step 2: Details, Pricing &amp; Inventory
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Set prices, stock quantities, shipping rules, and variants for &quot;
                  {englishDetails.title}&quot;
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-[#00a99d] rounded">
                Category: {category}
              </span>
            </div>

            {/* 1. Pricing Section */}
            <div className="bg-[#fafbfc] border border-gray-200 rounded p-5 space-y-4">
              <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
                <DollarSign className="w-4 h-4 text-[#00a99d]" />
                <span>Pricing</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Price (USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#00a99d] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Discount Price (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#00a99d] bg-white"
                    />
                  </div>
                  {Number(discountPrice) > 0 && Number(price) > 0 && (
                    <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
                      {Math.round(
                        ((Number(price) - Number(discountPrice)) /
                          Number(price)) *
                          100
                      )}
                      % OFF Discount
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    SKU (Stock Keeping Unit)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PRD-2026-001"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#00a99d] bg-white"
                  />
                </div>
              </div>
            </div>

            {/* 2. Stock & Inventory */}
            <div className="bg-[#fafbfc] border border-gray-200 rounded p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
                  <Package className="w-4 h-4 text-[#00a99d]" />
                  <span>Inventory &amp; Stock</span>
                </div>
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isUnlimitedStock}
                    onChange={(e) => setIsUnlimitedStock(e.target.checked)}
                    className="accent-[#00a99d] rounded"
                  />
                  <span>Unlimited Stock</span>
                </label>
              </div>

              {!isUnlimitedStock && (
                <div className="w-full sm:w-1/3">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Quantity in Stock *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#00a99d] bg-white"
                  />
                </div>
              )}
            </div>

            {/* 3. Shipping or Digital Download File */}
            {productType === "physical" ? (
              <div className="bg-[#fafbfc] border border-gray-200 rounded p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
                    <Truck className="w-4 h-4 text-[#00a99d]" />
                    <span>Shipping Configuration</span>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFreeShipping}
                      onChange={(e) => setIsFreeShipping(e.target.checked)}
                      className="accent-[#00a99d] rounded"
                    />
                    <span>Free Shipping</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {!isFreeShipping && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Shipping Cost (USD)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                          $
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          value={shippingCost}
                          onChange={(e) => setShippingCost(e.target.value)}
                          className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#00a99d] bg-white"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Estimated Delivery Time
                    </label>
                    <input
                      type="text"
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      placeholder="e.g. 2-4 business days"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#00a99d] bg-white"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#fafbfc] border border-gray-200 rounded p-5 space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
                  <Upload className="w-4 h-4 text-[#00a99d]" />
                  <span>Digital Product File</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Upload Downloadable File (.zip, .pdf, .mp3, etc.)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center bg-white cursor-pointer hover:border-[#00a99d] transition">
                    <input
                      type="file"
                      id="digitalFile"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setDigitalFileName(e.target.files[0].name);
                        }
                      }}
                    />
                    <label htmlFor="digitalFile" className="cursor-pointer">
                      <p className="text-xs text-gray-600 font-medium">
                        {digitalFileName ? (
                          <span className="text-emerald-600 font-bold">
                            Selected: {digitalFileName}
                          </span>
                        ) : (
                          "Click to select a digital file for buyer download"
                        )}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Files will be securely stored and provided to customers after payment.
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Product Variations (Size, Color, etc.) */}
            <div className="bg-[#fafbfc] border border-gray-200 rounded p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
                  <Layers className="w-4 h-4 text-[#00a99d]" />
                  <span>Product Variations (Optional)</span>
                </div>
                <button
                  type="button"
                  onClick={addVariation}
                  className="inline-flex items-center gap-1 text-xs text-[#00a99d] hover:underline font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Variation</span>
                </button>
              </div>

              {variations.length > 0 ? (
                <div className="space-y-3">
                  {variations.map((v) => (
                    <div
                      key={v.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-3 border border-gray-200 rounded"
                    >
                      <div className="w-full sm:w-1/3">
                        <label className="block text-[11px] text-gray-500 mb-0.5">
                          Variation Name
                        </label>
                        <input
                          type="text"
                          value={v.name}
                          onChange={(e) =>
                            updateVariation(v.id, "name", e.target.value)
                          }
                          placeholder="e.g. Size, Color"
                          className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d]"
                        />
                      </div>
                      <div className="w-full sm:flex-1">
                        <label className="block text-[11px] text-gray-500 mb-0.5">
                          Options (separated by comma)
                        </label>
                        <input
                          type="text"
                          value={v.options}
                          onChange={(e) =>
                            updateVariation(v.id, "options", e.target.value)
                          }
                          placeholder="e.g. Small, Medium, Large"
                          className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVariation(v.id)}
                        className="text-gray-400 hover:text-red-500 self-end sm:self-center p-1 cursor-pointer"
                        title="Delete Variation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">
                  No variations added yet. Click &quot;Add Variation&quot; to configure colors or sizes.
                </p>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#f4f4f4]">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-[3px] transition inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to General Information</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    alert("Product saved as draft in your inventory!");
                    window.location.href = "/vendor/dashboard";
                  }}
                  className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-[3px] transition cursor-pointer"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-bold rounded-[3px] transition shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Publish Product</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Success Modal */}
      {isPublished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[4px] shadow-2xl max-w-md w-full p-6 text-center space-y-4 border border-gray-200">
            <div className="w-16 h-16 bg-emerald-50 text-[#00a99d] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              Product Successfully Published!
            </h3>
            <p className="text-xs text-gray-500">
              &quot;{englishDetails.title}&quot; is now live on the marketplace. Buyers
              can find it in the {category} category.
            </p>

            <div className="p-3 bg-gray-50 rounded border border-gray-200 text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Price:</span>
                <span className="font-bold text-gray-900">${price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Stock:</span>
                <span className="font-medium text-gray-900">
                  {isUnlimitedStock ? "Unlimited" : `${stock} items`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Type:</span>
                <span className="font-medium text-gray-900 capitalize">
                  {productType}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                href="/vendor/dashboard"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded transition"
              >
                Go to Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsPublished(false);
                  setCurrentStep(1);
                  setEnglishDetails({
                    title: "",
                    shortDescription: "",
                    tags: [],
                    description: "",
                  });
                  setPrice("");
                  setImages([]);
                }}
                className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-bold rounded transition inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
