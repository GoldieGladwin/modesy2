"use client";

import React, { useState } from "react";
import { Plus, Check, Edit2, Trash2 } from "lucide-react";

interface PlanFeature {
  id: number;
  textEn: string;
  textAr: string;
}

interface MembershipPlan {
  id: number;
  name: string;
  price: string;
  isPopular?: boolean;
  features: string[];
}

export default function MembershipPlansPage() {
  // Form State: Left Card
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [numberOfAds, setNumberOfAds] = useState("");
  const [adsUnlimited, setAdsUnlimited] = useState(false);
  const [duration, setDuration] = useState("");
  const [durationUnlimited, setDurationUnlimited] = useState(false);
  const [price, setPrice] = useState("0");
  const [isFree, setIsFree] = useState(false);
  const [order, setOrder] = useState("");
  const [isPopular, setIsPopular] = useState(false);

  // Dynamic Features input
  const [featuresList, setFeaturesList] = useState<PlanFeature[]>([
    { id: 1, textEn: "", textAr: "" },
  ]);

  // Settings State: Right Card
  const [status, setStatus] = useState<"Enable" | "Disable">("Enable");
  const [allowMultipleFree, setAllowMultipleFree] = useState<"Yes" | "No">("No");

  // Mock Plans List
  const [plans, setPlans] = useState<MembershipPlan[]>([
    {
      id: 1,
      name: "Start",
      price: "Free",
      features: [
        "Add 5 Products",
        "30 Days Time Limit",
        "Vendor Dashboard",
        "Sales Statistics",
      ],
    },
    {
      id: 2,
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
      id: 3,
      name: "Professional",
      price: "$29",
      features: [
        "Add Unlimited Products",
        "No Time Limit",
        "Vendor Dashboard",
        "Sales Statistics",
      ],
    },
  ]);

  const handleAddFeatureField = () => {
    setFeaturesList((prev) => [
      ...prev,
      { id: Date.now(), textEn: "", textAr: "" },
    ]);
  };

  const handleSaveSettings = () => {
    alert("Membership settings saved successfully!");
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim()) {
      alert("Please fill out the plan title.");
      return;
    }
    const newPlan: MembershipPlan = {
      id: Date.now(),
      name: titleEn,
      price: isFree ? "Free" : `$${price || "0"}`,
      isPopular,
      features: [
        adsUnlimited ? "Add Unlimited Products" : `Add ${numberOfAds || "10"} Products`,
        durationUnlimited ? "No Time Limit" : `${duration || "30"} Days Time Limit`,
        "Vendor Dashboard",
        "Sales Statistics",
      ],
    };
    setPlans((prev) => [...prev, newPlan]);
    // Reset form
    setTitleEn("");
    setTitleAr("");
    setNumberOfAds("");
    setDuration("");
    setPrice("0");
    setOrder("");
    setIsPopular(false);
    alert("New membership plan created!");
  };

  const handleDeletePlan = (id: number) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      setPlans((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="w-full space-y-7">
      {/* SECTION 1: TOP FORMS (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT COLUMN: Create a New Plan (Span 2) */}
        <div className="lg:col-span-2 bg-white border border-[#e4e6eb] rounded-sm shadow-xs p-6">
          <h2 className="text-base font-semibold text-[#333333] mb-4">
            Create a New Plan
          </h2>

          <form onSubmit={handleCreatePlan} className="space-y-4 text-xs text-[#333333]">
            {/* Title (English & Arabic) */}
            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1.5">
                Title
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="English"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full border border-[#cccccc] rounded-xs px-3 py-2 text-xs text-[#333333] focus:outline-hidden focus:border-[#17a2b8]"
                />
                <input
                  type="text"
                  placeholder="Arabic"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  className="w-full border border-[#cccccc] rounded-xs px-3 py-2 text-xs text-[#333333] focus:outline-hidden focus:border-[#17a2b8]"
                />
              </div>
            </div>

            {/* Number of Ads */}
            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1.5">
                Number of Ads
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="E.g: 10"
                  value={numberOfAds}
                  onChange={(e) => setNumberOfAds(e.target.value)}
                  disabled={adsUnlimited}
                  className="flex-1 border border-[#cccccc] rounded-xs px-3 py-2 text-xs text-[#333333] focus:outline-hidden focus:border-[#17a2b8] disabled:bg-gray-100"
                />
                <label className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer select-none whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={adsUnlimited}
                    onChange={(e) => setAdsUnlimited(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#17a2b8] focus:ring-0 cursor-pointer"
                  />
                  <span>Unlimited</span>
                </label>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1.5">
                Duration (A time limit for the plan)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Number of Days (E.g: 30)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  disabled={durationUnlimited}
                  className="flex-1 border border-[#cccccc] rounded-xs px-3 py-2 text-xs text-[#333333] focus:outline-hidden focus:border-[#17a2b8] disabled:bg-gray-100"
                />
                <label className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer select-none whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={durationUnlimited}
                    onChange={(e) => setDurationUnlimited(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#17a2b8] focus:ring-0 cursor-pointer"
                  />
                  <span>Unlimited</span>
                </label>
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1.5">
                Price
              </label>
              <div className="flex items-center gap-3">
                <div className="flex flex-1 items-center border border-[#cccccc] rounded-xs overflow-hidden">
                  <span className="bg-[#f8f9fa] border-r border-[#cccccc] px-3 py-2 text-xs text-gray-600 font-medium">
                    USD ($)
                  </span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={isFree}
                    className="flex-1 px-3 py-2 text-xs text-[#333333] focus:outline-hidden disabled:bg-gray-100"
                  />
                </div>
                <label className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer select-none whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={isFree}
                    onChange={(e) => setIsFree(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#17a2b8] focus:ring-0 cursor-pointer"
                  />
                  <span>Free</span>
                </label>
              </div>
            </div>

            {/* Order */}
            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1.5">
                Order
              </label>
              <input
                type="number"
                placeholder="Order"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-full border border-[#cccccc] rounded-xs px-3 py-2 text-xs text-[#333333] focus:outline-hidden focus:border-[#17a2b8]"
              />
            </div>

            {/* Popular Checkbox */}
            <div>
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#17a2b8] focus:ring-0 cursor-pointer"
                />
                <span>Popular</span>
              </label>
            </div>

            {/* Features Sub-section */}
            <div className="pt-2 border-t border-gray-100 space-y-3">
              <label className="block text-xs font-semibold text-[#333333]">
                Features
              </label>

              {featuresList.map((f, idx) => (
                <div key={f.id} className="space-y-1.5">
                  <span className="text-[11px] text-gray-500 font-medium">Feature</span>
                  <input
                    type="text"
                    placeholder="English"
                    value={f.textEn}
                    onChange={(e) => {
                      const updated = [...featuresList];
                      updated[idx].textEn = e.target.value;
                      setFeaturesList(updated);
                    }}
                    className="w-full border border-[#cccccc] rounded-xs px-3 py-2 text-xs text-[#333333] focus:outline-hidden focus:border-[#17a2b8]"
                  />
                  <input
                    type="text"
                    placeholder="Arabic"
                    value={f.textAr}
                    onChange={(e) => {
                      const updated = [...featuresList];
                      updated[idx].textAr = e.target.value;
                      setFeaturesList(updated);
                    }}
                    className="w-full border border-[#cccccc] rounded-xs px-3 py-2 text-xs text-[#333333] focus:outline-hidden focus:border-[#17a2b8]"
                  />
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddFeatureField}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Feature</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer shadow-xs"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Settings Card (Span 1) */}
        <div className="bg-white border border-[#e4e6eb] rounded-sm shadow-xs p-6 space-y-5">
          <h2 className="text-base font-semibold text-[#333333] pb-2 border-b border-gray-100">
            Settings
          </h2>

          {/* Status Radio */}
          <div className="space-y-2 text-xs">
            <label className="block text-xs font-semibold text-[#333333]">
              Status
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="membership_status"
                  checked={status === "Enable"}
                  onChange={() => setStatus("Enable")}
                  className="w-4 h-4 text-[#17a2b8] focus:ring-0 cursor-pointer"
                />
                <span className="text-gray-700">Enable</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="membership_status"
                  checked={status === "Disable"}
                  onChange={() => setStatus("Disable")}
                  className="w-4 h-4 text-[#17a2b8] focus:ring-0 cursor-pointer"
                />
                <span className="text-gray-700">Disable</span>
              </label>
            </div>
          </div>

          {/* Allow Free Plan to be Used Multiple Times */}
          <div className="space-y-2 text-xs">
            <label className="block text-xs font-semibold text-[#333333] leading-snug">
              Allow Free Plan to be Used Multiple Times
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="multiple_free"
                  checked={allowMultipleFree === "Yes"}
                  onChange={() => setAllowMultipleFree("Yes")}
                  className="w-4 h-4 text-[#17a2b8] focus:ring-0 cursor-pointer"
                />
                <span className="text-gray-700">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="multiple_free"
                  checked={allowMultipleFree === "No"}
                  onChange={() => setAllowMultipleFree("No")}
                  className="w-4 h-4 text-[#17a2b8] focus:ring-0 cursor-pointer"
                />
                <span className="text-gray-700">No</span>
              </label>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: MEMBERSHIP PLANS PRICING CARDS */}
      <div className="space-y-4">
        <h2 className="text-xl font-normal text-[#333333]">
          Membership Plans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative bg-white border border-[#e4e6eb] rounded-sm shadow-xs p-8 flex flex-col items-center justify-between text-center overflow-hidden"
            >
              {/* Popular Ribbon on top right */}
              {plan.isPopular && (
                <div className="absolute top-4 -right-10 bg-[#20c997] text-white text-[11px] font-semibold py-1 px-12 rotate-45 shadow-xs uppercase tracking-wider">
                  Popular
                </div>
              )}

              {/* Plan Name */}
              <div className="w-full">
                <h3 className="text-2xl font-bold text-[#333333] mb-4">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="text-4xl font-bold text-[#e05656] my-6">
                  {plan.price}
                </div>

                {/* Features List with Checkmarks */}
                <ul className="space-y-3.5 my-8 text-xs text-[#495057] text-left max-w-[220px] mx-auto">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-gray-700 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons (Edit & Trash) */}
              <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100 w-full">
                <button
                  type="button"
                  onClick={() => alert(`Edit plan ${plan.name}`)}
                  className="px-4 py-1.5 bg-white border border-[#ced4da] hover:bg-gray-50 text-gray-700 text-xs rounded-sm transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletePlan(plan.id)}
                  className="p-1.5 px-2.5 bg-white border border-[#ced4da] hover:bg-gray-50 text-gray-700 text-xs rounded-sm transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
