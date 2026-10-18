"use client";

import React, { useState } from "react";
import Link from "next/link";
import BulkActionSelector from "./BulkActionSelector";
import BulkListingTypeSelector from "./BulkListingTypeSelector";
import BulkCurrencySelector from "./BulkCurrencySelector";
import BulkCsvDropzone from "./BulkCsvDropzone";
import {
  BulkAction,
  BulkListingType,
  BulkCurrency,
  BulkUploadFormData,
} from "./types";
import ValidationTooltip from "../add-product/ValidationTooltip";
import { CheckCircle2, ArrowRight, Loader2, Check } from "lucide-react";

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
  const [importedCount, setImportedCount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.action) {
      setErrorField("action");
      return;
    }

    if (formData.action === "add" && !formData.listingType) {
      setErrorField("listingType");
      return;
    }

    if (
      (formData.action === "edit" || formData.listingType === "sell") &&
      !formData.currency
    ) {
      setErrorField("currency");
      return;
    }

    if (!formData.file) {
      setErrorField("file");
      return;
    }

    setErrorField(null);
    setIsSubmitting(true);

    // Read CSV file to get actual line count
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || "";
      const lines = text
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
      const rowCount = Math.max(1, lines.length > 1 ? lines.length - 1 : 1);

      setTimeout(() => {
        setImportedCount(rowCount);
        setIsSubmitting(false);
        setUploadSuccess(true);
      }, 900);
    };

    reader.onerror = () => {
      setTimeout(() => {
        setImportedCount(4);
        setIsSubmitting(false);
        setUploadSuccess(true);
      }, 900);
    };

    reader.readAsText(formData.file);
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
    setImportedCount(0);
  };

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[15px] font-semibold text-[#333]">
          Bulk Product Upload
        </h1>
        <p className="text-xs text-gray-500 mt-1">
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
          <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
            File <strong>{formData.file?.name}</strong> has been processed
            successfully.{" "}
            <span className="font-semibold text-[#00a99d]">
              {importedCount} product{importedCount > 1 ? "s" : ""}
            </span>{" "}
            have been {formData.action === "edit" ? "updated in" : "added to"}{" "}
            your store catalog.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-4 py-2.5 rounded-[3px] transition cursor-pointer"
            >
              Upload Another CSV
            </button>
            <Link
              href="/dashboard/products"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-[3px] transition cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>View Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* 1. Select Action */}
          <div className="relative">
            <BulkActionSelector
              value={formData.action}
              onChange={(act: BulkAction) => {
                setFormData((prev) => ({
                  ...prev,
                  action: act,
                  // If switching to edit, clear listingType
                  listingType: act === "edit" ? "" : prev.listingType,
                }));
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

          {/* 2. Listing Type (Shown when action is 'add' or not chosen yet, matching Screenshot 2) */}
          {formData.action !== "edit" && (
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
          )}

          {/* 3. Currency (Shown when action is 'edit', OR action is 'add' with listingType 'sell', matching Screenshot 1 & 2) */}
          {(formData.action === "edit" ||
            formData.listingType === "sell") && (
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
          )}

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
          <div className="flex justify-end pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-5 py-2.5 rounded-[3px] inline-flex items-center gap-2 shadow-2xs transition duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading CSV...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Upload Products</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
