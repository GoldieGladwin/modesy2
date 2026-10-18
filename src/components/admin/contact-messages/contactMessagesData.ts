import { ContactMessageItem } from "./types";

export const DEMO_CONTACT_MESSAGES: ContactMessageItem[] = [
  {
    id: 1,
    name: "Liam Anderson",
    email: "liam@example.com",
    message: "We would like to discuss a brand sponsorship program with Modesy.",
    date: "2026-10-09 / 14:30",
  },
  {
    id: 2,
    name: "Sophia Taylor",
    email: "sophia@webmail.org",
    message: "How long does direct wire transfer take to European bank accounts?",
    date: "2026-10-07 / 09:15",
  },
  {
    id: 3,
    name: "Ethan Wright",
    email: "ethan@designhub.io",
    message: "Zip code validation showed an error on Irish postal codes.",
    date: "2026-10-04 / 18:42",
  },
];

export const INITIAL_CONTACT_MESSAGES: ContactMessageItem[] = [];

const KEY_CONTACT_MESSAGES = "modesy_contact_messages_v1";

export function getStoredContactMessages(): ContactMessageItem[] {
  if (typeof window === "undefined") return INITIAL_CONTACT_MESSAGES;
  try {
    const data = localStorage.getItem(KEY_CONTACT_MESSAGES);
    if (!data) {
      localStorage.setItem(
        KEY_CONTACT_MESSAGES,
        JSON.stringify(INITIAL_CONTACT_MESSAGES)
      );
      return INITIAL_CONTACT_MESSAGES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_CONTACT_MESSAGES;
  }
}

export function saveStoredContactMessages(
  messages: ContactMessageItem[]
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_CONTACT_MESSAGES, JSON.stringify(messages));
  } catch (e) {
    console.error("Failed to save contact messages", e);
  }
}

export function deleteStoredContactMessage(id: number): ContactMessageItem[] {
  const messages = getStoredContactMessages();
  const updated = messages.filter((m) => m.id !== id);
  saveStoredContactMessages(updated);
  return updated;
}

export function addStoredContactMessage(
  msg: Omit<ContactMessageItem, "id">
): ContactMessageItem {
  const messages = getStoredContactMessages();
  const newId =
    messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1;
  const newItem: ContactMessageItem = {
    ...msg,
    id: newId,
  };
  messages.unshift(newItem);
  saveStoredContactMessages(messages);
  return newItem;
}

export function seedDemoContactMessages(): ContactMessageItem[] {
  saveStoredContactMessages(DEMO_CONTACT_MESSAGES);
  return DEMO_CONTACT_MESSAGES;
}
