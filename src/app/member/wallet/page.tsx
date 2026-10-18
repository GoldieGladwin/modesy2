import React from "react";
import MemberWalletView from "@/components/member/wallet/MemberWalletView";

export const metadata = {
  title: "Wallet - Modesy",
  description: "Member wallet, deposits, expenses, payouts, and payout account settings on Modesy.",
};

export default function MemberWalletPage() {
  return <MemberWalletView />;
}
