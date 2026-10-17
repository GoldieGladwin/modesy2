import React from "react";
import VendorMessagesView from "@/components/messages/VendorMessagesView";

export const metadata = {
  title: "Messages - Modesy",
  description: "Chat in real-time with customers and store contacts.",
};

export default function RootMessagesPage() {
  return <VendorMessagesView />;
}
