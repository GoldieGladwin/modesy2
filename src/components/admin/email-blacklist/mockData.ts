import { EmailBlacklist } from './types';

export const mockEmailBlacklist: EmailBlacklist[] = [
  { id: 'BLK-001', email: 'spammer@example.com', reason: 'Spamming reviews', addedAt: '2023-09-10' },
  { id: 'BLK-002', email: 'fakeuser@test.com', reason: 'Fraudulent activity', addedAt: '2023-09-15' },
];
