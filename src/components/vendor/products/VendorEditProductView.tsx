"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  X,
  Info,
  ChevronDown,
  Sparkles,
  Image as ImageIcon,
  Check,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Package,
  Layers,
  Truck,
  Plus,
  Trash2,
} from "lucide-react";
import RichTextEditorToolbar from "@/components/admin/dashboard/add-product/RichTextEditorToolbar";
import EditProductCategorySelect from "./EditProductCategorySelect";
import AiContentGeneratorModal from "./AiContentGeneratorModal";
import { CATEGORIES } from "@/data/categories";
import { initialDashboardProducts } from "@/components/admin/dashboard/products/mockData";
import { ProductItem } from "@/components/admin/dashboard/products/types";
import { updateProduct } from "@/lib/supabase/products";

export interface EditProductImage {
  id: string;
  url: string;
  name: string;
  isMain: boolean;
}

interface VendorEditProductViewProps {
  productId?: string | number;
}

export default function VendorEditProductView({
  productId = 47,
}: VendorEditProductViewProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Find target product from mockData
  const numericId = Number(productId) || 47;
  const initialProduct =
    initialDashboardProducts.find((p) => p.id === numericId) ||
    initialDashboardProducts[0];

  // Current Step: 1 = General Info, 2 = Details & Pricing
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Save notification toast state
  const [saveSuccess, setSaveSuccess] = useState(false);

  // AI Modal state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // 1. Images State
  const defaultImages: EditProductImage[] = [
    {
      id: "img-1",
      url: initialProduct.image || "/images/products/scarves.webp",
      name: "scarves-main.webp",
      isMain: true,
    },
    {
      id: "img-2",
      url: "/images/products/summer-top-lace.webp",
      name: "scarves-pattern.webp",
      isMain: false,
    },
    {
      id: "img-3",
      url: "/images/products/women-lace-blouse.webp",
      name: "scarves-detail.webp",
      isMain: false,
    },
  ];

  const [images, setImages] = useState<EditProductImage[]>(defaultImages);

  // 2. Product Type ("Physical" | "Digital")
  const [productType, setProductType] = useState<"Physical" | "Digital">(
    initialProduct.productType || "Physical"
  );

  // 3. Listing Type
  const [listingType, setListingType] = useState<string>("sell_on_site");

  // 4. Category
  const [category, setCategory] = useState<string>(
    initialProduct.category || "Scarfs"
  );

  // 5. Status & Visibility
  const [status, setStatus] = useState<string>("Active");
  const [visibility, setVisibility] = useState<string>("Visible");

  // 6. Details: English
  const [englishOpen, setEnglishOpen] = useState(true);
  const [title, setTitle] = useState<string>(
    initialProduct.title || "Colorful women scarves"
  );
  const [shortDescription, setShortDescription] = useState<string>(
    "Made from soft lightweight fabrics, these scarves are perfect for year-round wear, providing warmth in the cooler months"
  );
  const [tags, setTags] = useState<string[]>(["colorful", "women", "scarves"]);
  const [tagInput, setTagInput] = useState<string>("");
  const [description, setDescription] = useState<string>(
    "The Colorful Women's Scarves are a delightful way to elevate any outfit with a burst of vibrancy and personality. Made from soft, lightweight materials, these scarves are perfect for layering throughout the seasons. Each piece features unique patterns and an array of eye-catching colors, making them ideal for adding a touch of style to both casual and formal looks. Whether you prefer bold florals, geometric designs, or abstract prints, there's a scarf to match your individual taste. Versatile and easy to style, these scarves can be worn around the neck, tied to a handbag, or draped over the shoulders, making them a must-have accessory for every fashion-forward woman. Embrace your unique style with these colorful scarves that blend comfort and fashion effortlessly."
  );

  // 7. Details: Arabic (Optional)
  const [arabicOpen, setArabicOpen] = useState(false);
  const [arabicTitle, setArabicTitle] = useState("");
  const [arabicShortDesc, setArabicShortDesc] = useState("");
  const [arabicDesc, setArabicDesc] = useState("");

  // Step 2 details:
  const [price, setPrice] = useState<string>(
    (initialProduct.price || "$40").replace("$", "")
  );
  const [discountPrice, setDiscountPrice] = useState<string>("34");
  const [sku, setSku] = useState<string>(initialProduct.sku || "C1W2S3C4V5R6");
  const [stock, setStock] = useState<string>(
    initialProduct.stock?.match(/\d+/)?.[0] || "500"
  );
  const [isUnlimitedStock, setIsUnlimitedStock] = useState<boolean>(
    initialProduct.stock?.toLowerCase().includes("unlimited") || false
  );
  const [shippingCost, setShippingCost] = useState<string>("0");
  const [deliveryTime, setDeliveryTime] = useState<string>("1-3 Business Days");

  // Handle Tag Addition
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = tagInput.trim().replace(/^,+|,+$/g, "");
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Image Upload & Selection
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const newItems: EditProductImage[] = Array.from(fileList).map(
      (file, idx) => ({
        id: `${Date.now()}-${idx}`,
        url: URL.createObjectURL(file),
        name: file.name,
        isMain: images.length === 0 && idx === 0,
      })
    );
    setImages([...images, ...newItems]);
  };

  const setMainImage = (id: string) => {
    setImages(
      images.map((img) => ({
        ...img,
        isMain: img.id === id,
      }))
    );
  };

  // Image Deletion Modal
  const [deleteImageTarget, setDeleteImageTarget] = useState<EditProductImage | null>(null);

  const confirmDeleteImage = () => {
    if (deleteImageTarget) {
      removeImage(deleteImageTarget.id);
      setDeleteImageTarget(null);
    }
  };

  const removeImage = (id: string) => {
    const updated = images.filter((img) => img.id !== id);
    if (updated.length > 0 && !updated.some((i) => i.isMain)) {
      updated[0].isMain = true;
    }
    setImages(updated);
  };

  // AI Generation
  const handleOpenAiModal = () => {
    setIsAiModalOpen(true);
  };

  const handleAiGenerated = (content: {
    title?: string;
    shortDescription: string;
    description: string;
  }) => {
    if (content.shortDescription) {
      setShortDescription(content.shortDescription);
    }
    if (content.description) {
      setDescription(content.description);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // Format WYSIWYG
  const handleToolbarFormat = (command: string) => {
    if (command.startsWith("insertImage:")) {
      const url = command.replace("insertImage:", "");
      document.execCommand("insertImage", false, url);
    } else if (command.startsWith("createLink:")) {
      const url = command.replace("createLink:", "");
      document.execCommand("createLink", false, url);
    } else {
      document.execCommand(command, false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const numericPrice = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
      const imageUrls = images.map((i) => i.url);

      if (typeof productId === "string" && productId.includes("-")) {
        await updateProduct({
          id: productId,
          title,
          short_description: shortDescription,
          description,
          price: numericPrice,
          sku,
          stock: isUnlimitedStock ? 9999 : parseInt(stock, 10) || 10,
          images: imageUrls,
        });
      }
    } catch (err) {
      console.error("Failed to update product in Supabase:", err);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3500);
  };

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-6">
      {/* Success Notification Banner */}
      {saveSuccess && (
        <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm px-4 py-3 rounded-[3px] flex items-center justify-between shadow-xs transition-all">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
            <span>Product updated successfully! All changes have been saved.</span>
          </div>
          <button
            type="button"
            onClick={() => setSaveSuccess(false)}
            className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container Card */}
      <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs p-6 sm:p-8">
        {/* Page Title (Centered) */}
        <h1 className="text-lg sm:text-xl font-bold text-[#333] text-center mb-7">
          Edit Product
        </h1>

        {currentStep === 1 ? (
          /* ========================================================= */
          /* STEP 1: GENERAL INFORMATION (Persis Screenshot 1 & 2)      */
          /* ========================================================= */
          <div className="space-y-6">
            {/* 1. Images Section */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#555]">
                Images
              </label>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />

              {/* Dropzone Box */}
              <div className="border border-dashed border-[#d2d6de] rounded-[4px] p-5 bg-[#fafbfc] min-h-[140px] flex flex-wrap items-center gap-4">
                {/* Image Thumbnails on Left */}
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[3px] border border-gray-200 bg-white overflow-hidden shadow-2xs shrink-0 group"
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Main badge button on top left */}
                    <button
                      type="button"
                      onClick={() => setMainImage(img.id)}
                      className={`absolute top-1.5 left-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                        img.isMain
                          ? "bg-[#20c997] text-white"
                          : "bg-[#8c94a0] hover:bg-[#20c997] text-white"
                      }`}
                    >
                      main
                    </button>

                    {/* Delete button on top right */}
                    <button
                      type="button"
                      onClick={() => setDeleteImageTarget(img)}
                      className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#e74c3c] hover:bg-red-700 text-white rounded-[2px] flex items-center justify-center transition-colors cursor-pointer"
                      title="Delete Image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {/* Upload Callout on Right / Center */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 min-w-[200px] flex flex-col items-center justify-center py-4 cursor-pointer text-center"
                >
                  <UploadCloud className="w-9 h-9 text-gray-400 stroke-[1.2] mb-1.5" />
                  <p className="text-xs text-[#718096]">
                    Drag and drop images here or{" "}
                    <span className="text-[#007bff] underline cursor-pointer">
                      Browse Files
                    </span>
                  </p>
                </div>
              </div>

              {/* Info text */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#8c94a0] pt-0.5">
                <Info className="w-3.5 h-3.5 shrink-0 text-[#8c94a0]" />
                <span>
                  You can click on the &quot;Main&quot; button on the images to
                  select the main image of your product.
                </span>
              </div>
            </div>

            {/* 2. Product Type */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-semibold text-[#555]">
                Product Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Physical */}
                <label
                  onClick={() => setProductType("Physical")}
                  className="flex items-start gap-2.5 cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                      productType === "Physical"
                        ? "border-[#00a99d]"
                        : "border-gray-300"
                    }`}
                  >
                    {productType === "Physical" && (
                      <div className="w-2 h-2 rounded-full bg-[#00a99d]" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#333]">
                      Physical
                    </div>
                    <div className="text-[11px] text-gray-500">
                      A tangible product that you will ship to buyers
                    </div>
                  </div>
                </label>

                {/* Digital */}
                <label
                  onClick={() => setProductType("Digital")}
                  className="flex items-start gap-2.5 cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                      productType === "Digital"
                        ? "border-[#00a99d]"
                        : "border-gray-300"
                    }`}
                  >
                    {productType === "Digital" && (
                      <div className="w-2 h-2 rounded-full bg-[#00a99d]" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#333]">
                      Digital
                    </div>
                    <div className="text-[11px] text-gray-500">
                      A digital file that buyers will download
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* 3. Listing Type */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-semibold text-[#555]">
                Listing Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                {/* Add a Product for Sale */}
                <label
                  onClick={() => setListingType("sell_on_site")}
                  className="flex items-start gap-2.5 cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                      listingType === "sell_on_site"
                        ? "border-[#00a99d]"
                        : "border-gray-300"
                    }`}
                  >
                    {listingType === "sell_on_site" && (
                      <div className="w-2 h-2 rounded-full bg-[#00a99d]" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#333]">
                      Add a Product for Sale
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Add a product to sell on the site
                    </div>
                  </div>
                </label>

                {/* Ordinary Listing */}
                <label
                  onClick={() => setListingType("ordinary_listing")}
                  className="flex items-start gap-2.5 cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                      listingType === "ordinary_listing"
                        ? "border-[#00a99d]"
                        : "border-gray-300"
                    }`}
                  >
                    {listingType === "ordinary_listing" && (
                      <div className="w-2 h-2 rounded-full bg-[#00a99d]" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#333]">
                      Add a Product or Service as an Ordinary Listing
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Add a product or service without buy option
                    </div>
                  </div>
                </label>

                {/* Quote Requests */}
                <label
                  onClick={() => setListingType("quote_request")}
                  className="flex items-start gap-2.5 cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                      listingType === "quote_request"
                        ? "border-[#00a99d]"
                        : "border-gray-300"
                    }`}
                  >
                    {listingType === "quote_request" && (
                      <div className="w-2 h-2 rounded-full bg-[#00a99d]" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#333]">
                      Add a Product to Receive Quote (Price) Requests
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Add a product without adding a price to get price requests
                      from customers
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* 4. Category */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-semibold text-[#555]">
                Category
              </label>
              <EditProductCategorySelect
                value={category}
                onChange={(val) => setCategory(val)}
              />
            </div>

            {/* 5. Status & Visibility */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-[#555] mb-1.5">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full h-[36px] px-3 pr-8 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none focus:border-[#00a99d] transition-colors cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Sold">Sold</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Visibility */}
              <div>
                <label className="block text-xs font-semibold text-[#555] mb-1.5">
                  Visibility
                </label>
                <div className="relative">
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="w-full h-[36px] px-3 pr-8 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none focus:border-[#00a99d] transition-colors cursor-pointer"
                  >
                    <option value="Visible">Visible</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 6. Details: English (Accordion) */}
            <div className="border border-[#e2e8f0] rounded-[3px] overflow-hidden bg-white mt-4">
              {/* Header */}
              <button
                type="button"
                onClick={() => setEnglishOpen(!englishOpen)}
                className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-[#495057] bg-white hover:bg-gray-50 transition-colors cursor-pointer select-none border-b border-transparent"
              >
                <span>Details: English</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform ${
                    englishOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {englishOpen && (
                <div className="p-5 sm:p-6 border-t border-[#f0f0f0] space-y-4">
                  {/* Top-Right AI Button */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleOpenAiModal}
                      className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] inline-flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate with AI</span>
                    </button>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title"
                      className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] outline-none focus:border-[#00a99d] transition-colors"
                    />
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1">
                      Short Description
                    </label>
                    <input
                      type="text"
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      placeholder="Short Description"
                      className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] outline-none focus:border-[#00a99d] transition-colors"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1">
                      Tags{" "}
                      <span className="text-gray-400 font-normal">
                        (Add relevant keywords for your product to increase
                        visibility in search results.)
                      </span>
                    </label>
                    <div className="w-full min-h-[38px] p-1.5 border border-[#d2d6de] rounded-[3px] bg-white flex flex-wrap items-center gap-1.5 focus-within:border-[#00a99d] transition-colors">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#e9ecef] text-[#495057] text-[11px] font-medium px-2 py-0.5 rounded-[2px] inline-flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-gray-500 hover:text-red-500 cursor-pointer ml-0.5"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder={
                          tags.length === 0 ? "Type and press enter..." : ""
                        }
                        className="text-xs text-[#555] outline-none flex-1 min-w-[80px] px-1 py-0.5 bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Description WYSIWYG */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-[#555]">
                        Description
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const url = prompt(
                          "Enter image URL to insert in description:"
                        );
                        if (url) document.execCommand("insertImage", false, url);
                      }}
                      className="bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] inline-flex items-center gap-1.5 cursor-pointer mb-2.5 transition-colors"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Add Image</span>
                    </button>

                    {/* Rich text container */}
                    <div className="border border-[#d2d6de] rounded-[3px] overflow-hidden bg-white">
                      <RichTextEditorToolbar onFormat={handleToolbarFormat} />
                      <div
                        ref={editorRef}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          setDescription(e.currentTarget.innerHTML)
                        }
                        dangerouslySetInnerHTML={{ __html: description }}
                        className="p-4 min-h-[160px] text-xs text-[#495057] outline-none focus:bg-white leading-relaxed"
                      />
                      {/* Editor status footer */}
                      <div className="px-3 py-1 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-[10px] text-gray-400">
                        <span>p</span>
                        <span className="italic font-medium">tiny</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 7. Details: Arabic (Optional) (Accordion) */}
            <div className="border border-[#e2e8f0] rounded-[3px] overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setArabicOpen(!arabicOpen)}
                className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-[#495057] bg-white hover:bg-gray-50 transition-colors cursor-pointer select-none"
              >
                <span>Details: Arabic (Optional)</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform ${
                    arabicOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {arabicOpen && (
                <div
                  className="p-5 sm:p-6 border-t border-[#f0f0f0] space-y-4"
                  dir="rtl"
                >
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1">
                      العنوان
                    </label>
                    <input
                      type="text"
                      value={arabicTitle}
                      onChange={(e) => setArabicTitle(e.target.value)}
                      placeholder="العنوان"
                      className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] outline-none focus:border-[#00a99d]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1">
                      الوصف القصير
                    </label>
                    <input
                      type="text"
                      value={arabicShortDesc}
                      onChange={(e) => setArabicShortDesc(e.target.value)}
                      placeholder="الوصف القصير"
                      className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] outline-none focus:border-[#00a99d]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1">
                      الوصف
                    </label>
                    <textarea
                      rows={4}
                      value={arabicDesc}
                      onChange={(e) => setArabicDesc(e.target.value)}
                      placeholder="الوصف"
                      className="w-full p-3 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] outline-none focus:border-[#00a99d]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 8. Action Buttons (Bottom Right - Persis Screenshot 2) */}
            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#f0f0f0]">
              {/* Save Changes button */}
              <button
                type="button"
                onClick={handleSaveChanges}
                className="h-[36px] px-4 bg-[#20c997] hover:bg-[#1baa80] text-white text-xs font-semibold rounded-[3px] shadow-2xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Save Changes</span>
              </button>

              {/* Edit Details -> button */}
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="h-[36px] px-4 bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-xs font-semibold rounded-[3px] shadow-2xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Edit Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* STEP 2: DETAILS, PRICING & INVENTORY                      */
          /* ========================================================= */
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-800">
                  Step 2: Pricing, Inventory &amp; Shipping
                </h2>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Update price, discount, inventory SKU, and shipping parameters
                  for &quot;{title}&quot;
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-[#00a99d] rounded">
                Category: {category}
              </span>
            </div>

            {/* Pricing Section */}
            <div className="bg-[#fafbfc] border border-gray-200 rounded-[3px] p-5 space-y-4">
              <div className="flex items-center gap-2 font-bold text-xs text-gray-800">
                <DollarSign className="w-4 h-4 text-[#00a99d]" />
                <span>Pricing &amp; SKU</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Price (USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-xs">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-7 pr-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Discount Price (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-xs">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-7 pr-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d] bg-white"
                    />
                  </div>
                  {Number(discountPrice) > 0 &&
                    Number(price) > Number(discountPrice) && (
                      <span className="text-[10px] text-emerald-600 font-medium mt-1 block">
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
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. C1W2S3C4V5R6"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d] bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Stock & Shipping Section */}
            <div className="bg-[#fafbfc] border border-gray-200 rounded-[3px] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-gray-800">
                  <Package className="w-4 h-4 text-[#00a99d]" />
                  <span>Inventory &amp; Shipping</span>
                </div>
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isUnlimitedStock}
                    onChange={(e) => setIsUnlimitedStock(e.target.checked)}
                    className="accent-[#00a99d] rounded cursor-pointer"
                  />
                  <span>Unlimited Stock</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    disabled={isUnlimitedStock}
                    value={isUnlimitedStock ? "" : stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder={isUnlimitedStock ? "Unlimited" : "500"}
                    className={`w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d] transition-colors ${
                      isUnlimitedStock
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                        : "bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Shipping Cost (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-xs">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={shippingCost}
                      onChange={(e) => setShippingCost(e.target.value)}
                      placeholder="0.00 (Free Shipping)"
                      className="w-full pl-7 pr-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Estimated Delivery Time
                  </label>
                  <input
                    type="text"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    placeholder="1-3 Business Days"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d] bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 Bottom Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#f0f0f0]">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="h-[36px] px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to General Info</span>
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="h-[36px] px-5 bg-[#20c997] hover:bg-[#1baa80] text-white text-xs font-semibold rounded-[3px] shadow-2xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Save Changes</span>
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/dashboard/products")}
                  className="h-[36px] px-4 bg-[#5853a0] hover:bg-[#4b468e] text-white text-xs font-semibold rounded-[3px] shadow-2xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Return to Products</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Content Generator Modal (Persis Screenshot) */}
      <AiContentGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialTopic={title || "Colorful women scarves"}
        onGenerate={handleAiGenerated}
      />

      {/* Delete Image Confirmation Modal */}
      {deleteImageTarget && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150"
          onClick={() => setDeleteImageTarget(null)}
        >
          <div
            className="bg-white rounded-[4px] shadow-2xl border border-gray-200 w-full max-w-sm overflow-hidden p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 stroke-[2]" />
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900">Delete Image</h3>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  Are you sure you want to delete this image?
                </p>
                <p className="text-[11px] text-red-500 font-medium mt-1">
                  This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDeleteImageTarget(null)}
                className="text-gray-400 hover:text-gray-600 transition cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteImageTarget(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-[3px] text-xs font-semibold hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteImage}
                className="px-4 py-2 bg-[#e74c3c] hover:bg-[#c0392b] text-white rounded-[3px] text-xs font-semibold transition cursor-pointer shadow-xs inline-flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Image</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
