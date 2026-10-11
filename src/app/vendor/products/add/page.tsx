import React from "react";
import Link from "next/link";
import { PlusCircle, UploadCloud, ArrowLeft } from "lucide-react";

export default function VendorAddProductPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/vendor" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/vendor/products" className="hover:text-[#00a99d]">Products</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Add Product</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8">
        <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
          <div>
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#00a99d]" />
              Add New Product
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Fill in product information to publish on Modesy Marketplace</p>
          </div>
          <Link
            href="/vendor/products"
            className="text-xs text-gray-500 hover:text-[#00a99d] inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
          </Link>
        </div>

        <form className="space-y-6 text-xs text-gray-700">
          {/* Title */}
          <div>
            <label className="block font-bold text-gray-800 mb-1.5">Product Title *</label>
            <input
              type="text"
              placeholder="e.g. Handmade Leather Shoulder Bag"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d]"
            />
          </div>

          {/* Category & Product Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-800 mb-1.5">Category *</label>
              <select className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs outline-none bg-white">
                <option>Select Category</option>
                <option>Jewelry &amp; Accessories</option>
                <option>Clothing</option>
                <option>Shoes</option>
                <option>Home &amp; Living</option>
                <option>Web Templates &amp; Code</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-1.5">Product Type</label>
              <select className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs outline-none bg-white">
                <option>Physical Product</option>
                <option>Digital Product / File</option>
              </select>
            </div>
          </div>

          {/* Price & SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-gray-800 mb-1.5">Price ($) *</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-1.5">Discount Price ($)</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-1.5">Quantity / Stock</label>
              <input
                type="number"
                defaultValue={1}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d]"
              />
            </div>
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block font-bold text-gray-800 mb-1.5">Product Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center bg-gray-50/50 hover:bg-gray-50 transition cursor-pointer">
              <UploadCloud className="w-10 h-10 mx-auto text-gray-400 mb-2" />
              <p className="font-semibold text-gray-700">Drag and drop images here, or browse files</p>
              <p className="text-[11px] text-gray-400 mt-1">Supports JPG, PNG, WEBP up to 5MB each</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-gray-800 mb-1.5">Description</label>
            <textarea
              rows={5}
              placeholder="Provide a detailed description of your product..."
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d]"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              className="px-6 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white font-bold rounded text-xs transition shadow-xs"
            >
              Save &amp; Publish
            </button>
            <button
              type="button"
              className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded text-xs transition"
            >
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
