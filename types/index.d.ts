export interface Tag {
  id: string;
  name: string;
}

export interface FormTypes {
  title: string;
  description: string;
  genre: string;
  content: string;
  tags: Tag[];
  audience: string;
  status: "publish" | "draft";
  type: "book" | "other";
  pages: { id: string; content: string }[];
  thumbnail: string;
  files?: File[];
}

export interface StoryType {
  id: number;
  title: string;
  description: string;
  content: string; // Rich text HTML
  coverImage: string; // Base64 or URL
  genre: string; // e.g., "Love"
  audience: string; // e.g., "GENERAL"
  type: string; // e.g., "OTHER"
  published: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  authorId: number;
  pages: [];
  tags: Tag[];
}
