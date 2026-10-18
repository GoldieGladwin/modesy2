"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Ban,
  Menu,
  Landmark,
  Send,
  X,
  CheckCircle2,
  Upload,
  AlertCircle,
  Copy,
  Receipt,
} from "lucide-react";

interface OrderDetailViewProps {
  orderId?: string;
}

export default function OrderDetailView({ orderId = "10044" }: OrderDetailViewProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Order state
  const [orderStatus, setOrderStatus] = useState<string>("Processing");
  const [paymentStatus, setPaymentStatus] = useState<string>("Pending Payment");

  // Report transfer state
  const [reportForm, setReportForm] = useState({
    paymentId: "BTR-HX7M7DKXRM-N3AWUFR",
    accountNumber: "",
    bankName: "",
    notes: "",
    receiptName: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCancelOrder = () => {
    setOrderStatus("Cancelled");
    setPaymentStatus("Cancelled");
    setCancelModalOpen(false);
    showToast("Order has been cancelled successfully.");
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportForm.accountNumber || !reportForm.bankName) {
      alert("Please fill in the required fields.");
      return;
    }
    setReportModalOpen(false);
    setPaymentStatus("Payment Under Review");
    showToast("Bank transfer report submitted successfully! Waiting for admin approval.");
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-8 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cancel Order Confirmation Modal (SweetAlert Style) */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[4px] shadow-2xl p-7 max-w-[420px] w-full text-center transform transition-all animate-in zoom-in-95 duration-150">
            <div className="w-[72px] h-[72px] rounded-full border-4 border-[#facea8] flex items-center justify-center mx-auto mb-5">
              <svg
                width="32"
                height="46"
                viewBox="0 0 32 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="16"
                  y1="8"
                  x2="16"
                  y2="28"
                  stroke="#f8bb86"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="38" r="2.2" fill="#f8bb86" />
              </svg>
            </div>
            <p className="text-[16px] text-[#545454] font-normal leading-normal mb-7">
              Are you sure you want to cancel this order?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setCancelModalOpen(false)}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[14px] font-medium rounded-[3px] transition cursor-pointer border-0"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCancelOrder}
                className="px-8 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[14px] font-medium rounded-[3px] transition cursor-pointer border-0 outline-none"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bank Accounts Modal */}
      {bankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[3px] shadow-2xl p-6 max-w-[500px] w-full transform transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#00a99d]" />
                Bank Accounts for Transfer
              </h3>
              <button
                type="button"
                onClick={() => setBankModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 border-0 bg-transparent cursor-pointer p-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-700">
              <div className="bg-[#f8f9fa] border border-[#ebebeb] p-4 rounded-[2px] space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Bank Name:</span>
                  <span className="font-semibold text-gray-900">BNP Paribas France</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Account Name:</span>
                  <span className="font-semibold text-gray-900">Modesy Marketplace LLC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Account Number:</span>
                  <span className="font-mono font-semibold text-gray-900">FR76 3000 4000 1234 5678</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">IBAN / BIC:</span>
                  <span className="font-mono text-gray-900">BNPAFR21XXX</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 leading-relaxed italic">
                *Please make sure to mention your Order Number (<strong>#{orderId}</strong>) in the payment reference / description.
              </p>
            </div>

            <div className="flex justify-end pt-4 mt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setBankModalOpen(false)}
                className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[2px] transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Bank Transfer Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[3px] shadow-2xl p-6 max-w-[500px] w-full transform transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-[#00a99d]" />
                Report Bank Transfer for Order #{orderId}
              </h3>
              <button
                type="button"
                onClick={() => setReportModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 border-0 bg-transparent cursor-pointer p-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-3.5 text-xs">
              <div className="bg-teal-50/50 border border-teal-100 p-3 rounded-[2px] text-xs text-gray-700 flex justify-between items-center">
                <span className="font-medium text-gray-600">Total Amount Due:</span>
                <span className="text-[14px] font-bold text-[#00a99d]">$154.00 USD</span>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Sender Account / Transfer Reference No *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TRF-98234823"
                  value={reportForm.accountNumber}
                  onChange={(e) =>
                    setReportForm({ ...reportForm, accountNumber: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2 text-xs focus:border-[#00a99d] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Bank Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BNP Paribas, Chase, BCA"
                  value={reportForm.bankName}
                  onChange={(e) =>
                    setReportForm({ ...reportForm, bankName: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2 text-xs focus:border-[#00a99d] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Upload Payment Receipt (Optional)
                </label>
                <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-[2px] cursor-pointer hover:bg-gray-50 text-gray-600">
                  <Upload className="w-4 h-4 text-gray-400" />
                  <span className="truncate">
                    {reportForm.receiptName || "Click to upload receipt image (PNG, JPG, PDF)"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setReportForm({
                        ...reportForm,
                        receiptName: e.target.files?.[0]?.name || "",
                      })
                    }
                  />
                </label>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Notes</label>
                <textarea
                  rows={2}
                  placeholder="Additional notes about your transfer..."
                  value={reportForm.notes}
                  onChange={(e) => setReportForm({ ...reportForm, notes: e.target.value })}
                  className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-[2px] text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white font-medium rounded-[2px]"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4">
        {/* Breadcrumb matching Screenshot */}
        <nav className="text-[13px] text-gray-500 mb-5 flex items-center gap-1.5 font-normal">
          <Link href="/member" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/member/orders" className="hover:text-[#00a99d] transition-colors">
            Orders
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">Order</span>
        </nav>

        {/* Page Title & Top Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-[22px] font-bold text-gray-900 leading-tight">
            Order: #{orderId}
          </h1>

          <div className="flex items-center gap-2.5">
            {/* Cancel Order Button */}
            <button
              type="button"
              onClick={() => setCancelModalOpen(true)}
              disabled={orderStatus === "Cancelled"}
              className="px-3.5 py-1.5 bg-[#f8f9fa] hover:bg-gray-100 disabled:opacity-50 text-gray-600 text-xs font-medium rounded-[2px] border border-gray-300 transition cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Ban className="w-3.5 h-3.5 text-gray-500" />
              <span>Cancel Order</span>
            </button>

            {/* Orders Button */}
            <Link
              href="/member/orders"
              className="px-3.5 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-medium rounded-[2px] transition inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>Orders</span>
            </Link>
          </div>
        </div>

        {/* 1. TOP ORDER INFORMATION CARD */}
        <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 text-[13px]">
            {/* Status */}
            <div className="flex items-center">
              <span className="w-44 text-gray-700 font-normal">Status</span>
              <span
                className={`px-2.5 py-0.5 rounded-[2px] text-[11px] font-medium ${
                  orderStatus === "Cancelled"
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-[#e3f2fd] text-[#1976d2]"
                }`}
              >
                {orderStatus}
              </span>
            </div>

            {/* Empty right cell on row 1 to match 2-column Modesy layout */}
            <div className="hidden md:block"></div>

            {/* Payment Method */}
            <div className="flex items-center">
              <span className="w-44 text-gray-700 font-normal">Payment Method</span>
              <span className="text-gray-900 font-normal">Bank Transfer</span>
            </div>
            <div className="hidden md:block"></div>

            {/* Payment Status */}
            <div className="flex items-center">
              <span className="w-44 text-gray-700 font-normal">Payment Status</span>
              <span className="text-gray-900 font-normal">{paymentStatus}</span>
            </div>
            <div className="hidden md:block"></div>

            {/* Transaction Number */}
            <div className="flex items-center">
              <span className="w-44 text-gray-700 font-normal">Transaction Number</span>
              <span className="text-gray-900 font-normal">BTR-HX7M7DKXRM-N3AWUFR</span>
            </div>
            <div className="hidden md:block"></div>

            {/* Date */}
            <div className="flex items-center">
              <span className="w-44 text-gray-700 font-normal">Date</span>
              <span className="text-gray-900 font-normal">2024-10-14 / 20:42</span>
            </div>
            <div className="hidden md:block"></div>

            {/* Updated */}
            <div className="flex items-center">
              <span className="w-44 text-gray-700 font-normal">Updated</span>
              <span className="text-gray-500 font-normal text-xs">2 days ago</span>
            </div>
            <div className="hidden md:block"></div>
          </div>

          {/* Action Buttons: Bank Accounts & Report Bank Transfer */}
          <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-[#ebebeb]">
            <button
              type="button"
              onClick={() => setBankModalOpen(true)}
              className="px-4 py-2 bg-[#e9ecef] hover:bg-gray-300 text-gray-800 text-xs font-semibold rounded-[2px] inline-flex items-center gap-2 cursor-pointer transition shadow-2xs border-0"
            >
              <Landmark className="w-4 h-4 text-gray-600" />
              <span>Bank Accounts</span>
            </button>

            <button
              type="button"
              onClick={() => setReportModalOpen(true)}
              className="px-4 py-2 bg-[#e9ecef] hover:bg-gray-300 text-gray-800 text-xs font-semibold rounded-[2px] inline-flex items-center gap-2 cursor-pointer transition shadow-2xs border-0"
            >
              <Send className="w-4 h-4 text-gray-600" />
              <span>Report Bank Transfer</span>
            </button>
          </div>
        </div>

        {/* 2. SHIPPING & BILLING ADDRESSES (Side-by-Side Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Shipping Address */}
          <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <h2 className="font-bold text-[15px] text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Shipping Address
            </h2>
            <div className="space-y-2 text-[13px]">
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">First Name</span>
                <span className="text-gray-900 font-normal">Peter</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">Last Name</span>
                <span className="text-gray-900 font-normal">Jone</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">Email</span>
                <span className="text-gray-900 font-normal">test@gmail.com</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">Phone Number</span>
                <span className="text-gray-900 font-normal">876 4766 8978</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">Address</span>
                <span className="text-gray-900 font-normal">Test Address</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">Country</span>
                <span className="text-gray-900 font-normal">France</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">State</span>
                <span className="text-gray-900 font-normal">Centre</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">City</span>
                <span className="text-gray-900 font-normal">Centre</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">Zip Code</span>
                <span className="text-gray-900 font-normal">d4141</span>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <h2 className="font-bold text-[15px] text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Billing Address
            </h2>
            <div className="space-y-2 text-[13px]">
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">First Name</span>
                <span className="text-gray-900 font-normal">Peter</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">Last Name</span>
                <span className="text-gray-900 font-normal">Jone</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">Email</span>
                <span className="text-gray-900 font-normal">test@gmail.com</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">Phone Number</span>
                <span className="text-gray-900 font-normal">876 4766 8978</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">Address</span>
                <span className="text-gray-900 font-normal">Test Address</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">Country</span>
                <span className="text-gray-900 font-normal">France</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">State</span>
                <span className="text-gray-900 font-normal">Centre</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">City</span>
                <span className="text-gray-900 font-normal">Centre</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-500 font-normal">Zip Code</span>
                <span className="text-gray-900 font-normal">d4141</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PRODUCTS SECTION */}
        <div className="mb-6">
          <h2 className="text-[16px] font-bold text-gray-900 mb-3">Products</h2>

          <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#ebebeb] text-[13px] font-bold text-gray-900">
                  <th className="py-3 px-2 font-semibold w-[55%]">Product</th>
                  <th className="py-3 px-2 font-semibold">Total</th>
                  <th className="py-3 px-2 font-semibold">Updated</th>
                  <th className="py-3 px-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebebeb] text-xs">
                {/* Product 1: Animation of popular vacation spots */}
                <tr className="hover:bg-gray-50/40 transition">
                  <td className="py-4 px-2">
                    <div className="flex items-start gap-3.5">
                      <div className="w-14 h-14 rounded-[2px] overflow-hidden shrink-0 border border-gray-200 bg-gray-50">
                        <img
                          src="/images/peter-jone-avatar.jpg"
                          alt="Animation of popular vacation spots"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <div>
                          <span className="inline-block px-1.5 py-0.5 bg-[#e0f2fe] text-[#0369a1] text-[10px] font-medium rounded-[2px]">
                            Seller: trendshop
                          </span>
                        </div>
                        <h4 className="font-semibold text-[13px] text-gray-900 leading-snug">
                          Animation of popular vacation spots
                        </h4>
                        <div className="text-[11px] text-gray-500 space-y-0.5 pt-0.5">
                          <p>SKU: A1P2V3S4P5T6</p>
                          <p>VAT: 10% ($1)</p>
                          <p>Quantity: 1</p>
                          <p>Price: $10</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 font-bold text-gray-900 text-[13px] align-top pt-5">
                    $10
                  </td>
                  <td className="py-4 px-2 text-gray-500 italic text-[11px] align-top pt-5">
                    2 days ago
                  </td>
                  <td className="py-4 px-2 text-gray-900 font-medium text-xs align-top pt-5">
                    Pending Payment
                  </td>
                </tr>

                {/* Product 2: Light blue woven shirt */}
                <tr className="hover:bg-gray-50/40 transition">
                  <td className="py-4 px-2">
                    <div className="flex items-start gap-3.5">
                      <div className="w-14 h-14 rounded-[2px] overflow-hidden shrink-0 border border-gray-200 bg-gray-50">
                        <img
                          src="/images/products/light-blue-shirt.webp"
                          alt="Light blue woven shirt"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <div>
                          <span className="inline-block px-1.5 py-0.5 bg-[#e0f2fe] text-[#0369a1] text-[10px] font-medium rounded-[2px]">
                            Seller: trendshop
                          </span>
                        </div>
                        <h4 className="font-semibold text-[13px] text-gray-900 leading-snug">
                          Light blue woven shirt
                        </h4>
                        <p className="text-[11px] text-gray-600 font-medium">Size: L</p>
                        <div className="text-[11px] text-gray-500 space-y-0.5 pt-0.5">
                          <p>SKU: M1D1Z1OP&L</p>
                          <p>VAT: 10% ($6.50)</p>
                          <p>Quantity: 1</p>
                          <p>Price: $65</p>
                        </div>
                        <div className="pt-2 text-[11px]">
                          <p className="font-semibold text-gray-700">Shipping</p>
                          <p className="text-gray-500">Shipping Method: Local Pickup</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 font-bold text-gray-900 text-[13px] align-top pt-5">
                    $65
                  </td>
                  <td className="py-4 px-2 text-gray-500 italic text-[11px] align-top pt-5">
                    2 days ago
                  </td>
                  <td className="py-4 px-2 text-gray-900 font-medium text-xs align-top pt-5">
                    Pending Payment
                  </td>
                </tr>

                {/* Product 3: Duralonylon fabric smart backpack */}
                <tr className="hover:bg-gray-50/40 transition">
                  <td className="py-4 px-2">
                    <div className="flex items-start gap-3.5">
                      <div className="w-14 h-14 rounded-[2px] overflow-hidden shrink-0 border border-gray-200 bg-gray-50">
                        <img
                          src="/images/products/black-backpack.webp"
                          alt="Duralonylon fabric smart backpack"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <div>
                          <span className="inline-block px-1.5 py-0.5 bg-[#e0f2fe] text-[#0369a1] text-[10px] font-medium rounded-[2px]">
                            Seller: admin
                          </span>
                        </div>
                        <h4 className="font-semibold text-[13px] text-gray-900 leading-snug">
                          Duralonylon fabric smart backpack
                        </h4>
                        <div className="text-[11px] text-gray-500 space-y-0.5 pt-0.5">
                          <p>SKU: M161R0G137</p>
                          <p>Quantity: 1</p>
                          <p>Price: $55</p>
                        </div>
                        <div className="pt-2 text-[11px]">
                          <p className="font-semibold text-gray-700">Shipping</p>
                          <p className="text-gray-500">Shipping Method: Flat Rate</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 font-bold text-gray-900 text-[13px] align-top pt-5">
                    $55
                  </td>
                  <td className="py-4 px-2 text-gray-500 italic text-[11px] align-top pt-5">
                    2 days ago
                  </td>
                  <td className="py-4 px-2 text-gray-900 font-medium text-xs align-top pt-5">
                    Pending Payment
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ORDER TOTALS SUMMARY (Right Aligned matching Screenshot) */}
            <div className="flex justify-end pt-6 mt-4 border-t border-[#ebebeb]">
              <div className="w-full sm:w-80 space-y-2 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-semibold text-gray-900">$130</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">VAT</span>
                  <span className="font-semibold text-gray-900">$7.50</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">Shipping</span>
                  <span className="font-semibold text-gray-900">$10</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">Sale Tax (5%)</span>
                  <span className="font-semibold text-gray-900">$6.50</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 text-sm">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-[15px] font-bold text-gray-900">$154</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Confirmation Notice */}
          <p className="text-[11px] sm:text-[12px] text-gray-500 italic mt-6 leading-relaxed">
            *When you receive your order, please check the products you have purchased. If there is not any problem, click &lsquo;Confirm Order Received&rsquo; button. After confirming your order, the money will be transferred to the seller.
          </p>
        </div>
      </div>
    </div>
  );
}
