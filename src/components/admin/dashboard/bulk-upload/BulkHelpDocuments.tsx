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
      '"Wireless Bluetooth Headphones","Electronics > Audio",59.99,100,"WB-HEAD-01","High-fidelity wireless audio headphones with noise cancel","Premium headphones with deep bass and 40h battery life.","https://images.unsplash.com/photo-1505740420928-5e560c06d30e"\n' +
      '"Smart Fitness Tracker Watch","Electronics > Wearables",39.50,150,"FIT-WATCH-02","Waterproof smart tracker with heart-rate monitor","Tracks daily steps, calories burned, sleep cycles, and heart rate.","https://images.unsplash.com/photo-1523275335684-37898b6baf30"\n' +
      '"Minimalist Leather Cardholder","Fashion > Accessories",19.00,80,"LTH-CARD-03","Genuine handcrafted slim leather wallet","Compact wallet made from full-grain leather holding up to 8 cards.","https://images.unsplash.com/photo-1627123424574-724758594e93"\n';
    downloadFile("product_upload_example.csv", csvContent);
  };

  return (
    <>
      <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 sm:p-7 shadow-xs">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-[17px] font-bold text-[#2d3748]">
            Help Documents
          </h2>
          <p className="text-sm text-[#718096] mt-1 leading-snug">
            You can use these documents to generate your CSV file
          </p>
        </div>

        {/* Action Buttons (Stacked matching screenshot) */}
        <div className="space-y-3">
          {/* 1. Download CSV Template Button */}
          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="w-full bg-[#10b981] hover:bg-[#059669] text-white text-sm font-medium py-2.5 px-4 rounded-[4px] shadow-xs transition duration-150 cursor-pointer text-center block select-none"
          >
            Download CSV Template
          </button>

          {/* 2. Download CSV Example Button */}
          <button
            type="button"
            onClick={handleDownloadExample}
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium py-2.5 px-4 rounded-[4px] shadow-xs transition duration-150 cursor-pointer text-center block select-none"
          >
            Download CSV Example
          </button>

          {/* 3. Documentation Button */}
          <button
            type="button"
            onClick={() => setIsDocModalOpen(true)}
            className="w-full bg-[#5a6268] hover:bg-[#4b5563] text-white text-sm font-medium py-2.5 px-4 rounded-[4px] shadow-xs transition duration-150 cursor-pointer text-center block select-none"
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
