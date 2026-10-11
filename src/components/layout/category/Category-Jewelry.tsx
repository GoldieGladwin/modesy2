import React from "react";
import ProductCard from "../../ui/ProductCard";

export default function CategoryJewelry() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Jewelry & Accessories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => <ProductCard key={i} title="Jewelry & Accessories Item " seller="Modesy" currentPrice="$20.00" />)}
      </div>
    </div>
  );
}