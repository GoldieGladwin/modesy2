"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Banknote,
  ShoppingBasket,
  Hourglass,
  Minus,
  X,
  Star,
} from "lucide-react";

export default function AdminStoreDashboardPage() {
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
  const [closed, setClosed] = useState<{ [key: string]: boolean }>({});
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const closeCard = (id: string) => {
    setClosed((prev) => ({ ...prev, [id]: true }));
  };

  // Data Latest Reviews (persis Screenshot 2)
  const latestReviews = [
    {
      id: 6,
      stars: 5,
      comment:
        "The material feels durable, and the design is sleek enough to match both casual and formal outfits. It has plenty of space inside without being to",
      product: "Black bag over the shoulder",
      date: "2026-08-05 / 13:55",
    },
  ];

  // Data Latest Sales (persis Screenshot 3)
  const latestSales = [
    { sale: "#10040", status: "Processing", payment: "Pending Payment", date: "2026-09-29 / 12:00" },
    { sale: "#10039", status: "Processing", payment: "Pending Payment", date: "2026-09-29 / 00:34" },
    { sale: "#10038", status: "Processing", payment: "Pending Payment", date: "2026-09-28 / 22:48" },
    { sale: "#10037", status: "Processing", payment: "Pending Payment", date: "2026-09-28 / 15:39" },
    { sale: "#10036", status: "Processing", payment: "Pending Payment", date: "2026-09-28 / 06:49" },
  ];

  // Data Monthly sales (Jan - Dec 2026)
  const monthsData = [
    { month: "Jan", value: 0 },
    { month: "Feb", value: 0 },
    { month: "Mar", value: 0 },
    { month: "Apr", value: 0 },
    { month: "May", value: 0 },
    { month: "Jun", value: 0 },
    { month: "Jul", value: 0 },
    { month: "Aug", value: 0 },
    { month: "Sep", value: 91500 }, // Peak in September
    { month: "Oct", value: 0 },
    { month: "Nov", value: 0 },
    { month: "Dec", value: 0 },
  ];

  // Chart coordinates calculation for 620 x 260 area
  const chartWidth = 560;
  const chartHeight = 220;
  const chartXOffset = 60;
  const chartYOffset = 20;

  const getCoordinates = () => {
    return monthsData.map((d, i) => {
      const x = chartXOffset + (i / (monthsData.length - 1)) * chartWidth;
      const y = chartYOffset + chartHeight - (d.value / 100000) * chartHeight;
      return { x, y, ...d };
    });
  };

  const points = getCoordinates();

  // Generate smooth SVG curve path
  const curvePath = `M ${points[0].x} ${points[0].y} ` +
    points.slice(1).map((p, i) => {
      const prev = points[i];
      const cx1 = prev.x + (p.x - prev.x) / 2;
      const cy1 = prev.y;
      const cx2 = prev.x + (p.x - prev.x) / 2;
      const cy2 = p.y;
      return `C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
    }).join(" ");

  const areaPath = `${curvePath} L ${points[points.length - 1].x} ${chartYOffset + chartHeight} L ${points[0].x} ${chartYOffset + chartHeight} Z`;

  return (
    <div className="space-y-6 font-sans text-gray-800">
      {/* ========================================================= */}
      {/* 1. TOP STAT CARDS (Satu Kontainer Putih 4 Kolom)           */}
      {/* ========================================================= */}
      <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#ebebeb]">
        {/* Box 1: Number of total sales (29) */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-[#222]">29</div>
            <div className="text-xs text-[#888] mt-1 font-normal">
              Number of total sales
            </div>
          </div>
          <div className="text-[#9aa5b5]">
            <ShoppingCart className="w-9 h-9 stroke-[1.4]" />
          </div>
        </div>

        {/* Box 2: Balance ($1,130.85) */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-[#222]">$1,130.85</div>
            <div className="text-xs text-[#888] mt-1 font-normal">Balance</div>
          </div>
          <div className="text-[#9aa5b5]">
            <Banknote className="w-9 h-9 stroke-[1.4]" />
          </div>
        </div>

        {/* Box 3: Products (23) */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-[#222]">23</div>
            <div className="text-xs text-[#888] mt-1 font-normal">Products</div>
          </div>
          <div className="text-[#9aa5b5]">
            <ShoppingBasket className="w-9 h-9 stroke-[1.4]" />
          </div>
        </div>

        {/* Box 4: Pending Products (0) */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-[#222]">0</div>
            <div className="text-xs text-[#888] mt-1 font-normal">
              Pending Products
            </div>
          </div>
          <div className="text-[#9aa5b5]">
            <Hourglass className="w-9 h-9 stroke-[1.4]" />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DUA GRAFIK (Sales Donut & Monthly sales Line Chart)     */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* CHART 1: Sales (Donut Chart) */}
        {!closed["sales-chart"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-[#333]">Sales</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <button
                  type="button"
                  onClick={() => toggleCollapse("sales-chart")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Collapse"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => closeCard("sales-chart")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!collapsed["sales-chart"] && (
              <div className="p-6 flex flex-col items-center justify-center min-h-[350px]">
                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-2.5 bg-[#00a99d] rounded-[2px] inline-block" />
                    <span className="text-xs text-[#555]">Active Sales (23)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-2.5 bg-[#5b8bf5] rounded-[2px] inline-block" />
                    <span className="text-xs text-[#555]">Completed Sales (6)</span>
                  </div>
                </div>

                {/* SVG Donut Chart */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    {/* Background circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="transparent"
                      stroke="#f4f5f7"
                      strokeWidth="32"
                    />
                    {/* Active Sales Segment (23 / 29 = 79.31%) */}
                    {/* Circumference = 2 * PI * 70 = 439.82 */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="transparent"
                      stroke="#00a99d"
                      strokeWidth="32"
                      strokeDasharray="346.5 439.82"
                      strokeDashoffset="0"
                    />
                    {/* Completed Sales Segment (6 / 29 = 20.69%) */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="transparent"
                      stroke="#5b8bf5"
                      strokeWidth="32"
                      strokeDasharray="89.5 439.82"
                      strokeDashoffset="-349.5"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CHART 2: Monthly sales (Area Line Chart) */}
        {!closed["monthly-sales-chart"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-[#333]">Monthly sales</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <button
                  type="button"
                  onClick={() => toggleCollapse("monthly-sales-chart")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Collapse"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => closeCard("monthly-sales-chart")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!collapsed["monthly-sales-chart"] && (
              <div className="p-6 flex flex-col min-h-[350px]">
                {/* Legend */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="w-7 h-3 border border-[#00a99d] bg-[#00a99d]/20 rounded-[2px] inline-block" />
                  <span className="text-xs text-[#555]">Sales (2026)</span>
                </div>

                {/* SVG Area Line Chart */}
                <div className="w-full overflow-x-auto">
                  <svg viewBox="0 0 650 280" className="w-full h-auto min-w-[500px]">
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00a99d" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#00a99d" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Y-Axis Grid Lines & Labels */}
                    {[100000, 90000, 80000, 70000, 60000, 50000, 40000, 30000, 20000, 10000, 0].map(
                      (val, idx) => {
                        const y = chartYOffset + (idx / 10) * chartHeight;
                        return (
                          <g key={val}>
                            <text
                              x="50"
                              y={y + 3}
                              textAnchor="end"
                              className="text-[10px] fill-[#888] font-mono"
                            >
                              ${val}
                            </text>
                            <line
                              x1={chartXOffset}
                              y1={y}
                              x2={chartXOffset + chartWidth}
                              y2={y}
                              stroke="#eeeeee"
                              strokeWidth="1"
                            />
                          </g>
                        );
                      }
                    )}

                    {/* X-Axis Vertical Grid Lines */}
                    {points.map((p, idx) => (
                      <line
                        key={idx}
                        x1={p.x}
                        y1={chartYOffset}
                        x2={p.x}
                        y2={chartYOffset + chartHeight}
                        stroke="#f8f8f8"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Filled Area */}
                    <path d={areaPath} fill="url(#salesGrad)" />

                    {/* Line Stroke */}
                    <path
                      d={curvePath}
                      fill="none"
                      stroke="#00a99d"
                      strokeWidth="2.5"
                    />

                    {/* Data Points */}
                    {points.map((p, idx) => (
                      <g key={idx}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="4"
                          fill="#ffffff"
                          stroke="#00a99d"
                          strokeWidth="2"
                          className="cursor-pointer hover:r-5 transition-all"
                          onMouseEnter={() => setHoveredMonth(p.month)}
                          onMouseLeave={() => setHoveredMonth(null)}
                        />
                        {/* Month Label */}
                        <text
                          x={p.x}
                          y={chartYOffset + chartHeight + 18}
                          textAnchor="middle"
                          className="text-[11px] fill-[#666]"
                        >
                          {p.month}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 3. ROW 2: Latest Comments (Kiri) & Latest Reviews (Kanan)  */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LATEST COMMENTS (Kiri - Kosong Sesuai Screenshot 2) */}
        {!closed["latest-comments"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#f4f4f4] flex items-center justify-between">
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
              <div className="overflow-x-auto min-h-[200px]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#f4f4f4] text-[#555] font-semibold">
                      <th className="py-3 px-5 font-semibold w-12">Id</th>
                      <th className="py-3 px-4 font-semibold">Comment</th>
                      <th className="py-3 px-4 font-semibold">Product</th>
                      <th className="py-3 px-5 font-semibold text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody>{/* Kosong persis sesuai screenshot 2 */}</tbody>
                </table>
              </div>
            )}

            {/* Footer */}
            <div className="px-5 py-3 border-t border-[#f4f4f4] flex justify-end bg-white rounded-b-[3px]">
              <Link
                href="/admin/comments"
                className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] hover:text-[#222] border border-[#ddd] text-xs px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}

        {/* LATEST REVIEWS (Kanan - Sesuai Screenshot 2) */}
        {!closed["latest-reviews"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#f4f4f4] flex items-center justify-between">
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
              <div className="overflow-x-auto min-h-[200px]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#f4f4f4] text-[#555] font-semibold">
                      <th className="py-3 px-5 font-semibold w-12">Id</th>
                      <th className="py-3 px-4 font-semibold">Comment</th>
                      <th className="py-3 px-4 font-semibold">Product</th>
                      <th className="py-3 px-5 font-semibold text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f4f4]">
                    {latestReviews.map((rev, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3.5 px-5 text-[#555] align-top">{rev.id}</td>
                        <td className="py-3.5 px-4 align-top max-w-[260px]">
                          {/* 5 Stars */}
                          <div className="flex items-center space-x-0.5 mb-1.5">
                            {[...Array(rev.stars)].map((_, sIdx) => (
                              <Star
                                key={sIdx}
                                className="w-3.5 h-3.5 fill-[#f39c12] text-[#f39c12]"
                              />
                            ))}
                          </div>
                          <p className="text-xs text-[#333] leading-relaxed">
                            {rev.comment}
                          </p>
                        </td>
                        <td className="py-3.5 px-4 text-[#333] align-top">
                          {rev.product}
                        </td>
                        <td className="py-3.5 px-5 text-[#777] align-top text-right whitespace-nowrap">
                          {rev.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer */}
            <div className="px-5 py-3 border-t border-[#f4f4f4] flex justify-end bg-white rounded-b-[3px]">
              <Link
                href="/admin/reviews"
                className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] hover:text-[#222] border border-[#ddd] text-xs px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 4. ROW 3: Latest Sales (Kiri - Sesuai Screenshot 3)        */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {!closed["latest-sales"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-[#333]">Latest Sales</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <button
                  type="button"
                  onClick={() => toggleCollapse("latest-sales")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Collapse"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => closeCard("latest-sales")}
                  className="hover:text-gray-600 cursor-pointer p-0.5"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!collapsed["latest-sales"] && (
              <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#f4f4f4] text-[#555] font-semibold">
                      <th className="py-2.5 px-5 font-semibold">Sale</th>
                      <th className="py-2.5 px-3 font-semibold">Status</th>
                      <th className="py-2.5 px-3 font-semibold">Payment</th>
                      <th className="py-2.5 px-4 font-semibold">Date</th>
                      <th className="py-2.5 px-5 font-semibold text-right">Options</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f4f4]">
                    {latestSales.map((sale, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3 px-5 text-[#333] font-normal">{sale.sale}</td>
                        <td className="py-3 px-3 text-[#555]">{sale.status}</td>
                        <td className="py-3 px-3 text-[#555]">{sale.payment}</td>
                        <td className="py-3 px-4 text-[#777]">{sale.date}</td>
                        <td className="py-3 px-5 text-right">
                          <Link
                            href="/admin/orders"
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
            <div className="px-5 py-3 border-t border-[#f4f4f4] flex justify-end bg-white rounded-b-[3px]">
              <Link
                href="/admin/orders"
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
