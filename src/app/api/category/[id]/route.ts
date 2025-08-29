import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Category from "@/models/Category";
import Adventure from "@/models/Adventure";
import connectDb from "@/db/connectDb";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const GET = asyncHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    await connectDb();
    const { id } = await params;

    // Try to find by slug first, then by ObjectId for backward compatibility
    let category = await Category.findOne({ slug: id }, "name slug").lean();

    if (!category) {
      // If not found by slug, try by ObjectId
      category = await Category.findById(id, "name slug").lean();
    }

    if (!category) {
      const error = new Error("Category not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    return NextResponse.json(
      { success: true, data: category },
      { status: 200 }
    );
  }
);

export const PUT = asyncHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    await connectDb();
    const { id } = await params;
    const body = await request.json();
    const { name, slug } = body;

    // Find category by slug first, then by ObjectId
    let existingCategory = await Category.findOne({ slug: id });

    if (!existingCategory) {
      existingCategory = await Category.findById(id);
    }

    if (!existingCategory) {
      const error = new Error("Category not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    // Check for duplicate category name if name is updated
    if (name && name !== existingCategory.name) {
      const duplicateCategory = await Category.findOne({
        name,
      });
      if (duplicateCategory) {
        const error = new Error(
          "Category name already exists"
        ) as ErrorWithStatus;
        error.status = 400;
        throw error;
      }
    }

    // Check for duplicate slug if slug is updated
    if (slug && slug !== existingCategory.slug) {
      const duplicateSlug = await Category.findOne({
        slug,
      });
      if (duplicateSlug) {
        const error = new Error(
          "Category slug already exists"
        ) as ErrorWithStatus;
        error.status = 400;
        throw error;
      }
    }

    const category = await Category.findByIdAndUpdate(
      existingCategory._id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!category) {
      const error = new Error("Category not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    return NextResponse.json(
      { success: true, data: category },
      { status: 200 }
    );
  }
);

export const DELETE = asyncHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    await connectDb();
    const { id } = await params;

    // Find category by slug first, then by ObjectId
    let existingCategory = await Category.findOne({ slug: id });

    if (!existingCategory) {
      existingCategory = await Category.findById(id);
    }

    if (!existingCategory) {
      const error = new Error("Category not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    // Check if category is referenced by any adventures
    const adventureCount = await Adventure.countDocuments({
      category: existingCategory._id,
    });
    if (adventureCount > 0) {
      const error = new Error(
        "Cannot delete category; it is referenced by adventures"
      ) as ErrorWithStatus;
      error.status = 400;
      throw error;
    }

    const category = await Category.findByIdAndDelete(existingCategory._id);
    if (!category) {
      const error = new Error("Category not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  }
);
