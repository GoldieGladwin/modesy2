import React from "react";
import Link from "next/link";
import { Store, Star, MapPin, Mail, Phone, Calendar, Heart } from "lucide-react";
import { jewelryProductsData } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function VendorPublicShopPage() {
  const shopProducts = jewelryProductsData.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Shop Header Banner */}
      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden mb-8">
        <div className="h-44 bg-linear-to-r from-teal-700 to-emerald-600 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="p-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-4">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-sm bg-white p-1 border border-gray-200 shadow-sm shrink-0">
                <div className="w-full h-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl rounded-xs">
                  <Store className="w-10 h-10" />
                </div>
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-900">TrendShop</h1>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-semibold rounded">
                    Verified Seller
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" /> 4.9 (128 reviews)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> New York, United States
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" /> Joined 2023
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-xs transition flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact Seller
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-600 max-w-2xl leading-relaxed mt-2 border-t border-gray-100 pt-4">
            Welcome to TrendShop! We offer premium quality fashion accessories, elegant jewelry, and handcrafted items delivered with exceptional care and prompt service.
          </p>
        </div>
      </div>

      {/* Shop Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
          <h2 className="text-base font-bold text-gray-900">Products ({shopProducts.length})</h2>
          <span className="text-xs text-gray-500">Sorted by: Most Recent</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {shopProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
