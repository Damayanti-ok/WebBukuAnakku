
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImageUrl: string;
}

export interface Filters {
  age: string;
  genre: string;
  theme: string;
}
