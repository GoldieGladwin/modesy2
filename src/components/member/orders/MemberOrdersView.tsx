"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Tag,
  Download,
  Receipt,
  Clock,
  Info,
  Star,
  CloudDownload,
  Plus,
  X,
  CheckCircle2,
  FileText,
} from "lucide-react";

export type OrderSectionType = "orders" | "quote-requests" | "downloads" | "refund-requests";

interface OrderItem {
  id: string;
  orderNumber: string;
  total: number;
  currency: string;
  status: "Pending Payment" | "Completed" | "Processing" | "Shipped";
  date: string;
  products: {
    title: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  paymentMethod: string;
}

interface MemberOrdersViewProps {
  initialSection?: OrderSectionType;
}

export default function MemberOrdersView({ initialSection = "orders" }: MemberOrdersViewProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<OrderSectionType>(initialSection);

  // Orders matching Screenshot 1
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: "ord-1",
      orderNumber: "10044",
      total: 154,
      currency: "USD",
      status: "Pending Payment",
      date: "2026-10-14 / 20:42",
      paymentMethod: "Bank Transfer",
      products: [
        {
          title: "Winter Wool Coat & Accessories",
          image: "/images/products/grey-boots.webp",
          price: 154,
          quantity: 1,
        },
      ],
    },
    {
      id: "ord-2",
      orderNumber: "10026",
      total: 121.25,
      currency: "USD",
      status: "Pending Payment",
      date: "2026-09-17 / 18:28",
      paymentMethod: "Bank Transfer",
      products: [
        {
          title: "Elegant Floral Silk Summer Top",
          image: "/images/products/floral-sundress.webp",
          price: 121.25,
          quantity: 1,
        },
      ],
    },
    {
      id: "ord-3",
      orderNumber: "10024",
      total: 67.75,
      currency: "USD",
      status: "Pending Payment",
      date: "2026-09-14 / 16:27",
      paymentMethod: "Bank Transfer",
      products: [
        {
          title: "Classic Grey Leather Shoulder Bag",
          image: "/images/products/kipling-bag.webp",
          price: 67.75,
          quantity: 1,
        },
      ],
    },
    {
      id: "ord-4",
      orderNumber: "10023",
      total: 71.95,
      currency: "USD",
      status: "Pending Payment",
      date: "2026-09-14 / 16:20",
      paymentMethod: "Bank Transfer",
      products: [
        {
          title: "Bohemian Print Midi Skirt",
          image: "/images/products/midi-skirt.webp",
          price: 71.95,
          quantity: 1,
        },
      ],
    },
    {
      id: "ord-5",
      orderNumber: "10022",
      total: 244.6,
      currency: "USD",
      status: "Pending Payment",
      date: "2026-09-14 / 16:08",
      paymentMethod: "Bank Transfer",
      products: [
        {
          title: "Modern Minimalist Wooden Armchair",
          image: "/images/products/grey-couch.webp",
          price: 244.6,
          quantity: 1,
        },
      ],
    },
    {
      id: "ord-6",
      orderNumber: "10020",
      total: 271.3,
      currency: "USD",
      status: "Pending Payment",
      date: "2026-09-11 / 09:26",
      paymentMethod: "Bank Transfer",
      products: [
        {
          title: "Handmade Vintage Ceramic Plate Set",
          image: "/images/products/draft-breakfast-plate.jpg",
          price: 271.3,
          quantity: 1,
        },
      ],
    },
    {
      id: "ord-7",
      orderNumber: "10007",
      total: 32.86,
      currency: "USD",
      status: "Completed",
      date: "2026-08-05 / 13:50",
      paymentMethod: "PayPal",
      products: [
        {
          title: "Animal colorful digital prints",
          image: "/uploads/products/img_w480_68b47e4f83c917-29188591.webp",
          price: 32.86,
          quantity: 1,
        },
      ],
    },
  ]);

  // Refund requests matching Screenshot 4
  const [refundRequests, setRefundRequests] = useState([
    {
      id: "ref-1",
      orderNumber: "10007",
      productTitle: "Animal colorful digital prints",
      productImage: "/uploads/products/img_w480_68b47e4f83c917-29188591.webp",
      status: "Processing",
      date: "1 month ago",
      reason: "Defective digital archive files",
      amount: 32.86,
    },
  ]);

  // Selected order for Details modal
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  // Download menu state
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);

  // Submit Refund Modal state
  const [isSubmitRefundOpen, setIsSubmitRefundOpen] = useState(false);
  const [refundOrderNumber, setRefundOrderNumber] = useState("10007");
  const [refundReason, setRefundReason] = useState("Issue with downloaded files");
  const [refundDetails, setRefundDetails] = useState("");

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSectionClick = (section: OrderSectionType) => {
    setActiveSection(section);
    if (section === "orders") router.push("/member/orders");
    else if (section === "downloads") router.push("/member/downloads");
    else if (section === "quote-requests") router.push("/member/quote-requests");
    else if (section === "refund-requests") router.push("/member/refund-requests");
  };

  const getPageTitle = () => {
    switch (activeSection) {
      case "orders":
        return "Orders";
      case "quote-requests":
        return "Quote Requests";
      case "downloads":
        return "Downloads";
      case "refund-requests":
        return "Refund Requests";
    }
  };

  const handleSubmitRefund = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = {
      id: `ref-${Date.now()}`,
      orderNumber: refundOrderNumber,
      productTitle: "Animal colorful digital prints",
      productImage: "/uploads/products/img_w480_68b47e4f83c917-29188591.webp",
      status: "Processing",
      date: "Just Now",
      reason: refundReason,
      amount: 32.86,
    };
    setRefundRequests([newRef, ...refundRequests]);
    setIsSubmitRefundOpen(false);
    showToast("Refund request has been submitted successfully!");
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-8 font-sans">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-gray-500 mb-4 flex items-center gap-1.5 font-normal">
          <Link href="/member" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 capitalize">{getPageTitle()}</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-[24px] sm:text-[26px] font-bold text-[#222] tracking-tight mb-8">
          {getPageTitle()}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Sidebar matching Screenshots 1, 2, 3, 4 */}
          <div className="md:col-span-3 space-y-1">
            <button
              type="button"
              onClick={() => handleSectionClick("orders")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-[3px] text-[14px] transition cursor-pointer text-left border-0 ${
                activeSection === "orders"
                  ? "bg-[#f1f3f5] font-semibold text-gray-900"
                  : "bg-transparent text-gray-600 hover:text-gray-900 font-normal hover:bg-gray-100/60"
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-gray-500 shrink-0" />
              <span>Orders</span>
            </button>

            <button
              type="button"
              onClick={() => handleSectionClick("quote-requests")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-[3px] text-[14px] transition cursor-pointer text-left border-0 ${
                activeSection === "quote-requests"
                  ? "bg-[#f1f3f5] font-semibold text-gray-900"
                  : "bg-transparent text-gray-600 hover:text-gray-900 font-normal hover:bg-gray-100/60"
              }`}
            >
              <Tag className="w-4 h-4 text-gray-500 shrink-0" />
              <span>Quote Requests</span>
            </button>

            <button
              type="button"
              onClick={() => handleSectionClick("downloads")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-[3px] text-[14px] transition cursor-pointer text-left border-0 ${
                activeSection === "downloads"
                  ? "bg-[#f1f3f5] font-semibold text-gray-900"
                  : "bg-transparent text-gray-600 hover:text-gray-900 font-normal hover:bg-gray-100/60"
              }`}
            >
              <Download className="w-4 h-4 text-gray-500 shrink-0" />
              <span>Downloads</span>
            </button>

            <button
              type="button"
              onClick={() => handleSectionClick("refund-requests")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-[3px] text-[14px] transition cursor-pointer text-left border-0 ${
                activeSection === "refund-requests"
                  ? "bg-[#f1f3f5] font-semibold text-gray-900"
                  : "bg-transparent text-gray-600 hover:text-gray-900 font-normal hover:bg-gray-100/60"
              }`}
            >
              <Receipt className="w-4 h-4 text-gray-500 shrink-0" />
              <span>Refund Requests</span>
            </button>
          </div>

          {/* Right Content Area */}
          <div className="md:col-span-9">
            {/* 1. ORDERS SECTION (Screenshot 1) */}
            {activeSection === "orders" && (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-[#ebebeb] rounded-[3px] p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-[13px]"
                  >
                    {/* Order Number */}
                    <div className="sm:w-28 shrink-0">
                      <span className="text-gray-500">Order: </span>
                      <span className="font-bold text-gray-900">#{order.orderNumber}</span>
                    </div>

                    {/* Total Amount */}
                    <div className="sm:w-28 shrink-0">
                      <span className="text-gray-500">Total: </span>
                      <span className="font-bold text-gray-900">
                        ${order.total.toLocaleString("en-US", { minimumFractionDigits: order.total % 1 === 0 ? 0 : 2 })}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="sm:w-32 shrink-0">
                      <span
                        className={`inline-block px-2.5 py-1 text-[11px] rounded-[3px] font-normal ${
                          order.status === "Completed"
                            ? "bg-[#e8f8f5] text-[#27ae60]"
                            : "bg-[#f1f3f5] text-gray-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-gray-500 text-[12px] sm:w-44 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{order.date}</span>
                    </div>

                    {/* Details Button */}
                    <div className="shrink-0 sm:text-right">
                      <Link
                        href={`/member/orders/${order.orderNumber}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f1f3f5] hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-[3px] border border-gray-300 transition cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-gray-500" />
                        <span>Details</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. QUOTE REQUESTS SECTION (Screenshot 3) */}
            {activeSection === "quote-requests" && (
              <div className="py-20 text-center text-gray-400 text-sm font-normal">
                No records found!
              </div>
            )}

            {/* 3. DOWNLOADS SECTION (Screenshot 2) */}
            {activeSection === "downloads" && (
              <div className="bg-white border border-[#ebebeb] rounded-[3px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Product thumbnail & Info */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-[3px] overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src="/uploads/products/img_w480_68b47e4f83c917-29188591.webp"
                      alt="Animal colorful digital prints"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 hover:text-[#00a99d] transition cursor-pointer">
                      Animal colorful digital prints
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Trendshop</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex flex-col items-start md:items-center">
                  <span className="text-xs font-semibold text-gray-800 mb-1">
                    Rate this product:
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#fbb400] text-[#fbb400]" />
                    ))}
                  </div>
                </div>

                {/* Download Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[2px] transition cursor-pointer border-0 shadow-xs"
                  >
                    <CloudDownload className="w-4 h-4" />
                    <span>Download</span>
                    <span className="text-[10px]">▾</span>
                  </button>

                  {/* Dropdown files */}
                  {downloadMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-[#ebebeb] rounded-[2px] shadow-sm z-20 py-1 text-xs">
                      <a
                        href="/uploads/products/img_w480_68b47e4f83c917-29188591.webp"
                        download="animal-colorful-prints.jpg"
                        onClick={() => {
                          setDownloadMenuOpen(false);
                          showToast("Downloading Main File(s)...");
                        }}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition font-normal cursor-pointer"
                      >
                        Main File(s)
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setDownloadMenuOpen(false);
                          showToast("Downloading License Certificate...");
                        }}
                        className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] cursor-pointer bg-transparent border-0 font-normal"
                      >
                        License Certificate
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. REFUND REQUESTS SECTION (Screenshot 4) */}
            {activeSection === "refund-requests" && (
              <div>
                {/* Top Action Button */}
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={() => setIsSubmitRefundOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[2px] transition cursor-pointer border-0 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Submit a Refund Request</span>
                  </button>
                </div>

                {/* Refund Card */}
                <div className="space-y-3">
                  {refundRequests.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-[#ebebeb] rounded-[3px] p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      {/* Product thumbnail & Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-[3px] overflow-hidden shrink-0 border border-gray-100">
                          <img
                            src={item.productImage}
                            alt={item.productTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs sm:text-[13px] font-bold text-gray-900">
                            Order: #{item.orderNumber}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {item.productTitle}
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <span className="inline-block px-3 py-1 bg-[#f1f3f5] text-gray-600 text-xs font-normal rounded-sm">
                          {item.status}
                        </span>
                      </div>

                      {/* Timestamp */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{item.date}</span>
                      </div>

                      {/* Details button */}
                      <div>
                        <Link
                          href={`/member/refund-requests/${item.orderNumber}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f1f3f5] hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-[3px] border border-gray-300 transition cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5 text-gray-500" />
                          <span>Details</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[1px] animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedOrder(null);
          }}
        >
          <div className="bg-white rounded-[4px] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150 border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-800">
                Order #{selectedOrder.orderNumber} Details
              </h3>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-gray-700">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-gray-100">
                <div>
                  <span className="text-gray-400 block">Status:</span>
                  <span
                    className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-medium ${
                      selectedOrder.status === "Completed"
                        ? "bg-[#e8f8f5] text-[#27ae60]"
                        : "bg-[#f1f3f5] text-gray-700"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Date:</span>
                  <span className="font-semibold text-gray-800">{selectedOrder.date}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Payment Method:</span>
                  <span className="font-semibold text-gray-800">{selectedOrder.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Total:</span>
                  <span className="font-bold text-[#00a99d] text-sm">${selectedOrder.total}</span>
                </div>
              </div>

              <div>
                <p className="font-bold text-gray-900 mb-2">Ordered Products:</p>
                <div className="space-y-2">
                  {selectedOrder.products.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded border border-gray-100">
                      <img src={p.image} alt={p.title} className="w-10 h-10 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{p.title}</p>
                        <p className="text-gray-500">Qty: {p.quantity}</p>
                      </div>
                      <span className="font-semibold text-gray-900">${p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Refund Request Modal */}
      {isSubmitRefundOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[1px] animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSubmitRefundOpen(false);
          }}
        >
          <div className="bg-white rounded-[4px] shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-150 border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-800">Submit a Refund Request</h3>
              <button
                type="button"
                onClick={() => setIsSubmitRefundOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitRefund} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Select Order*</label>
                <select
                  value={refundOrderNumber}
                  onChange={(e) => setRefundOrderNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] outline-none"
                >
                  <option value="10007">Order #10007 - Animal colorful digital prints ($32.86)</option>
                  <option value="10044">Order #10044 - Winter Wool Coat ($154)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Reason for Refund*</label>
                <select
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] outline-none"
                >
                  <option value="Issue with downloaded files">Issue with downloaded files</option>
                  <option value="Item not as described">Item not as described</option>
                  <option value="Product not received">Product not received</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Details &amp; Explanation*</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your issue with the order in detail..."
                  value={refundDetails}
                  onChange={(e) => setRefundDetails(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitRefundOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
