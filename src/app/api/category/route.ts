import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Category from "@/models/Category";
import connectDb from "@/db/connectDb";
import { ICategoryRequest } from "@/types/category";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const GET = asyncHandler(async (request: Request) => {
  await connectDb();
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const excludeId = searchParams.get("excludeId");

  if (slug) {
    // Check slug uniqueness
    const query: any = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const existingCategory = await Category.findOne(query);
    return NextResponse.json(
      { success: true, exists: !!existingCategory },
      { status: 200 }
    );
  } else {
    // Get all categories
    const categories = await Category.find().lean();
    return NextResponse.json(
      { success: true, data: categories },
      { status: 200 }
    );
  }
});

export const POST = asyncHandler(async (request: Request) => {
  await connectDb();
  const body: ICategoryRequest = await request.json();

  // Check for duplicate category name
  const existingCategory = await Category.findOne({ name: body.name });
  if (existingCategory) {
    const error = new Error("Category name already exists") as ErrorWithStatus;
    error.status = 400;
    throw error;
  }

  // Check for duplicate slug
  const existingSlug = await Category.findOne({ slug: body.slug });
  if (existingSlug) {
    const error = new Error("Category slug already exists") as ErrorWithStatus;
    error.status = 400;
    throw error;
  }

  const category = new Category(body);
  await category.save();
  return NextResponse.json(
    { success: true, data: { name: category.name, slug: category.slug } },
    { status: 201 }
  );
});
