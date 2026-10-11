"use client"

import React from "react";
import Link from "next/link";
import ModesyLogo from "../header/ModesyLogo";

export default function ModesyFooter() {
  return (
    <footer className="w-full bg-[#f8f9fa] border-t border-gray-200 text-xs text-gray-600 font-sans mt-auto">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Col 1: About Modesy */}
          <div className="md:col-span-4 space-y-4">
            <ModesyLogo />
            <p className="text-gray-500 leading-relaxed text-xs">
              Modesy is a modern e-commerce marketplace where buyers and sellers connect with ease.
              Whether you are looking to shop for unique items or grow your business by selling
              online, Modesy is here to help you every step of the way.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1 text-gray-400">
              {["facebook", "twitter", "instagram", "youtube", "pinterest"].map((net) => (
                <span
                  key={net}
                  className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-[#00a99d] hover:border-[#00a99d] cursor-pointer transition capitalize text-[10px]"
                >
                  {net[0].toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-gray-900 text-sm">Categories</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><Link href="/" className="hover:text-[#00a99d]">Clothing</Link></li>
              <li><Link href="/" className="hover:text-[#00a99d]">Shoes</Link></li>
              <li><Link href="/" className="hover:text-[#00a99d]">Home &amp; Living</Link></li>
              <li><Link href="/" className="hover:text-[#00a99d]">Jewelry &amp; Accessories</Link></li>
              <li><Link href="/" className="hover:text-[#00a99d]">Toys &amp; Entertainment</Link></li>
              <li><Link href="/" className="hover:text-[#00a99d]">Web Templates &amp; Code</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-gray-900 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><Link href="/" className="hover:text-[#00a99d]">Home</Link></li>
              <li><Link href="/" className="hover:text-[#00a99d]">Blog</Link></li>
              <li><Link href="/" className="hover:text-[#00a99d]">Shops</Link></li>
              <li><Link href="/" className="hover:text-[#00a99d]">Help Center</Link></li>
              <li><Link href="/" className="hover:text-[#00a99d]">Terms &amp; Conditions</Link></li>
              <li><Link href="/" className="hover:text-[#00a99d]">About Us</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-gray-900 text-sm">Newsletter</h4>
            <p className="text-xs text-gray-500">
              Join our subscribers list to get the latest news, updates and special offers directly in your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white font-semibold text-xs rounded transition"
              >
                Subscribe
              </button>
            </form>
            {/* Payment Icons */}
            <div className="flex items-center gap-2 pt-2 text-[10px] text-gray-400 font-semibold">
              <span className="px-2 py-0.5 border border-gray-200 rounded bg-white">VISA</span>
              <span className="px-2 py-0.5 border border-gray-200 rounded bg-white">Mastercard</span>
              <span className="px-2 py-0.5 border border-gray-200 rounded bg-white">AMEX</span>
              <span className="px-2 py-0.5 border border-gray-200 rounded bg-white">PayPal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="border-t border-gray-200 bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>Copyright 2026 Modesy - All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#00a99d]">Privacy Policy</Link>
            <Link href="/" className="hover:text-[#00a99d]">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
