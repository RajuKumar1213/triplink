import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import connectDb from "@/db/connectDb";
import Package from "@/models/Package";
import { IPackageRequest } from "@/types/package";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const GET = asyncHandler(async (request: Request) => {
  await connectDb();
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const excludeId = searchParams.get("excludeId");

  // If slug is provided, check for slug existence (for validation)
  if (slug) {
    const query: any = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const existingPackage = await Package.findOne(query);
    return NextResponse.json(
      { success: true, exists: !!existingPackage },
      { status: 200 }
    );
  }

  // If no slug provided, return all packages
  const packages = await Package.find({}).sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: packages }, { status: 200 });
});

export const POST = asyncHandler(async (request: Request) => {
  await connectDb();
  const body: IPackageRequest = await request.json();

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
