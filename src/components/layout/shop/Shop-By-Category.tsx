import React from "react";
import Link from "next/link";

const categories = [
  { name: "Clothing", href: "/category/clothing" },
  { name: "Shoes", href: "/category/shoes" },
  { name: "Home & Living", href: "/category/home-living" },
  { name: "Jewelry", href: "/category/jewelry-accessories" },
  { name: "Toys", href: "/category/toys-entertainment" },
  { name: "Graphics", href: "/category/graphics-photos" },
];

export default function ShopByCategory() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Shop By Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((c, i) => (
          <Link
            key={i}
            href={c.href}
            className="bg-white border rounded-md p-6 text-center hover:shadow-md cursor-pointer transition block group"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-[#00a99d]/10 transition-colors">
              <span className="text-[#00a99d] font-bold text-lg">{c.name[0]}</span>
            </div>
            <span className="text-sm font-medium text-gray-800 group-hover:text-[#00a99d] transition-colors">
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}