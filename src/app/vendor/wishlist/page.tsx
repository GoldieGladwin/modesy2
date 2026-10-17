import React from "react";
import { Metadata } from "next";
import WishlistView from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist - Modesy - Marketplace",
  description: "View and manage products in your wishlist.",
};

export default function VendorWishlistPage() {
  return <WishlistView />;
}
