"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpDown, Search, ChevronDown, ChevronUp } from "lucide-react";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";
import LoginModal from "@/components/auth/LoginModal";
import ProductCard from "@/components/product/ProductCard";
import { jewelryProductsData } from "@/data/products";

export default function JewelryAccessoriesPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("most_recent");
  const [isBrandOpen, setIsBrandOpen] = useState(true);

  const brandOptions = [
    "Armani",
    "Gucci",
    "H & M",
    "Lacoste",
    "Mango",
    "Nike",
    "Puma",
    "Tommy Hilfiger",
    "U.S. Polo Assn",
  ];

  const subCategories = ["Bags & Purses", "Necklaces & Accessories", "Rings"];

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return jewelryProductsData.filter((product) => {
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && product.brand && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Keyword filter
      if (keyword.trim()) {
        const query = keyword.toLowerCase();
        if (
          !product.title.toLowerCase().includes(query) &&
          !product.seller.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      // Price filter
      const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ""));
      if (!isNaN(numericPrice)) {
        if (minPrice && numericPrice < parseFloat(minPrice)) return false;
        if (maxPrice && numericPrice > parseFloat(maxPrice)) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedBrands, keyword, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      {/* Header Modesy */}
      <ModesyHeader
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2 w-full">
        <nav className="text-xs text-gray-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#00a99d]">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#00a99d]">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Jewelry &amp; Accessories</span>
        </nav>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* ================= LEFT SIDEBAR FILTER ================= */}
          <aside className="lg:col-span-1 space-y-4">
            {/* 1. Category Filter */}
            <div className="bg-white border border-gray-200 rounded-sm p-4">
              <h3 className="text-xs font-bold uppercase text-gray-800 tracking-wider mb-2.5">
                Category
              </h3>
              <div className="space-y-1.5 text-xs text-gray-600">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className={`flex items-center gap-1.5 font-bold cursor-pointer transition ${
                    selectedCategory === null ? "text-[#00a99d]" : "text-gray-800 hover:text-[#00a99d]"
                  }`}
                >
                  <span>←</span>
                  <span>Jewelry &amp; Accessories</span>
                </button>
                <div className="pl-4 space-y-1 pt-1 text-gray-600">
                  {subCategories.map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setSelectedCategory(sub === selectedCategory ? null : sub)}
                      className={`block text-left w-full hover:text-[#00a99d] transition cursor-pointer ${
                        selectedCategory === sub ? "text-[#00a99d] font-semibold" : ""
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Brand Filter */}
            <div className="bg-white border border-gray-200 rounded-sm p-4">
              <div
                onClick={() => setIsBrandOpen(!isBrandOpen)}
                className="flex items-center justify-between cursor-pointer select-none mb-2"
              >
                <h3 className="text-xs font-bold uppercase text-gray-800 tracking-wider">
                  Brand
                </h3>
                {isBrandOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                )}
              </div>

              {isBrandOpen && (
                <div className="space-y-2 pt-1 max-h-48 overflow-y-auto pr-1">
                  {brandOptions.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-gray-900"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded border-gray-300 text-[#00a99d] focus:ring-[#00a99d] accent-[#00a99d] cursor-pointer"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Price Filter */}
            <div className="bg-white border border-gray-200 rounded-sm p-4">
              <h3 className="text-xs font-bold uppercase text-gray-800 tracking-wider mb-2.5">
                Price
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d]"
                />
                <span className="text-gray-400 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d]"
                />
              </div>
            </div>

            {/* 4. Filter by keyword */}
            <div className="bg-white border border-gray-200 rounded-sm p-4">
              <h3 className="text-xs font-bold uppercase text-gray-800 tracking-wider mb-2.5">
                Filter by keyword
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d]"
                />
                <button
                  type="button"
                  onClick={() => {}}
                  className="w-full py-1.5 px-3 bg-gray-100 hover:bg-[#00a99d] hover:text-white text-gray-700 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition cursor-pointer border border-gray-200"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ================= RIGHT PRODUCT GRID ================= */}
          <div className="lg:col-span-3 space-y-4">
            {/* Top Toolbar: Sorting */}
            <div className="flex justify-between items-center bg-white border border-gray-200 rounded-sm p-3">
              <span className="text-xs text-gray-500 font-medium">
                Showing {filteredProducts.length} results
              </span>

              <div className="flex items-center gap-2">
                <div className="relative flex items-center">
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-8 pr-6 py-1 text-xs bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d] text-gray-700 cursor-pointer"
                  >
                    <option value="most_recent">Most Recent</option>
                    <option value="lowest_price">Lowest Price</option>
                    <option value="highest_price">Highest Price</option>
                    <option value="highest_rating">Highest Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-sm p-12 text-center text-gray-500 text-sm">
                No products found matching your filter criteria.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <ModesyFooter />

      {/* Modal khusus Login */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </div>
  );
}
