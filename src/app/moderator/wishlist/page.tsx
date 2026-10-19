import React from "react";
import { Metadata } from "next";
import WishlistView from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist - Modesy - Moderator",
  description: "View and manage products in your wishlist.",
};

export default function ModeratorWishlistPage() {
  return <WishlistView role="moderator" hideHeaderFooter={true} />;
}
