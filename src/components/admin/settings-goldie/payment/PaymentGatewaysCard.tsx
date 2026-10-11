"use client";

import React, { useState } from "react";
import { PaymentGatewayKey, GatewayConfig } from "./types";

const GATEWAYS: { key: PaymentGatewayKey; name: string }[] = [
  { key: "paypal", name: "PayPal" },
  { key: "stripe", name: "Stripe" },
  { key: "paystack", name: "PayStack" },
  { key: "razorpay", name: "Razorpay" },
  { key: "flutterwave", name: "Flutterwave" },
  { key: "iyzico", name: "Iyzico" },
  { key: "midtrans", name: "Midtrans" },
  { key: "mercadopago", name: "Mercado Pago" },
  { key: "bank_transfer", name: "Bank Transfer" },
  { key: "cash_on_delivery", name: "Cash on Delivery" },
];

export default function PaymentGatewaysCard({
  onSave,
}: {
  onSave: (config: GatewayConfig) => void;
}) {
  const [activeGateway, setActiveGateway] =
    useState<PaymentGatewayKey>("paypal");

  const [configs, setConfigs] = useState<Record<PaymentGatewayKey, GatewayConfig>>({
    paypal: {
      key: "paypal",
      name: "PayPal",
      status: true,
      mode: "sandbox",
      clientId: "AYj_PayPal_Client_ID_Sample_9921820",
      secretKey: "EKx_PayPal_Secret_Key_Sample_8849201",
      appId: "APP-80W284485P519543T",
    },
    stripe: {
      key: "stripe",
      name: "Stripe",
      status: true,
      mode: "sandbox",
      clientId: "pk_test_sample",
      secretKey: "sk_test_sample",
    },
    paystack: { key: "paystack", name: "PayStack", status: false, mode: "sandbox", clientId: "", secretKey: "" },
    razorpay: { key: "razorpay", name: "Razorpay", status: false, mode: "sandbox", clientId: "", secretKey: "" },
    flutterwave: { key: "flutterwave", name: "Flutterwave", status: false, mode: "sandbox", clientId: "", secretKey: "" },
    iyzico: { key: "iyzico", name: "Iyzico", status: false, mode: "sandbox", clientId: "", secretKey: "" },
    midtrans: { key: "midtrans", name: "Midtrans", status: false, mode: "sandbox", clientId: "", secretKey: "" },
    mercadopago: { key: "mercadopago", name: "Mercado Pago", status: false, mode: "sandbox", clientId: "", secretKey: "" },
    bank_transfer: { key: "bank_transfer", name: "Bank Transfer", status: true, mode: "production", clientId: "", secretKey: "" },
    cash_on_delivery: { key: "cash_on_delivery", name: "Cash on Delivery", status: true, mode: "production", clientId: "", secretKey: "" },
  });

  const current = configs[activeGateway];

  const updateCurrent = (fields: Partial<GatewayConfig>) => {
    setConfigs((prev) => ({
      ...prev,
      [activeGateway]: { ...prev[activeGateway], ...fields },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(current);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-[3px] shadow-2xs overflow-hidden">
      {/* Top Tabs */}
      <div className="flex items-center overflow-x-auto border-b border-gray-200 bg-[#f9fafb] text-xs">
        {GATEWAYS.map((g) => {
          const isActive = g.key === activeGateway;
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => setActiveGateway(g.key)}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition cursor-pointer border-b-2 ${
                isActive
                  ? "bg-white text-[#007bff] border-[#007bff]"
                  : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {g.name}
            </button>
          );
        })}
      </div>

      {/* Gateway Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Gateway Logo */}
        <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold italic tracking-tight text-[#003087]">
              Pay<span className="text-[#0079c1]">Pal</span>
            </span>
            <span className="text-xs text-gray-400 font-normal">Payment Gateway Configuration</span>
          </div>
        </div>

        {/* Status Radio */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Status
          </label>
          <div className="flex items-center gap-6 text-xs text-gray-700">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`status-${current.key}`}
                checked={current.status}
                onChange={() => updateCurrent({ status: true })}
                className="text-[#007bff]"
              />
              <span>Enable</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`status-${current.key}`}
                checked={!current.status}
                onChange={() => updateCurrent({ status: false })}
                className="text-[#007bff]"
              />
              <span>Disable</span>
            </label>
          </div>
        </div>

        {/* Mode Radio */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Mode
          </label>
          <div className="flex items-center gap-6 text-xs text-gray-700">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`mode-${current.key}`}
                checked={current.mode === "production"}
                onChange={() => updateCurrent({ mode: "production" })}
                className="text-[#007bff]"
              />
              <span>Production</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`mode-${current.key}`}
                checked={current.mode === "sandbox"}
                onChange={() => updateCurrent({ mode: "sandbox" })}
                className="text-[#007bff]"
              />
              <span>Sandbox</span>
            </label>
          </div>
        </div>

        {/* Client ID */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Client ID
          </label>
          <input
            type="text"
            value={current.clientId}
            onChange={(e) => updateCurrent({ clientId: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 font-mono focus:outline-none focus:border-[#00a99d]"
          />
        </div>

        {/* Secret Key */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Secret Key
          </label>
          <input
            type="password"
            value={current.secretKey}
            onChange={(e) => updateCurrent({ secretKey: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 font-mono focus:outline-none focus:border-[#00a99d]"
          />
        </div>

        {/* App ID (Only for Payouts) */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            App ID <span className="font-normal text-gray-400">(Only for Payouts)</span>
          </label>
          <input
            type="text"
            value={current.appId || ""}
            onChange={(e) => updateCurrent({ appId: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 font-mono focus:outline-none focus:border-[#00a99d]"
          />
        </div>

        <div className="flex justify-end pt-3 border-t border-gray-100">
          <button
            type="submit"
            className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-4 py-2 rounded-[3px] shadow-xs transition cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
