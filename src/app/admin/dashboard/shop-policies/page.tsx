import React from "react";
import { ShopPoliciesCard } from "@/components/admin/dashboard/shop-policies";

export const metadata = {
  title: "Shop Policies - Admin Dashboard",
};

export default function AdminDashboardShopPoliciesPage() {
  return (
    <div className="max-w-7xl font-sans">
      <ShopPoliciesCard />
    </div>
  );
}
