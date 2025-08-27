import { Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  seo?: {
    title?: string;
    description?: string;
    keywords: string[];
  };
  isPublished: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}
