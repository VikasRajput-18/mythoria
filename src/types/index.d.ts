export interface FormTypes {
  title: string;
  description: string;
  genre: string;
  content: string;
  tags: { id: string; value: string }[];
  audience: string;
  status: "draft" | "publish";
}
