import React from "react";
import Link from "next/link";
import { ShoppingCart, Search, User } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-3xl font-black text-green-600 tracking-tighter">MODESY</Link>
        <div className="flex-1 max-w-xl mx-8 hidden md:block relative">
           <input type="text" placeholder="Search for products, categories or brands" className="w-full border rounded-md py-2 px-4 outline-none focus:border-green-600 text-sm" />
           <button className="absolute right-0 top-0 bottom-0 bg-gray-100 px-4 border-l rounded-r-md"><Search className="text-gray-500" size={18} /></button>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
           <Link href="#" className="flex items-center gap-2 text-gray-700 hover:text-green-600"><User size={20}/> Login</Link>
           <Link href="#" className="flex items-center gap-2 text-gray-700 hover:text-green-600"><ShoppingCart size={20}/> Cart</Link>
        </div>
      </div>
    </header>
  );
}