export interface Tag {
  id: string;
  value: string;
}

export interface FormTypes {
  title: string;
  description: string;
  genre: string;
  content: string;
  tags: Tag[];
  audience: string;
  status: "draft" | "publish";
  thumbnail?: string; // add this line
}
