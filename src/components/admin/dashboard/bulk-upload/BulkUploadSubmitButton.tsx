"use client";

import React from "react";
import { Check, Loader2 } from "lucide-react";

interface BulkUploadSubmitButtonProps {
  isLoading?: boolean;
}

export default function BulkUploadSubmitButton({
  isLoading = false,
}: BulkUploadSubmitButtonProps) {
  return (
    <div className="flex justify-end pt-4 border-t border-[#f4f4f4]">
      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#00a99d] hover:bg-[#008f85] text-white text-sm font-semibold px-6 py-2.5 rounded-[3px] inline-flex items-center gap-2 shadow-xs transition duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Uploading CSV...</span>
          </>
        ) : (
          <>
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Upload Products</span>
          </>
        )}
      </button>
    </div>
  );
}
