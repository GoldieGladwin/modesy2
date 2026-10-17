"use client";

import React from "react";
import { Printer } from "lucide-react";

interface SellerInvoiceViewProps {
  invoiceId: string;
}

export default function SellerInvoiceView({ invoiceId = "10044" }: SellerInvoiceViewProps) {
  const currentInvoiceId = invoiceId || "10044";
  const formattedInvoiceNumber = `#VN${currentInvoiceId}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] py-10 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-[760px] mx-auto">
        {/* Title above sheet - matching Screenshot 4 */}
        <h1 className="text-center text-lg font-normal text-gray-700 mb-6 print:hidden">
          Invoice
        </h1>

        {/* Invoice Printable Sheet */}
        <div className="bg-white border border-[#e4e7ea] rounded-[2px] shadow-xs p-8 sm:p-12 print:border-none print:shadow-none print:p-0">
          {/* Top Section: Modesy Brand & Invoice Meta */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-gray-100">
            {/* Left: Brand & Address */}
            <div className="space-y-1">
              <span className="text-2xl font-bold text-gray-900 tracking-tight block">
                Modesy
              </span>
              <p className="text-xs text-gray-500 font-normal mt-1 leading-relaxed">
                7111 Camino Del Rio N Suite 400 San Diego
                <br />
                edward_test@domain.com
                <br />
                (581) 754-00103
              </p>
            </div>

            {/* Right: Invoice # & Date */}
            <div className="text-left sm:text-right space-y-1 text-xs">
              <div className="flex sm:justify-end gap-2 text-gray-800">
                <span className="text-gray-500 font-normal">Invoice:</span>
                <span className="font-semibold text-gray-800">{formattedInvoiceNumber}</span>
              </div>
              <div className="flex sm:justify-end gap-2 text-gray-600">
                <span className="text-gray-500 font-normal">Date:</span>
                <span className="font-normal text-gray-800">2026-10-14 / 20:42</span>
              </div>
            </div>
          </div>

          {/* Middle Section: Client Information & Payment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 text-xs border-b border-gray-100">
            {/* Client Info */}
            <div className="space-y-1">
              <h2 className="font-bold text-gray-800 mb-2">Client Information</h2>
              <p className="text-gray-700 font-normal leading-relaxed">
                Peter Jane (Peter Jane)
                <br />
                Test Address
                <br />
                Centre, Centre
                <br />
                France
                <br />
                876 5766 6578
              </p>
            </div>

            {/* Payment Details */}
            <div className="space-y-1">
              <h2 className="font-bold text-gray-800 mb-2">Payment Details</h2>
              <div className="space-y-1.5 text-gray-700 font-normal">
                <div className="flex">
                  <span className="w-32 text-gray-500">Payment Status:</span>
                  <span>Pending Payment</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">Payment Method:</span>
                  <span>Bank Transfer</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">Currency:</span>
                  <span>USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto my-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-t border-b border-gray-200 text-gray-800 font-semibold bg-gray-50/50">
                  <th className="py-2.5 px-3 font-semibold">Seller</th>
                  <th className="py-2.5 px-3 font-semibold">Product Id</th>
                  <th className="py-2.5 px-3 font-semibold">Description</th>
                  <th className="py-2.5 px-3 font-semibold">Quantity</th>
                  <th className="py-2.5 px-3 font-semibold">Unit Price</th>
                  <th className="py-2.5 px-3 font-semibold">VAT</th>
                  <th className="py-2.5 px-3 font-semibold text-right sm:text-left">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {/* Product 1 */}
                <tr className="align-top">
                  <td className="py-3 px-3 font-normal">trendshop</td>
                  <td className="py-3 px-3 font-normal">55</td>
                  <td className="py-3 px-3">
                    <span className="font-normal text-gray-800 block">
                      Animation of popular vacation spots
                    </span>
                    <span className="text-[11px] text-gray-400 block mt-0.5">
                      SKU: A1P2V3S4P5T6
                    </span>
                  </td>
                  <td className="py-3 px-3 font-normal">1</td>
                  <td className="py-3 px-3 font-normal">$10</td>
                  <td className="py-3 px-3 font-normal">$1 (10%)</td>
                  <td className="py-3 px-3 font-normal text-right sm:text-left">$11</td>
                </tr>

                {/* Product 2 */}
                <tr className="align-top">
                  <td className="py-3 px-3 font-normal">trendshop</td>
                  <td className="py-3 px-3 font-normal">15</td>
                  <td className="py-3 px-3">
                    <span className="font-normal text-gray-800 block">
                      Light blue women shirt
                    </span>
                    <span className="text-[11px] text-gray-400 block mt-0.5">
                      SKU: HS01Z10F4-L
                    </span>
                  </td>
                  <td className="py-3 px-3 font-normal">1</td>
                  <td className="py-3 px-3 font-normal">$65</td>
                  <td className="py-3 px-3 font-normal">$6.50 (10%)</td>
                  <td className="py-3 px-3 font-normal text-right sm:text-left">$71.50</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Subtotal / VAT / Shipping / Total Summary */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <div className="w-56 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600 font-normal">
                <span>Subtotal</span>
                <span className="text-gray-800 font-medium">$75</span>
              </div>
              <div className="flex justify-between text-gray-600 font-normal">
                <span>VAT</span>
                <span className="text-gray-800 font-medium">$7.50</span>
              </div>
              <div className="flex justify-between text-gray-600 font-normal">
                <span>Shipping</span>
                <span className="text-gray-800 font-medium">$0</span>
              </div>
              <div className="border-t border-gray-200 pt-1.5 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>$82.50</span>
              </div>
            </div>
          </div>
        </div>

        {/* Print Button (Centered below container) */}
        <div className="flex justify-center mt-6 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-6 py-2 bg-[#6c757d] hover:bg-[#5a6268] text-white text-xs font-semibold rounded-[3px] transition cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
}
