export interface ChatMessageItem {
  id: number;
  subject: string;
  product: string;
  sender: string;
  receiver: string;
  updated: string;
  date: string;
  messages?: Array<{
    sender: string;
    message: string;
    date: string;
    isAdmin?: boolean;
  }>;
}
