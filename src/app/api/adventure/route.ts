import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Adventure from "@/models/Adventure";
import Category from "@/models/Category";
import { IAdventure } from "@/types/adventure";
import connectDb from "@/db/connectDb";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const GET = asyncHandler(async () => {
  await connectDb();
  const adventures = await Adventure.find().populate("category").lean();
  return NextResponse.json(
    { success: true, data: adventures },
    { status: 200 }
  );
});

export const POST = asyncHandler(async (request: Request) => {
  await connectDb();
  const body: IAdventure = await request.json();

  // Validate category exists
  const category = await Category.findById(body.category);
  if (!category) {
    const error = new Error("Invalid category ID") as ErrorWithStatus;
    error.status = 400;
    throw error;
  }

  const adventure = new Adventure(body);
  await adventure.save();
  const populatedAdventure = await Adventure.findById(adventure._id)
    .populate("category")
    .lean();
  return NextResponse.json(
    { success: true, data: populatedAdventure },
    { status: 201 }
  );
});
