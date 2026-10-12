"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
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
import ProductDetailsArabic, {
  ArabicDetailsData,
} from "@/components/admin/dashboard/add-product/ProductDetailsArabic";

export default function AdminDashboardAddProductPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<UploadedImage[]>([]);

  // Default: belum ada yang terpilih persis sesuai foto
  const [productType, setProductType] = useState<ProductType | null>(null);
  const [listingType, setListingType] = useState<ListingType | null>(null);
  const [category, setCategory] = useState("");

  const [englishDetails, setEnglishDetails] = useState<EnglishDetailsData>({
    title: "",
    shortDescription: "",
    tags: [],
    description: "",
  });

  const [arabicDetails, setArabicDetails] = useState<ArabicDetailsData>({
    title: "",
    shortDescription: "",
    tags: [],
    description: "",
  });

  // Error validation indicator: "productType" | "listingType" | "category" | "title" | null
  const [errorField, setErrorField] = useState<string | null>(null);

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validasi Product Type (Tampilkan tooltip persis seperti di foto)
    if (!productType) {
      setErrorField("productType");
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    // 2. Validasi Listing Type
    if (!listingType) {
      setErrorField("listingType");
      window.scrollTo({ top: 220, behavior: "smooth" });
      return;
    }

    // 3. Validasi Category
    if (!category) {
      setErrorField("category");
      window.scrollTo({ top: 320, behavior: "smooth" });
      return;
    }

    // 4. Validasi Title
    if (!englishDetails.title.trim()) {
      setErrorField("title");
      window.scrollTo({ top: 400, behavior: "smooth" });
      return;
    }

    setErrorField(null);
    setCurrentStep(2);
  };

  return (
    <div className="py-2 sm:py-4">
      {/* Wizard Step Bar */}
      <AddProductWizard currentStep={currentStep} />

      {/* Main Form Container */}
      <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 sm:p-8 max-w-5xl mx-auto shadow-xs">
        {currentStep === 1 ? (
          <form onSubmit={handleSaveAndContinue} className="space-y-8" noValidate>
            {/* 1. Images Dropzone & Preview */}
            <ProductImageUploader
              images={images}
              onImagesChange={(newImgs) => setImages(newImgs)}
            />

            {/* 2. Product Type (Physical vs Digital) */}
            <ProductTypeSelector
              value={productType}
              onChange={(t) => {
                setProductType(t);
                if (errorField === "productType") setErrorField(null);
              }}
              showError={errorField === "productType"}
            />

            {/* 3. Listing Type (4 Radio Options in 2x2 Grid) */}
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
                if (errorField === "title" && d.title.trim()) setErrorField(null);
              }}
              showTitleError={errorField === "title"}
            />

            {/* 6. Details: Arabic Accordion (Optional) */}
            <ProductDetailsArabic
              data={arabicDetails}
              onChange={(d) => setArabicDetails(d)}
            />

            {/* 7. Save and Continue Button (Bottom Right) */}
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
          /* Step 2 Confirmation / Pricing & Shipping Screen */
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-teal-50 text-[#00a99d] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              General Information Saved!
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Product &quot;{englishDetails.title}&quot; has been created. You can now configure prices, inventory, shipping, and variants in Details.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-semibold rounded-[3px] hover:bg-gray-50 transition cursor-pointer"
              >
                ← Back to General Information
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Product successfully published to marketplace!");
                  window.location.href = "/admin/dashboard";
                }}
                className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-bold rounded-[3px] transition cursor-pointer"
              >
                Publish Product
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
