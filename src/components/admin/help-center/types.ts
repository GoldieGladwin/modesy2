export interface KnowledgeContentItem {
  id: number;
  title: string;
  slug: string;
  language: string;
  category: string;
  order: number;
  date: string;
  content: string;
}

export interface KnowledgeCategoryItem {
  id: number;
  name: string;
  slug: string;
  language: string;
  order: number;
}

export interface SupportTicketItem {
  id: number;
  ticketNumber: string;
  subject: string;
  user: string;
  status: "Open" | "Responded" | "Closed" | "In Progress" | string;
  date: string;
  updated: string;
  message?: string;
  replies?: Array<{
    sender: string;
    message: string;
    date: string;
    isAdmin: boolean;
  }>;
  userName: string;
  userEmail: string;
  category: string;
  priority: "High" | "Medium" | "Low" | string;
  lastUpdated: string;
}

// Backward compatibility types for legacy components
export interface HelpArticle {
  id: number;
  title: string;
  slug: string;
  category: string;
  order: number;
  status: "Active" | "Inactive";
  content?: string;
  date?: string;
  views?: number;
  createdAt?: string;
}

export type SupportTicket = SupportTicketItem;

export interface HelpCenterSettings {
  knowledgeBaseEnabled: boolean;
  ticketSystemEnabled: boolean;
  defaultCategory: string;
}
