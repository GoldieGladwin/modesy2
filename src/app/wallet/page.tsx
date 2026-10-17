import React from "react";
import WalletView from "@/components/admin/wallet/WalletView";

export const metadata = {
  title: "Wallet - Modesy",
  description: "View and manage your wallet balance, earnings, deposits, expenses, payouts, and withdrawal settings.",
};

export default function WalletPage() {
  return <WalletView initialBalance={793.52} shopName="Trendshop" />;
}
