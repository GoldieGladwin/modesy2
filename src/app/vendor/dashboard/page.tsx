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
  Eye,
  CheckCircle,
  Clock,
} from "lucide-react";

interface SaleItem {
  sale: string;
  orderId: string;
  status: "Processing" | "Completed";
  payment: "Pending Payment" | "Payment Received";
  date: string;
  product: string;
  quantity: number;
  price: string;
  shipping: string;
  total: string;
  buyer: string;
  address: string;
}

export default function VendorDashboardPage() {
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
  const [closed, setClosed] = useState<{ [key: string]: boolean }>({});
  const [hoveredMonth, setHoveredMonth] = useState<{
    month: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);
  const [selectedSale, setSelectedSale] = useState<SaleItem | null>(null);

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const closeCard = (id: string) => {
    setClosed((prev) => ({ ...prev, [id]: true }));
  };

  // Data Latest Comments (Exact match from Screenshot 1 & 2)
  const latestComments = [
    {
      id: 1,
      comment: "good",
      product: "Women lace blouse with different colors",
      productUrl: "/product/women-lace-blouse",
      date: "2026-09-13 / 14:16",
    },
  ];

  // Data Latest Reviews (Exact match from Screenshot)
  const latestReviews = [
    {
      id: 8,
      stars: 5,
      comment: "dfg",
      product: "Animal colorful digital prints",
      productUrl: "/product/animal-colorful-digital-prints",
      date: "2026-10-05 / 11:43",
    },
    {
      id: 4,
      stars: 4,
      comment: "test 1",
      product: "Animal colorful digital prints",
      productUrl: "/product/animal-colorful-digital-prints",
      date: "2026-08-03 / 22:40",
    },
    {
      id: 7,
      stars: 5,
      comment:
        "The summer fashion lace top is absolutely beautiful! The lace detailing gives it a very elegant and feminine look, while the fabric is light and breathable perfect for warm weather. It fits nicely and pairs well with both jeans and skirts. Stylish, comfortable, and versatile highly recommend!",
      product: "Summer fashion top lace",
      productUrl: "/product/summer-fashion-top-lace",
      date: "2026-08-05 / 14:04",
    },
  ];

  // Data Latest Sales (Exact match from Screenshot 2)
  const latestSales: SaleItem[] = [
    {
      sale: "#10044",
      orderId: "10044",
      status: "Processing",
      payment: "Pending Payment",
      date: "2026-10-14 / 20:42",
      product: "Animation of popular vacation spots",
      quantity: 1,
      price: "$10.00",
      shipping: "$0.00",
      total: "$82.50",
      buyer: "Peter Jane",
      address: "Test Address, Centre, France",
    },
    {
      sale: "#10041",
      orderId: "10041",
      status: "Processing",
      payment: "Pending Payment",
      date: "2025-10-05 / 15:38",
      product: "Animal colorful digital prints",
      quantity: 1,
      price: "$28.00",
      shipping: "$4.00",
      total: "$32.00",
      buyer: "Johnathan Davis",
      address: "742 Evergreen Terrace, Springfield, OR",
    },
    {
      sale: "#10040",
      orderId: "10040",
      status: "Processing",
      payment: "Pending Payment",
      date: "2025-09-29 / 12:00",
      product: "Black midi skirt with white flowers",
      quantity: 2,
      price: "$45.00",
      shipping: "$5.00",
      total: "$95.00",
      buyer: "Emma Watson",
      address: "12 King Street, London, UK",
    },
    {
      sale: "#10038",
      orderId: "10038",
      status: "Processing",
      payment: "Pending Payment",
      date: "2025-09-28 / 22:48",
      product: "Sun hat for women protection cap",
      quantity: 1,
      price: "$22.00",
      shipping: "$3.50",
      total: "$25.50",
      buyer: "Michael Chang",
      address: "88 Market St, San Francisco, CA",
    },
    {
      sale: "#10035",
      orderId: "10035",
      status: "Processing",
      payment: "Pending Payment",
      date: "2025-09-26 / 21:14",
      product: "Minimalist Gold Ring",
      quantity: 1,
      price: "$149.00",
      shipping: "$0.00",
      total: "$149.00",
      buyer: "Sophia Rodriguez",
      address: "450 Ocean Drive, Miami, FL",
    },
    {
      sale: "#10034",
      orderId: "10034",
      status: "Processing",
      payment: "Pending Payment",
      date: "2025-09-25 / 06:11",
      product: "Women lace blouse with different colors",
      quantity: 1,
      price: "$38.00",
      shipping: "$4.00",
      total: "$42.00",
      buyer: "Chloe Bennett",
      address: "104 Maple Ave, Toronto, ON",
    },
    {
      sale: "#10033",
      orderId: "10033",
      status: "Completed",
      payment: "Payment Received",
      date: "2025-09-23 / 17:23",
      product: "Summer fashion top lace",
      quantity: 3,
      price: "$29.00",
      shipping: "$6.00",
      total: "$93.00",
      buyer: "Lucas Miller",
      address: "33 Friedrichstrasse, Berlin, Germany",
    },
  ];

  // Monthly sales (Jan - Dec 2026) matching Screenshot 1:
  // Jan-Aug = $0, Sep = peak ~$51,000, Oct-Dec = $0
  const monthsData = [
    { month: "Jan", value: 0 },
    { month: "Feb", value: 0 },
    { month: "Mar", value: 0 },
    { month: "Apr", value: 0 },
    { month: "May", value: 0 },
    { month: "Jun", value: 0 },
    { month: "Jul", value: 0 },
    { month: "Aug", value: 0 },
    { month: "Sep", value: 51200 }, // Peak in September
    { month: "Oct", value: 0 },
    { month: "Nov", value: 0 },
    { month: "Dec", value: 0 },
  ];

  // Chart coordinate calculations
  // Width 560, Height 180, Top Offset 20, Left Offset 55
  const chartWidth = 560;
  const chartHeight = 180;
  const chartXOffset = 55;
  const chartYOffset = 20;
  const maxChartValue = 60000;

  const points = monthsData.map((d, i) => {
    const x = chartXOffset + (i / (monthsData.length - 1)) * chartWidth;
    const y =
      chartYOffset + chartHeight - (d.value / maxChartValue) * chartHeight;
    return { x, y, ...d };
  });

  // Smooth cubic Bezier path for the area chart
  const curvePath =
    `M ${points[0].x} ${points[0].y} ` +
    points
      .slice(1)
      .map((p, i) => {
        const prev = points[i];
        const cx1 = prev.x + (p.x - prev.x) / 2;
        const cy1 = prev.y;
        const cx2 = prev.x + (p.x - prev.x) / 2;
        const cy2 = p.y;
        return `C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
      })
      .join(" ");

  const areaPath = `${curvePath} L ${points[points.length - 1].x} ${
    chartYOffset + chartHeight
  } L ${points[0].x} ${chartYOffset + chartHeight} Z`;

  // Donut chart calculations:
  // Active Sales: 17, Completed Sales: 11 => Total = 28
  const activeCount = 17;
  const completedCount = 11;
  const totalCount = activeCount + completedCount; // 28
  const radius = 80;
  const circumference = 2 * Math.PI * radius; // ~502.65
  const activeDash = (activeCount / totalCount) * circumference; // ~305.18
  const completedDash = (completedCount / totalCount) * circumference; // ~197.47

  return (
    <div className="space-y-6 font-sans text-[#222]">
      {/* ========================================================= */}
      {/* 1. TOP STAT CARDS (Satu Kontainer Putih 4 Kolom)           */}
      {/* ========================================================= */}
      <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#ebebeb]">
        {/* Card 1: Number of total sales (28) */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-[#222]">28</div>
            <div className="text-xs text-[#8c94a0] mt-1 font-normal">
              Number of total sales
            </div>
          </div>
          <div className="text-[#9aa5b5]">
            <ShoppingCart className="w-9 h-9 stroke-[1.2]" />
          </div>
        </div>

        {/* Card 2: Balance ($793.52) */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-[#222]">$793.52</div>
            <div className="text-xs text-[#8c94a0] mt-1 font-normal">Balance</div>
          </div>
          <div className="text-[#9aa5b5]">
            <Banknote className="w-9 h-9 stroke-[1.2]" />
          </div>
        </div>

        {/* Card 3: Products (24) */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-[#222]">24</div>
            <div className="text-xs text-[#8c94a0] mt-1 font-normal">Products</div>
          </div>
          <div className="text-[#9aa5b5]">
            <ShoppingBasket className="w-9 h-9 stroke-[1.2]" />
          </div>
        </div>

        {/* Card 4: Pending Products (0) */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-[#222]">0</div>
            <div className="text-xs text-[#8c94a0] mt-1 font-normal">
              Pending Products
            </div>
          </div>
          <div className="text-[#9aa5b5]">
            <Hourglass className="w-9 h-9 stroke-[1.2]" />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. ROW 1: CHARTS (Sales Donut & Monthly sales Area Chart) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sales Widget (Donut Chart) */}
        {!closed["sales"] && (
          <div className="lg:col-span-5 bg-white border border-[#ebebeb] rounded-[3px] shadow-xs">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f4f4f4]">
              <h2 className="text-sm font-semibold text-gray-800">Sales</h2>
              <div className="flex items-center gap-2 text-gray-400">
                <button
                  type="button"
                  onClick={() => toggleCollapse("sales")}
                  className="hover:text-gray-700 p-0.5 cursor-pointer"
                  title="Collapse"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => closeCard("sales")}
                  className="hover:text-gray-700 p-0.5 cursor-pointer"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {!collapsed["sales"] && (
              <div className="p-5 flex flex-col items-center">
                {/* Legend */}
                <div className="flex items-center justify-center gap-6 text-xs text-gray-600 mb-6 w-full">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-2.5 bg-[#20c997] inline-block rounded-xs" />
                    <span>Active Sales (17)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-2.5 bg-[#5b8def] inline-block rounded-xs" />
                    <span>Completed Sales (11)</span>
                  </div>
                </div>

                {/* Donut Chart SVG */}
                <div className="relative w-56 h-56 flex items-center justify-center my-2">
                  <svg
                    viewBox="0 0 220 220"
                    className="w-full h-full -rotate-90 transform"
                  >
                    {/* Active Sales Arc (Teal) */}
                    <circle
                      cx="110"
                      cy="110"
                      r={radius}
                      fill="transparent"
                      stroke="#20c997"
                      strokeWidth="38"
                      strokeDasharray={`${activeDash} ${circumference}`}
                      strokeDashoffset="0"
                      className="transition-all duration-500 hover:opacity-90 cursor-pointer"
                    />

                    {/* Completed Sales Arc (Blue) */}
                    <circle
                      cx="110"
                      cy="110"
                      r={radius}
                      fill="transparent"
                      stroke="#5b8def"
                      strokeWidth="38"
                      strokeDasharray={`${completedDash} ${circumference}`}
                      strokeDashoffset={-activeDash}
                      className="transition-all duration-500 hover:opacity-90 cursor-pointer"
                    />
                  </svg>

                  {/* Donut Inner Hole Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-gray-800">28</span>
                    <span className="text-[11px] text-gray-400">Total Sales</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Monthly Sales Area Chart */}
        {!closed["monthly_sales"] && (
          <div
            className={`${
              closed["sales"] ? "lg:col-span-12" : "lg:col-span-7"
            } bg-white border border-[#ebebeb] rounded-[3px] shadow-xs`}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f4f4f4]">
              <h2 className="text-sm font-semibold text-gray-800">
                Monthly sales
              </h2>
              <div className="flex items-center gap-2 text-gray-400">
                <button
                  type="button"
                  onClick={() => toggleCollapse("monthly_sales")}
                  className="hover:text-gray-700 p-0.5 cursor-pointer"
                  title="Collapse"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => closeCard("monthly_sales")}
                  className="hover:text-gray-700 p-0.5 cursor-pointer"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {!collapsed["monthly_sales"] && (
              <div className="p-5">
                {/* Legend */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mb-4">
                  <span className="w-5 h-2.5 border border-[#20c997] bg-white inline-block rounded-xs" />
                  <span>Sales (2026)</span>
                </div>

                {/* Area Chart Container */}
                <div className="relative w-full overflow-x-auto">
                  <div className="min-w-[560px]">
                    <svg
                      viewBox="0 0 635 235"
                      className="w-full h-auto overflow-visible select-none"
                    >
                      <defs>
                        <linearGradient
                          id="vendorMonthlySalesGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#20c997"
                            stopOpacity="0.28"
                          />
                          <stop
                            offset="100%"
                            stopColor="#20c997"
                            stopOpacity="0.02"
                          />
                        </linearGradient>
                      </defs>

                      {/* Y-axis Horizontal Grid Lines & Labels */}
                      {[60000, 50000, 40000, 30000, 20000, 10000, 0].map(
                        (val) => {
                          const yPos =
                            chartYOffset +
                            chartHeight -
                            (val / maxChartValue) * chartHeight;
                          return (
                            <g key={val}>
                              <text
                                x="46"
                                y={yPos + 4}
                                textAnchor="end"
                                className="text-[10px] fill-gray-500 font-sans"
                              >
                                ${val}
                              </text>
                              <line
                                x1={chartXOffset}
                                y1={yPos}
                                x2={chartXOffset + chartWidth}
                                y2={yPos}
                                stroke="#f0f0f0"
                                strokeWidth="1"
                              />
                            </g>
                          );
                        }
                      )}

                      {/* Area Fill */}
                      <path d={areaPath} fill="url(#vendorMonthlySalesGrad)" />

                      {/* Curve Line */}
                      <path
                        d={curvePath}
                        fill="none"
                        stroke="#20c997"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Data Points and X-axis Labels */}
                      {points.map((p) => {
                        const isHovered = hoveredMonth?.month === p.month;
                        return (
                          <g
                            key={p.month}
                            onMouseEnter={() =>
                              setHoveredMonth({
                                month: p.month,
                                value: p.value,
                                x: p.x,
                                y: p.y,
                              })
                            }
                            onMouseLeave={() => setHoveredMonth(null)}
                            className="cursor-pointer"
                          >
                            {/* X-axis Label */}
                            <text
                              x={p.x}
                              y={chartYOffset + chartHeight + 20}
                              textAnchor="middle"
                              className={`text-[11px] font-sans transition-colors ${
                                isHovered
                                  ? "fill-[#20c997] font-bold"
                                  : "fill-gray-500"
                              }`}
                            >
                              {p.month}
                            </text>

                            {/* Transparent Hit Area */}
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="12"
                              fill="transparent"
                            />

                            {/* Point Dot */}
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r={isHovered ? "5" : p.value > 0 ? "3.5" : "2"}
                              fill={p.value > 0 || isHovered ? "#20c997" : "#cbd5e1"}
                              stroke="#ffffff"
                              strokeWidth={isHovered ? "2" : "1"}
                            />
                          </g>
                        );
                      })}
                    </svg>

                    {/* Tooltip Popup on Hover */}
                    {hoveredMonth && (
                      <div
                        className="absolute bg-gray-900 text-white text-[11px] px-2.5 py-1 rounded shadow-md pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 z-20"
                        style={{
                          left: `${(hoveredMonth.x / 635) * 100}%`,
                          top: `${(hoveredMonth.y / 235) * 100}%`,
                        }}
                      >
                        <div className="font-semibold">{hoveredMonth.month} 2026</div>
                        <div className="text-[#20c997]">
                          ${hoveredMonth.value.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 3. ROW 2: LATEST COMMENTS & LATEST REVIEWS                */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Latest Comments */}
        {!closed["latest_comments"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f4f4f4]">
                <h2 className="text-sm font-semibold text-gray-800">
                  Latest Comments
                </h2>
                <div className="flex items-center gap-2 text-gray-400">
                  <button
                    type="button"
                    onClick={() => toggleCollapse("latest_comments")}
                    className="hover:text-gray-700 p-0.5 cursor-pointer"
                    title="Collapse"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => closeCard("latest_comments")}
                    className="hover:text-gray-700 p-0.5 cursor-pointer"
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {!collapsed["latest_comments"] && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#f0f0f0] text-gray-700 font-semibold">
                        <th className="py-3 px-5 w-12">Id</th>
                        <th className="py-3 px-4">Comment</th>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-4 whitespace-nowrap">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f7f7f7] text-gray-600">
                      {latestComments.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/60">
                          <td className="py-3 px-5 text-gray-700 font-normal">
                            {item.id}
                          </td>
                          <td className="py-3 px-4 font-normal text-gray-800">
                            {item.comment}
                          </td>
                          <td className="py-3 px-4">
                            <Link
                              href={item.productUrl}
                              className="text-gray-700 hover:text-[#00a99d] transition-colors"
                            >
                              {item.product}
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                            {item.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {!collapsed["latest_comments"] && (
              <div className="p-4 flex justify-end border-t border-[#f4f4f4]">
                <Link
                  href="/dashboard/comments"
                  className="px-3 py-1 bg-[#ecf0f5] hover:bg-[#e2e6ea] text-gray-700 border border-gray-300 rounded text-xs transition"
                >
                  View All
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Latest Reviews */}
        {!closed["latest_reviews"] && (
          <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f4f4f4]">
                <h2 className="text-sm font-semibold text-gray-800">
                  Latest Reviews
                </h2>
                <div className="flex items-center gap-2 text-gray-400">
                  <button
                    type="button"
                    onClick={() => toggleCollapse("latest_reviews")}
                    className="hover:text-gray-700 p-0.5 cursor-pointer"
                    title="Collapse"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => closeCard("latest_reviews")}
                    className="hover:text-gray-700 p-0.5 cursor-pointer"
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {!collapsed["latest_reviews"] && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#f0f0f0] text-gray-700 font-semibold">
                        <th className="py-3 px-5 w-12">Id</th>
                        <th className="py-3 px-4">Comment</th>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-4 whitespace-nowrap">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f7f7f7] text-gray-600">
                      {latestReviews.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/60">
                          <td className="py-3.5 px-5 text-gray-700 font-normal align-top">
                            {item.id}
                          </td>
                          <td className="py-3.5 px-4 align-top max-w-[280px]">
                            <div className="flex items-center gap-0.5 mb-1 text-[#ffc107]">
                              {[...Array(item.stars)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-3.5 h-3.5 fill-[#ffc107] text-[#ffc107]"
                                />
                              ))}
                            </div>
                            <p className="text-gray-700 text-xs leading-relaxed">
                              {item.comment}
                            </p>
                          </td>
                          <td className="py-3.5 px-4 align-top">
                            <Link
                              href={item.productUrl}
                              className="text-gray-700 hover:text-[#00a99d] transition-colors"
                            >
                              {item.product}
                            </Link>
                          </td>
                          <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap align-top">
                            {item.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {!collapsed["latest_reviews"] && (
              <div className="p-4 flex justify-end border-t border-[#f4f4f4]">
                <Link
                  href="/dashboard/reviews"
                  className="px-3 py-1 bg-[#ecf0f5] hover:bg-[#e2e6ea] text-gray-700 border border-gray-300 rounded text-xs transition"
                >
                  View All
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 4. ROW 3: LATEST SALES (Table Full Width)                 */}
      {/* ========================================================= */}
      {!closed["latest_sales"] && (
        <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f4f4f4]">
            <h2 className="text-sm font-semibold text-gray-800">
              Latest Sales
            </h2>
            <div className="flex items-center gap-2 text-gray-400">
              <button
                type="button"
                onClick={() => toggleCollapse("latest_sales")}
                className="hover:text-gray-700 p-0.5 cursor-pointer"
                title="Collapse"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => closeCard("latest_sales")}
                className="hover:text-gray-700 p-0.5 cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!collapsed["latest_sales"] && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#f0f0f0] text-gray-700 font-semibold">
                      <th className="py-3 px-5">Sale</th>
                      <th className="py-3 px-5">Status</th>
                      <th className="py-3 px-5">Payment</th>
                      <th className="py-3 px-5 whitespace-nowrap">Date</th>
                      <th className="py-3 px-5 text-right sm:text-left">Options</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f7f7f7] text-gray-600">
                    {latestSales.map((item) => (
                      <tr
                        key={item.sale}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="py-3 px-5 text-gray-700 font-normal">
                          {item.sale}
                        </td>
                        <td className="py-3 px-5 text-gray-600 font-normal">
                          {item.status}
                        </td>
                        <td className="py-3 px-5 text-gray-600 font-normal">
                          {item.payment}
                        </td>
                        <td className="py-3 px-5 text-gray-500 whitespace-nowrap">
                          {item.date}
                        </td>
                        <td className="py-3 px-5 text-right sm:text-left">
                          <Link
                            href={`/dashboard/sale/${item.orderId}`}
                            className="inline-block px-3.5 py-1 bg-[#17a2b8] hover:bg-[#138496] text-white rounded-[3px] text-xs font-semibold transition cursor-pointer shadow-xs"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 flex justify-end border-t border-[#f4f4f4]">
                <Link
                  href="/dashboard/sales"
                  className="px-3 py-1 bg-[#ecf0f5] hover:bg-[#e2e6ea] text-gray-700 border border-gray-300 rounded text-xs transition"
                >
                  View All
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. SALE DETAILS MODAL (When clicking "Details")           */}
      {/* ========================================================= */}
      {selectedSale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[4px] shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#fbfbfb]">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Sale Details: {selectedSale.sale}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Ordered on {selectedSale.date}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSale(null)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              {/* Status Badges */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded border border-gray-200">
                <div>
                  <span className="text-gray-500 block mb-1">Order Status</span>
                  <span
                    className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded text-[11px] ${
                      selectedSale.status === "Completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {selectedSale.status === "Completed" ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    {selectedSale.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Payment Status</span>
                  <span
                    className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded text-[11px] ${
                      selectedSale.payment === "Payment Received"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {selectedSale.payment}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="border border-gray-200 rounded p-4 space-y-2">
                <div className="font-semibold text-gray-800 text-[13px]">
                  Purchased Item
                </div>
                <div className="flex justify-between items-start pt-1">
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedSale.product}
                    </p>
                    <p className="text-gray-500 text-[11px] mt-0.5">
                      Quantity: {selectedSale.quantity} × {selectedSale.price}
                    </p>
                  </div>
                  <span className="font-bold text-gray-900">
                    {selectedSale.price}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500 pt-1 border-t border-gray-100">
                  <span>Shipping Fee</span>
                  <span>{selectedSale.shipping}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-sm pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-[#00a99d]">{selectedSale.total}</span>
                </div>
              </div>

              {/* Customer & Shipping */}
              <div className="bg-gray-50 rounded p-4 border border-gray-200 space-y-1.5">
                <div className="font-semibold text-gray-800">
                  Shipping & Buyer Information
                </div>
                <p className="text-gray-700">
                  <span className="text-gray-500">Buyer: </span>
                  <span className="font-medium">{selectedSale.buyer}</span>
                </p>
                <p className="text-gray-700">
                  <span className="text-gray-500">Address: </span>
                  {selectedSale.address}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2.5 px-6 py-3.5 border-t border-gray-200 bg-gray-50">
              <Link
                href={`/order_details/${selectedSale.orderId}`}
                className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white rounded text-xs font-bold transition inline-flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Full Order</span>
              </Link>
              <button
                type="button"
                onClick={() => setSelectedSale(null)}
                className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded text-xs font-semibold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
