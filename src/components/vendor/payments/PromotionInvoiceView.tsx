"use client";

import React from "react";
import { Printer } from "lucide-react";
import { initialPromotionPayments } from "./mockData";

interface PromotionInvoiceViewProps {
  paymentId?: string;
}

export default function PromotionInvoiceView({
  paymentId = "15",
}: PromotionInvoiceViewProps) {
  const currentPayment =
    initialPromotionPayments.find(
      (p) => String(p.id) === paymentId || p.paymentId === paymentId
    ) || initialPromotionPayments[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 print:py-0 print:px-0 font-sans text-gray-800">
      <div className="max-w-[780px] mx-auto">
        {/* Title */}
        <h1 className="text-center text-[26px] font-normal text-gray-800 mb-8 tracking-wide">
          Invoice
        </h1>

        {/* Invoice Sheet */}
        <div className="p-2 sm:p-4">
          {/* Top Section: Modesy Brand & Invoice Meta */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8">
            {/* Left: Brand & Address */}
            <div>
              <span className="text-[26px] font-bold text-gray-900 tracking-tight block">
                Modesy
              </span>
              <div className="text-[12.5px] text-gray-600 font-normal mt-1 leading-relaxed">
                <p>3111 Camino Del Rio N Suite 400 San Diego</p>
                <p>edward_test@domain.com</p>
                <p>(541) 754-30103</p>
              </div>
            </div>

            {/* Right: Invoice # & Date */}
            <div className="text-left sm:text-right text-[12.5px] space-y-1">
              <div className="flex sm:justify-end gap-3 text-gray-900">
                <span className="font-semibold text-gray-800">Invoice:</span>
                <span className="font-semibold text-gray-900">
                  {currentPayment.invoiceNumber}
                </span>
              </div>
              <div className="flex sm:justify-end gap-3 text-gray-900">
                <span className="font-semibold text-gray-800">Date:</span>
                <span className="font-normal text-gray-800">
                  {currentPayment.date}
                </span>
              </div>
            </div>
          </div>

          {/* Middle Section: Client Info & Payment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 text-[12.5px]">
            {/* Client Information */}
            <div>
              <h2 className="text-[13px] font-bold text-gray-900 mb-2">
                Client Information
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-0.5">
                <p>
                  {currentPayment.clientName} ({currentPayment.clientUsername})
                </p>
                <p>{currentPayment.clientCity}</p>
                <p>{currentPayment.clientCountry}</p>
                <p>{currentPayment.clientPhone}</p>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h2 className="text-[13px] font-bold text-gray-900 mb-2">
                Payment Details
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-0.5">
                <p>
                  <span className="font-normal text-gray-600">Payment Status:</span>{" "}
                  <span className="text-gray-900">Payment Received</span>
                </p>
                <p>
                  <span className="font-normal text-gray-600">Payment Method:</span>{" "}
                  <span className="text-gray-900">
                    {currentPayment.paymentMethod}
                  </span>
                </p>
                <p>
                  <span className="font-normal text-gray-600">Currency:</span>{" "}
                  <span className="text-gray-900">
                    {currentPayment.currency}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-t border-b border-gray-200 text-gray-900 text-[13px] font-bold">
                  <th className="py-2.5 px-0 w-1/3">Description</th>
                  <th className="py-2.5 px-0 w-1/4">Product Id</th>
                  <th className="py-2.5 px-0 w-5/12">Purchased Plan</th>
                </tr>
              </thead>
              <tbody className="text-[12.5px] text-gray-800 border-b border-gray-200">
                <tr>
                  <td className="py-3 px-0">Product Promotion</td>
                  <td className="py-3 px-0">{currentPayment.productId}</td>
                  <td className="py-3 px-0">{currentPayment.purchasedPlan}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals Breakdown */}
          <div className="flex justify-end mt-6 text-[12.5px]">
            <div className="w-72 space-y-2">
              <div className="flex justify-between text-gray-800">
                <span>Subtotal</span>
                <span>{currentPayment.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-800">
                <span>Goods and Services Tax ({currentPayment.taxRate})</span>
                <span>{currentPayment.tax}</span>
              </div>
              <div className="flex justify-between text-gray-900 font-bold text-[13px] pt-1">
                <span>Total</span>
                <span>{currentPayment.total}</span>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="text-center mt-12 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#556270] hover:bg-[#434e5a] text-white text-[13px] font-medium rounded transition-colors shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
