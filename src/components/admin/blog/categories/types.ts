export interface BlogCategory {
  id: number;
  name: string;
  language: string;
  order: number;
}

export interface CategoryFormData {
  language: string;
  name: string;
  slug: string;
  description: string;
  keywords: string;
  order: number;
}
