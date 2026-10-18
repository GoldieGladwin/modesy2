import React from "react";
import WalletView from "@/components/admin/wallet/WalletView";

export const metadata = {
  title: "Wallet - Modesy",
  description: "Modesy Admin Wallet balance, earnings, deposits, expenses, payouts, and withdrawal settings.",
};

export default function AdminWalletPage() {
  return <WalletView />;
}
