"use client";

import React, { useState } from "react";
import PaymentGatewaysCard from "./PaymentGatewaysCard";
import CommissionTaxCard from "./CommissionTaxCard";
import PayoutLimitCard from "./PayoutLimitCard";
import VatRatesCard from "./VatRatesCard";
import BankTransferCard from "./BankTransferCard";

export default function PaymentSettings() {
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
        Payment Settings
      </h1>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-xs">
          <span>{notification}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-[#155724] font-bold text-sm cursor-pointer ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* 1. Payment Gateways Tabs Card */}
      <PaymentGatewaysCard
        onSave={(c) =>
          showNotification(`Payment Gateway "${c.name}" settings saved.`)
        }
      />

      {/* 2. Middle Row: Commission & Tax + Payout Limit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <CommissionTaxCard
          onSave={() => showNotification("Commission & Tax settings saved.")}
        />
        <PayoutLimitCard
          onSave={() => showNotification("Payout Limit settings saved.")}
        />
      </div>

      {/* 3. Bottom Row: VAT / Tax Rates + Bank Accounts Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <VatRatesCard onAddTax={() => alert("Open Add Tax Rate modal")} />
        <BankTransferCard
          onSave={() =>
            showNotification("Bank Transfer accounts information saved.")
          }
        />
      </div>
    </div>
  );
}
