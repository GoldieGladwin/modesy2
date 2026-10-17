"use client";

import React from "react";
import { WalletTabType } from "./types";

interface WalletTabsProps {
  activeTab: WalletTabType;
  onChangeTab: (tab: WalletTabType) => void;
}

const TABS: { id: WalletTabType; label: string }[] = [
  { id: "earnings", label: "Earnings" },
  { id: "deposits", label: "Deposits" },
  { id: "expenses", label: "Expenses" },
  { id: "payouts", label: "Payouts" },
  { id: "set-payout-account", label: "Set Payout Account" },
];

export default function WalletTabs({ activeTab, onChangeTab }: WalletTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
      {TABS.map((tab) => {
        const isActive =
          activeTab === tab.id ||
          (tab.id === "set-payout-account" && activeTab === "payout-account");
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChangeTab(tab.id)}
            className={`px-4 sm:px-5 py-2 text-[13px] font-medium rounded-[3px] transition-all cursor-pointer ${
              isActive
                ? "bg-[#00a99d] text-white border border-[#00a99d] shadow-xs"
                : "bg-[#f8f9fa] text-[#495057] border border-[#e4e7ea] hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
