import React from "react";
const categories = ['Clothing', 'Shoes', 'Home & Living', 'Jewelry', 'Toys', 'Graphics'];
export default function ShopByCategory() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Shop By Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((c, i) => (
          <div key={i} className="bg-white border rounded-md p-6 text-center hover:shadow-md cursor-pointer transition">
             <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3"></div>
             <span className="text-sm font-medium text-gray-800">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}