import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Category from "@/models/Category";
import Adventure from "@/models/Adventure";
import { ICategory } from "@/types/category";
import connectDb from "@/db/connectDb";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const GET = asyncHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    await connectDb();
    const { id } = await params;
    const category = await Category.findById(id).lean();
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
    const body: Partial<ICategory> = await request.json();

    // Check for duplicate category name if name is updated
    if (body.name) {
      const existingCategory = await Category.findOne({
        name: body.name,
        _id: { $ne: id },
      });
      if (existingCategory) {
        const error = new Error(
          "Category name already exists"
        ) as ErrorWithStatus;
        error.status = 400;
        throw error;
      }
    }

    const category = await Category.findByIdAndUpdate(
      id,
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

    // Check if category is referenced by any adventures
    const adventureCount = await Adventure.countDocuments({
      category: id,
    });
    if (adventureCount > 0) {
      const error = new Error(
        "Cannot delete category; it is referenced by adventures"
      ) as ErrorWithStatus;
      error.status = 400;
      throw error;
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      const error = new Error("Category not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  }
);
