"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  ShoppingBasket,
  EyeOff,
  Users,
  Minus,
  X,
  Star,
  User,
} from "lucide-react";

export default function AdminPanelHomePage() {
  // Collapse state for each of the 8 widgets
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
  const [closed, setClosed] = useState<{ [key: string]: boolean }>({});

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const closeCard = (id: string) => {
    setClosed((prev) => ({ ...prev, [id]: true }));
  };

  // 1. Latest Orders Data (persis screenshot)
  const latestOrders = [
    { id: "#10041", total: "$60.20", status: "Processing", date: "2026-10-05 / 15:38" },
    { id: "#10040", total: "$138", status: "Processing", date: "2026-09-29 / 12:00" },
    { id: "#10039", total: "$94", status: "Processing", date: "2026-09-29 / 00:34" },
    { id: "#10038", total: "$381.85", status: "Processing", date: "2026-09-28 / 22:48" },
    { id: "#10037", total: "$71.95", status: "Processing", date: "2026-09-28 / 15:39" },
    { id: "#10036", total: "$336", status: "Processing", date: "2026-09-28 / 06:49" },
    { id: "#10035", total: "$99.30", status: "Processing", date: "2026-09-26 / 21:14" },
  ];

  // 2. Latest Transactions Data (persis screenshot)
  const latestTransactions = [
    { id: 10, orderNumber: "#10015", amount: "$41.40", method: "Wallet Balance", status: "Succeeded", date: "2026-09-06 / 02:14" },
    { id: 9, orderNumber: "#10011", amount: "$194.20", method: "Wallet Balance", status: "Succeeded", date: "2026-08-31 / 18:56" },
    { id: 8, orderNumber: "#10010", amount: "$245.60", method: "Wallet Balance", status: "Succeeded", date: "2026-08-31 / 17:37" },
    { id: 7, orderNumber: "#10008", amount: "$28.75", method: "Wallet Balance", status: "Succeeded", date: "2026-08-05 / 13:57" },
    { id: 6, orderNumber: "#10007", amount: "$32.86", method: "Stripe", status: "Paid", date: "2026-08-05 / 13:50" },
    { id: 5, orderNumber: "#10005", amount: "$60.77", method: "Stripe", status: "Paid", date: "2026-08-05 / 13:45" },
    { id: 4, orderNumber: "#10004", amount: "$160", method: "Wallet Balance", status: "Succeeded", date: "2026-08-05 / 13:19" },
  ];

  // 3. Latest Products Data (persis screenshot)
  const latestProducts = [
    {
      id: 47,
      name: "Colorful women scarves",
      time: "2 months ago",
      image: "/images/products/scarves.webp",
    },
    {
      id: 46,
      name: "Women's ankle boot with different colors",
      time: "2 months ago",
      image: "/images/products/grey-boots.webp",
    },
    {
      id: 45,
      name: "Navy polka dot dress",
      time: "2 months ago",
      image: "/images/products/polka-dress.webp",
    },
  ];

  // 4. Latest Transactions (Featured Products) Data (persis screenshot)
  const latestFeaturedTransactions = [
    { id: 15, method: "PayPal", amount: "$9.45", status: "COMPLETED", date: "2026-08-04 / 10:34" },
    { id: 14, method: "Stripe", amount: "$9.45", status: "Paid", date: "2026-08-04 / 10:33" },
    { id: 13, method: "Stripe", amount: "$9.45", status: "Paid", date: "2026-08-04 / 10:31" },
    { id: 12, method: "PayPal", amount: "$31.50", status: "COMPLETED", date: "2026-08-04 / 10:30" },
    { id: 11, method: "PayTabs", amount: "$8.40", status: "Authorised", date: "2026-08-04 / 10:27" },
    { id: 10, method: "dLocal Go", amount: "R$ 51.53", status: "Completed", date: "2026-08-04 / 10:25" },
    { id: 9, method: "Midtrans", amount: "Rp137996.29", status: "capture", date: "2026-08-04 / 10:18" },
  ];

  // 5. Latest Reviews Data (persis screenshot)
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

  // 6. Latest Comments Data (persis screenshot)
  const latestComments = [
    {
      id: 1,
      user: "Peter Jone",
      comment: "good",
      time: "29 days ago",
    },
  ];

  // 7. Latest Members Data (persis screenshot)
  const latestMembers = [
    { name: "oubaida b...", time: "3 hours ago" },
    { name: "emohh asss", time: "1 day ago" },
    { name: "goldie glad", time: "3 days ago" },
    { name: "Atukunda ...", time: "9 days ago" },
    { name: "ismail elvan", time: "13 days ago" },
    { name: "Caleb Pros...", time: "16 days ago" },
  ];

  return (
    <div className="space-y-6 font-sans text-gray-800">
      {/* ========================================================= */}
      {/* 1. TOP STAT CARDS (4 Kolom Sesuai Screenshot)           */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Orders (Hijau / #00a65a) */}
        <div className="bg-[#00a65a] text-white p-5 rounded-[3px] shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div>
            <div className="text-4xl font-bold leading-none tracking-tight">41</div>
            <div className="text-[15px] font-medium mt-1">Orders</div>
          </div>
          <ShoppingCart className="absolute right-3 top-2 w-[72px] h-[72px] text-black/15 pointer-events-none stroke-[1.5]" />
        </div>

        {/* Card 2: Products (Ungu / #605ca8) */}
        <div className="bg-[#605ca8] text-white p-5 rounded-[3px] shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div>
            <div className="text-4xl font-bold leading-none tracking-tight">47</div>
            <div className="text-[15px] font-medium mt-1">Products</div>
          </div>
          <ShoppingBasket className="absolute right-3 top-2 w-[72px] h-[72px] text-black/15 pointer-events-none stroke-[1.5]" />
        </div>

        {/* Card 3: Pending Products (Merah / #dd4b39) */}
        <div className="bg-[#dd4b39] text-white p-5 rounded-[3px] shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div>
            <div className="text-4xl font-bold leading-none tracking-tight">0</div>
            <div className="text-[15px] font-medium mt-1">Pending Products</div>
          </div>
          <EyeOff className="absolute right-3 top-2 w-[72px] h-[72px] text-black/15 pointer-events-none stroke-[1.5]" />
        </div>

        {/* Card 4: Members (Kuning / #f39c12) */}
        <div className="bg-[#f39c12] text-white p-5 rounded-[3px] shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div>
            <div className="text-4xl font-bold leading-none tracking-tight">17</div>
            <div className="text-[15px] font-medium mt-1">Members</div>
          </div>
          <Users className="absolute right-3 top-2 w-[72px] h-[72px] text-black/15 pointer-events-none stroke-[1.5]" />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DUA KOLOM PANEL WIDGET (Sesuai 4 Screenshot)           */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ======================================================= */}
        {/* BARIS 1 - KIRI: Latest Orders                           */}
        {/* ======================================================= */}
        {!closed["latest-orders"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-[#333]">Latest Orders</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <button
                  type="button"
                  onClick={() => toggleCollapse("latest-orders")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Collapse"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => closeCard("latest-orders")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!collapsed["latest-orders"] && (
              <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#f4f4f4] text-[#555] font-semibold">
                      <th className="py-2.5 px-4 font-semibold">Order</th>
                      <th className="py-2.5 px-3 font-semibold">Total</th>
                      <th className="py-2.5 px-3 font-semibold">Status</th>
                      <th className="py-2.5 px-3 font-semibold">Date</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f4f4]">
                    {latestOrders.map((ord, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-2.5 px-4 text-[#333] font-normal">{ord.id}</td>
                        <td className="py-2.5 px-3 text-[#555]">{ord.total}</td>
                        <td className="py-2.5 px-3 text-[#555]">{ord.status}</td>
                        <td className="py-2.5 px-3 text-[#777]">{ord.date}</td>
                        <td className="py-2.5 px-4 text-right">
                          <Link
                            href="/admin/admin-panel/orders"
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
                href="/admin/admin-panel/orders"
                className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] hover:text-[#222] border border-[#ddd] text-xs px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* BARIS 1 - KANAN: Latest Transactions                    */}
        {/* ======================================================= */}
        {!closed["latest-transactions"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-[#333]">Latest Transactions</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <button
                  type="button"
                  onClick={() => toggleCollapse("latest-transactions")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Collapse"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => closeCard("latest-transactions")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!collapsed["latest-transactions"] && (
              <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <tbody className="divide-y divide-[#f4f4f4]">
                    {latestTransactions.map((tx, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-2.5 px-4 text-[#888] w-8">{tx.id}</td>
                        <td className="py-2.5 px-2 text-[#333] font-normal">{tx.orderNumber}</td>
                        <td className="py-2.5 px-2 text-[#555]">{tx.amount}</td>
                        <td className="py-2.5 px-3 text-[#555]">{tx.method}</td>
                        <td className="py-2.5 px-3 text-[#555]">{tx.status}</td>
                        <td className="py-2.5 px-4 text-[#777] text-right">{tx.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-[#f4f4f4] flex justify-end bg-white rounded-b-[3px]">
              <Link
                href="/admin/admin-panel/orders/transactions"
                className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] hover:text-[#222] border border-[#ddd] text-xs px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* BARIS 2 - KIRI: Latest Products                         */}
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
                    {latestProducts.map((prod, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
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
                              <div className="text-[#333] text-xs font-normal">
                                {prod.name}
                              </div>
                              <div className="text-[#999] text-[11px] mt-0.5">
                                {prod.time}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href="/admin/admin-panel/products"
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
                href="/admin/admin-panel/products"
                className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] hover:text-[#222] border border-[#ddd] text-xs px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* BARIS 2 - KANAN: Latest Pending Products (Kosong Sesuai Foto) */}
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
                  <tbody>{/* Kosong persis seperti di foto */}</tbody>
                </table>
              </div>
            )}

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-[#f4f4f4] flex justify-end bg-white rounded-b-[3px]">
              <Link
                href="/admin/admin-panel/products/pending"
                className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] hover:text-[#222] border border-[#ddd] text-xs px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* BARIS 3 - KIRI: Latest Transactions (Featured Products) */}
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
                    {latestFeaturedTransactions.map((tx, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
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

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-[#f4f4f4] flex justify-end bg-white rounded-b-[3px]">
              <Link
                href="/admin/admin-panel/digital-sales"
                className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] hover:text-[#222] border border-[#ddd] text-xs px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* BARIS 3 - KANAN: Latest Reviews                         */}
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
                    {latestReviews.map((rev, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3 px-4 text-[#555] align-top">{rev.id}</td>
                        <td className="py-3 px-4 text-[#333] font-normal align-top">
                          {rev.username}
                        </td>
                        <td className="py-3 px-4 align-top">
                          {/* 5 Stars */}
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

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-[#f4f4f4] flex justify-end bg-white rounded-b-[3px]">
              <Link
                href="/admin/admin-panel/reviews"
                className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] hover:text-[#222] border border-[#ddd] text-xs px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* BARIS 4 - KIRI: Latest Comments                         */}
        {/* ======================================================= */}
        {!closed["latest-comments"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-[#333]">Latest Comments</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <button
                  type="button"
                  onClick={() => toggleCollapse("latest-comments")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Collapse"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => closeCard("latest-comments")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!collapsed["latest-comments"] && (
              <div className="overflow-x-auto min-h-[160px]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#f4f4f4] text-[#555] font-semibold">
                      <th className="py-2.5 px-4 font-semibold w-10">Id</th>
                      <th className="py-2.5 px-4 font-semibold w-28">User</th>
                      <th className="py-2.5 px-4 font-semibold">Comment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f4f4]">
                    {latestComments.map((com, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3 px-4 text-[#555] align-top">{com.id}</td>
                        <td className="py-3 px-4 text-[#333] font-normal align-top">
                          {com.user}
                        </td>
                        <td className="py-3 px-4 align-top">
                          <div className="text-[#333] text-xs leading-relaxed">
                            {com.comment}
                          </div>
                          <div className="text-[#999] text-[11px] mt-1">{com.time}</div>
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
                href="/admin/admin-panel/comments"
                className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] hover:text-[#222] border border-[#ddd] text-xs px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* BARIS 4 - KANAN: Latest Members                         */}
        {/* ======================================================= */}
        {!closed["latest-members"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-[#333]">Latest Members</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <button
                  type="button"
                  onClick={() => toggleCollapse("latest-members")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Collapse"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => closeCard("latest-members")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!collapsed["latest-members"] && (
              <div className="p-5 min-h-[160px] flex items-center overflow-x-auto">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 w-full">
                  {latestMembers.map((mem, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center text-center group cursor-pointer"
                    >
                      {/* Avatar silhouette bulat abu-abu persis foto */}
                      <div className="w-14 h-14 rounded-full bg-[#d2d6de] flex items-center justify-center text-white shadow-xs group-hover:bg-[#c2c6ce] transition-colors">
                        <User className="w-8 h-8 fill-white/90 text-white/90 stroke-1" />
                      </div>
                      <span className="text-xs font-medium text-[#333] mt-2 truncate w-full max-w-[85px] block">
                        {mem.name}
                      </span>
                      <span className="text-[11px] text-[#999] mt-0.5 block">
                        {mem.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-[#f4f4f4] flex justify-end bg-white rounded-b-[3px]">
              <Link
                href="/admin/admin-panel/membership/users"
                className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] hover:text-[#222] border border-[#ddd] text-xs px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
