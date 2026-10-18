"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  getWalletData,
  addWalletDeposit,
  savePayoutSettings,
  WALLET_CHANGE_EVENT,
} from "@/lib/supabase/wallet";
import {
  CreditCard,
  Check,
  AlertTriangle,
  X,
  CheckCircle2,
  Lock,
} from "lucide-react";
import {
  VisaLogo,
  MastercardLogo,
  AmexLogo,
  DiscoverLogo,
  JcbLogo,
  DinersClubLogo,
  VerveLogo,
  TroyLogo,
  MirLogo,
  MaestroLogo,
  BoletoLogo,
  PayPalLogo,
  StripeLogo,
  PaystackLogo,
  IyzicoLogo,
  MidtransLogo,
  PayTabsLogo,
  YooMoneyLogo,
  MercadoPagoLogo,
} from "@/components/wallet/PaymentGatewayLogos";

type WalletTab = "deposits" | "expenses" | "payouts" | "set-payout";

interface DepositItem {
  id: string;
  paymentId: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  date: string;
}

export default function ModeratorWalletPage() {
  const { user } = useAuth();
  // Page view: "wallet" (main balance & tabs) or "checkout" (add funds payment flow)
  const [view, setView] = useState<"wallet" | "checkout">("wallet");
  const [activeTab, setActiveTab] = useState<WalletTab>("deposits");
  const [balance, setBalance] = useState<number>(150);
  const [deposits, setDeposits] = useState<DepositItem[]>([]);
  const [depositAmount, setDepositAmount] = useState<number>(500);

  // Add Funds Modal States (Matching Screenshot 3)
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState<boolean>(false);
  const [amountInput, setAmountInput] = useState<string>("500");
  const [amountError, setAmountError] = useState<string | null>(null);

  // Payout settings states
  const [payoutMethod, setPayoutMethod] = useState<"paypal" | "bank" | "swift">("paypal");
  const [payoutPaypalEmail, setPayoutPaypalEmail] = useState("moderator@gmail.com");
  const [payoutBankName, setPayoutBankName] = useState("");
  const [payoutAccountNumber, setPayoutAccountNumber] = useState("");
  const [payoutSwiftCode, setPayoutSwiftCode] = useState("");

  // Checkout states
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMethod, setSelectedMethod] = useState<string>("paypal");
  const [termsAgreed, setTermsAgreed] = useState<boolean>(true);
  const [showCardForm, setShowCardForm] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states matching Screenshot 2 & 3
  const [cardNumber, setCardNumber] = useState("0218 3414 1221 2112");
  const [expiry, setExpiry] = useState("21 / 12");
  const [cvv, setCvv] = useState("121");
  const [country, setCountry] = useState("Indonesia");
  const [firstName, setFirstName] = useState("hasda");
  const [lastName, setLastName] = useState("dada");
  const [addressLine1, setAddressLine1] = useState("fafada");
  const [addressLine2, setAddressLine2] = useState("affcad");
  const [city, setCity] = useState("avada");
  const [stateProv, setStateProv] = useState("Jawa Barat");
  const [postalCode, setPostalCode] = useState("12441");
  const [phone, setPhone] = useState("+62 8176924112");
  const [email, setEmail] = useState("mawdna@gmail.com");
  const [shipToBilling, setShipToBilling] = useState(true);
  const [privacyAgreed, setPrivacyAgreed] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load persistent wallet data on mount and listen to changes
  useEffect(() => {
    let isMounted = true;
    getWalletData(user?.id, "moderator").then((data) => {
      if (isMounted) {
        setBalance(data.balance);
        setDeposits(
          data.deposits.map((d) => ({
            id: d.id,
            paymentId: d.paymentId,
            paymentMethod: d.paymentMethod,
            amount: d.amount,
            currency: d.currency,
            date: d.date,
          }))
        );
        if (data.payoutSettings?.paypalEmail) {
          setPayoutPaypalEmail(data.payoutSettings.paypalEmail);
        }
      }
    });

    const onWalletChange = (e: any) => {
      if (e.detail) {
        setBalance(e.detail.balance);
        setDeposits(
          e.detail.deposits.map((d: any) => ({
            id: d.id,
            paymentId: d.paymentId,
            paymentMethod: d.paymentMethod,
            amount: d.amount,
            currency: d.currency,
            date: d.date,
          }))
        );
      }
    };

    window.addEventListener(WALLET_CHANGE_EVENT, onWalletChange);
    return () => {
      isMounted = false;
      window.removeEventListener(WALLET_CHANGE_EVENT, onWalletChange);
    };
  }, [user?.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenAddFundsModal = () => {
    setAmountInput("500");
    setAmountError(null);
    setIsAddFundsModalOpen(true);
  };

  const handleContinueToCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountInput);
    if (isNaN(val) || val < 10) {
      setAmountError("Minimum deposit amount is $10");
      return;
    }
    setDepositAmount(val);
    setIsAddFundsModalOpen(false);
    setStep(1);
    setShowCardForm(false);
    setView("checkout");
  };

  const handlePaySuccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const res = await addWalletDeposit(
      {
        amount: depositAmount,
        paymentMethod: selectedMethod.toUpperCase(),
        isReported: true,
      },
      user?.id,
      "moderator"
    );

    setTimeout(() => {
      setIsProcessing(false);
      if (res.success) {
        setBalance(res.newBalance);
        const newDeposit: DepositItem = {
          id: res.deposit.id,
          paymentId: res.deposit.paymentId,
          paymentMethod: res.deposit.paymentMethod,
          amount: res.deposit.amount,
          currency: res.deposit.currency,
          date: res.deposit.date,
        };
        setDeposits((prev) => [newDeposit, ...prev]);
        setView("wallet");
        showToast(`Successfully deposited $${depositAmount} USD into your wallet!`);
      }
    }, 800);
  };

  return (
    <div className="bg-white min-h-[650px] w-full font-sans text-gray-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 1: MAIN WALLET SCREEN (Matching Screenshot 4 & 5) */}
      {/* ======================================================== */}
      {view === "wallet" ? (
        <div className="max-w-[1320px] mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="text-[13px] text-[#777777] mb-6 flex items-center gap-1.5">
            <Link
              href="/moderator"
              className="text-[#666666] hover:text-[#00a99d] transition-colors"
            >
              Home
            </Link>
            <span className="text-[#999999]">/</span>
            <span className="text-[#333333] font-normal">Wallet</span>
          </nav>

          {/* Page Title */}
          <h1 className="text-[24px] font-bold text-[#222222] mb-6 tracking-tight">
            Wallet
          </h1>

          {/* Centered Balance Card */}
          <div className="max-w-[540px] mx-auto bg-white border border-[#e5e5e5] rounded-[4px] p-8 text-center relative shadow-xs mb-8">
            {/* Top Right Add Funds Button matching Screenshot 1 */}
            <button
              type="button"
              onClick={handleOpenAddFundsModal}
              className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#edf0f2] hover:bg-[#e2e6e9] text-[#333333] text-[12px] font-medium rounded-[3px] transition cursor-pointer border border-[#d5dadf]"
            >
              <svg
                className="w-3.5 h-3.5 text-[#444]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
                <line x1="16" y1="15" x2="20" y2="15" />
                <line x1="18" y1="13" x2="18" y2="17" />
              </svg>
              <span>Add Funds</span>
            </button>

            {/* Teal Wallet Icon */}
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

            {/* Label */}
            <div className="text-[12px] text-[#777777] font-normal mb-1">
              Wallet Balance
            </div>

            {/* Amount */}
            <div className="text-[34px] font-bold text-[#222222]">
              ${balance}
            </div>
          </div>

          {/* 4 Tabs Row matching Screenshot 1 */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("deposits")}
              className={`px-5 py-2 text-[13px] font-medium rounded-[3px] transition cursor-pointer ${
                activeTab === "deposits"
                  ? "bg-[#00a99d] text-white shadow-xs"
                  : "bg-[#f8f9fa] text-[#555] border border-[#e5e5e5] hover:bg-[#e9ecef]"
              }`}
            >
              Deposits
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("expenses")}
              className={`px-5 py-2 text-[13px] font-medium rounded-[3px] transition cursor-pointer ${
                activeTab === "expenses"
                  ? "bg-[#00a99d] text-white shadow-xs"
                  : "bg-[#f8f9fa] text-[#555] border border-[#e5e5e5] hover:bg-[#e9ecef]"
              }`}
            >
              Expenses
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("payouts")}
              className={`px-5 py-2 text-[13px] font-medium rounded-[3px] transition cursor-pointer ${
                activeTab === "payouts"
                  ? "bg-[#00a99d] text-white shadow-xs"
                  : "bg-[#f8f9fa] text-[#555] border border-[#e5e5e5] hover:bg-[#e9ecef]"
              }`}
            >
              Payouts
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("set-payout")}
              className={`px-5 py-2 text-[13px] font-medium rounded-[3px] transition cursor-pointer ${
                activeTab === "set-payout"
                  ? "bg-[#00a99d] text-white shadow-xs"
                  : "bg-[#f8f9fa] text-[#555] border border-[#e5e5e5] hover:bg-[#e9ecef]"
              }`}
            >
              Set Payout Account
            </button>
          </div>

          {/* TAB 1: DEPOSITS (Matching Screenshot 2 & 5) */}
          {activeTab === "deposits" && (
            <div className="bg-white border border-[#e5e5e5] rounded-[4px] overflow-hidden shadow-2xs animate-in fade-in">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-[#e5e5e5] text-[#222222] font-bold">
                      <th className="py-3 px-5 font-bold">Payment Id</th>
                      <th className="py-3 px-5 font-bold">Payment Method</th>
                      <th className="py-3 px-5 font-bold">Deposit Amount</th>
                      <th className="py-3 px-5 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f0]">
                    {deposits.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-12 text-center text-[#777777] font-normal"
                        >
                          No records found!
                        </td>
                      </tr>
                    ) : (
                      deposits.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/70 transition">
                          <td className="py-3.5 px-5 text-[#333] font-medium">
                            {item.paymentId}
                          </td>
                          <td className="py-3.5 px-5 text-[#555]">
                            {item.paymentMethod}
                          </td>
                          <td className="py-3.5 px-5 font-bold text-[#00a99d]">
                            ${item.amount} ({item.currency})
                          </td>
                          <td className="py-3.5 px-5 text-[#777]">{item.date}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: EXPENSES */}
          {activeTab === "expenses" && (
            <div className="bg-white border border-[#e5e5e5] rounded-[4px] overflow-hidden shadow-2xs animate-in fade-in">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-[#e5e5e5] text-[#222222] font-bold">
                      <th className="py-3 px-5 font-bold">Expense Id</th>
                      <th className="py-3 px-5 font-bold">Order Id</th>
                      <th className="py-3 px-5 font-bold">Amount</th>
                      <th className="py-3 px-5 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f0]">
                    <tr>
                      <td
                        colSpan={4}
                        className="py-12 text-center text-[#777777] font-normal"
                      >
                        No records found!
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PAYOUTS */}
          {activeTab === "payouts" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (balance <= 0) {
                      showToast("Your wallet balance is $0. Insufficient funds to withdraw.");
                    } else {
                      showToast("Payout request submitted successfully!");
                    }
                  }}
                  className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-[13px] font-medium rounded-[3px] transition cursor-pointer shadow-xs"
                >
                  Withdraw Money
                </button>
              </div>

              <div className="bg-white border border-[#e5e5e5] rounded-[4px] overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-[#e5e5e5] text-[#222222] font-bold">
                        <th className="py-3 px-5 font-bold">Withdrawal Id</th>
                        <th className="py-3 px-5 font-bold">Payout Method</th>
                        <th className="py-3 px-5 font-bold">Amount</th>
                        <th className="py-3 px-5 font-bold">Status</th>
                        <th className="py-3 px-5 font-bold">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f0]">
                      <tr>
                        <td
                          colSpan={5}
                          className="py-12 text-center text-[#777777] font-normal"
                        >
                          No records found!
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SET PAYOUT ACCOUNT */}
          {activeTab === "set-payout" && (
            <div className="max-w-[700px] mx-auto bg-white border border-[#e5e5e5] rounded-[4px] p-6 shadow-2xs space-y-6 animate-in fade-in">
              <h2 className="text-[18px] font-bold text-[#222222] border-b border-[#eee] pb-3">
                Set Payout Account
              </h2>

              {/* Subtabs for Payout Account Types */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPayoutMethod("paypal")}
                  className={`px-4 py-2 text-[13px] font-medium rounded-[3px] transition cursor-pointer ${
                    payoutMethod === "paypal"
                      ? "bg-[#00a99d] text-white"
                      : "bg-[#f8f9fa] text-[#555] border border-[#e5e5e5]"
                  }`}
                >
                  PayPal
                </button>
                <button
                  type="button"
                  onClick={() => setPayoutMethod("bank")}
                  className={`px-4 py-2 text-[13px] font-medium rounded-[3px] transition cursor-pointer ${
                    payoutMethod === "bank"
                      ? "bg-[#00a99d] text-white"
                      : "bg-[#f8f9fa] text-[#555] border border-[#e5e5e5]"
                  }`}
                >
                  Bank Transfer
                </button>
                <button
                  type="button"
                  onClick={() => setPayoutMethod("swift")}
                  className={`px-4 py-2 text-[13px] font-medium rounded-[3px] transition cursor-pointer ${
                    payoutMethod === "swift"
                      ? "bg-[#00a99d] text-white"
                      : "bg-[#f8f9fa] text-[#555] border border-[#e5e5e5]"
                  }`}
                >
                  Swift
                </button>
              </div>

              {/* Forms for Payout Settings */}
              {payoutMethod === "paypal" && (
                <div className="space-y-4 text-[13px]">
                  <div>
                    <label className="block text-[#444] font-medium mb-1.5">
                      PayPal Email Address
                    </label>
                    <input
                      type="email"
                      value={payoutPaypalEmail}
                      onChange={(e) => setPayoutPaypalEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full border border-[#d5dadf] rounded-[3px] px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-[#00a99d]"
                    />
                  </div>
                </div>
              )}

              {payoutMethod === "bank" && (
                <div className="space-y-4 text-[13px]">
                  <div>
                    <label className="block text-[#444] font-medium mb-1.5">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={payoutBankName}
                      onChange={(e) => setPayoutBankName(e.target.value)}
                      placeholder="e.g. Bank Central Asia"
                      className="w-full border border-[#d5dadf] rounded-[3px] px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-[#00a99d]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#444] font-medium mb-1.5">
                      Bank Account Number / IBAN
                    </label>
                    <input
                      type="text"
                      value={payoutAccountNumber}
                      onChange={(e) => setPayoutAccountNumber(e.target.value)}
                      placeholder="Account number"
                      className="w-full border border-[#d5dadf] rounded-[3px] px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-[#00a99d]"
                    />
                  </div>
                </div>
              )}

              {payoutMethod === "swift" && (
                <div className="space-y-4 text-[13px]">
                  <div>
                    <label className="block text-[#444] font-medium mb-1.5">
                      SWIFT / BIC Code
                    </label>
                    <input
                      type="text"
                      value={payoutSwiftCode}
                      onChange={(e) => setPayoutSwiftCode(e.target.value)}
                      placeholder="SWIFT code"
                      className="w-full border border-[#d5dadf] rounded-[3px] px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-[#00a99d]"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast("Payout settings updated successfully!")}
                  className="px-5 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[13px] font-medium rounded-[3px] transition cursor-pointer shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ADD FUNDS MODAL DIALOG (MATCHING SCREENSHOT 3)           */}
          {/* ======================================================== */}
          {isAddFundsModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
              <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-[480px] p-6 relative animate-in zoom-in-95">
                {/* Close Button X */}
                <button
                  type="button"
                  onClick={() => setIsAddFundsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition cursor-pointer p-1"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Centered Modal Title */}
                <h3 className="text-[22px] font-bold text-[#222222] text-center mb-6">
                  Add Funds
                </h3>

                <form onSubmit={handleContinueToCheckout}>
                  {/* Label: Enter Amount */}
                  <label className="block text-[14px] font-semibold text-[#222222] mb-2 text-left">
                    Enter Amount
                  </label>

                  {/* Input Group with $ prefix */}
                  <div
                    className={`flex items-stretch rounded-[3px] border overflow-hidden ${
                      amountError
                        ? "border-red-500"
                        : "border-[#ced4da] focus-within:border-[#00a99d]"
                    }`}
                  >
                    <div className="bg-[#f2f4f6] text-[#495057] px-4 py-2.5 flex items-center justify-center font-bold text-[14px] border-r border-[#ced4da] select-none">
                      $
                    </div>
                    <input
                      type="number"
                      min="10"
                      step="any"
                      value={amountInput}
                      onChange={(e) => {
                        setAmountInput(e.target.value);
                        if (amountError) setAmountError(null);
                      }}
                      placeholder="500"
                      className="w-full px-3.5 py-2.5 text-[14px] text-gray-900 focus:outline-none"
                      autoFocus
                    />
                  </div>

                  {/* Error message if invalid */}
                  {amountError && (
                    <div className="text-red-600 text-xs mt-1.5 text-left font-medium">
                      {amountError}
                    </div>
                  )}

                  {/* Helper text: Minimum Deposit Amount: $10 */}
                  <div className="text-[13px] text-[#666666] mt-2 mb-6 text-left">
                    Minimum Deposit Amount:{" "}
                    <span className="font-bold text-[#222222]">$10</span>
                  </div>

                  {/* Button: Continue to Checkout */}
                  <button
                    type="submit"
                    className="w-full bg-[#00a99d] hover:bg-[#008f85] text-white font-medium py-3 rounded-[3px] text-[14px] transition cursor-pointer active:scale-[0.99] shadow-xs"
                  >
                    Continue to Checkout
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ======================================================== */
        /* VIEW 2: CHECKOUT / ADD FUNDS FLOW (MATCHING SCREENSHOTS 1, 2, 3, 4, 5) */
        /* ======================================================== */
        <div className="max-w-[1320px] mx-auto px-4 py-8">
          {/* Breadcrumb with Back */}
          <nav className="text-[13px] text-[#777777] mb-6 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Link
                href="/moderator"
                className="text-[#666666] hover:text-[#00a99d] transition-colors"
              >
                Home
              </Link>
              <span className="text-[#999999]">/</span>
              <button
                type="button"
                onClick={() => setView("wallet")}
                className="text-[#666666] hover:text-[#00a99d] cursor-pointer"
              >
                Wallet
              </button>
              <span className="text-[#999999]">/</span>
              <span className="text-[#333333] font-normal">Checkout</span>
            </div>

            <button
              type="button"
              onClick={() => setView("wallet")}
              className="text-[#00a99d] hover:underline text-xs font-semibold cursor-pointer"
            >
              &larr; Back to Wallet
            </button>
          </nav>

          {/* Grid Layout: Checkout (Left) & Summary (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Checkout Steps */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-[20px] font-bold text-[#222222] border-b border-[#eee] pb-3">
                Checkout
              </h2>

              {/* STEP 1: PAYMENT METHOD */}
              {step === 1 ? (
                <div className="space-y-4">
                  <h3 className="text-[15px] font-bold text-[#222222]">
                    1. Payment Method
                  </h3>

                  {/* Payment Gateway Options matching Screenshots 4 & 5 */}
                  <div className="space-y-2.5 text-[13px]">
                    {/* 1. PayPal */}
                    <label
                      onClick={() => setSelectedMethod("paypal")}
                      className={`flex items-center justify-between p-3.5 rounded-[4px] border transition cursor-pointer select-none ${
                        selectedMethod === "paypal"
                          ? "border-[#00a99d] bg-white ring-1 ring-[#00a99d]"
                          : "border-[#e0e0e0] hover:border-gray-400 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition ${
                            selectedMethod === "paypal"
                              ? "bg-[#00a99d] text-white"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {selectedMethod === "paypal" && (
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          )}
                        </div>
                        <span className="font-medium text-gray-800">PayPal</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <VisaLogo />
                        <MastercardLogo />
                        <AmexLogo />
                        <DiscoverLogo />
                        <PayPalLogo />
                      </div>
                    </label>

                    {/* 2. Stripe */}
                    <label
                      onClick={() => setSelectedMethod("stripe")}
                      className={`flex items-center justify-between p-3.5 rounded-[4px] border transition cursor-pointer select-none ${
                        selectedMethod === "stripe"
                          ? "border-[#00a99d] bg-white ring-1 ring-[#00a99d]"
                          : "border-[#e0e0e0] hover:border-gray-400 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition ${
                            selectedMethod === "stripe"
                              ? "bg-[#00a99d] text-white"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {selectedMethod === "stripe" && (
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          )}
                        </div>
                        <span className="font-medium text-gray-800">Stripe</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <VisaLogo />
                        <MastercardLogo />
                        <AmexLogo />
                        <DiscoverLogo />
                        <JcbLogo />
                        <DinersClubLogo />
                        <StripeLogo />
                      </div>
                    </label>

                    {/* 3. Paystack */}
                    <label
                      onClick={() => setSelectedMethod("paystack")}
                      className={`flex items-center justify-between p-3.5 rounded-[4px] border transition cursor-pointer select-none ${
                        selectedMethod === "paystack"
                          ? "border-[#00a99d] bg-white ring-1 ring-[#00a99d]"
                          : "border-[#e0e0e0] hover:border-gray-400 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition ${
                            selectedMethod === "paystack"
                              ? "bg-[#00a99d] text-white"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {selectedMethod === "paystack" && (
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          )}
                        </div>
                        <span className="font-medium text-gray-800">Paystack</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <VisaLogo />
                        <MastercardLogo />
                        <VerveLogo />
                        <PaystackLogo />
                      </div>
                    </label>

                    {/* 4. Iyzico */}
                    <label
                      onClick={() => setSelectedMethod("iyzico")}
                      className={`flex items-center justify-between p-3.5 rounded-[4px] border transition cursor-pointer select-none ${
                        selectedMethod === "iyzico"
                          ? "border-[#00a99d] bg-white ring-1 ring-[#00a99d]"
                          : "border-[#e0e0e0] hover:border-gray-400 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition ${
                            selectedMethod === "iyzico"
                              ? "bg-[#00a99d] text-white"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {selectedMethod === "iyzico" && (
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          )}
                        </div>
                        <span className="font-medium text-gray-800">Iyzico</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <VisaLogo />
                        <MastercardLogo />
                        <AmexLogo />
                        <TroyLogo />
                        <IyzicoLogo />
                      </div>
                    </label>

                    {/* 5. Midtrans */}
                    <label
                      onClick={() => setSelectedMethod("midtrans")}
                      className={`flex items-center justify-between p-3.5 rounded-[4px] border transition cursor-pointer select-none ${
                        selectedMethod === "midtrans"
                          ? "border-[#00a99d] bg-white ring-1 ring-[#00a99d]"
                          : "border-[#e0e0e0] hover:border-gray-400 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition ${
                            selectedMethod === "midtrans"
                              ? "bg-[#00a99d] text-white"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {selectedMethod === "midtrans" && (
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          )}
                        </div>
                        <span className="font-medium text-gray-800">Midtrans</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <VisaLogo />
                        <MastercardLogo />
                        <AmexLogo />
                        <JcbLogo />
                        <MidtransLogo />
                      </div>
                    </label>

                    {/* 6. PayTabs */}
                    <label
                      onClick={() => setSelectedMethod("paytabs")}
                      className={`flex items-center justify-between p-3.5 rounded-[4px] border transition cursor-pointer select-none ${
                        selectedMethod === "paytabs"
                          ? "border-[#00a99d] bg-white ring-1 ring-[#00a99d]"
                          : "border-[#e0e0e0] hover:border-gray-400 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition ${
                            selectedMethod === "paytabs"
                              ? "bg-[#00a99d] text-white"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {selectedMethod === "paytabs" && (
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          )}
                        </div>
                        <span className="font-medium text-gray-800">PayTabs</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <VisaLogo />
                        <MastercardLogo />
                        <AmexLogo />
                        <DiscoverLogo />
                        <PayTabsLogo />
                      </div>
                    </label>

                    {/* 7. YooMoney */}
                    <label
                      onClick={() => setSelectedMethod("yoomoney")}
                      className={`flex items-center justify-between p-3.5 rounded-[4px] border transition cursor-pointer select-none ${
                        selectedMethod === "yoomoney"
                          ? "border-[#00a99d] bg-white ring-1 ring-[#00a99d]"
                          : "border-[#e0e0e0] hover:border-gray-400 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition ${
                            selectedMethod === "yoomoney"
                              ? "bg-[#00a99d] text-white"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {selectedMethod === "yoomoney" && (
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          )}
                        </div>
                        <span className="font-medium text-gray-800">YooMoney</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <VisaLogo />
                        <MastercardLogo />
                        <MaestroLogo />
                        <MirLogo />
                        <YooMoneyLogo />
                      </div>
                    </label>

                    {/* 8. Mercado Pago */}
                    <label
                      onClick={() => setSelectedMethod("mercadopago")}
                      className={`flex items-center justify-between p-3.5 rounded-[4px] border transition cursor-pointer select-none ${
                        selectedMethod === "mercadopago"
                          ? "border-[#00a99d] bg-white ring-1 ring-[#00a99d]"
                          : "border-[#e0e0e0] hover:border-gray-400 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition ${
                            selectedMethod === "mercadopago"
                              ? "bg-[#00a99d] text-white"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {selectedMethod === "mercadopago" && (
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          )}
                        </div>
                        <span className="font-medium text-gray-800">Mercado Pago</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <VisaLogo />
                        <MastercardLogo />
                        <AmexLogo />
                        <DiscoverLogo />
                        <BoletoLogo />
                        <MercadoPagoLogo />
                      </div>
                    </label>

                    {/* 9. Bank Transfer */}
                    <label
                      onClick={() => setSelectedMethod("bank")}
                      className={`flex items-center justify-between p-3.5 rounded-[4px] border transition cursor-pointer select-none ${
                        selectedMethod === "bank"
                          ? "border-[#00a99d] bg-white ring-1 ring-[#00a99d]"
                          : "border-[#e0e0e0] hover:border-gray-400 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition ${
                            selectedMethod === "bank"
                              ? "bg-[#00a99d] text-white"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {selectedMethod === "bank" && (
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          )}
                        </div>
                        <div>
                          <span className="font-medium text-gray-800 block">
                            Bank Transfer
                          </span>
                          <span className="text-[12px] text-gray-500">
                            Make your payment directly into our bank account.
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Terms & Conditions Checkbox matching Screenshot 4 */}
                  <div className="pt-3">
                    <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-700 select-none">
                      <div
                        onClick={() => setTermsAgreed(!termsAgreed)}
                        className={`w-4 h-4 rounded-[2px] flex items-center justify-center transition ${
                          termsAgreed
                            ? "bg-[#00a99d] text-white"
                            : "border border-gray-300 bg-white"
                        }`}
                      >
                        {termsAgreed && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>
                        I have read and agree to the{" "}
                        <Link
                          href="/terms-conditions"
                          className="font-bold text-gray-900 hover:text-[#00a99d] transition-colors"
                        >
                          Terms &amp; Conditions
                        </Link>
                      </span>
                    </label>
                  </div>

                  {/* Continue to Payment Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      disabled={!termsAgreed}
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 bg-[#00a99d] hover:bg-[#008f85] disabled:opacity-50 text-white font-medium text-[13px] rounded-[3px] transition inline-flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                    >
                      <span>Continue to Payment</span>
                      <span>&rsaquo;</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* STEP 2: PAYMENT / CONFIRM AND PAY (MATCHING SCREENSHOT 1, 2, 3) */
                <div className="space-y-6 animate-in fade-in">
                  {/* Collapsed Step 1 Header with Edit Button */}
                  <div className="p-4 bg-[#f8f9fa] border border-[#e5e5e5] rounded-[4px] flex items-center justify-between text-[14px]">
                    <span className="font-bold text-[#222222]">
                      1. Payment Method
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setShowCardForm(false);
                      }}
                      className="text-[#555] hover:text-[#00a99d] font-semibold underline text-xs cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Step 2 Header */}
                  <div>
                    <h3 className="text-[15px] font-bold text-[#222222] mb-6">
                      2. Payment
                    </h3>

                    {/* Confirm and Pay Box */}
                    <div className="max-w-[460px] mx-auto text-center space-y-4">
                      <h4 className="text-[16px] font-bold text-[#222222]">
                        Confirm and Pay
                      </h4>

                      {/* Black Button: Kartu Debit atau Kredit */}
                      {!showCardForm ? (
                        <button
                          type="button"
                          onClick={() => setShowCardForm(true)}
                          className="w-full bg-[#2d3748] hover:bg-[#1a202c] text-white font-semibold py-3.5 px-6 rounded-[4px] flex items-center justify-center gap-3 transition shadow-md cursor-pointer active:scale-95"
                        >
                          <CreditCard className="w-5 h-5 text-gray-200" />
                          <span className="text-[14px]">Kartu Debit atau Kredit</span>
                        </button>
                      ) : (
                        /* EXPANDED PAYPAL CARD FORM (MATCHING SCREENSHOT 2 & 3) */
                        <div className="border border-gray-200 bg-white rounded-[4px] p-6 text-left shadow-lg relative animate-in fade-in space-y-4">
                          {/* Close X Button */}
                          <button
                            type="button"
                            onClick={() => setShowCardForm(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition p-1 cursor-pointer"
                            title="Tutup Form"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          <form onSubmit={handlePaySuccess} className="space-y-3.5 text-xs">
                            {/* 1. Nomor Kartu (with red error outline and tooltip matching screenshot) */}
                            <div>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(e.target.value)}
                                  placeholder="0000 0000 0000 0000"
                                  className="w-full border-2 border-red-500 rounded-[3px] px-3.5 py-2.5 text-[14px] text-gray-900 focus:outline-none pr-9 font-mono"
                                />
                                <span className="absolute left-2.5 -top-2 bg-white px-1 text-[10px] text-red-600 font-medium">
                                  Nomor kartu
                                </span>
                                <AlertTriangle className="w-4 h-4 text-red-500 absolute right-3 top-3 fill-red-100" />
                              </div>
                              {/* Red Tooltip Message */}
                              <div className="mt-1 bg-red-600 text-white text-[11px] font-medium px-2.5 py-1 rounded-[2px] inline-block shadow-xs">
                                Masukkan nomor kartu yang valid
                              </div>
                            </div>

                            {/* 2. Expiry & CVV */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="relative">
                                <input
                                  type="text"
                                  value={expiry}
                                  onChange={(e) => setExpiry(e.target.value)}
                                  className="w-full border-2 border-red-500 rounded-[3px] px-3.5 py-2.5 text-[14px] text-gray-900 focus:outline-none pr-8 font-mono"
                                />
                                <span className="absolute left-2.5 -top-2 bg-white px-1 text-[10px] text-red-600 font-medium">
                                  Kedaluwarsa
                                </span>
                                <AlertTriangle className="w-3.5 h-3.5 text-red-500 absolute right-2.5 top-3.5 fill-red-100" />
                              </div>

                              <div className="relative">
                                <input
                                  type="text"
                                  value={cvv}
                                  onChange={(e) => setCvv(e.target.value)}
                                  placeholder="CVV"
                                  className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2.5 text-[14px] text-gray-900 focus:outline-none focus:border-[#0084ff] font-mono"
                                />
                                <span className="absolute left-2.5 -top-2 bg-white px-1 text-[10px] text-gray-500 font-medium">
                                  CVV
                                </span>
                              </div>
                            </div>

                            {/* 3. Alamat Penagihan Header matching Screenshot 2 */}
                            <div className="pt-2 flex items-center justify-between pb-1">
                              <span className="font-normal text-gray-800 text-[14px]">
                                Alamat penagihan
                              </span>
                              <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition py-1 px-1.5">
                                {/* Authentic Indonesian Flag SVG (Red top, White bottom) */}
                                <div className="w-[20px] h-[14px] rounded-[2px] overflow-hidden border border-gray-300 shadow-2xs flex flex-col">
                                  <div className="w-full h-1/2 bg-[#e70011]" />
                                  <div className="w-full h-1/2 bg-white" />
                                </div>
                                <svg
                                  className="w-3 h-3 text-gray-600 stroke-[2.5]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>

                            {/* Nama Depan & Belakang */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="relative">
                                <input
                                  type="text"
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#0084ff]"
                                />
                                <span className="absolute left-2 -top-2 bg-white px-1 text-[10px] text-gray-500">
                                  Nama depan
                                </span>
                              </div>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                  className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#0084ff]"
                                />
                                <span className="absolute left-2 -top-2 bg-white px-1 text-[10px] text-gray-500">
                                  Nama belakang
                                </span>
                              </div>
                            </div>

                            {/* Baris 1 Alamat */}
                            <div className="relative">
                              <input
                                type="text"
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                                className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#0084ff]"
                              />
                              <span className="absolute left-2 -top-2 bg-white px-1 text-[10px] text-gray-500">
                                Baris 1 alamat
                              </span>
                            </div>

                            {/* Baris 2 Alamat */}
                            <div className="relative">
                              <input
                                type="text"
                                value={addressLine2}
                                onChange={(e) => setAddressLine2(e.target.value)}
                                className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#0084ff]"
                              />
                              <span className="absolute left-2 -top-2 bg-white px-1 text-[10px] text-gray-500">
                                Baris 2 alamat
                              </span>
                            </div>

                            {/* Kota */}
                            <div className="relative">
                              <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#0084ff]"
                              />
                              <span className="absolute left-2 -top-2 bg-white px-1 text-[10px] text-gray-500">
                                Kota
                              </span>
                            </div>

                            {/* Provinsi & Kode Pos */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="relative">
                                <select
                                  value={stateProv}
                                  onChange={(e) => setStateProv(e.target.value)}
                                  className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-900 bg-white focus:outline-none focus:border-[#0084ff]"
                                >
                                  <option value="Jawa Barat">Jawa Barat</option>
                                  <option value="DKI Jakarta">DKI Jakarta</option>
                                  <option value="Jawa Tengah">Jawa Tengah</option>
                                  <option value="Jawa Timur">Jawa Timur</option>
                                </select>
                                <span className="absolute left-2 -top-2 bg-white px-1 text-[10px] text-gray-500">
                                  Provinsi
                                </span>
                              </div>

                              <div className="relative">
                                <input
                                  type="text"
                                  value={postalCode}
                                  onChange={(e) => setPostalCode(e.target.value)}
                                  className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#0084ff]"
                                />
                                <span className="absolute left-2 -top-2 bg-white px-1 text-[10px] text-gray-500">
                                  Kode Pos
                                </span>
                              </div>
                            </div>

                            {/* Telepon */}
                            <div className="relative">
                              <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#0084ff]"
                              />
                              <span className="absolute left-2 -top-2 bg-white px-1 text-[10px] text-gray-500">
                                Telepon seluler
                              </span>
                            </div>

                            {/* Email */}
                            <div className="relative">
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#0084ff]"
                              />
                              <span className="absolute left-2 -top-2 bg-white px-1 text-[10px] text-gray-500">
                                Email
                              </span>
                            </div>

                            {/* Checkbox 1: Kirim ke alamat penagihan */}
                            <div className="pt-1">
                              <label className="flex items-center gap-2 cursor-pointer select-none text-[12px] text-gray-700">
                                <div
                                  onClick={() => setShipToBilling(!shipToBilling)}
                                  className={`w-4 h-4 rounded-[2px] flex items-center justify-center transition ${
                                    shipToBilling
                                      ? "bg-[#0070ba] text-white"
                                      : "border border-gray-300 bg-white"
                                  }`}
                                >
                                  {shipToBilling && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span>Kirim ke alamat penagihan</span>
                              </label>
                            </div>

                            {/* Checkbox 2: Pernyataan Privasi PayPal */}
                            <div>
                              <label className="flex items-start gap-2 cursor-pointer select-none text-[11px] text-gray-600 leading-normal">
                                <div
                                  onClick={() => setPrivacyAgreed(!privacyAgreed)}
                                  className={`w-4 h-4 mt-0.5 rounded-[2px] shrink-0 flex items-center justify-center transition ${
                                    privacyAgreed
                                      ? "bg-[#0070ba] text-white"
                                      : "border border-gray-300 bg-white"
                                  }`}
                                >
                                  {privacyAgreed && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span>
                                  Saya menyatakan bahwa saya telah cukup umur dan menyetujui{" "}
                                  <a
                                    href="https://www.paypal.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[#0070ba] hover:underline"
                                  >
                                    Pernyataan Privasi
                                  </a>{" "}
                                  PayPal.
                                </span>
                              </label>
                            </div>

                            {/* Big Blue Button: Bayar $500.00 */}
                            <div className="pt-2">
                              <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold py-3 px-4 rounded-[4px] transition text-[14px] shadow-sm cursor-pointer disabled:opacity-50"
                              >
                                {isProcessing ? "Memproses Pembayaran..." : `Bayar $${depositAmount}.00`}
                              </button>
                            </div>

                            {/* Footer: Ditunjang teknologi PayPal */}
                            <div className="pt-1 text-center text-[11px] text-gray-500 italic flex items-center justify-center gap-1">
                              <span>Ditunjang teknologi</span>
                              <span className="font-bold text-[#003087]">
                                <span className="text-[#0079c1]">Pay</span>Pal
                              </span>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right 4 Cols: Summary Card (Matching Screenshots 1 & 5) */}
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-[20px] font-bold text-[#222222] border-b border-[#eee] pb-3">
                Summary
              </h2>

              <div className="bg-[#fcfcfc] border border-[#e5e5e5] rounded-[4px] p-6 shadow-2xs space-y-4">
                <h3 className="font-bold text-[#222222] text-[14px]">
                  Add Funds
                </h3>

                <div className="flex items-center justify-between text-[13px] text-gray-600">
                  <span>Deposit Amount:</span>
                  <span className="font-bold text-gray-900">${depositAmount}</span>
                </div>

                <div className="flex items-center justify-between text-[13px] text-gray-600 pt-2 border-t border-[#f0f0f0]">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${depositAmount}</span>
                </div>

                <div className="border-t border-[#e5e5e5] pt-3 flex items-center justify-between text-[15px] font-bold text-gray-900">
                  <span>Total</span>
                  <span>${depositAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
