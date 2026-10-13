"use client";

import React from "react";
import BulkUploadForm from "@/components/admin/dashboard/bulk-upload/BulkUploadForm";
import BulkHelpDocuments from "@/components/admin/dashboard/bulk-upload/BulkHelpDocuments";

export default function BulkProductUploadPage() {
  return (
    <div className="py-2 sm:py-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Card: Bulk Product Upload Main Form (8 Columns) */}
        <div className="lg:col-span-8">
          <BulkUploadForm />
        </div>

        {/* Right Card: Help Documents (4 Columns) */}
        <div className="lg:col-span-4">
          <BulkHelpDocuments />
        </div>
      </div>
    </div>
  );
}
