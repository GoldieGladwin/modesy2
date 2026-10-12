"use client";

import React from "react";

interface AddProductWizardProps {
  currentStep?: number;
}

export default function AddProductWizard({ currentStep = 1 }: AddProductWizardProps) {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-[#2d3748] mb-6">Add Product</h1>

      {/* Steps Indicator */}
      <div className="flex items-center justify-center w-full max-w-md relative">
        {/* Step 1 */}
        <div className="flex flex-col items-center z-10">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white transition-colors ${
              currentStep >= 1 ? "bg-[#00a99d]" : "bg-[#cbd5e0]"
            }`}
          >
            1
          </div>
          <span className="text-xs font-medium text-[#2d3748] mt-2 whitespace-nowrap">
            General Information
          </span>
        </div>

        {/* Connecting Line */}
        <div className="flex-1 h-[2px] mx-4 relative top-[-10px]">
          <div className="w-full h-full bg-[#e2e8f0]">
            <div
              className={`h-full bg-[#00a99d] transition-all duration-300 ${
                currentStep > 1 ? "w-full" : "w-1/2"
              }`}
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center z-10">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white transition-colors ${
              currentStep >= 2 ? "bg-[#00a99d]" : "bg-[#cbd5e0]"
            }`}
          >
            2
          </div>
          <span className="text-xs font-medium text-[#718096] mt-2 whitespace-nowrap">
            Details
          </span>
        </div>
      </div>
    </div>
  );
}
