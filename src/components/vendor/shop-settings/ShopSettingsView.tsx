"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2, ChevronDown, Maximize2, Code, Eye, Undo, Redo, Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify, MoreHorizontal } from "lucide-react";

export default function ShopSettingsView() {
  // Left Card 1: Shop Settings Form
  const [shopName, setShopName] = useState("Trendshop");
  const [shopDescription, setShopDescription] = useState(
    "Welcome to our store! We offer a wide range of high-quality products to meet all your needs, from the latest electronics and gadgets to stylish clothing and accessories."
  );
  const [showWhatsApp, setShowWhatsApp] = useState<"yes" | "no">("yes");
  const [whatsAppNumber, setWhatsAppNumber] = useState("123");
  const [rssFeeds, setRssFeeds] = useState<"enable" | "disable">("enable");

  // Left Card 2: VAT
  const [fixedVat, setFixedVat] = useState(true);
  const [taxRate, setTaxRate] = useState("10");

  // Right Card 2: Vacation Mode
  const [vacationStatus, setVacationStatus] = useState<"enable" | "disable">("disable");
  const [vacationMessage, setVacationMessage] = useState("");

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveShopSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Shop settings saved successfully!");
  };

  const handleSaveVat = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("VAT settings saved successfully!");
  };

  const handleSaveVacation = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Vacation mode settings saved successfully!");
  };

  return (
    <div className="w-full">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-xs font-medium px-4 py-3 rounded shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Shop Settings & VAT (Col Span 7) */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Shop Settings */}
          <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
            <h1 className="text-[17px] font-semibold text-gray-800 mb-6">
              Shop Settings
            </h1>

            <form onSubmit={handleSaveShopSettings} className="space-y-5">
              {/* Shop Name */}
              <div>
                <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
                  Shop Name
                </label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13.5px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors"
                />
              </div>

              {/* Shop Description */}
              <div>
                <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
                  Shop Description
                </label>
                <textarea
                  rows={4}
                  value={shopDescription}
                  onChange={(e) => setShopDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-[3px] p-3 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors leading-relaxed min-h-[95px] resize-y"
                />
              </div>

              {/* Show WhatsApp Button */}
              <div>
                <label className="block text-[13px] text-gray-700 font-medium mb-2.5">
                  Show WhatsApp Button
                </label>
                <div className="flex items-center gap-10">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#444] font-normal group">
                    <input
                      type="radio"
                      name="whatsapp_btn"
                      value="yes"
                      checked={showWhatsApp === "yes"}
                      onChange={() => setShowWhatsApp("yes")}
                      className="sr-only"
                    />
                    <div
                      className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                        showWhatsApp === "yes"
                          ? "bg-[#20c997] border border-[#20c997]"
                          : "border border-[#c2c5c9] bg-white group-hover:border-[#999]"
                      }`}
                    >
                      {showWhatsApp === "yes" && (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                      )}
                    </div>
                    <span>Yes</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#444] font-normal group">
                    <input
                      type="radio"
                      name="whatsapp_btn"
                      value="no"
                      checked={showWhatsApp === "no"}
                      onChange={() => setShowWhatsApp("no")}
                      className="sr-only"
                    />
                    <div
                      className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                        showWhatsApp === "no"
                          ? "bg-[#20c997] border border-[#20c997]"
                          : "border border-[#c2c5c9] bg-white group-hover:border-[#999]"
                      }`}
                    >
                      {showWhatsApp === "no" && (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                      )}
                    </div>
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={whatsAppNumber}
                  onChange={(e) => setWhatsAppNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13.5px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors"
                />
              </div>

              {/* RSS Feeds */}
              <div>
                <label className="block text-[13px] text-gray-700 font-medium mb-2.5">
                  RSS Feeds
                </label>
                <div className="flex items-center gap-10">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#444] font-normal group">
                    <input
                      type="radio"
                      name="rss_feeds"
                      value="enable"
                      checked={rssFeeds === "enable"}
                      onChange={() => setRssFeeds("enable")}
                      className="sr-only"
                    />
                    <div
                      className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                        rssFeeds === "enable"
                          ? "bg-[#20c997] border border-[#20c997]"
                          : "border border-[#c2c5c9] bg-white group-hover:border-[#999]"
                      }`}
                    >
                      {rssFeeds === "enable" && (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                      )}
                    </div>
                    <span>Enable</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#444] font-normal group">
                    <input
                      type="radio"
                      name="rss_feeds"
                      value="disable"
                      checked={rssFeeds === "disable"}
                      onChange={() => setRssFeeds("disable")}
                      className="sr-only"
                    />
                    <div
                      className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                        rssFeeds === "disable"
                          ? "bg-[#20c997] border border-[#20c997]"
                          : "border border-[#c2c5c9] bg-white group-hover:border-[#999]"
                      }`}
                    >
                      {rssFeeds === "disable" && (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                      )}
                    </div>
                    <span>Disable</span>
                  </label>
                </div>
              </div>

              {/* Save Changes Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#20c997] hover:bg-[#1bb285] text-white text-[13px] font-medium rounded transition-colors shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Card 2: VAT (Value-Added Tax) */}
          <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
            <h2 className="text-[15px] font-semibold text-gray-800 leading-tight">
              VAT (Value-Added Tax)
            </h2>
            <p className="text-[12px] text-gray-400 mt-0.5 mb-5">
              Define VAT values for your products based on countries
            </p>

            <form onSubmit={handleSaveVat} className="space-y-5">
              {/* Checkbox: Set Fixed VAT Rate for All Countries */}
              <div>
                <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={fixedVat}
                    onChange={(e) => setFixedVat(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-[18px] h-[18px] rounded-[3px] flex items-center justify-center transition-all ${
                      fixedVat
                        ? "bg-[#20c997] border border-[#20c997]"
                        : "border border-[#ced4da] bg-white"
                    }`}
                  >
                    {fixedVat && (
                      <Check className="w-3 h-3 text-white stroke-[3.5]" />
                    )}
                  </div>
                  <span className="text-[13px] font-semibold text-gray-800">
                    Set Fixed VAT Rate for All Countries
                  </span>
                </label>
              </div>

              {/* Tax Rate(%) */}
              <div>
                <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
                  Tax Rate(%)
                </label>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-48 border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13.5px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors"
                />
              </div>

              {/* Save Changes Button */}
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#20c997] hover:bg-[#1bb285] text-white text-[13px] font-medium rounded transition-colors shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>

              {/* Warning Banner */}
              <div className="bg-[#e6f7f9] border border-[#bee5eb] rounded p-3 text-[12.5px] text-[#0c5460] leading-relaxed mt-4">
                <span className="font-bold">Warning! </span>
                The VAT rate you set for a country will apply to all states
                within that country. However, if you want a state to have its own
                unique tax rate, you can specify a different VAT rate for that
                state.
              </div>
            </form>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Membership Plan & Vacation Mode (Col Span 5) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Membership Plan */}
          <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
            <h2 className="text-[15px] font-semibold text-gray-800 mb-4">
              Membership Plan
            </h2>

            <div className="space-y-4">
              {/* Current Plan */}
              <div>
                <label className="block text-[12.5px] text-gray-700 font-medium mb-1.5">
                  Current Plan
                </label>
                <span className="inline-block bg-[#20c997] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  Professional (Number of Ads: Unlimited, Number of Days: Unlimited)
                </span>
              </div>

              {/* Plan Expiration Date */}
              <div>
                <label className="block text-[12.5px] text-gray-700 font-medium mb-0.5">
                  Plan Expiration Date
                </label>
                <span className="text-[12.5px] text-[#20c997] font-semibold">
                  Unlimited
                </span>
              </div>

              {/* Number of Remaining Ads */}
              <div>
                <label className="block text-[12.5px] text-gray-700 font-medium mb-0.5">
                  Number of Remaining Ads
                </label>
                <span className="text-[12.5px] text-[#20c997] font-semibold">
                  Unlimited
                </span>
              </div>

              {/* Renew Your Plan Button */}
              <div className="pt-2">
                <Link
                  href="/select-membership-plan"
                  className="w-full block py-2.5 bg-[#5b69bc] hover:bg-[#4d5aa6] text-white text-[13px] font-medium text-center rounded-[3px] transition-colors shadow-sm"
                >
                  Renew Your Plan
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Vacation Mode */}
          <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
            <h2 className="text-[15px] font-semibold text-gray-800 leading-tight">
              Vacation Mode
            </h2>
            <p className="text-[12px] text-gray-400 mt-0.5 mb-4">
              Vacation mode allows you to pause your store for a certain period
              of time
            </p>

            <form onSubmit={handleSaveVacation} className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-[13px] text-gray-700 font-medium mb-2.5">
                  Status
                </label>
                <div className="flex items-center gap-10">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#444] font-normal group">
                    <input
                      type="radio"
                      name="vacation_status"
                      value="enable"
                      checked={vacationStatus === "enable"}
                      onChange={() => setVacationStatus("enable")}
                      className="sr-only"
                    />
                    <div
                      className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                        vacationStatus === "enable"
                          ? "bg-[#20c997] border border-[#20c997]"
                          : "border border-[#c2c5c9] bg-white group-hover:border-[#999]"
                      }`}
                    >
                      {vacationStatus === "enable" && (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                      )}
                    </div>
                    <span>Enable</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#444] font-normal group">
                    <input
                      type="radio"
                      name="vacation_status"
                      value="disable"
                      checked={vacationStatus === "disable"}
                      onChange={() => setVacationStatus("disable")}
                      className="sr-only"
                    />
                    <div
                      className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                        vacationStatus === "disable"
                          ? "bg-[#20c997] border border-[#20c997]"
                          : "border border-[#c2c5c9] bg-white group-hover:border-[#999]"
                      }`}
                    >
                      {vacationStatus === "disable" && (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                      )}
                    </div>
                    <span>Disable</span>
                  </label>
                </div>
              </div>

              {/* Vacation Message */}
              <div>
                <label className="block text-[13px] text-gray-700 font-medium mb-2">
                  Vacation Message
                </label>

                {/* Editor Box */}
                <div className="border border-[#ced4da] rounded-[3px] overflow-hidden bg-white shadow-xs focus-within:border-[#20c997] transition-colors">
                  {/* Simplified TinyMCE toolbar */}
                  <div className="flex flex-wrap items-center gap-1 p-1.5 border-b border-gray-200 bg-gray-50/50 text-gray-600">
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <Maximize2 className="w-3 h-3" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <Code className="w-3 h-3" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <Eye className="w-3 h-3" />
                    </button>
                    <span className="w-[1px] h-3.5 bg-gray-300 mx-0.5" />
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <Undo className="w-3 h-3" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <Redo className="w-3 h-3" />
                    </button>
                    <span className="w-[1px] h-3.5 bg-gray-300 mx-0.5" />
                    <button type="button" className="p-1 hover:bg-gray-200 rounded font-bold">
                      <Bold className="w-3 h-3" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <Italic className="w-3 h-3" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <Underline className="w-3 h-3" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <Strikethrough className="w-3 h-3" />
                    </button>
                    <span className="w-[1px] h-3.5 bg-gray-300 mx-0.5" />
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <AlignLeft className="w-3 h-3" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <AlignCenter className="w-3 h-3" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <AlignRight className="w-3 h-3" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <AlignJustify className="w-3 h-3" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <MoreHorizontal className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Textarea Area */}
                  <textarea
                    rows={4}
                    value={vacationMessage}
                    onChange={(e) => setVacationMessage(e.target.value)}
                    className="w-full p-3 text-[13px] text-gray-800 outline-none min-h-[140px] resize-y"
                    placeholder=""
                  />

                  {/* Status Bar */}
                  <div className="px-3 py-1 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-[11px] text-gray-400 select-none">
                    <span className="font-mono">p</span>
                    <span className="flex items-center gap-1 text-[11px] font-sans text-gray-500">
                      <span className="font-medium">tiny</span>
                      <span className="text-[10px] text-gray-400">◢</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Save Changes Button */}
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#20c997] hover:bg-[#1bb285] text-white text-[13px] font-medium rounded transition-colors shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
