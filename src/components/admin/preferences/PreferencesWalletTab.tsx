"use client";

import React from "react";
import PreferencesRadioGroup from "./PreferencesRadioGroup";
import { WalletPreferences } from "./types";
import { DEFAULT_WALLET_PREFERENCES } from "./initialData";

interface PreferencesWalletTabProps {
  preferences?: WalletPreferences;
  onChange?: (updated: WalletPreferences) => void;
}

export default function PreferencesWalletTab({
  preferences = DEFAULT_WALLET_PREFERENCES,
  onChange,
}: PreferencesWalletTabProps) {
  const updateField = <K extends keyof WalletPreferences>(
    key: K,
    val: WalletPreferences[K]
  ) => {
    onChange?.({ ...preferences, [key]: val });
  };

  return (
    <div className="space-y-4">
      {/* 1. Wallet */}
      <PreferencesRadioGroup<boolean>
        label="Wallet"
        value={preferences.wallet}
        onChange={(val) => updateField("wallet", val)}
      />

      {/* 2. Wallet Deposit */}
      <PreferencesRadioGroup<boolean>
        label="Wallet Deposit"
        value={preferences.walletDeposit}
        onChange={(val) => updateField("walletDeposit", val)}
      />

      {/* 3. Paying with Wallet Balance */}
      <PreferencesRadioGroup<boolean>
        label="Paying with Wallet Balance"
        value={preferences.payWithWallet}
        onChange={(val) => updateField("payWithWallet", val)}
      />

      {/* 4. Minimum Deposit Amount */}
      <div className="pt-1">
        <label
          htmlFor="wallet-min-deposit-input"
          className="block text-[13px] font-semibold text-[#555555] mb-1.5"
        >
          Minimum Deposit Amount
        </label>
        <div className="flex w-full">
          <span className="inline-flex items-center px-3.5 py-2 bg-[#f4f4f4] border border-r-0 border-[#d2d6de] text-[13px] text-[#555555] font-medium rounded-l-[3px] select-none">
            USD ($)
          </span>
          <input
            id="wallet-min-deposit-input"
            type="number"
            value={preferences.minDepositAmount}
            onChange={(e) => updateField("minDepositAmount", e.target.value)}
            className="flex-1 border border-[#d2d6de] rounded-r-[3px] px-3.5 py-2 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
          />
        </div>
      </div>
    </div>
  );
}
