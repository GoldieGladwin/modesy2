import React from "react";
import MyCouponsView from "@/components/coupons/MyCouponsView";

export const metadata = {
  title: "My Coupons - Modesy",
  description: "View and manage your store coupons and discount promotions.",
};

export default function VendorMyCouponsPage() {
  return <MyCouponsView isVendor={true} />;
}
