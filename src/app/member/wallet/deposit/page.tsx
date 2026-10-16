import React, { Suspense } from "react";
import DepositCheckoutView from "@/components/member/wallet/DepositCheckoutView";

export const metadata = {
  title: "Checkout - Modesy",
  description: "Deposit funds checkout payment on Modesy.",
};

export default function DepositCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-sm text-gray-500">Loading checkout...</div>
        </div>
      }
    >
      <DepositCheckoutView />
    </Suspense>
  );
}
