"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { List, ChevronDown, CheckCircle2 } from "lucide-react";
import { PayoutMethod, PayoutStatus } from "./types";
import {
  PAYOUT_USERS,
  addPayoutRequest,
} from "./payoutsData";

export default function AddPayoutView() {
  const router = useRouter();

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [withdrawalMethod, setWithdrawalMethod] = useState<string>("");
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId) {
      alert("Please select a user.");
      return;
    }
    if (!withdrawalMethod) {
      alert("Please select a withdrawal method.");
      return;
    }
    if (withdrawalAmount <= 0) {
      alert("Please enter a withdrawal amount greater than 0.");
      return;
    }
    if (!status) {
      alert("Please select a status.");
      return;
    }

    const user = PAYOUT_USERS.find((u) => u.id === Number(selectedUserId));
    if (!user) return;

    addPayoutRequest({
      userId: user.id,
      userName: user.name,
      userShop: user.shopName,
      userAvatar: user.avatar,
      withdrawalMethod: withdrawalMethod as PayoutMethod,
      withdrawalAmount: Number(withdrawalAmount),
      status: status as PayoutStatus,
      details: {
        email: user.email,
        bankName: "Standard Chartered",
        accountHolder: user.name,
        iban: "GB29NWBK60161331926819",
        swiftCode: "NWBKGB2L",
        btcAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      },
    });

    setToastMessage("Payout added successfully!");
    setTimeout(() => {
      router.push("/admin/admin-panel/payouts/payout-requests");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* CARD: ADD PAYOUT (Matches Screenshot 2) */}
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5">
        {/* Header: Title on Left, Green '≡ Payout Requests' button on Right */}
        <div className="flex items-center justify-between pb-3 border-b border-[#f4f4f4] mb-5">
          <h1 className="text-[16px] font-normal text-[#333333]">
            Add Payout
          </h1>
          <Link
            href="/admin/admin-panel/payouts/payout-requests"
            className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[12.5px] rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs font-normal"
          >
            <List className="w-3.5 h-3.5" />
            <span>Payout Requests</span>
          </Link>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User */}
          <div>
            <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
              User
            </label>
            <div className="relative">
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                required
                className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] transition-colors"
              >
                <option value="">Select</option>
                {PAYOUT_USERS.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.shopName} (User Id: {user.id})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Withdrawal Method */}
          <div>
            <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
              Withdrawal Method
            </label>
            <div className="relative">
              <select
                value={withdrawalMethod}
                onChange={(e) => setWithdrawalMethod(e.target.value)}
                required
                className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] transition-colors"
              >
                <option value="">Select</option>
                <option value="PayPal">PayPal</option>
                <option value="Bitcoin (BTC)">Bitcoin (BTC)</option>
                <option value="IBAN">IBAN</option>
                <option value="SWIFT">SWIFT</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Withdrawal Amount */}
          <div>
            <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
              Withdrawal Amount
            </label>
            <div className="flex rounded-[3px] overflow-hidden border border-[#d2d6de] focus-within:border-[#0073b7] transition-colors">
              <span className="inline-flex items-center px-3.5 bg-[#eee] border-r border-[#d2d6de] text-[13px] text-[#555] font-normal select-none">
                USD ($)
              </span>
              <input
                type="number"
                min={0}
                step="any"
                value={withdrawalAmount === 0 ? "0" : withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(parseFloat(e.target.value) || 0)}
                placeholder="0"
                required
                className="w-full bg-white px-3 py-2 text-[13px] text-[#444] focus:outline-none"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
              Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] transition-colors"
              >
                <option value="">Select</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer shadow-2xs"
            >
              Add Payout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
