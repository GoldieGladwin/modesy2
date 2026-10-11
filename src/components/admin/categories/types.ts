export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  isActive: boolean;
  createdAt: string;
}
