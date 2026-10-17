"use client";

import React from "react";

// Standard Card Logos
export const VisaLogo = () => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-gray-200 bg-white shadow-2xs">
    <span className="font-extrabold text-[12px] italic tracking-tighter text-[#1a1f71]">
      VISA
    </span>
  </span>
);

export const MastercardLogo = () => (
  <span className="inline-flex items-center px-1 py-0.5 rounded border border-gray-200 bg-white shadow-2xs">
    <span className="flex items-center -space-x-1.5">
      <span className="w-3.5 h-3.5 rounded-full bg-[#eb001b] inline-block" />
      <span className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] inline-block opacity-90" />
    </span>
  </span>
);

export const AmexLogo = () => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#006fcf] text-white shadow-2xs">
    <span className="font-bold text-[9px] uppercase tracking-tighter">
      AMEX
    </span>
  </span>
);

export const DiscoverLogo = () => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-gray-200 bg-white shadow-2xs">
    <span className="font-bold text-[9px] text-[#ff6000] tracking-tight">
      DISCOVER
    </span>
  </span>
);

export const JcbLogo = () => (
  <span className="inline-flex items-center px-1 py-0.5 rounded border border-gray-200 bg-white shadow-2xs">
    <span className="font-bold text-[9px] tracking-tight text-[#0060ac]">
      JCB
    </span>
  </span>
);

export const DinersClubLogo = () => (
  <span className="inline-flex items-center px-1 py-0.5 rounded border border-gray-200 bg-white shadow-2xs">
    <span className="font-semibold text-[8px] text-[#004a97]">
      Diners
    </span>
  </span>
);

export const VerveLogo = () => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#ee3124] text-white shadow-2xs">
    <span className="font-bold text-[9px] italic">
      Verve
    </span>
  </span>
);

export const TroyLogo = () => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#102d69] text-white shadow-2xs">
    <span className="font-bold text-[9px]">
      troy
    </span>
  </span>
);

export const MirLogo = () => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#0f7547] text-white shadow-2xs">
    <span className="font-bold text-[9px]">
      МИР
    </span>
  </span>
);

export const MaestroLogo = () => (
  <span className="inline-flex items-center px-1 py-0.5 rounded border border-gray-200 bg-white shadow-2xs">
    <span className="flex items-center -space-x-1.5">
      <span className="w-3.5 h-3.5 rounded-full bg-[#0061a8] inline-block" />
      <span className="w-3.5 h-3.5 rounded-full bg-[#eb001b] inline-block opacity-90" />
    </span>
  </span>
);

export const BoletoLogo = () => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-gray-200 bg-white shadow-2xs">
    <span className="font-bold text-[9px] text-gray-800">
      Boleto
    </span>
  </span>
);

// Gateway Logos
export const PayPalLogo = () => (
  <span className="inline-flex items-center gap-1 font-bold italic text-[#003087] text-[13px]">
    <span className="text-[#0079c1]">Pay</span>
    <span>Pal</span>
  </span>
);

export const StripeLogo = () => (
  <span className="font-extrabold text-[13px] text-[#635bff] tracking-tight">
    stripe
  </span>
);

export const PaystackLogo = () => (
  <span className="inline-flex items-center gap-1 font-bold text-[#00c3f7] text-[12px]">
    <span className="w-2.5 h-2.5 bg-[#00c3f7] rounded-xs inline-block" />
    <span className="text-gray-900">paystack</span>
  </span>
);

export const IyzicoLogo = () => (
  <span className="font-bold text-[13px] text-[#1e3d59] tracking-tight">
    iyzico
  </span>
);

export const MidtransLogo = () => (
  <span className="inline-flex items-center gap-1 font-bold text-[#0070ba] text-[12px]">
    <span className="text-sky-500">|||</span>
    <span className="text-gray-800">midtrans</span>
  </span>
);

export const PayTabsLogo = () => (
  <span className="font-bold text-[12px] text-[#2c3e50] bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 text-teal-800">
    PayTabs
  </span>
);

export const YooMoneyLogo = () => (
  <span className="inline-flex items-center gap-1 font-bold text-[12px] text-purple-700">
    <span className="w-3 h-3 rounded-full bg-purple-600 text-white flex items-center justify-center text-[8px]">
      Ю
    </span>
    <span>money</span>
  </span>
);

export const MercadoPagoLogo = () => (
  <span className="inline-flex items-center gap-1 font-semibold text-[11px] text-[#009ee3]">
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
    <span>mercado pago</span>
  </span>
);
