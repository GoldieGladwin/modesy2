import {
  KnowledgeContentItem,
  KnowledgeCategoryItem,
  SupportTicketItem,
  HelpArticle,
  HelpCenterSettings,
} from "./types";

export const KNOWLEDGE_LANGUAGES = ["English", "Arabic", "French", "German"];

export const INITIAL_KNOWLEDGE_CONTENTS: KnowledgeContentItem[] = [
  {
    id: 9,
    title: "How Can I Make the Payment",
    slug: "how-can-i-make-the-payment",
    language: "English",
    category: "Payment",
    order: 1,
    date: "2026-07-29 / 22:36",
    content: "You can pay using credit card, debit card, PayPal, Stripe, bank transfer, or cash on delivery where available.",
  },
  {
    id: 8,
    title: "Where Can I Find the Shipping Tracking Code?",
    slug: "where-can-i-find-the-shipping-tracking-code",
    language: "English",
    category: "Products & Sizing",
    order: 2,
    date: "2026-07-29 / 22:26",
    content: "Once your seller ships the package, the tracking number will be sent to your registered email and available in your Orders section.",
  },
  {
    id: 7,
    title: "What's the Status of My Order?",
    slug: "whats-the-status-of-my-order",
    language: "English",
    category: "Order & Returns",
    order: 3,
    date: "2026-07-29 / 22:26",
    content: "You can check your order status under your profile's Order History tab. Statuses include Processing, Shipped, and Completed.",
  },
  {
    id: 6,
    title: "How to Cancel an Order",
    slug: "how-to-cancel-an-order",
    language: "English",
    category: "Order & Returns",
    order: 4,
    date: "2026-07-29 / 22:25",
    content: "Orders can be cancelled before they have been shipped by clicking the Cancel button on your order details page.",
  },
  {
    id: 5,
    title: "How Can I Buy a Product?",
    slug: "how-can-i-buy-a-product",
    language: "English",
    category: "Products & Sizing",
    order: 5,
    date: "2026-07-29 / 22:25",
    content: "Browse the catalog, add products to your cart, proceed to checkout, enter shipping address, and choose your preferred payment method.",
  },
  {
    id: 4,
    title: "How to Create an Account",
    slug: "how-to-create-an-account",
    language: "English",
    category: "Account",
    order: 6,
    date: "2026-07-29 / 22:25",
    content: "Click Register at the top header, enter your email and password, or use Google login for fast registration.",
  },
  {
    id: 3,
    title: "I Can't Sign Into My Account",
    slug: "i-cant-sign-into-my-account",
    language: "English",
    category: "Account",
    order: 7,
    date: "2026-07-29 / 22:25",
    content: "Use the Forgot Password link to receive a password reset token. Ensure your email address matches your registration record.",
  },
  {
    id: 2,
    title: "How to Change Your Password",
    slug: "how-to-change-your-password",
    language: "English",
    category: "Account",
    order: 8,
    date: "2026-07-29 / 22:24",
    content: "Go to Account Settings > Change Password, type your current password, enter your new secure password, and save changes.",
  },
];

export const INITIAL_KNOWLEDGE_CATEGORIES: KnowledgeCategoryItem[] = [
  { id: 6, name: "Payment", slug: "payment", language: "English", order: 1 },
  { id: 5, name: "Earnings & Payouts", slug: "earnings-payouts", language: "English", order: 2 },
  { id: 4, name: "Shipping & Delivery", slug: "shipping-delivery", language: "English", order: 3 },
  { id: 3, name: "Order & Returns", slug: "order-returns", language: "English", order: 4 },
  { id: 2, name: "Products & Sizing", slug: "products-sizing", language: "English", order: 5 },
  { id: 1, name: "Account", slug: "account", language: "English", order: 6 },
];

export const INITIAL_SUPPORT_TICKETS: SupportTicketItem[] = [
  {
    id: 1,
    ticketNumber: "#1",
    subject: "hello",
    user: "Guest",
    status: "Open",
    date: "2026-10-03 / 19:59",
    updated: "7 days ago",
    message: "testing",
    replies: [],
    userName: "visitor",
    userEmail: "visitor@gmail.com",
    category: "General",
    priority: "Medium",
    lastUpdated: "7 days ago",
  },
];

const KEY_CONTENTS = "modesy_kb_contents_v4";
const KEY_CATEGORIES = "modesy_kb_categories_v4";
const KEY_TICKETS = "modesy_support_tickets_v5";
const KEY_SETTINGS = "modesy_kb_settings_v4";
const KEY_LEGACY_ARTICLES = "modesy_kb_articles_legacy_v4";

/* Contents Helpers */
export function getStoredContents(): KnowledgeContentItem[] {
  if (typeof window === "undefined") return INITIAL_KNOWLEDGE_CONTENTS;
  try {
    const data = localStorage.getItem(KEY_CONTENTS);
    if (!data) {
      localStorage.setItem(KEY_CONTENTS, JSON.stringify(INITIAL_KNOWLEDGE_CONTENTS));
      return INITIAL_KNOWLEDGE_CONTENTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_KNOWLEDGE_CONTENTS;
  }
}

export function saveStoredContents(contents: KnowledgeContentItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_CONTENTS, JSON.stringify(contents));
  } catch (e) {
    console.error("Failed to save contents", e);
  }
}

export function getContentBySlug(slug: string): KnowledgeContentItem | undefined {
  const contents = getStoredContents();
  return contents.find((c) => c.slug === slug);
}

export function saveSingleContent(updated: KnowledgeContentItem): void {
  const contents = getStoredContents();
  const idx = contents.findIndex((c) => c.id === updated.id || c.slug === updated.slug);
  if (idx >= 0) {
    contents[idx] = updated;
  } else {
    contents.unshift(updated);
  }
  saveStoredContents(contents);
}

export function deleteStoredContent(id: number): KnowledgeContentItem[] {
  const contents = getStoredContents();
  const updated = contents.filter((c) => c.id !== id);
  saveStoredContents(updated);
  return updated;
}

/* Categories Helpers */
export function getStoredCategories(): KnowledgeCategoryItem[] {
  if (typeof window === "undefined") return INITIAL_KNOWLEDGE_CATEGORIES;
  try {
    const data = localStorage.getItem(KEY_CATEGORIES);
    if (!data) {
      localStorage.setItem(KEY_CATEGORIES, JSON.stringify(INITIAL_KNOWLEDGE_CATEGORIES));
      return INITIAL_KNOWLEDGE_CATEGORIES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_KNOWLEDGE_CATEGORIES;
  }
}

export function saveStoredCategories(categories: KnowledgeCategoryItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_CATEGORIES, JSON.stringify(categories));
  } catch (e) {
    console.error("Failed to save categories", e);
  }
}

export function getCategoryBySlug(slug: string): KnowledgeCategoryItem | undefined {
  const categories = getStoredCategories();
  return categories.find((c) => c.slug === slug);
}

export function saveSingleCategory(updated: KnowledgeCategoryItem): void {
  const categories = getStoredCategories();
  const idx = categories.findIndex((c) => c.id === updated.id || c.slug === updated.slug);
  if (idx >= 0) {
    categories[idx] = updated;
  } else {
    categories.unshift(updated);
  }
  saveStoredCategories(categories);
}

export function deleteStoredCategory(id: number): KnowledgeCategoryItem[] {
  const categories = getStoredCategories();
  const updated = categories.filter((c) => c.id !== id);
  saveStoredCategories(updated);
  return updated;
}

/* Tickets Helpers */
export function getStoredTickets(): SupportTicketItem[] {
  if (typeof window === "undefined") return INITIAL_SUPPORT_TICKETS;
  try {
    const data = localStorage.getItem(KEY_TICKETS);
    if (!data) {
      localStorage.setItem(KEY_TICKETS, JSON.stringify(INITIAL_SUPPORT_TICKETS));
      return INITIAL_SUPPORT_TICKETS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_SUPPORT_TICKETS;
  }
}

export function saveStoredTickets(tickets: SupportTicketItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_TICKETS, JSON.stringify(tickets));
  } catch (e) {
    console.error("Failed to save tickets", e);
  }
}

export function deleteStoredTicket(id: number): SupportTicketItem[] {
  const tickets = getStoredTickets();
  const updated = tickets.filter((t) => t.id !== id);
  saveStoredTickets(updated);
  return updated;
}

export function getTicketById(id: number): SupportTicketItem | undefined {
  const tickets = getStoredTickets();
  return tickets.find((t) => t.id === id);
}

export function updateTicketStatus(
  id: number,
  status: "Open" | "Responded" | "Closed"
): SupportTicketItem | undefined {
  const tickets = getStoredTickets();
  const ticket = tickets.find((t) => t.id === id);
  if (ticket) {
    ticket.status = status;
    ticket.updated = "Just now";
    saveStoredTickets(tickets);
    return ticket;
  }
  return undefined;
}

export function saveSingleTicketReply(ticketId: number, replyText: string): SupportTicketItem | undefined {
  const tickets = getStoredTickets();
  const ticket = tickets.find((t) => t.id === ticketId);
  if (ticket) {
    if (!ticket.replies) ticket.replies = [];
    ticket.replies.push({
      sender: "Admin",
      message: replyText,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      isAdmin: true,
    });
    ticket.status = "Responded";
    ticket.updated = "Just now";
    saveStoredTickets(tickets);
    return ticket;
  }
  return undefined;
}

/* Backward compatibility exports for legacy components */
export const HELP_CATEGORIES = ["Account", "Order & Returns", "Products & Sizing", "Payment"];

export const INITIAL_HELP_ARTICLES: HelpArticle[] = INITIAL_KNOWLEDGE_CONTENTS.map((c) => ({
  id: c.id,
  title: c.title,
  slug: c.slug,
  category: c.category,
  order: c.order,
  status: "Active",
  content: c.content,
  date: c.date,
}));

export function getStoredArticles(): HelpArticle[] {
  if (typeof window === "undefined") return INITIAL_HELP_ARTICLES;
  try {
    const data = localStorage.getItem(KEY_LEGACY_ARTICLES);
    if (!data) {
      localStorage.setItem(KEY_LEGACY_ARTICLES, JSON.stringify(INITIAL_HELP_ARTICLES));
      return INITIAL_HELP_ARTICLES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_HELP_ARTICLES;
  }
}

export function saveStoredArticles(articles: HelpArticle[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_LEGACY_ARTICLES, JSON.stringify(articles));
  } catch (e) {
    console.error("Failed to save legacy articles", e);
  }
}

export function saveSingleArticle(article: HelpArticle): void {
  const articles = getStoredArticles();
  const idx = articles.findIndex((a) => a.id === article.id || a.slug === article.slug);
  if (idx >= 0) {
    articles[idx] = article;
  } else {
    articles.unshift(article);
  }
  saveStoredArticles(articles);
}

export function deleteStoredArticle(id: number): HelpArticle[] {
  const articles = getStoredArticles();
  const updated = articles.filter((a) => a.id !== id);
  saveStoredArticles(updated);
  return updated;
}

export function getArticleBySlug(slug: string): HelpArticle | undefined {
  const articles = getStoredArticles();
  return articles.find((a) => a.slug === slug);
}

export function bulkUpdateArticlesStatus(
  statusOrIds: "Active" | "Inactive" | number[],
  maybeStatus?: "Active" | "Inactive" | boolean
): HelpArticle[] {
  const articles = getStoredArticles();
  if (typeof statusOrIds === "string") {
    const updated = articles.map((a) => ({ ...a, status: statusOrIds }));
    saveStoredArticles(updated);
    return updated;
  }
  const statusStr = maybeStatus === true || maybeStatus === "Active" ? "Active" : "Inactive";
  const updated = articles.map((a) => {
    if (Array.isArray(statusOrIds) && statusOrIds.includes(a.id)) {
      return { ...a, status: statusStr as "Active" | "Inactive" };
    }
    return a;
  });
  saveStoredArticles(updated);
  return updated;
}

export const INITIAL_HELP_SETTINGS: HelpCenterSettings = {
  knowledgeBaseEnabled: true,
  ticketSystemEnabled: true,
  defaultCategory: "Account",
};

export function getStoredHelpSettings(): HelpCenterSettings {
  if (typeof window === "undefined") return INITIAL_HELP_SETTINGS;
  try {
    const data = localStorage.getItem(KEY_SETTINGS);
    if (!data) {
      localStorage.setItem(KEY_SETTINGS, JSON.stringify(INITIAL_HELP_SETTINGS));
      return INITIAL_HELP_SETTINGS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_HELP_SETTINGS;
  }
}

export function saveStoredHelpSettings(settings: HelpCenterSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save settings", e);
  }
}
