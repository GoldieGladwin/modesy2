export interface AdminTag {
  id: number;
  tag: string;
  slug?: string;
  language: string;
  posts: number;
}

export type TagLanguageOption = "All" | "English" | "Indonesian" | "Arabic" | "Spanish";
