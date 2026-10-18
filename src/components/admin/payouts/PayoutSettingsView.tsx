"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import CustomRadio from "./CustomRadio";
import { PayoutSettingsData, MethodPayoutSetting } from "./types";
import {
  DEFAULT_PAYOUT_SETTINGS,
  getStoredPayoutSettings,
  saveSinglePayoutSetting,
} from "./payoutsData";

export default function PayoutSettingsView() {
  const [settings, setSettings] = useState<PayoutSettingsData>(
    DEFAULT_PAYOUT_SETTINGS
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setSettings(getStoredPayoutSettings());
  }, []);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveMethod = (
    methodKey: keyof PayoutSettingsData,
    methodName: string
  ) => {
    const methodSetting = settings[methodKey];
    saveSinglePayoutSetting(methodKey, methodSetting);
    triggerToast(`${methodName} payout settings saved successfully!`);
  };

  const updateSetting = (
    methodKey: keyof PayoutSettingsData,
    field: keyof MethodPayoutSetting,
    value: unknown
  ) => {
    setSettings((prev) => ({
      ...prev,
      [methodKey]: {
        ...prev[methodKey],
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Title */}
      <div>
        <h1 className="text-[17px] font-normal text-[#333333] mb-4">
          Payout Settings
        </h1>
      </div>

      {/* 2x2 GRID OF CARDS (Matches Screenshot 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CARD 1: PayPal */}
        <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5">
          <h2 className="text-[15px] font-normal text-[#333333] pb-3 border-b border-[#f4f4f4] mb-4">
            PayPal
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveMethod("paypal", "PayPal");
            }}
            className="space-y-4"
          >
            {/* Status */}
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-2">
                Status
              </label>
              <div className="flex items-center gap-6">
                <CustomRadio
                  name="paypal_status"
                  label="Enable"
                  value="Enable"
                  checked={settings.paypal.status === "Enable"}
                  onChange={(val) =>
                    updateSetting("paypal", "status", val)
                  }
                />
                <CustomRadio
                  name="paypal_status"
                  label="Disable"
                  value="Disable"
                  checked={settings.paypal.status === "Disable"}
                  onChange={(val) =>
                    updateSetting("paypal", "status", val)
                  }
                />
              </div>
            </div>

            {/* Minimum payout amount */}
            <div>
              <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
                Minimum payout amount
              </label>
              <div className="flex rounded-[3px] overflow-hidden border border-[#d2d6de] focus-within:border-[#0073b7] transition-colors">
                <span className="inline-flex items-center px-3.5 bg-[#eee] border-r border-[#d2d6de] text-[13px] text-[#555] font-normal select-none">
                  USD ($)
                </span>
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={settings.paypal.minAmount}
                  onChange={(e) =>
                    updateSetting(
                      "paypal",
                      "minAmount",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  required
                  className="w-full bg-white px-3 py-2 text-[13px] text-[#444] focus:outline-none"
                />
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer shadow-2xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* CARD 2: Bitcoin (BTC) */}
        <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5">
          <h2 className="text-[15px] font-normal text-[#333333] pb-3 border-b border-[#f4f4f4] mb-4">
            Bitcoin (BTC)
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveMethod("bitcoin", "Bitcoin (BTC)");
            }}
            className="space-y-4"
          >
            {/* Status */}
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-2">
                Status
              </label>
              <div className="flex items-center gap-6">
                <CustomRadio
                  name="bitcoin_status"
                  label="Enable"
                  value="Enable"
                  checked={settings.bitcoin.status === "Enable"}
                  onChange={(val) =>
                    updateSetting("bitcoin", "status", val)
                  }
                />
                <CustomRadio
                  name="bitcoin_status"
                  label="Disable"
                  value="Disable"
                  checked={settings.bitcoin.status === "Disable"}
                  onChange={(val) =>
                    updateSetting("bitcoin", "status", val)
                  }
                />
              </div>
            </div>

            {/* Minimum payout amount */}
            <div>
              <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
                Minimum payout amount
              </label>
              <div className="flex rounded-[3px] overflow-hidden border border-[#d2d6de] focus-within:border-[#0073b7] transition-colors">
                <span className="inline-flex items-center px-3.5 bg-[#eee] border-r border-[#d2d6de] text-[13px] text-[#555] font-normal select-none">
                  USD ($)
                </span>
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={settings.bitcoin.minAmount}
                  onChange={(e) =>
                    updateSetting(
                      "bitcoin",
                      "minAmount",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  required
                  className="w-full bg-white px-3 py-2 text-[13px] text-[#444] focus:outline-none"
                />
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer shadow-2xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* CARD 3: IBAN */}
        <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5">
          <h2 className="text-[15px] font-normal text-[#333333] pb-3 border-b border-[#f4f4f4] mb-4">
            IBAN
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveMethod("iban", "IBAN");
            }}
            className="space-y-4"
          >
            {/* Status */}
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-2">
                Status
              </label>
              <div className="flex items-center gap-6">
                <CustomRadio
                  name="iban_status"
                  label="Enable"
                  value="Enable"
                  checked={settings.iban.status === "Enable"}
                  onChange={(val) =>
                    updateSetting("iban", "status", val)
                  }
                />
                <CustomRadio
                  name="iban_status"
                  label="Disable"
                  value="Disable"
                  checked={settings.iban.status === "Disable"}
                  onChange={(val) =>
                    updateSetting("iban", "status", val)
                  }
                />
              </div>
            </div>

            {/* Minimum payout amount */}
            <div>
              <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
                Minimum payout amount
              </label>
              <div className="flex rounded-[3px] overflow-hidden border border-[#d2d6de] focus-within:border-[#0073b7] transition-colors">
                <span className="inline-flex items-center px-3.5 bg-[#eee] border-r border-[#d2d6de] text-[13px] text-[#555] font-normal select-none">
                  USD ($)
                </span>
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={settings.iban.minAmount}
                  onChange={(e) =>
                    updateSetting(
                      "iban",
                      "minAmount",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  required
                  className="w-full bg-white px-3 py-2 text-[13px] text-[#444] focus:outline-none"
                />
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer shadow-2xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* CARD 4: SWIFT */}
        <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5">
          <h2 className="text-[15px] font-normal text-[#333333] pb-3 border-b border-[#f4f4f4] mb-4">
            SWIFT
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveMethod("swift", "SWIFT");
            }}
            className="space-y-4"
          >
            {/* Status */}
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-2">
                Status
              </label>
              <div className="flex items-center gap-6">
                <CustomRadio
                  name="swift_status"
                  label="Enable"
                  value="Enable"
                  checked={settings.swift.status === "Enable"}
                  onChange={(val) =>
                    updateSetting("swift", "status", val)
                  }
                />
                <CustomRadio
                  name="swift_status"
                  label="Disable"
                  value="Disable"
                  checked={settings.swift.status === "Disable"}
                  onChange={(val) =>
                    updateSetting("swift", "status", val)
                  }
                />
              </div>
            </div>

            {/* Minimum payout amount */}
            <div>
              <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
                Minimum payout amount
              </label>
              <div className="flex rounded-[3px] overflow-hidden border border-[#d2d6de] focus-within:border-[#0073b7] transition-colors">
                <span className="inline-flex items-center px-3.5 bg-[#eee] border-r border-[#d2d6de] text-[13px] text-[#555] font-normal select-none">
                  USD ($)
                </span>
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={settings.swift.minAmount}
                  onChange={(e) =>
                    updateSetting(
                      "swift",
                      "minAmount",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  required
                  className="w-full bg-white px-3 py-2 text-[13px] text-[#444] focus:outline-none"
                />
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer shadow-2xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
