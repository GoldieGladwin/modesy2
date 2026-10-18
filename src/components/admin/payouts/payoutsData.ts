import {
  PayoutUser,
  PayoutRequestItem,
  PayoutSettingsData,
  PayoutStatus,
  MethodPayoutSetting,
} from "./types";

export const PAYOUT_USERS: PayoutUser[] = [
  {
    id: 3,
    name: "Daniel Jones",
    shopName: "(Trendshop)",
    email: "daniel.jones@trendshop.com",
    avatar: "/images/avatars/user-3.jpg",
    balance: 1250,
  },
  {
    id: 1,
    name: "John Doe",
    shopName: "(Apex Store)",
    email: "john.doe@apexstore.com",
    avatar: "/images/avatars/user-3.jpg",
    balance: 3400,
  },
  {
    id: 2,
    name: "Emma Watson",
    shopName: "(Artisan Studio)",
    email: "emma.watson@artisan.com",
    avatar: "/images/avatars/user-3.jpg",
    balance: 890,
  },
  {
    id: 4,
    name: "Alex Morgan",
    shopName: "(Vintage Wear)",
    email: "alex.morgan@vintagewear.com",
    avatar: "/images/avatars/user-3.jpg",
    balance: 2150,
  },
];

export const INITIAL_PAYOUT_REQUESTS: PayoutRequestItem[] = [
  {
    id: 1,
    userId: 3,
    userName: "Daniel Jones",
    userShop: "(Trendshop)",
    userAvatar: "/images/avatars/user-3.jpg",
    withdrawalMethod: "PayPal",
    withdrawalAmount: 500,
    status: "Pending",
    date: "2026-09-09 / 11:17",
    details: {
      email: "daniel.jones@trendshop.com",
    },
  },
];

export const DEFAULT_PAYOUT_SETTINGS: PayoutSettingsData = {
  paypal: {
    status: "Enable",
    minAmount: 500,
  },
  bitcoin: {
    status: "Enable",
    minAmount: 500,
  },
  iban: {
    status: "Enable",
    minAmount: 500,
  },
  swift: {
    status: "Enable",
    minAmount: 500,
  },
};

const KEY_PAYOUT_REQUESTS = "modesy_admin_payout_requests_v1";
const KEY_PAYOUT_SETTINGS = "modesy_admin_payout_settings_v1";

/* Storage Functions for Payout Requests */
export function getStoredPayoutRequests(): PayoutRequestItem[] {
  if (typeof window === "undefined") return INITIAL_PAYOUT_REQUESTS;
  try {
    const data = localStorage.getItem(KEY_PAYOUT_REQUESTS);
    if (!data) {
      localStorage.setItem(
        KEY_PAYOUT_REQUESTS,
        JSON.stringify(INITIAL_PAYOUT_REQUESTS)
      );
      return INITIAL_PAYOUT_REQUESTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_PAYOUT_REQUESTS;
  }
}

export function saveStoredPayoutRequests(
  items: PayoutRequestItem[]
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_PAYOUT_REQUESTS, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save payout requests", e);
  }
}

export function addPayoutRequest(
  newItem: Omit<PayoutRequestItem, "id" | "date">
): PayoutRequestItem[] {
  const current = getStoredPayoutRequests();
  const nextId =
    current.length > 0 ? Math.max(...current.map((i) => i.id)) + 1 : 1;

  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} / ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const item: PayoutRequestItem = {
    ...newItem,
    id: nextId,
    date: formattedDate,
  };

  const updated = [item, ...current];
  saveStoredPayoutRequests(updated);
  return updated;
}

export function updatePayoutStatus(
  id: number,
  status: PayoutStatus
): PayoutRequestItem[] {
  const current = getStoredPayoutRequests();
  const updated = current.map((item) =>
    item.id === id ? { ...item, status } : item
  );
  saveStoredPayoutRequests(updated);
  return updated;
}

export function deletePayoutRequest(id: number): PayoutRequestItem[] {
  const current = getStoredPayoutRequests();
  const updated = current.filter((item) => item.id !== id);
  saveStoredPayoutRequests(updated);
  return updated;
}

/* Storage Functions for Payout Settings */
export function getStoredPayoutSettings(): PayoutSettingsData {
  if (typeof window === "undefined") return DEFAULT_PAYOUT_SETTINGS;
  try {
    const data = localStorage.getItem(KEY_PAYOUT_SETTINGS);
    if (!data) {
      localStorage.setItem(
        KEY_PAYOUT_SETTINGS,
        JSON.stringify(DEFAULT_PAYOUT_SETTINGS)
      );
      return DEFAULT_PAYOUT_SETTINGS;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_PAYOUT_SETTINGS;
  }
}

export function saveStoredPayoutSettings(
  settings: PayoutSettingsData
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_PAYOUT_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save payout settings", e);
  }
}

export function saveSinglePayoutSetting(
  key: keyof PayoutSettingsData,
  setting: MethodPayoutSetting
): PayoutSettingsData {
  const current = getStoredPayoutSettings();
  const updated = {
    ...current,
    [key]: setting,
  };
  saveStoredPayoutSettings(updated);
  return updated;
}
