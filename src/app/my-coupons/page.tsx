import React from "react";
import MyCouponsView from "@/components/coupons/MyCouponsView";

export const metadata = {
  title: "My Coupons - Modesy",
  description: "View and manage your coupons and discount promotions.",
};

export default function MyCouponsPage() {
  return <MyCouponsView isVendor={true} />;
}
