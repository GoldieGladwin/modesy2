"use client";

import React, { useState } from "react";
import PreferencesTabNavigation from "./PreferencesTabNavigation";
import PreferencesSystemTab from "./PreferencesSystemTab";
import PreferencesGeneralTab from "./PreferencesGeneralTab";
import PreferencesProductsTab from "./PreferencesProductsTab";
import PreferencesShopTab from "./PreferencesShopTab";
import PreferencesWalletTab from "./PreferencesWalletTab";
import PreferencesFileUploadTab from "./PreferencesFileUploadTab";
import {
  PreferencesTab,
  SystemPreferences,
  ProductsPreferences,
  WalletPreferences,
  FileUploadPreferences,
  ShopPreferences,
  GeneralPreferences,
} from "./types";
import {
  DEFAULT_SYSTEM_PREFERENCES,
  DEFAULT_PRODUCTS_PREFERENCES,
  DEFAULT_WALLET_PREFERENCES,
  DEFAULT_FILE_UPLOAD_PREFERENCES,
  DEFAULT_SHOP_PREFERENCES,
  DEFAULT_GENERAL_PREFERENCES,
} from "./initialData";

export default function PreferencesMainCard() {
  const [activeTab, setActiveTab] = useState<PreferencesTab>("system");

  // Tab states
  const [systemPrefs, setSystemPrefs] = useState<SystemPreferences>(DEFAULT_SYSTEM_PREFERENCES);
  const [generalPrefs, setGeneralPrefs] = useState<GeneralPreferences>(DEFAULT_GENERAL_PREFERENCES);
  const [productsPrefs, setProductsPrefs] = useState<ProductsPreferences>(DEFAULT_PRODUCTS_PREFERENCES);
  const [shopPrefs, setShopPrefs] = useState<ShopPreferences>(DEFAULT_SHOP_PREFERENCES);
  const [walletPrefs, setWalletPrefs] = useState<WalletPreferences>(DEFAULT_WALLET_PREFERENCES);
  const [fileUploadPrefs, setFileUploadPrefs] = useState<FileUploadPreferences>(DEFAULT_FILE_UPLOAD_PREFERENCES);

  const handleSaveClick = () => {
    alert(`Success: ${activeTab.toUpperCase()} preferences have been saved!`);
  };

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[4px] shadow-2xs p-5 relative pb-16">
      {/* 1. Horizontal Tab Navigation */}
      <PreferencesTabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* 2. Active Tab Content */}
      <div className="min-h-[460px]">
        {activeTab === "system" && (
          <PreferencesSystemTab
            preferences={systemPrefs}
            onChange={setSystemPrefs}
          />
        )}
        {activeTab === "general" && (
          <PreferencesGeneralTab
            preferences={generalPrefs}
            onChange={setGeneralPrefs}
          />
        )}
        {activeTab === "products" && (
          <PreferencesProductsTab
            preferences={productsPrefs}
            onChange={setProductsPrefs}
          />
        )}
        {activeTab === "shop" && (
          <PreferencesShopTab
            preferences={shopPrefs}
            onChange={setShopPrefs}
          />
        )}
        {activeTab === "wallet" && (
          <PreferencesWalletTab
            preferences={walletPrefs}
            onChange={setWalletPrefs}
          />
        )}
        {activeTab === "file_upload" && (
          <PreferencesFileUploadTab
            preferences={fileUploadPrefs}
            onChange={setFileUploadPrefs}
          />
        )}
      </div>

      {/* 3. Save Changes Button (Bottom Right) */}
      <div className="absolute right-5 bottom-4">
        <button
          type="button"
          onClick={handleSaveClick}
          className="px-4 py-2 bg-[#007bff] hover:bg-[#0069d9] text-white rounded-[3px] text-[13px] font-semibold transition cursor-pointer shadow-2xs"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
