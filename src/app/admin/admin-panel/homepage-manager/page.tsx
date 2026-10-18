"use client";

import React, { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { ModesyBannerItem } from "@/types/admin";

import FeaturedCategoriesManager from "@/components/admin/homepage-manager/FeaturedCategoriesManager";
import ProductsByCategoryManager from "@/components/admin/homepage-manager/ProductsByCategoryManager";
import HomepageBannersManager from "@/components/admin/homepage-manager/HomepageBannersManager";
import HomepageGeneralSettings from "@/components/admin/homepage-manager/HomepageGeneralSettings";
import EditBannerView from "@/components/admin/homepage-manager/EditBannerView";

export default function AdminHomepageManagerPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingBanner, setEditingBanner] = useState<ModesyBannerItem | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveBanner = (updated: ModesyBannerItem) => {
    setEditingBanner(null);
    showToast(`Banner #${updated.id} successfully updated!`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#222d32] text-white px-4 py-3 rounded-md shadow-xl flex items-center gap-3 border-l-4 border-[#00a99d] animate-fade-in text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#00a99d]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-gray-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* If editing banner, show the dedicated Edit Banner View */}
      {editingBanner ? (
        <EditBannerView
          banner={editingBanner}
          onBack={() => setEditingBanner(null)}
          onSave={handleSaveBanner}
        />
      ) : (
        <div className="space-y-6 animate-form-view">
          {/* Page Title */}
          <div>
            <h1 className="text-xl font-normal text-gray-700">Homepage Manager</h1>
          </div>

          {/* Row 1: Featured Categories (Left) & Products by Category (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <FeaturedCategoriesManager onNotify={showToast} />
            <ProductsByCategoryManager onNotify={showToast} />
          </div>

          {/* Row 2: Homepage Banners Table */}
          <div>
            <HomepageBannersManager
              onNotify={showToast}
              onEditBanner={(banner) => setEditingBanner(banner)}
            />
          </div>

          {/* Row 3: Settings Box */}
          <div>
            <HomepageGeneralSettings onNotify={showToast} />
          </div>
        </div>
      )}
    </div>
  );
}
