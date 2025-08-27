import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import connectDb from "@/db/connectDb";
import Package from "@/models/Package";
import { IPackage } from "@/types/package";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const GET = asyncHandler(async () => {
  await connectDb();
  const packages = await Package.find().lean();
  return NextResponse.json({ success: true, data: packages }, { status: 200 });
});

export const POST = asyncHandler(async (request: Request) => {
  await connectDb();
  const body: IPackage = await request.json();

  // Check for duplicate slug
  const existingPackage = await Package.findOne({ slug: body.slug });
  if (existingPackage) {
    const error = new Error("Package slug already exists") as ErrorWithStatus;
    error.status = 400;
    throw error;
  }

  const newPackage = new Package(body);
  await newPackage.save();
  return NextResponse.json(
    { success: true, data: newPackage },
    { status: 201 }
  );
});
