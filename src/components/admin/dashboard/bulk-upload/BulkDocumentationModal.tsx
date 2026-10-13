"use client";

import React from "react";
import { X, HelpCircle, Download } from "lucide-react";

interface BulkDocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadTemplate: () => void;
}

export default function BulkDocumentationModal({
  isOpen,
  onClose,
  onDownloadTemplate,
}: BulkDocumentationModalProps) {
  if (!isOpen) return null;

  const columns = [
    { name: "title", required: true, desc: "Name of the product in English", example: "Wireless Bluetooth Headphones" },
    { name: "category_id", required: true, desc: "Category ID or full category name", example: "Electronics > Audio" },
    { name: "price", required: true, desc: "Product selling price (numbers only)", example: "49.99" },
    { name: "stock", required: true, desc: "Total initial inventory stock quantity", example: "150" },
    { name: "sku", required: false, desc: "Unique stock keeping unit code", example: "WB-HEAD-001" },
    { name: "short_description", required: false, desc: "One-line summary for product card", example: "Noise-cancelling wireless headphones" },
    { name: "description", required: false, desc: "Full product description (HTML or text)", example: "Premium high-fidelity audio..." },
    { name: "image_url", required: false, desc: "Public HTTP/HTTPS image URL", example: "https://example.com/img1.jpg" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-[4px] shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-[#ebebeb]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#ebebeb] flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-[#00a99d] flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-800">
                CSV Bulk Upload Documentation
              </h3>
              <p className="text-xs text-gray-500">
                Guidelines for preparing your CSV product inventory file
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="bg-blue-50/70 border border-blue-200/60 rounded-[3px] p-3 text-xs text-blue-900 leading-relaxed">
            <strong>Important Tips:</strong> Ensure your CSV file is UTF-8 encoded. Separate values with commas (<code>,</code>). Image URLs must be publicly accessible direct image links.
          </div>

          <div className="border border-gray-200 rounded-[3px] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-100/70 text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-3">Column Name</th>
                  <th className="p-3">Requirement</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {columns.map((col) => (
                  <tr key={col.name} className="hover:bg-gray-50/60">
                    <td className="p-3 font-mono font-medium text-gray-800">
                      {col.name}
                    </td>
                    <td className="p-3">
                      {col.required ? (
                        <span className="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">
                          Required
                        </span>
                      ) : (
                        <span className="text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                          Optional
                        </span>
                      )}
                    </td>
                    <td className="p-3">{col.desc}</td>
                    <td className="p-3 font-mono text-[11px] text-gray-700">
                      {col.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#ebebeb] bg-gray-50/40 flex items-center justify-between">
          <button
            type="button"
            onClick={onDownloadTemplate}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00a99d] hover:text-[#008f85] transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Template File (.csv)</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-[3px] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
