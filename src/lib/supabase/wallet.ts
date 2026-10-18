import { supabase, isSupabaseConfigured } from "./client";
import {
  DepositRecord,
  EarningsRecord,
  ExpenseRecord,
  PayoutAccountSettings,
  PayoutRequestRecord,
} from "@/components/admin/wallet/types";
import {
  INITIAL_DEPOSITS_DATA,
  INITIAL_EARNINGS_DATA,
  INITIAL_EXPENSES_DATA,
  INITIAL_PAYOUTS_DATA,
  INITIAL_PAYOUT_SETTINGS,
} from "@/components/admin/wallet/mockData";

export interface WalletState {
  balance: number;
  deposits: (DepositRecord & { isReported?: boolean })[];
  expenses: ExpenseRecord[];
  earnings: EarningsRecord[];
  payouts: PayoutRequestRecord[];
  payoutSettings: PayoutAccountSettings;
}

export const WALLET_CHANGE_EVENT = "modesy_wallet_change";

// Helper to determine storage key based on user identifier or role
export function getWalletStorageKey(userId?: string | null, userRole?: string | null): string {
  if (userId && userId.length > 5 && !userId.includes("placeholder")) {
    return `modesy_wallet_user_${userId}`;
  }
  const role = (userRole || "vendor").toLowerCase();
  return `modesy_wallet_role_${role}`;
}

// Generate default initial wallet data for each role if empty
function getDefaultWalletForRole(role: string): WalletState {
  const normRole = (role || "vendor").toLowerCase();

  if (normRole === "member") {
    return {
      balance: 45.0,
      deposits: [
        {
          id: "dep-mem-1",
          paymentId: "BTR-HMDQRCZDHE-CPZTJXWK",
          paymentMethod: "Bank Transfer",
          amount: 10,
          currency: "USD",
          status: "Pending Payment",
          isReported: true,
          date: "2026-09-17 / 17:57",
        },
        {
          id: "dep-mem-2",
          paymentId: "pi_wlt_paypal_002",
          paymentMethod: "PayPal",
          amount: 35,
          currency: "USD",
          status: "Completed",
          isReported: false,
          date: "2026-09-15 / 11:20",
        },
      ],
      expenses: [],
      earnings: [],
      payouts: [],
      payoutSettings: {
        ...INITIAL_PAYOUT_SETTINGS,
        paypalEmail: "members@gmail.com",
      },
    };
  }

  if (normRole === "moderator") {
    return {
      balance: 150.0,
      deposits: [
        {
          id: "dep-mod-1",
          paymentId: "BTR-HMOLW07M4I-AG1OP9OR",
          paymentMethod: "Bank Transfer",
          amount: 150,
          currency: "USD",
          status: "Completed",
          isReported: false,
          date: "2026-09-05 / 20:02",
        },
      ],
      expenses: [],
      earnings: [],
      payouts: [],
      payoutSettings: {
        ...INITIAL_PAYOUT_SETTINGS,
        paypalEmail: "moderator@gmail.com",
      },
    };
  }

  if (normRole === "admin") {
    return {
      balance: 1250.0,
      deposits: [
        {
          id: "dep-adm-1",
          paymentId: "BTR-HLVTZUEYA6-8ACII09U",
          paymentMethod: "Bank Transfer",
          amount: 1250,
          currency: "USD",
          status: "Completed",
          isReported: false,
          date: "2026-09-01 / 12:05",
        },
      ],
      expenses: INITIAL_EXPENSES_DATA,
      earnings: INITIAL_EARNINGS_DATA,
      payouts: INITIAL_PAYOUTS_DATA,
      payoutSettings: {
        ...INITIAL_PAYOUT_SETTINGS,
        paypalEmail: "admin@gmail.com",
      },
    };
  }

  // Default: Vendor (Trendshop)
  return {
    balance: 793.52,
    deposits: INITIAL_DEPOSITS_DATA,
    expenses: INITIAL_EXPENSES_DATA,
    earnings: INITIAL_EARNINGS_DATA,
    payouts: INITIAL_PAYOUTS_DATA,
    payoutSettings: INITIAL_PAYOUT_SETTINGS,
  };
}

/**
 * Fetch wallet data for current user / role.
 * Queries Supabase when configured, with seamless persistent localStorage caching.
 */
export async function getWalletData(userId?: string | null, userRole?: string | null): Promise<WalletState> {
  const role = userRole || "vendor";
  const storageKey = getWalletStorageKey(userId, role);

  // 1. Check persistent localStorage first for immediate responsiveness
  let cachedState: WalletState | null = null;
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        cachedState = JSON.parse(raw);
      } catch (err) {
        console.error("Failed to parse cached wallet", err);
      }
    }
  }

  // 2. If Supabase is configured and we have a valid userId, sync with Supabase
  if (isSupabaseConfigured() && userId) {
    try {
      // Fetch profile wallet_balance
      const { data: profile } = await supabase
        .from("profiles")
        .select("wallet_balance")
        .eq("id", userId)
        .maybeSingle();

      // Fetch user deposits
      const { data: depositsData } = await supabase
        .from("wallet_deposits")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      // Fetch user expenses
      const { data: expensesData } = await supabase
        .from("wallet_expenses")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      // Fetch user payouts
      const { data: payoutsData } = await supabase
        .from("payouts")
        .select("*")
        .eq("vendor_id", userId)
        .order("created_at", { ascending: false });

      // Fetch payout settings
      const { data: settingsData } = await supabase
        .from("payout_account_settings")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (profile) {
        const mappedDeposits = depositsData
          ? depositsData.map((d: any) => ({
              id: d.id,
              paymentId: d.payment_id,
              paymentMethod: d.payment_method,
              amount: Number(d.amount),
              currency: d.currency || "USD",
              status: (d.status === "Completed" ? "Completed" : "Pending Payment") as any,
              isReported: !!d.is_reported,
              date: d.created_at ? new Date(d.created_at).toISOString().slice(0, 10) + " / " + new Date(d.created_at).toTimeString().slice(0, 5) : "",
            }))
          : cachedState?.deposits || [];

        const mappedPayouts = payoutsData
          ? payoutsData.map((p: any) => ({
              id: p.id,
              withdrawalMethod: p.payout_method || "Bank Transfer",
              withdrawalAmount: Number(p.amount),
              currency: "USD",
              status: (p.status === "paid" ? "Completed" : p.status === "declined" ? "Rejected" : "Pending") as any,
              date: p.created_at ? new Date(p.created_at).toISOString().slice(0, 10) + " / " + new Date(p.created_at).toTimeString().slice(0, 5) : "",
            }))
          : cachedState?.payouts || [];

        const mappedExpenses = expensesData
          ? expensesData.map((e: any) => ({
              id: e.id,
              paymentId: `EXP-${e.id.slice(0, 8).toUpperCase()}`,
              expenseTitle: e.expense_title,
              orderNumber: e.reference_id ? e.reference_id.slice(0, 6) : "10042",
              amount: Number(e.amount),
              currency: e.currency || "USD",
              date: e.created_at ? new Date(e.created_at).toISOString().slice(0, 10) : "",
            }))
          : cachedState?.expenses || [];

        const syncedState: WalletState = {
          balance: Number(profile.wallet_balance),
          deposits: mappedDeposits.length > 0 ? mappedDeposits : (cachedState?.deposits || []),
          expenses: mappedExpenses.length > 0 ? mappedExpenses : (cachedState?.expenses || []),
          earnings: cachedState?.earnings || INITIAL_EARNINGS_DATA,
          payouts: mappedPayouts.length > 0 ? mappedPayouts : (cachedState?.payouts || []),
          payoutSettings: settingsData
            ? {
                paypalEmail: settingsData.paypal_email || "",
                btcAddress: settingsData.bitcoin_address || "",
                iban: {
                  fullName: settingsData.account_holder_name || "",
                  country: "United States",
                  bankName: settingsData.bank_name || "",
                  ibanNumber: settingsData.iban || "",
                },
                swift: {
                  fullName: settingsData.account_holder_name || "",
                  country: "United States",
                  bankName: settingsData.bank_name || "",
                  branchName: settingsData.bank_branch_city || "",
                  accountNumber: settingsData.iban || "",
                  swiftCode: settingsData.swift_code || "",
                },
              }
            : cachedState?.payoutSettings || INITIAL_PAYOUT_SETTINGS,
        };

        if (typeof window !== "undefined") {
          localStorage.setItem(storageKey, JSON.stringify(syncedState));
        }
        return syncedState;
      }
    } catch (err) {
      console.warn("Supabase wallet sync error, using cached/fallback data:", err);
    }
  }

  // 3. Fallback to localStorage or Role Defaults
  if (cachedState) {
    return cachedState;
  }

  const defaultState = getDefaultWalletForRole(role);
  if (typeof window !== "undefined") {
    localStorage.setItem(storageKey, JSON.stringify(defaultState));
  }
  return defaultState;
}

/**
 * Add funds (deposit) to user wallet.
 * Persists immediately to localStorage and Supabase.
 */
export async function addWalletDeposit(
  params: {
    amount: number;
    paymentMethod: string;
    currency?: string;
    isReported?: boolean;
    referenceNo?: string;
  },
  userId?: string | null,
  userRole?: string | null
): Promise<{ success: boolean; newBalance: number; deposit: DepositRecord & { isReported?: boolean } }> {
  const role = userRole || "vendor";
  const storageKey = getWalletStorageKey(userId, role);
  const current = await getWalletData(userId, role);

  const amountNum = Number(params.amount);
  const isBank = params.paymentMethod.toLowerCase().includes("bank");
  // Instant credit unless bank transfer without instant confirmation
  const isCompleted = !isBank || params.isReported;

  const newBalance = isCompleted
    ? Number((current.balance + amountNum).toFixed(2))
    : current.balance;

  const newDeposit: DepositRecord & { isReported?: boolean } = {
    id: `dep-${Date.now()}`,
    paymentId: isBank
      ? `BTR-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      : `pi_wlt_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    paymentMethod: params.paymentMethod,
    amount: amountNum,
    currency: params.currency || "USD",
    status: isCompleted ? "Completed" : "Pending Payment",
    isReported: !!params.isReported,
    date: new Date().toISOString().slice(0, 10) + " / " + new Date().toTimeString().slice(0, 5),
  };

  const updatedState: WalletState = {
    ...current,
    balance: newBalance,
    deposits: [newDeposit, ...current.deposits],
  };

  // Save to localStorage immediately
  if (typeof window !== "undefined") {
    localStorage.setItem(storageKey, JSON.stringify(updatedState));
    window.dispatchEvent(new CustomEvent(WALLET_CHANGE_EVENT, { detail: updatedState }));
  }

  // Save to Supabase in background
  if (isSupabaseConfigured() && userId) {
    try {
      await supabase.from("wallet_deposits").insert({
        user_id: userId,
        payment_id: newDeposit.paymentId,
        payment_method: newDeposit.paymentMethod,
        amount: newDeposit.amount,
        currency: newDeposit.currency,
        status: newDeposit.status,
        is_reported: newDeposit.isReported,
        report_reference_no: params.referenceNo || null,
      });

      if (isCompleted) {
        await supabase
          .from("profiles")
          .update({ wallet_balance: newBalance })
          .eq("id", userId);
      }
    } catch (e) {
      console.warn("Failed to write deposit to Supabase:", e);
    }
  }

  return { success: true, newBalance, deposit: newDeposit };
}

/**
 * Report bank transfer for pending deposit
 */
export async function reportBankTransfer(
  depositId: string,
  referenceNo: string,
  note: string,
  userId?: string | null,
  userRole?: string | null
): Promise<{ success: boolean; newBalance: number }> {
  const role = userRole || "vendor";
  const storageKey = getWalletStorageKey(userId, role);
  const current = await getWalletData(userId, role);

  let updatedDepositAmount = 0;
  const updatedDeposits = current.deposits.map((d) => {
    if (d.id === depositId) {
      updatedDepositAmount = d.amount;
      return {
        ...d,
        status: "Completed" as const,
        isReported: true,
      };
    }
    return d;
  });

  const newBalance = Number((current.balance + updatedDepositAmount).toFixed(2));

  const updatedState: WalletState = {
    ...current,
    balance: newBalance,
    deposits: updatedDeposits,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(storageKey, JSON.stringify(updatedState));
    window.dispatchEvent(new CustomEvent(WALLET_CHANGE_EVENT, { detail: updatedState }));
  }

  if (isSupabaseConfigured() && userId) {
    try {
      await supabase
        .from("wallet_deposits")
        .update({
          status: "Completed",
          is_reported: true,
          report_reference_no: referenceNo,
          report_note: note,
        })
        .eq("payment_id", depositId);

      await supabase
        .from("profiles")
        .update({ wallet_balance: newBalance })
        .eq("id", userId);
    } catch (e) {
      console.warn("Failed to update bank transfer report in Supabase:", e);
    }
  }

  return { success: true, newBalance };
}

/**
 * Request Payout / Withdrawal
 */
export async function requestPayout(
  params: {
    amount: number;
    method: string;
    details?: any;
  },
  userId?: string | null,
  userRole?: string | null
): Promise<{ success: boolean; newBalance: number; payout?: PayoutRequestRecord; error?: string }> {
  const role = userRole || "vendor";
  const storageKey = getWalletStorageKey(userId, role);
  const current = await getWalletData(userId, role);

  const amountNum = Number(params.amount);
  if (amountNum > current.balance) {
    return {
      success: false,
      newBalance: current.balance,
      error: "Insufficient funds in wallet for withdrawal.",
    };
  }

  const newBalance = Number((current.balance - amountNum).toFixed(2));

  const newPayout: PayoutRequestRecord = {
    id: `pay-${Date.now()}`,
    withdrawalMethod: params.method,
    withdrawalAmount: amountNum,
    currency: "USD",
    status: "Pending",
    date: new Date().toISOString().slice(0, 10) + " / " + new Date().toTimeString().slice(0, 5),
  };

  const updatedState: WalletState = {
    ...current,
    balance: newBalance,
    payouts: [newPayout, ...current.payouts],
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(storageKey, JSON.stringify(updatedState));
    window.dispatchEvent(new CustomEvent(WALLET_CHANGE_EVENT, { detail: updatedState }));
  }

  if (isSupabaseConfigured() && userId) {
    try {
      await supabase.from("payouts").insert({
        vendor_id: userId,
        amount: amountNum,
        payout_method: (params.method.toLowerCase().includes("paypal")
          ? "paypal"
          : "bank_transfer") as any,
        account_details: params.details || {},
        status: "pending",
      });

      await supabase
        .from("profiles")
        .update({ wallet_balance: newBalance })
        .eq("id", userId);
    } catch (e) {
      console.warn("Failed to request payout in Supabase:", e);
    }
  }

  return { success: true, newBalance, payout: newPayout };
}

/**
 * Update Payout Account Settings
 */
export async function savePayoutSettings(
  settings: PayoutAccountSettings,
  userId?: string | null,
  userRole?: string | null
): Promise<{ success: boolean }> {
  const role = userRole || "vendor";
  const storageKey = getWalletStorageKey(userId, role);
  const current = await getWalletData(userId, role);

  const updatedState: WalletState = {
    ...current,
    payoutSettings: settings,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(storageKey, JSON.stringify(updatedState));
    window.dispatchEvent(new CustomEvent(WALLET_CHANGE_EVENT, { detail: updatedState }));
  }

  if (isSupabaseConfigured() && userId) {
    try {
      await supabase.from("payout_account_settings").upsert({
        user_id: userId,
        payout_method: "paypal",
        paypal_email: settings.paypalEmail,
        bitcoin_address: settings.btcAddress,
        bank_name: settings.iban?.bankName,
        iban: settings.iban?.ibanNumber,
        account_holder_name: settings.iban?.fullName,
        swift_code: settings.swift?.swiftCode,
        bank_branch_city: settings.swift?.branchName,
      });
    } catch (e) {
      console.warn("Failed to save payout settings to Supabase:", e);
    }
  }

  return { success: true };
}
