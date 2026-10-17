"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import VendorHeader from "@/components/layout/vendor/VendorHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";

interface PlanItem {
  id: string;
  name: string;
  price: string;
  isPopular?: boolean;
  isDisabled?: boolean;
  disabledReason?: string;
  features: string[];
}

const PLANS: PlanItem[] = [
  {
    id: "start",
    name: "Start",
    price: "Free",
    isDisabled: true,
    disabledReason:
      "You cannot choose this plan due to the number of products you have added",
    features: [
      "Add 5 Products",
      "30 Days Time Limit",
      "Vendor Dashboard",
      "Sales Statistics",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    price: "$9",
    isPopular: true,
    features: [
      "Add 200 Products",
      "90 Days Time Limit",
      "Vendor Dashboard",
      "Sales Statistics",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: "$29",
    features: [
      "Add Unlimited Products",
      "No Time Limit",
      "Vendor Dashboard",
      "Sales Statistics",
    ],
  },
];

export default function SelectMembershipPlanView() {
  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col font-sans">
      {/* 1. Modesy Standard Vendor Header */}
      <VendorHeader />

      {/* 2. Main Pricing Section */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 md:py-16">
        {/* Title & Subtitle */}
        <div className="text-center mb-12">
          <h1 className="text-[26px] md:text-[30px] font-bold text-gray-800 tracking-tight">
            Select Your Plan
          </h1>
          <p className="text-[14px] text-gray-500 mt-1.5">
            Select your membership plan to continue
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start max-w-4xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="relative bg-white border border-[#e4e7ea] rounded-[4px] p-7 md:p-8 shadow-xs flex flex-col items-center overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              {/* Popular Corner Ribbon */}
              {plan.isPopular && (
                <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden pointer-events-none">
                  <div className="absolute transform rotate-45 bg-[#20c997] text-white text-[10.5px] font-bold py-1 right-[-36px] top-[18px] w-[130px] text-center shadow-xs uppercase tracking-wider">
                    Popular
                  </div>
                </div>
              )}

              {/* Plan Title */}
              <h2 className="text-[19px] font-bold text-gray-800 mt-2">
                {plan.name}
              </h2>

              {/* Plan Price */}
              <div className="my-5">
                <span className="text-[34px] font-extrabold text-[#f3525c] tracking-tight">
                  {plan.price}
                </span>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 my-6 text-[13px] text-gray-700 w-full max-w-[190px] mx-auto">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-gray-700 stroke-[2.5] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <div className="w-full mt-4">
                {plan.isDisabled ? (
                  <>
                    <button
                      type="button"
                      disabled
                      className="w-full py-2.5 bg-[#78cfc3] text-white text-[13px] font-medium rounded-[3px] cursor-not-allowed select-none shadow-xs"
                    >
                      Choose Plan
                    </button>
                    {plan.disabledReason && (
                      <p className="text-[11px] text-gray-400 mt-2.5 text-center leading-normal">
                        {plan.disabledReason}
                      </p>
                    )}
                  </>
                ) : (
                  <Link
                    href="/dashboard/membership_payments"
                    className="w-full block py-2.5 bg-[#20c997] hover:bg-[#1bb285] text-white text-[13px] font-medium rounded-[3px] text-center transition-colors shadow-xs"
                  >
                    Choose Plan
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 3. Modesy Footer */}
      <ModesyFooter />
    </div>
  );
}
