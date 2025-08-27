import { Document, Types } from "mongoose";

export interface IAdventure extends Document {
  destination: string;
  duration: string;
  image: string;
  category: Types.ObjectId; // ref to Category
  price: number;
  originalPrice: number;
  rating: number; // 0 - 5
  reviews: number;
  features: string[];
  discount: number; // 0 - 100
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
}
