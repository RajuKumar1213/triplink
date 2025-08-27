import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Category from "@/models/Category";
import connectDb from "@/db/connectDb";
import { ICategory } from "@/types/category";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const GET = asyncHandler(async () => {
  await connectDb();
  const categories = await Category.find().lean();
  return NextResponse.json(
    { success: true, data: categories },
    { status: 200 }
  );
});

export const POST = asyncHandler(async (request: Request) => {
  await connectDb();
  const body: ICategory = await request.json();

  // Check for duplicate category name
  const existingCategory = await Category.findOne({ name: body.name });
  if (existingCategory) {
    const error = new Error("Category name already exists") as ErrorWithStatus;
    error.status = 400;
    throw error;
  }

  const category = new Category(body);
  await category.save();
  return NextResponse.json({ success: true, data: category }, { status: 201 });
});
