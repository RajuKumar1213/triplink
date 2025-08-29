import { Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryRequest {
  name: string;
  slug: string;
}
