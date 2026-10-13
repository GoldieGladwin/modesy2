"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  WalletTabType,
  EarningsRecord,
  DepositRecord,
  ExpenseRecord,
  PayoutRequestRecord,
  PayoutAccountSettings,
} from "./types";
import {
  INITIAL_EARNINGS_DATA,
  INITIAL_DEPOSITS_DATA,
  INITIAL_EXPENSES_DATA,
  INITIAL_PAYOUTS_DATA,
  INITIAL_PAYOUT_SETTINGS,
} from "./mockData";
import WalletBalanceCard from "./WalletBalanceCard";
import WalletTabs from "./WalletTabs";
import EarningsTab from "./EarningsTab";
import DepositsTab from "./DepositsTab";
import ExpensesTab from "./ExpensesTab";
import PayoutsTab from "./PayoutsTab";
import SetPayoutAccountTab from "./SetPayoutAccountTab";
import AddFundsModal from "./AddFundsModal";
import ReportBankTransferModal from "./ReportBankTransferModal";
import NewPayoutModal from "./NewPayoutModal";
import InvoiceModal from "./InvoiceModal";
import { CheckCircle2, ChevronRight } from "lucide-react";

export default function WalletView() {
  // Navigation
  const [activeTab, setActiveTab] = useState<WalletTabType>("earnings");

  // Wallet Financial State
  const [balance, setBalance] = useState<number>(1130.85);
  const [earnings, setEarnings] = useState<EarningsRecord[]>(INITIAL_EARNINGS_DATA);
  const [deposits, setDeposits] = useState<DepositRecord[]>(INITIAL_DEPOSITS_DATA);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(INITIAL_EXPENSES_DATA);
  const [payouts, setPayouts] = useState<PayoutRequestRecord[]>(INITIAL_PAYOUTS_DATA);
  const [payoutSettings, setPayoutSettings] = useState<PayoutAccountSettings>(INITIAL_PAYOUT_SETTINGS);

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

  // Success Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Add Funds Handler
  const handleAddFunds = (amount: number, method: string) => {
    setBalance((prev) => prev + amount);
    const newDep: DepositRecord = {
      id: `dep-${Date.now()}`,
      paymentId: `pi_wlt_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      paymentMethod: method,
      amount: amount,
      currency: "USD",
      status: "Completed",
      date: new Date().toISOString().slice(0, 10) + " / " + new Date().toTimeString().slice(0, 5),
    };
    setDeposits((prev) => [newDep, ...prev]);
    showToast(`Successfully added $${amount.toFixed(2)} USD to your wallet via ${method}!`);
  };

  // Report Bank Transfer Handler
  const handleReportBankTransfer = (depositId: string, referenceNo: string, note: string) => {
    setDeposits((prev) =>
      prev.map((d) => (d.id === depositId ? { ...d, status: "Completed" } : d))
    );
    showToast(`Bank transfer report (${referenceNo}) has been submitted for review!`);
  };

  // New Payout Request Handler
  const handleNewPayoutRequest = (method: string, amount: number) => {
    setBalance((prev) => Math.max(0, prev - amount));
    const newReq: PayoutRequestRecord = {
      id: `pay-${Date.now()}`,
      withdrawalMethod: method,
      withdrawalAmount: amount,
      currency: "USD",
      status: "Pending",
      date: new Date().toISOString().slice(0, 10) + " / " + new Date().toTimeString().slice(0, 5),
    };
    setPayouts((prev) => [newReq, ...prev]);
    showToast(`Payout request for $${amount.toFixed(2)} USD via ${method} has been placed.`);
  };

  return (
    <div className="w-full pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-sm shadow-lg flex items-center gap-2.5 text-xs animate-modal-dialog">
          <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
          <Link href="/admin" className="hover:text-[#00a99d] transition">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 font-medium">Wallet</span>
        </nav>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-medium text-gray-800 mb-6">
          Wallet
        </h1>

        {/* Top Wallet Balance Card */}
        <div className="mb-6">
          <WalletBalanceCard
            balance={balance}
            currency="USD"
            onAddFunds={() => setIsAddFundsOpen(true)}
          />
        </div>

        {/* Five Navigation Tabs */}
        <WalletTabs activeTab={activeTab} onChangeTab={setActiveTab} />

        {/* Tab Content Display */}
        <div>
          {activeTab === "earnings" && (
            <EarningsTab earnings={earnings} />
          )}

          {activeTab === "deposits" && (
            <DepositsTab
              deposits={deposits}
              onReportBankTransfer={(dep) => setSelectedPendingDeposit(dep)}
              onViewInvoice={(dep) =>
                setSelectedInvoice({
                  paymentId: dep.paymentId,
                  title: `Wallet Deposit via ${dep.paymentMethod}`,
                  amount: dep.amount,
                  currency: dep.currency,
                  date: dep.date,
                  type: "deposit",
                })
              }
            />
          )}

          {activeTab === "expenses" && (
            <ExpensesTab
              expenses={expenses}
              onViewInvoice={(exp) =>
                setSelectedInvoice({
                  paymentId: exp.paymentId,
                  title: exp.expenseTitle,
                  amount: exp.amount,
                  currency: exp.currency,
                  date: exp.date,
                  type: "expense",
                })
              }
            />
          )}

          {activeTab === "payouts" && (
            <PayoutsTab
              payouts={payouts}
              onNewPayoutRequest={() => setIsNewPayoutOpen(true)}
            />
          )}

          {activeTab === "payout-account" && (
            <SetPayoutAccountTab
              settings={payoutSettings}
              onSaveSettings={(updated) => {
                setPayoutSettings(updated);
                showToast("Payout account settings saved successfully!");
              }}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <AddFundsModal
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
