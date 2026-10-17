"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBasket,
  EyeOff,
  Minus,
  X,
  Star,
} from "lucide-react";

export default function ModeratorPanelHomePage() {
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
  const [closed, setClosed] = useState<{ [key: string]: boolean }>({});

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const closeCard = (id: string) => {
    setClosed((prev) => ({ ...prev, [id]: true }));
  };

  // 1. Latest Products Data (persis Image 1)
  const latestProducts = [
    {
      id: 47,
      name: "Colorful women scarves",
      time: "3 months ago",
      image: "/images/products/scarves.webp",
    },
    {
      id: 46,
      name: "Women's ankle boot with different colors",
      time: "3 months ago",
      image: "/images/products/grey-boots.webp",
    },
    {
      id: 45,
      name: "Navy polka dot dress",
      time: "3 months ago",
      image: "/images/products/polka-dress.webp",
    },
  ];

  // 2. Latest Featured Transactions Data (persis Image 1)
  const latestFeaturedTransactions = [
    { id: 15, method: "PayPal", amount: "$9.45", status: "COMPLETED", date: "2026-08-04 / 10:34" },
    { id: 14, method: "Stripe", amount: "$9.45", status: "Paid", date: "2026-08-04 / 10:33" },
    { id: 13, method: "Stripe", amount: "$9.45", status: "Paid", date: "2026-08-04 / 10:31" },
    { id: 12, method: "PayPal", amount: "$31.50", status: "COMPLETED", date: "2026-08-04 / 10:30" },
    { id: 11, method: "PayTabs", amount: "$8.40", status: "Authorised", date: "2026-08-04 / 10:27" },
  ];

  // 3. Latest Reviews Data (persis Image 1)
  const latestReviews = [
    {
      id: 8,
      username: "Admin",
      review: "dfg",
      time: "7 days ago",
    },
    {
      id: 7,
      username: "Admin",
      review:
        "The summer fashion lace top is absolutely beautiful! The lace detailing gives it a very elegant and",
      time: "2 months ago",
    },
    {
      id: 6,
      username: "Trendshop",
      review:
        "The material feels durable, and the design is sleek enough to match both casual and formal outfits.",
      time: "2 months ago",
    },
  ];

  return (
    <div className="space-y-6 font-sans text-gray-800">
      {/* ========================================================= */}
      {/* 1. TOP STAT CARDS (2 Cards: Products & Pending Products)  */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Card 1: Products (Ungu / #605ca8) */}
        <Link
          href="/moderator/admin-panel/products"
          className="bg-[#605ca8] text-white p-5 rounded-[3px] shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[110px] group transition hover:brightness-105 block"
        >
          <div>
            <div className="text-4xl font-bold leading-none tracking-tight">47</div>
            <div className="text-[15px] font-medium mt-1">Products</div>
          </div>
          <ShoppingBasket className="absolute right-3 top-2 w-[72px] h-[72px] text-black/15 pointer-events-none stroke-[1.5]" />
        </Link>

        {/* Card 2: Pending Products (Merah / #dd4b39) */}
        <Link
          href="/moderator/admin-panel/products/pending"
          className="bg-[#dd4b39] text-white p-5 rounded-[3px] shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[110px] group transition hover:brightness-105 block"
        >
          <div>
            <div className="text-4xl font-bold leading-none tracking-tight">0</div>
            <div className="text-[15px] font-medium mt-1">Pending Products</div>
          </div>
          <EyeOff className="absolute right-3 top-2 w-[72px] h-[72px] text-black/15 pointer-events-none stroke-[1.5]" />
        </Link>
      </div>

      {/* ========================================================= */}
      {/* 2. DUA KOLOM PANEL WIDGET (Sesuai 4 Widget di Foto User)   */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ======================================================= */}
        {/* BARIS 1 - KIRI: Latest Products                         */}
        {/* ======================================================= */}
        {!closed["latest-products"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-[#333]">Latest Products</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <button
                  type="button"
                  onClick={() => toggleCollapse("latest-products")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Collapse"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => closeCard("latest-products")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!collapsed["latest-products"] && (
              <div className="overflow-x-auto min-h-[220px]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#f4f4f4] text-[#555] font-semibold">
                      <th className="py-2.5 px-4 font-semibold w-12">Id</th>
                      <th className="py-2.5 px-4 font-semibold">Name</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f4f4]">
                    {latestProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3 px-4 text-[#555]">{prod.id}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-[2px] overflow-hidden shrink-0 border border-gray-100">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <Link
                                href={`/moderator/admin-panel/products/${prod.id}`}
                                className="text-[#333] hover:text-[#00a99d] text-xs font-normal transition-colors"
                              >
                                {prod.name}
                              </Link>
                              <div className="text-[#999] text-[11px] mt-0.5">
                                {prod.time}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/moderator/admin-panel/products/${prod.id}`}
                            className="inline-block bg-[#00a99d] hover:bg-[#008f85] text-white text-[11px] px-2.5 py-1 rounded-[3px] font-medium transition-colors"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-[#f4f4f4] flex justify-end bg-white rounded-b-[3px]">
              <Link
                href="/moderator/admin-panel/products"
                className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] hover:text-[#222] border border-[#ddd] text-xs px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* BARIS 1 - KANAN: Latest Pending Products (Kosong di Foto)*/}
        {/* ======================================================= */}
        {!closed["latest-pending-products"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-[#333]">Latest Pending Products</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <button
                  type="button"
                  onClick={() => toggleCollapse("latest-pending-products")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Collapse"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => closeCard("latest-pending-products")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!collapsed["latest-pending-products"] && (
              <div className="overflow-x-auto min-h-[220px]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#f4f4f4] text-[#555] font-semibold">
                      <th className="py-2.5 px-4 font-semibold w-12">Id</th>
                      <th className="py-2.5 px-4 font-semibold">Name</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody>{/* Kosong persis seperti di foto moderator */}</tbody>
                </table>
              </div>
            )}

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-[#f4f4f4] flex justify-end bg-white rounded-b-[3px]">
              <Link
                href="/moderator/admin-panel/products/pending"
                className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] hover:text-[#222] border border-[#ddd] text-xs px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* BARIS 2 - KIRI: Latest Transactions (Featured Products) */}
        {/* ======================================================= */}
        {!closed["latest-featured-transactions"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-[#333]">
                Latest Transactions{" "}
                <span className="text-gray-400 font-normal text-xs ml-1">
                  (Featured Products)
                </span>
              </h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <button
                  type="button"
                  onClick={() => toggleCollapse("latest-featured-transactions")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Collapse"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => closeCard("latest-featured-transactions")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!collapsed["latest-featured-transactions"] && (
              <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#f4f4f4] text-[#555] font-semibold">
                      <th className="py-2.5 px-4 font-semibold">Id</th>
                      <th className="py-2.5 px-3 font-semibold">Payment Method</th>
                      <th className="py-2.5 px-3 font-semibold">Payment Amount</th>
                      <th className="py-2.5 px-3 font-semibold">Status</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f4f4]">
                    {latestFeaturedTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-2.5 px-4 text-[#555]">{tx.id}</td>
                        <td className="py-2.5 px-3 text-[#333] font-normal">{tx.method}</td>
                        <td className="py-2.5 px-3 text-[#555]">{tx.amount}</td>
                        <td className="py-2.5 px-3 text-[#555]">{tx.status}</td>
                        <td className="py-2.5 px-4 text-[#777] text-right">{tx.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ======================================================= */}
        {/* BARIS 2 - KANAN: Latest Reviews                         */}
        {/* ======================================================= */}
        {!closed["latest-reviews"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-[#333]">Latest Reviews</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <button
                  type="button"
                  onClick={() => toggleCollapse("latest-reviews")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Collapse"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => closeCard("latest-reviews")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!collapsed["latest-reviews"] && (
              <div className="overflow-x-auto min-h-[300px]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#f4f4f4] text-[#555] font-semibold">
                      <th className="py-2.5 px-4 font-semibold w-10">Id</th>
                      <th className="py-2.5 px-4 font-semibold w-24">Username</th>
                      <th className="py-2.5 px-4 font-semibold">Review</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f4f4]">
                    {latestReviews.map((rev) => (
                      <tr key={rev.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3 px-4 text-[#555] align-top">{rev.id}</td>
                        <td className="py-3 px-4 text-[#333] font-normal align-top">
                          {rev.username}
                        </td>
                        <td className="py-3 px-4 align-top">
                          <div className="flex items-center space-x-0.5 mb-1">
                            {[...Array(5)].map((_, sIdx) => (
                              <Star
                                key={sIdx}
                                className="w-3.5 h-3.5 fill-[#f39c12] text-[#f39c12]"
                              />
                            ))}
                          </div>
                          <div className="text-[#333] text-xs leading-relaxed">
                            {rev.review}
                          </div>
                          <div className="text-[#999] text-[11px] mt-1">{rev.time}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

