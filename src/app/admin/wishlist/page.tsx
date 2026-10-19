import React from "react";
import { Metadata } from "next";
import WishlistView from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist - Modesy - Admin",
  description: "View and manage products in your wishlist.",
};

export default function AdminWishlistPage() {
  return <WishlistView role="admin" hideHeaderFooter={true} />;
}
