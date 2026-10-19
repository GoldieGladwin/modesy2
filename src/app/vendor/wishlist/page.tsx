import React from "react";
import { Metadata } from "next";
import WishlistView from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist - Modesy - Marketplace",
  description: "View and manage products in your wishlist.",
};

const VENDOR_USER = {
  name: "Trendshop",
  email: "trendshop@gmail.com",
  role: "vendor" as const,
  avatar: "/assets/img/trendshop-avatar.jpg",
};

export default function VendorWishlistPage() {
  return <WishlistView role="vendor" currentUser={VENDOR_USER} />;
}
