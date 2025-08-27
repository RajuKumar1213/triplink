import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Adventure from "@/models/Adventure";
import Category from "@/models/Category";
import { IAdventure } from "@/types/adventure";
import connectDb from "@/db/connectDb";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const GET = asyncHandler(
  async (request: Request, { params }: { params: { id: string } }) => {
    await connectDb();
    const adventure = await Adventure.findById(params.id)
      .populate("category")
      .lean();
    if (!adventure) {
      const error = new Error("Adventure not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }
    return NextResponse.json(
      { success: true, data: adventure },
      { status: 200 }
    );
  }
);

export const PUT = asyncHandler(
  async (request: Request, { params }: { params: { id: string } }) => {
    await connectDb();
    const body: Partial<IAdventure> = await request.json();

    // Validate category if provided
    if (body.category) {
      const category = await Category.findById(body.category);
      if (!category) {
        const error = new Error("Invalid category ID") as ErrorWithStatus;
        error.status = 400;
        throw error;
      }
    }

    const adventure = await Adventure.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    ).populate("category");
    if (!adventure) {
      const error = new Error("Adventure not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }
    return NextResponse.json(
      { success: true, data: adventure },
      { status: 200 }
    );
  }
);

export const DELETE = asyncHandler(
  async (request: Request, { params }: { params: { id: string } }) => {
    await connectDb();
    const adventure = await Adventure.findByIdAndDelete(params.id);
    if (!adventure) {
      const error = new Error("Adventure not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  }
);
