"use client";

import React, { useState } from "react";
import BulkActionSelector from "./BulkActionSelector";
import BulkListingTypeSelector from "./BulkListingTypeSelector";
import BulkCurrencySelector from "./BulkCurrencySelector";
import BulkCsvDropzone from "./BulkCsvDropzone";
import BulkUploadSubmitButton from "./BulkUploadSubmitButton";
import { BulkAction, BulkListingType, BulkCurrency, BulkUploadFormData } from "./types";
import ValidationTooltip from "../add-product/ValidationTooltip";
import { CheckCircle2 } from "lucide-react";

export default function BulkUploadForm() {
  const [formData, setFormData] = useState<BulkUploadFormData>({
    action: "",
    listingType: "",
    currency: "",
    file: null,
  });

  const [errorField, setErrorField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.action) {
      setErrorField("action");
      return;
    }
    if (!formData.listingType) {
      setErrorField("listingType");
      return;
    }
    if (!formData.currency) {
      setErrorField("currency");
      return;
    }
    if (!formData.file) {
      setErrorField("file");
      return;
    }

    setErrorField(null);
    setIsSubmitting(true);

    // Simulate CSV parsing and upload processing
    setTimeout(() => {
      setIsSubmitting(false);
      setUploadSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      action: "",
      listingType: "",
      currency: "",
      file: null,
    });
    setUploadSuccess(false);
    setErrorField(null);
  };

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[18px] font-bold text-[#2d3748]">
          Bulk Product Upload
        </h1>
        <p className="text-sm text-[#718096] mt-1 leading-snug">
          You can add your products with a CSV file from this section
        </p>
      </div>

      {uploadSuccess ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 bg-teal-50 text-[#00a99d] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            Products Successfully Uploaded!
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            File <strong>{formData.file?.name}</strong> has been processed. All product records have been imported to your store inventory.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-5 py-2.5 rounded-[3px] transition cursor-pointer"
            >
              Upload Another CSV
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* 1. Select Action */}
          <div className="relative">
            <BulkActionSelector
              value={formData.action}
              onChange={(act: BulkAction) => {
                setFormData((prev) => ({ ...prev, action: act }));
                if (errorField === "action") setErrorField(null);
              }}
              error={errorField === "action"}
            />
            {errorField === "action" && (
              <ValidationTooltip
                message="Please select an item in the list."
                className="top-full left-0 mt-1"
                arrowOffsetPx={30}
              />
            )}
          </div>

          {/* 2. Listing Type */}
          <div className="relative">
            <BulkListingTypeSelector
              value={formData.listingType}
              onChange={(lt: BulkListingType) => {
                setFormData((prev) => ({ ...prev, listingType: lt }));
                if (errorField === "listingType") setErrorField(null);
              }}
              error={errorField === "listingType"}
            />
            {errorField === "listingType" && (
              <ValidationTooltip
                message="Please select an item in the list."
                className="top-full left-0 mt-1"
                arrowOffsetPx={30}
              />
            )}
          </div>

          {/* 3. Currency */}
          <div className="relative">
            <BulkCurrencySelector
              value={formData.currency}
              onChange={(curr: BulkCurrency) => {
                setFormData((prev) => ({ ...prev, currency: curr }));
                if (errorField === "currency") setErrorField(null);
              }}
              error={errorField === "currency"}
            />
            {errorField === "currency" && (
              <ValidationTooltip
                message="Please select an item in the list."
                className="top-full left-0 mt-1"
                arrowOffsetPx={30}
              />
            )}
          </div>

          {/* 4. CSV File Dropzone */}
          <div className="relative">
            <BulkCsvDropzone
              file={formData.file}
              onFileSelect={(f) => {
                setFormData((prev) => ({ ...prev, file: f }));
                if (errorField === "file") setErrorField(null);
              }}
              error={errorField === "file"}
            />
            {errorField === "file" && (
              <ValidationTooltip
                message="Please select a CSV file to upload."
                className="top-full left-0 mt-1"
                arrowOffsetPx={30}
              />
            )}
          </div>

          {/* 5. Submit Button */}
          <BulkUploadSubmitButton isLoading={isSubmitting} />
        </form>
      )}
    </div>
  );
}
