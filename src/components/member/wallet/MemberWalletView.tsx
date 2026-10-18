"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Send, Plus, CreditCard, CheckCircle2, ChevronRight } from "lucide-react";
import MemberAddFundsModal from "./MemberAddFundsModal";
import ReportBankTransferModal from "@/components/admin/wallet/ReportBankTransferModal";
import NewPayoutModal from "@/components/admin/wallet/NewPayoutModal";
import InvoiceModal from "@/components/admin/wallet/InvoiceModal";
import { DepositRecord, PayoutAccountSettings, PayoutRequestRecord, PayoutMethodType } from "@/components/admin/wallet/types";
import { INITIAL_PAYOUT_SETTINGS } from "@/components/admin/wallet/mockData";
import { useAuth } from "@/context/AuthContext";
import {
  getWalletData,
  addWalletDeposit,
  reportBankTransfer,
  requestPayout,
  savePayoutSettings,
  WALLET_CHANGE_EVENT,
} from "@/lib/supabase/wallet";

export type MemberWalletTab = "deposits" | "expenses" | "payouts" | "set-payout-account";

interface MemberDepositItem extends DepositRecord {
  isReported?: boolean;
}

export default function MemberWalletView() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<MemberWalletTab>("deposits");
  const [balance, setBalance] = useState<number>(45.0);

  // Deposits matching Screenshot 1
  const [deposits, setDeposits] = useState<MemberDepositItem[]>([
    {
      id: "dep-1",
      paymentId: "BTR-HMDQRCZDHE-CPZTJXWK",
      paymentMethod: "Bank Transfer",
      amount: 10,
      currency: "USD",
      status: "Pending Payment",
      isReported: true,
      date: "2026-09-17 / 17:57",
    },
    {
      id: "dep-2",
      paymentId: "BTR-HMDP9KNW0G-1Y394WJO",
      paymentMethod: "Bank Transfer",
      amount: 10,
      currency: "USD",
      status: "Pending Payment",
      isReported: false,
      date: "2026-09-17 / 17:03",
    },
    {
      id: "dep-3",
      paymentId: "BTR-HM9SZHF57S-369RASZE",
      paymentMethod: "Bank Transfer",
      amount: 10,
      currency: "USD",
      status: "Pending Payment",
      isReported: false,
      date: "2026-09-13 / 14:19",
    },
    {
      id: "dep-4",
      paymentId: "BTR-HMOLW07M4I-AG1OP9OR",
      paymentMethod: "Bank Transfer",
      amount: 10,
      currency: "USD",
      status: "Pending Payment",
      isReported: false,
      date: "2026-09-05 / 20:02",
    },
    {
      id: "dep-5",
      paymentId: "BTR-HLWS2ZQ5XN-5CTYLLNC",
      paymentMethod: "Bank Transfer",
      amount: 25,
      currency: "USD",
      status: "Pending Payment",
      isReported: false,
      date: "2026-09-02 / 08:42",
    },
    {
      id: "dep-6",
      paymentId: "BTR-HLVTZUEYA6-8ACII09U",
      paymentMethod: "Bank Transfer",
      amount: 100,
      currency: "USD",
      status: "Pending Payment",
      isReported: false,
      date: "2026-09-01 / 12:05",
    },
  ]);

  // Expenses matching Screenshot 2 (Empty)
  const [expenses, setExpenses] = useState<any[]>([]);

  // Payouts matching Screenshot 3 (Empty)
  const [payouts, setPayouts] = useState<PayoutRequestRecord[]>([]);

  // Payout settings matching Screenshot 4
  const [payoutSettings, setPayoutSettings] = useState<PayoutAccountSettings>(INITIAL_PAYOUT_SETTINGS);
  const [payoutMethodSubtab, setPayoutMethodSubtab] = useState<PayoutMethodType>("paypal");

  // Modals state
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [selectedPendingDeposit, setSelectedPendingDeposit] = useState<DepositRecord | null>(null);
  const [isNewPayoutOpen, setIsNewPayoutOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<{
    paymentId: string;
    title: string;
    amount: number;
    currency: string;
    date: string;
    type: "deposit" | "expense";
  } | null>(null);

  // Toast alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync with persistent wallet & URL params
  useEffect(() => {
    let isMounted = true;
    getWalletData(user?.id, "member").then((data) => {
      if (isMounted) {
        setBalance(data.balance);
        setDeposits(data.deposits);
        setExpenses(data.expenses);
        setPayouts(data.payouts);
        setPayoutSettings(data.payoutSettings);
      }
    });

    const onWalletChange = (e: any) => {
      if (e.detail) {
        setBalance(e.detail.balance);
        setDeposits(e.detail.deposits);
        setExpenses(e.detail.expenses);
        setPayouts(e.detail.payouts);
        setPayoutSettings(e.detail.payoutSettings);
      }
    };

    window.addEventListener(WALLET_CHANGE_EVENT, onWalletChange);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("success") === "true") {
        showToast("Payment completed successfully and funds added to your wallet!");
        window.history.replaceState({}, "", window.location.pathname);
      } else if (params.get("reported") === "pending") {
        showToast("Bank transfer order placed! Please report your transfer below.");
        window.history.replaceState({}, "", window.location.pathname);
      }
    }

    return () => {
      isMounted = false;
      window.removeEventListener(WALLET_CHANGE_EVENT, onWalletChange);
    };
  }, [user?.id]);

  // Add Funds confirm (Persists to DB / LocalStorage)
  const handleAddFunds = async (amount: number) => {
    const res = await addWalletDeposit(
      { amount, paymentMethod: "Bank Transfer", isReported: false },
      user?.id,
      "member"
    );
    if (res.success) {
      setBalance(res.newBalance);
      setDeposits((prev) => [res.deposit, ...prev]);
      showToast(`Successfully added deposit request for $${amount.toFixed(2)} USD!`);
    }
  };

  // Report Bank Transfer confirm
  const handleReportBankTransfer = async (depositId: string, referenceNo: string, note: string) => {
    const res = await reportBankTransfer(depositId, referenceNo, note, user?.id, "member");
    if (res.success) {
      setBalance(res.newBalance);
      setDeposits((prev) =>
        prev.map((d) => (d.id === depositId ? { ...d, isReported: true, status: "Completed" } : d))
      );
      showToast(`Bank transfer report has been submitted for review!`);
    }
  };

  // New Payout Request confirm
  const handleNewPayoutRequest = async (method: string, amount: number) => {
    const res = await requestPayout({ amount, method }, user?.id, "member");
    if (res.success && res.payout) {
      setBalance(res.newBalance);
      setPayouts((prev) => [res.payout!, ...prev]);
      showToast(`Payout request for $${amount.toFixed(2)} USD placed successfully.`);
    } else if (res.error) {
      showToast(res.error);
    }
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-gray-500 mb-4 flex items-center gap-1.5 font-normal">
          <Link href="/member" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">Wallet</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-[24px] sm:text-[26px] font-bold text-[#222] tracking-tight mb-8">
          Wallet
        </h1>

        {/* Top Wallet Balance Card */}
        <div className="bg-white border border-[#ebebeb] rounded-sm p-8 sm:p-10 max-w-[640px] mx-auto relative text-center mb-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          {/* Add Funds Button (Top-Right) */}
          <button
            type="button"
            onClick={() => setIsAddFundsOpen(true)}
            className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f8f9fa] hover:bg-gray-100 text-gray-700 text-xs font-medium rounded-sm border border-gray-300 transition cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-gray-500" />
            <span>Add Funds</span>
          </button>

          {/* Centered Wallet Glyph */}
          <div className="flex justify-center mb-3">
            <svg
              className="w-12 h-10"
              viewBox="0 0 44 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="4" width="40" height="26" rx="4" fill="#00a99d" />
              <path
                d="M28 11C28 9.89543 28.8954 9 30 9H42V25H30C28.8954 25 28 24.1046 28 23V11Z"
                fill="#008d83"
              />
              <circle cx="34" cy="17" r="2.2" fill="#ffffff" />
            </svg>
          </div>

          <div className="text-xs text-gray-500 font-medium mb-1">
            Wallet Balance
          </div>

          <div className="text-[34px] sm:text-[38px] font-bold text-[#222] tracking-tight">
            ${balance.toFixed(2)}
          </div>
        </div>

        {/* 4 Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("deposits")}
            className={`px-5 sm:px-6 py-2 text-xs font-semibold rounded-[2px] border transition cursor-pointer ${
              activeTab === "deposits"
                ? "bg-[#00a99d] border-[#00a99d] text-white"
                : "bg-white border-[#ebebeb] text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Deposits
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("expenses")}
            className={`px-5 sm:px-6 py-2 text-xs font-semibold rounded-[2px] border transition cursor-pointer ${
              activeTab === "expenses"
                ? "bg-[#00a99d] border-[#00a99d] text-white"
                : "bg-white border-[#ebebeb] text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Expenses
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("payouts")}
            className={`px-5 sm:px-6 py-2 text-xs font-semibold rounded-[2px] border transition cursor-pointer ${
              activeTab === "payouts"
                ? "bg-[#00a99d] border-[#00a99d] text-white"
                : "bg-white border-[#ebebeb] text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Payouts
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("set-payout-account")}
            className={`px-5 sm:px-6 py-2 text-xs font-semibold rounded-[2px] border transition cursor-pointer ${
              activeTab === "set-payout-account"
                ? "bg-[#00a99d] border-[#00a99d] text-white"
                : "bg-white border-[#ebebeb] text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Set Payout Account
          </button>
        </div>

        {/* Tab 1: Deposits */}
        {activeTab === "deposits" && (
          <div className="bg-white border border-[#ebebeb] rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#ebebeb] text-gray-800 font-bold text-[12px]">
                    <th className="py-3.5 px-4 font-bold">Payment Id</th>
                    <th className="py-3.5 px-4 font-bold">Payment Method</th>
                    <th className="py-3.5 px-4 font-bold">Deposit Amount</th>
                    <th className="py-3.5 px-4 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {deposits.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4 font-normal text-gray-800 align-top">
                        {item.paymentId}
                      </td>

                      <td className="py-4 px-4 text-gray-700 align-top">
                        {item.paymentMethod}
                      </td>

                      <td className="py-4 px-4 align-top">
                        <div>
                          <div className="text-gray-700 font-normal">
                            ${item.amount} ({item.currency}) - Pending Payment
                          </div>
                          {item.isReported ? (
                            <span className="text-[#007bff] text-xs font-normal mt-0.5 block">
                              (Pending)
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSelectedPendingDeposit(item)}
                              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#00a99d] hover:bg-[#008f85] text-white text-[11px] font-semibold rounded-[2px] transition cursor-pointer"
                            >
                              <Send className="w-3 h-3" />
                              <span>Report Bank Transfer</span>
                            </button>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4 align-top">
                        <div className="text-gray-700">{item.date}</div>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedInvoice({
                              paymentId: item.paymentId,
                              title: `Wallet Deposit via ${item.paymentMethod}`,
                              amount: item.amount,
                              currency: item.currency,
                              date: item.date,
                              type: "deposit",
                            })
                          }
                          className="text-[#007bff] hover:underline text-xs mt-1 block cursor-pointer bg-transparent border-0 p-0"
                        >
                          View Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Expenses */}
        {activeTab === "expenses" && (
          <div className="bg-white border border-[#ebebeb] rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#ebebeb] text-gray-800 font-bold text-[12px]">
                    <th className="py-3.5 px-4 font-bold">Payment Id</th>
                    <th className="py-3.5 px-4 font-bold">Expense</th>
                    <th className="py-3.5 px-4 font-bold">Expense Amount</th>
                    <th className="py-3.5 px-4 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} className="py-16 text-center text-gray-400 font-normal text-sm">
                      No records found!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Payouts */}
        {activeTab === "payouts" && (
          <div className="bg-white border border-[#ebebeb] rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
            {/* Top Right Action Button Bar */}
            <div className="p-4 flex justify-end border-b border-gray-100">
              <button
                type="button"
                onClick={() => setIsNewPayoutOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[2px] transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Payout Request</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#ebebeb] text-gray-800 font-bold text-[12px]">
                    <th className="py-3.5 px-4 font-bold">Withdrawal Method</th>
                    <th className="py-3.5 px-4 font-bold">Withdrawal Amount</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-16 text-center text-gray-400 font-normal text-sm">
                        No records found!
                      </td>
                    </tr>
                  ) : (
                    payouts.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-gray-900">
                          {item.withdrawalMethod}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-gray-900">
                          ${item.withdrawalAmount.toFixed(2)} ({item.currency})
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-700">
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600">{item.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Set Payout Account */}
        {activeTab === "set-payout-account" && (
          <div className="bg-white border border-[#ebebeb] rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 sm:p-8">
            {/* Sub-tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                type="button"
                onClick={() => setPayoutMethodSubtab("paypal")}
                className={`px-4 py-2 text-xs font-semibold rounded-[2px] transition cursor-pointer ${
                  payoutMethodSubtab === "paypal"
                    ? "bg-[#00a99d] text-white"
                    : "bg-[#f1f3f5] hover:bg-gray-200 text-gray-700"
                }`}
              >
                PayPal
              </button>
              <button
                type="button"
                onClick={() => setPayoutMethodSubtab("bitcoin")}
                className={`px-4 py-2 text-xs font-semibold rounded-[2px] transition cursor-pointer ${
                  payoutMethodSubtab === "bitcoin"
                    ? "bg-[#00a99d] text-white"
                    : "bg-[#f1f3f5] hover:bg-gray-200 text-gray-700"
                }`}
              >
                Bitcoin (BTC)
              </button>
              <button
                type="button"
                onClick={() => setPayoutMethodSubtab("iban")}
                className={`px-4 py-2 text-xs font-semibold rounded-[2px] transition cursor-pointer ${
                  payoutMethodSubtab === "iban"
                    ? "bg-[#00a99d] text-white"
                    : "bg-[#f1f3f5] hover:bg-gray-200 text-gray-700"
                }`}
              >
                IBAN
              </button>
              <button
                type="button"
                onClick={() => setPayoutMethodSubtab("swift")}
                className={`px-4 py-2 text-xs font-semibold rounded-[2px] transition cursor-pointer ${
                  payoutMethodSubtab === "swift"
                    ? "bg-[#00a99d] text-white"
                    : "bg-[#f1f3f5] hover:bg-gray-200 text-gray-700"
                }`}
              >
                SWIFT
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast("Payout account settings have been saved successfully!");
              }}
            >
              {payoutMethodSubtab === "paypal" && (
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    PayPal Email Address*
                  </label>
                  <input
                    type="email"
                    required
                    value={payoutSettings.paypalEmail}
                    onChange={(e) =>
                      setPayoutSettings({ ...payoutSettings, paypalEmail: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-[2px] focus:outline-none focus:border-[#00a99d] text-gray-800"
                  />
                </div>
              )}

              {payoutMethodSubtab === "bitcoin" && (
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    BTC Address*
                  </label>
                  <input
                    type="text"
                    required
                    value={payoutSettings.btcAddress}
                    onChange={(e) =>
                      setPayoutSettings({ ...payoutSettings, btcAddress: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-[2px] focus:outline-none focus:border-[#00a99d] text-gray-800"
                  />
                </div>
              )}

              {payoutMethodSubtab === "iban" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.iban.fullName}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          iban: { ...payoutSettings.iban, fullName: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Country*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.iban.country}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          iban: { ...payoutSettings.iban, country: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Bank Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.iban.bankName}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          iban: { ...payoutSettings.iban, bankName: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      IBAN Number*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.iban.ibanNumber}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          iban: { ...payoutSettings.iban, ibanNumber: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                </div>
              )}

              {payoutMethodSubtab === "swift" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.swift.fullName}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          swift: { ...payoutSettings.swift, fullName: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Country*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.swift.country}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          swift: { ...payoutSettings.swift, country: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Bank Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.swift.bankName}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          swift: { ...payoutSettings.swift, bankName: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Branch Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.swift.branchName}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          swift: { ...payoutSettings.swift, branchName: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      SWIFT Code*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.swift.swiftCode}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          swift: { ...payoutSettings.swift, swiftCode: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Account Number*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.swift.accountNumber}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          swift: { ...payoutSettings.swift, accountNumber: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[2px] transition cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Modals */}
      <MemberAddFundsModal
        isOpen={isAddFundsOpen}
        onClose={() => setIsAddFundsOpen(false)}
        onConfirm={handleAddFunds}
      />

      <ReportBankTransferModal
        isOpen={!!selectedPendingDeposit}
        deposit={selectedPendingDeposit}
        onClose={() => setSelectedPendingDeposit(null)}
        onSubmitReport={handleReportBankTransfer}
      />

      <NewPayoutModal
        isOpen={isNewPayoutOpen}
        availableBalance={balance}
        settings={payoutSettings}
        onClose={() => setIsNewPayoutOpen(false)}
        onSubmitPayout={handleNewPayoutRequest}
      />

      <InvoiceModal
        isOpen={!!selectedInvoice}
        data={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
}
