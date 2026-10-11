export type NewsletterStatus = 'Active' | 'Unsubscribed';

export interface Newsletter {
  id: string;
  email: string;
  subscribedAt: string;
  status: NewsletterStatus;
}
