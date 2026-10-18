"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface VendorSaleDetailViewProps {
  saleId: string;
}

export default function VendorSaleDetailView({ saleId = "10044" }: VendorSaleDetailViewProps) {
  const currentSaleId = saleId || "10044";

  return (
    <div className="space-y-6">
      {/* Top Container */}
      <div className="bg-white border border-[#ebebeb] rounded-[3px] shadow-xs p-6">
        {/* Header with Title and View Invoice Button */}
        <div className="flex items-center justify-between pb-6 border-b border-[#f4f4f4]">
          <h1 className="text-lg font-bold text-gray-800">
            Sale: #{currentSaleId}
          </h1>
          <Link
            href={`/invoice/${currentSaleId}?type=seller`}
            className="inline-flex items-center px-4 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition shadow-xs cursor-pointer"
          >
            View invoice
          </Link>
        </div>

        {/* Section 1: Sale General Info & Buyer Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-b border-[#f4f4f4]">
          {/* Left: General Order Info */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center">
              <span className="w-36 text-gray-600 font-normal">Status</span>
              <span className="inline-block bg-[#20c997] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[3px]">
                Processing
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-36 text-gray-600 font-normal">Payment Status</span>
              <span className="text-gray-800 font-normal">Pending Payment</span>
            </div>
            <div className="flex items-center">
              <span className="w-36 text-gray-600 font-normal">Payment Method</span>
              <span className="text-gray-800 font-normal">Bank Transfer</span>
            </div>
            <div className="flex items-center">
              <span className="w-36 text-gray-600 font-normal">Date</span>
              <span className="text-gray-800 font-normal">2026-10-14 / 20:42</span>
            </div>
            <div className="flex items-center">
              <span className="w-36 text-gray-600 font-normal">Updated</span>
              <span className="text-gray-500 font-normal">18 hours ago</span>
            </div>
          </div>

          {/* Right: Buyer Profile Box */}
          <div className="flex items-start gap-4">
            <div className="w-[74px] h-[74px] rounded-[3px] overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
              <img
                src="/images/peter-avatar.jpg"
                alt="Peter Jane"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/products/vacation-spots.jpg";
                }}
              />
            </div>
            <div className="space-y-1 text-xs">
              <h2 className="font-semibold text-gray-800 text-[13px]">Peter Jane</h2>
              <p className="text-gray-600 font-normal">876 5766 6578</p>
              <p className="text-gray-600 font-normal">member@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Section 2: Addresses (Shipping & Billing) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-b border-[#f4f4f4]">
          {/* Shipping Address */}
          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-3.5">
              Shipping Address
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">First Name</span>
                <span className="text-gray-800 font-normal">Peter</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">Last Name</span>
                <span className="text-gray-800 font-normal">Jane</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">Email</span>
                <span className="text-gray-800 font-normal">test@gmail.com</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">Phone Number</span>
                <span className="text-gray-800 font-normal">876 5766 6578</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">Address</span>
                <span className="text-gray-800 font-normal">Test Address</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">Country</span>
                <span className="text-gray-800 font-normal">France</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">State</span>
                <span className="text-gray-800 font-normal">Centre</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">City</span>
                <span className="text-gray-800 font-normal">Centre</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">Zip Code</span>
                <span className="text-gray-800 font-normal">45343</span>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-3.5">
              Billing Address
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">First Name</span>
                <span className="text-gray-800 font-normal">Peter</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">Last Name</span>
                <span className="text-gray-800 font-normal">Jane</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">Email</span>
                <span className="text-gray-800 font-normal">test@gmail.com</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">Phone Number</span>
                <span className="text-gray-800 font-normal">876 5766 6578</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">Address</span>
                <span className="text-gray-800 font-normal">Test Address</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">Country</span>
                <span className="text-gray-800 font-normal">France</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">State</span>
                <span className="text-gray-800 font-normal">Centre</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">City</span>
                <span className="text-gray-800 font-normal">Centre</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600 font-normal">Zip Code</span>
                <span className="text-gray-800 font-normal">45343</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Products */}
        <div className="pt-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#f0f0f0] text-gray-700 font-semibold">
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Updated</th>
                  <th className="py-2.5 px-3">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f7f7f7]">
                {/* Product 1: Vacation Spots */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-4 px-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-14 h-14 rounded-[3px] overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                        <img
                          src="/images/products/vacation-spots.jpg"
                          alt="Animation of popular vacation spots"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <Link
                          href="/product/animation-of-popular-vacation-spots"
                          className="font-medium text-gray-800 hover:text-[#00a99d] transition-colors"
                        >
                          Animation of popular vacation spots
                        </Link>
                        <div className="text-[11px] text-gray-500 font-normal">
                          <span>SKU:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span className="font-semibold text-gray-700">A1P2V3S4P5T6</span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-normal">
                          <span>Unit Price:&nbsp;</span>
                          <span className="font-semibold text-gray-700">$10</span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-normal">
                          <span>Quantity:&nbsp;&nbsp;&nbsp;</span>
                          <span className="font-semibold text-gray-700">1</span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-normal">
                          <span>VAT (10%):</span>
                          <span className="font-semibold text-gray-700"> $1</span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-normal">
                          <span>Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span className="font-semibold text-gray-700">$11</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-gray-700 font-normal align-top pt-5">
                    Pending Payment
                  </td>
                  <td className="py-4 px-3 text-gray-500 font-normal align-top pt-5">
                    {/* Empty as in screenshot 2 */}
                  </td>
                  <td className="py-4 px-3 align-top pt-5">
                    {/* Empty as in screenshot 2 */}
                  </td>
                </tr>

                {/* Product 2: Light Blue Women Shirt */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-4 px-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-14 h-14 rounded-[3px] overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                        <img
                          src="/images/products/light-blue-shirt.webp"
                          alt="Light blue women shirt"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <Link
                          href="/product/light-blue-women-shirt"
                          className="font-medium text-gray-800 hover:text-[#00a99d] transition-colors"
                        >
                          Light blue women shirt
                        </Link>
                        <div className="text-[11px] text-gray-500 font-normal">
                          <span>Size: </span>
                          <span className="font-semibold text-gray-700">L</span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-normal">
                          <span>SKU:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span className="font-semibold text-gray-700">HS01Z10F4-L</span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-normal">
                          <span>Unit Price:&nbsp;</span>
                          <span className="font-semibold text-gray-700">$65</span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-normal">
                          <span>Quantity:&nbsp;&nbsp;&nbsp;</span>
                          <span className="font-semibold text-gray-700">1</span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-normal">
                          <span>VAT (10%):</span>
                          <span className="font-semibold text-gray-700"> $6.50</span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-normal">
                          <span>Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span className="font-semibold text-gray-700">$71.50</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-gray-700 font-normal align-top pt-5">
                    Pending Payment
                  </td>
                  <td className="py-4 px-3 text-gray-500 font-normal align-top pt-5">
                    18 hours ago
                  </td>
                  <td className="py-4 px-3 align-top pt-5">
                    {/* Empty as in screenshot 3 */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Shipping Method Box */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-gray-800 mb-2.5">Shipping</h2>
          <div className="bg-[#f8f9fa] border border-[#e9ecef] rounded-[3px] p-4 text-xs">
            <div className="font-semibold text-gray-800 mb-1">
              Shipping Method: Local Pickup
            </div>
            <p className="text-gray-500 font-normal">
              The order has not yet been shipped. You can add the order tracking code and link while changing the order status.
            </p>
          </div>
        </div>

        {/* Section 5: Order Summary Box (Bottom Right) */}
        <div className="flex justify-end mt-8">
          <div className="w-full sm:w-64 bg-white border border-[#ebebeb] rounded-[3px] p-4 text-xs space-y-2">
            <div className="flex justify-between text-gray-600 font-normal">
              <span>Subtotal</span>
              <span className="font-medium text-gray-800">$75</span>
            </div>
            <div className="flex justify-between text-gray-600 font-normal">
              <span>VAT</span>
              <span className="font-medium text-gray-800">$7.50</span>
            </div>
            <div className="flex justify-between text-gray-600 font-normal">
              <span>Shipping</span>
              <span className="font-medium text-gray-800">$0</span>
            </div>
            <div className="border-t border-[#ebebeb] pt-2 flex justify-between font-bold text-gray-900 text-[13px]">
              <span>Total</span>
              <span>$82.50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
