"use client";

import React from "react";
import BulkUploadForm from "@/components/admin/dashboard/bulk-upload/BulkUploadForm";

export default function ModeratorBulkProductUploadPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-xl font-bold text-gray-800">Bulk Product Upload</h1>
        <p className="text-xs text-gray-500 mt-1">
          Upload multiple products at once via CSV or Excel spreadsheets
        </p>
      </div>
      <BulkUploadForm />
    </div>
  );
}
