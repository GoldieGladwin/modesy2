"use client";

import React from "react";
import PreferencesRadioGroup from "./PreferencesRadioGroup";
import { ShopPreferences } from "./types";
import { DEFAULT_SHOP_PREFERENCES } from "./initialData";

interface PreferencesShopTabProps {
  preferences?: ShopPreferences;
  onChange?: (updated: ShopPreferences) => void;
}

export default function PreferencesShopTab({
  preferences = DEFAULT_SHOP_PREFERENCES,
  onChange,
}: PreferencesShopTabProps) {
  const updateField = <K extends keyof ShopPreferences>(
    key: K,
    val: ShopPreferences[K]
  ) => {
    onChange?.({ ...preferences, [key]: val });
  };

  return (
    <div className="space-y-4">
      {/* 1. Refund System */}
      <PreferencesRadioGroup<boolean>
        label="Refund System"
        value={preferences.refundSystem}
        onChange={(val) => updateField("refundSystem", val)}
      />

      {/* 2. Show Number of Sales on Profile */}
      <PreferencesRadioGroup<boolean>
        label="Show Number of Sales on Profile"
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        value={preferences.showSalesOnProfile}
        onChange={(val) => updateField("showSalesOnProfile", val)}
      />

      {/* 3. Allow Vendors to Change Their Shop Name */}
      <PreferencesRadioGroup<boolean>
        label="Allow Vendors to Change Their Shop Name"
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        value={preferences.allowChangeShopName}
        onChange={(val) => updateField("allowChangeShopName", val)}
      />

      {/* 4. Enable WhatsApp Contact */}
      <PreferencesRadioGroup<boolean>
        label="Enable WhatsApp Contact"
        subtitle="Allow sellers to display a WhatsApp contact button on their product pages."
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        value={preferences.enableWhatsApp}
        onChange={(val) => updateField("enableWhatsApp", val)}
      />

      {/* 5. Show Customer Email to Seller */}
      <PreferencesRadioGroup<boolean>
        label="Show Customer Email to Seller"
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        value={preferences.showCustomerEmail}
        onChange={(val) => updateField("showCustomerEmail", val)}
      />

      {/* 6. Show Customer Phone Number to Seller */}
      <PreferencesRadioGroup<boolean>
        label="Show Customer Phone Number to Seller"
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        value={preferences.showCustomerPhone}
        onChange={(val) => updateField("showCustomerPhone", val)}
      />

      {/* 7. Auto-Approve Unapproved Orders (after x days) */}
      <PreferencesRadioGroup<boolean>
        label="Auto-Approve Unapproved Orders (after x days)"
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        value={preferences.autoApproveOrders}
        onChange={(val) => updateField("autoApproveOrders", val)}
      />

      {/* 8. Request Documents from Vendors to Open a Store */}
      <PreferencesRadioGroup<boolean>
        label="Request Documents from Vendors to Open a Store"
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        value={preferences.requestDocuments}
        onChange={(val) => updateField("requestDocuments", val)}
      />

      {/* 9. Input Explanation (E.g. ID Card) */}
      <div className="pt-1">
        <label
          htmlFor="shop-input-explanation"
          className="block text-[13px] font-semibold text-[#555555] mb-1.5"
        >
          Input Explanation (E.g. ID Card)
        </label>
        <textarea
          id="shop-input-explanation"
          rows={3}
          value={preferences.inputExplanation}
          onChange={(e) => updateField("inputExplanation", e.target.value)}
          className="w-full border border-[#d2d6de] rounded-[3px] px-3.5 py-2 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff] resize-y"
        />
      </div>
    </div>
  );
}
