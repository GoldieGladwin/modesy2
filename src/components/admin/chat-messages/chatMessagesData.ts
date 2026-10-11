import { ChatMessageItem } from "./types";

export const INITIAL_CHAT_MESSAGES: ChatMessageItem[] = [
  {
    id: 9,
    subject: "Black fashion women backpackhhi",
    product: "Black fashion women backpack",
    sender: "Admin",
    receiver: "Trendshop",
    updated: "9 days ago",
    date: "2026-10-02 / 07:31",
    messages: [
      {
        sender: "Trendshop",
        message: "Hello admin, is the stock count for Black fashion women backpack updated?",
        date: "2026-10-02 07:25",
        isAdmin: false,
      },
      {
        sender: "Admin",
        message: "Yes, we verified the inventory batch this morning. Everything is in order.",
        date: "2026-10-02 07:31",
        isAdmin: true,
      },
    ],
  },
  {
    id: 8,
    subject: "Black fashion women backpack",
    product: "Black fashion women backpack",
    sender: "Admin",
    receiver: "Trendshop",
    updated: "9 days ago",
    date: "2026-10-02 / 07:30",
    messages: [
      {
        sender: "Trendshop",
        message: "Can we feature this backpack in the upcoming weekend flash sale?",
        date: "2026-10-02 07:20",
        isAdmin: false,
      },
      {
        sender: "Admin",
        message: "Approved. Please ensure you update promotional discount pricing.",
        date: "2026-10-02 07:30",
        isAdmin: true,
      },
    ],
  },
  {
    id: 2,
    subject: "Adorable animals photo pack",
    product: "Adorable animals photo pack",
    sender: "Peter Jone",
    receiver: "Admin",
    updated: "16 days ago",
    date: "2026-09-05 / 20:02",
    messages: [
      {
        sender: "Peter Jone",
        message: "Hi, I purchased the digital download photo pack but the ZIP file link expired.",
        date: "2026-09-05 19:40",
        isAdmin: false,
      },
      {
        sender: "Admin",
        message: "Hello Peter, we refreshed your download token. You can now download it directly from your Orders page.",
        date: "2026-09-05 20:02",
        isAdmin: true,
      },
    ],
  },
  {
    id: 5,
    subject: "Sun hat for women protection cap",
    product: "Sun hat for women protection cap",
    sender: "Admin",
    receiver: "Trendshop",
    updated: "19 days ago",
    date: "2026-09-06 / 19:34",
    messages: [
      {
        sender: "Trendshop",
        message: "New shipment arrived for Sun hat for women protection cap.",
        date: "2026-09-06 19:10",
        isAdmin: false,
      },
      {
        sender: "Admin",
        message: "Thank you for the notification, item status updated to In Stock.",
        date: "2026-09-06 19:34",
        isAdmin: true,
      },
    ],
  },
  {
    id: 7,
    subject: "Videokonferenz am Donnerstag 17Uhr",
    product: "",
    sender: "Admin",
    receiver: "Trendshop",
    updated: "25 days ago",
    date: "2026-09-16 / 11:04",
    messages: [
      {
        sender: "Trendshop",
        message: "Guten Tag, können wir die Videokonferenz am Donnerstag um 17 Uhr bestätigen?",
        date: "2026-09-16 10:45",
        isAdmin: false,
      },
      {
        sender: "Admin",
        message: "Ja, der Termin ist eingetragen. Der Link wird per E-Mail versendet.",
        date: "2026-09-16 11:04",
        isAdmin: true,
      },
    ],
  },
  {
    id: 6,
    subject: "Black midi skirt with white flowers",
    product: "Black midi skirt with white flowers",
    sender: "Admin",
    receiver: "Trendshop",
    updated: "1 month ago",
    date: "2026-09-10 / 05:19",
    messages: [
      {
        sender: "Trendshop",
        message: "Product specifications updated with new size chart.",
        date: "2026-09-10 05:00",
        isAdmin: false,
      },
      {
        sender: "Admin",
        message: "Looks good, changes are live now.",
        date: "2026-09-10 05:19",
        isAdmin: true,
      },
    ],
  },
  {
    id: 4,
    subject: "Sun hat for women protection cap",
    product: "Sun hat for women protection cap",
    sender: "Admin",
    receiver: "Trendshop",
    updated: "1 month ago",
    date: "2026-09-06 / 19:34",
    messages: [
      {
        sender: "Trendshop",
        message: "Inquiry about bulk warehouse shipping fees.",
        date: "2026-09-06 18:50",
        isAdmin: false,
      },
      {
        sender: "Admin",
        message: "Please refer to standard logistics tier 2 schedule.",
        date: "2026-09-06 19:34",
        isAdmin: true,
      },
    ],
  },
  {
    id: 3,
    subject: "Sun hat for women protection cap",
    product: "Sun hat for women protection cap",
    sender: "Admin",
    receiver: "Trendshop",
    updated: "1 month ago",
    date: "2026-09-06 / 19:34",
    messages: [
      {
        sender: "Trendshop",
        message: "Color variations added: beige, white, navy.",
        date: "2026-09-06 19:00",
        isAdmin: false,
      },
      {
        sender: "Admin",
        message: "Variants published successfully.",
        date: "2026-09-06 19:34",
        isAdmin: true,
      },
    ],
  },
  {
    id: 1,
    subject: "Modern grey couch and pillows",
    product: "Modern grey couch and pillows",
    sender: "Peter Jone",
    receiver: "Admin",
    updated: "1 month ago",
    date: "2026-09-02 / 08:45",
    messages: [
      {
        sender: "Peter Jone",
        message: "Do you offer white-glove assembly services for furniture delivery?",
        date: "2026-09-02 08:20",
        isAdmin: false,
      },
      {
        sender: "Admin",
        message: "Yes Peter, white-glove delivery can be selected at the final checkout step.",
        date: "2026-09-02 08:45",
        isAdmin: true,
      },
    ],
  },
];

const KEY_CHAT_MESSAGES = "modesy_chat_messages_v1";

export function getStoredChatMessages(): ChatMessageItem[] {
  if (typeof window === "undefined") return INITIAL_CHAT_MESSAGES;
  try {
    const data = localStorage.getItem(KEY_CHAT_MESSAGES);
    if (!data) {
      localStorage.setItem(
        KEY_CHAT_MESSAGES,
        JSON.stringify(INITIAL_CHAT_MESSAGES)
      );
      return INITIAL_CHAT_MESSAGES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_CHAT_MESSAGES;
  }
}

export function saveStoredChatMessages(messages: ChatMessageItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_CHAT_MESSAGES, JSON.stringify(messages));
  } catch (e) {
    console.error("Failed to save chat messages", e);
  }
}

export function deleteStoredChatMessage(id: number): ChatMessageItem[] {
  const messages = getStoredChatMessages();
  const updated = messages.filter((m) => m.id !== id);
  saveStoredChatMessages(updated);
  return updated;
}
