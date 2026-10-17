"use client";

import React, { useState } from "react";
import BulkDocumentationModal from "./BulkDocumentationModal";

export default function BulkHelpDocuments() {
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

  // Helper to trigger browser CSV file download
  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTemplate = () => {
    const csvHeader =
      "title,category_id,price,stock,sku,short_description,description,image_url\n";
    downloadFile("product_upload_template.csv", csvHeader);
  };

  const handleDownloadExample = () => {
    const csvContent =
      "title,category_id,price,stock,sku,short_description,description,image_url\n" +
      '"Animal colorful digital prints","Digital > Prints",29.00,100,"ANM-DIG-01","Vibrant animal digital art prints","High resolution downloadable prints suitable for wall art and decor.","https://images.unsplash.com/photo-1579783900882-c0d3dad7b119"\n' +
      '"Summer fashion top lace","Fashion > Tops",45.00,80,"TOP-LACE-02","Elegant lightweight summer lace blouse","Breathable fabric with fine lace embroidery perfect for warm weather.","https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"\n' +
      '"Black midi skirt with white flowers","Fashion > Skirts",38.00,50,"SKT-FLW-03","Charming floral pattern A-line midi skirt","Soft lightweight drape with elastic waistband and charming floral accents.","https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa"\n' +
      '"Light blue women shirt","Fashion > Shirts",34.50,120,"SHT-BLU-04","Classic tailored soft cotton shirt","Versatile casual and formal button-down shirt made of 100% breathable cotton.","https://images.unsplash.com/photo-1598554747436-c9293d6a588f"\n';
    downloadFile("product_upload_example.csv", csvContent);
  };

  return (
    <>
      <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-[15px] font-semibold text-[#333]">
            Help Documents
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            You can use these documents to generate your CSV file
          </p>
        </div>

        {/* Action Buttons (Stacked matching screenshot) */}
        <div className="space-y-3">
          {/* 1. Download CSV Template Button (Emerald Green #20c997) */}
          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="w-full bg-[#20c997] hover:bg-[#1baa80] text-white text-xs font-semibold py-2.5 px-4 rounded-[4px] shadow-2xs transition duration-150 cursor-pointer text-center block select-none"
          >
            Download CSV Template
          </button>

          {/* 2. Download CSV Example Button (Bright Blue #328cf3) */}
          <button
            type="button"
            onClick={handleDownloadExample}
            className="w-full bg-[#328cf3] hover:bg-[#257fe6] text-white text-xs font-semibold py-2.5 px-4 rounded-[4px] shadow-2xs transition duration-150 cursor-pointer text-center block select-none"
          >
            Download CSV Example
          </button>

          {/* 3. Documentation Button (Slate Gray #596573) */}
          <button
            type="button"
            onClick={() => setIsDocModalOpen(true)}
            className="w-full bg-[#596573] hover:bg-[#4b5561] text-white text-xs font-semibold py-2.5 px-4 rounded-[4px] shadow-2xs transition duration-150 cursor-pointer text-center block select-none"
          >
            Documentation
          </button>
        </div>
      </div>

      {/* Documentation Modal */}
      <BulkDocumentationModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        onDownloadTemplate={handleDownloadTemplate}
      />
    </>
  );
}
