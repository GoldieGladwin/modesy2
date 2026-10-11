export interface BlogPost {
  id: number;
  title: string;
  image: string;
  language: string;
  category: string;
  date: string;
}

export interface PostFilterState {
  pageSize: number;
  language: string;
  search: string;
}
