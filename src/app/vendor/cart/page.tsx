import React from "react";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";

export default function VendorCartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/vendor" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Cart</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-8 text-center max-w-lg mx-auto">
        <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300 stroke-[1.5]" />
        <h1 className="text-xl font-bold text-gray-800 mb-1">Your cart is empty</h1>
        <p className="text-xs text-gray-500 mb-6">Explore products from other vendors on Modesy.</p>
        <Link
          href="/vendor"
          className="inline-flex items-center gap-2 bg-[#00a99d] text-white px-6 py-2.5 rounded text-xs font-bold hover:bg-[#008f85] transition"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
