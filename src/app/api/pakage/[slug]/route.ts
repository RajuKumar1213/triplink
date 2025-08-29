import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Package from "@/models/Package";
import { IPackageRequest } from "@/types/package";
import connectDb from "@/db/connectDb";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const GET = asyncHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    await connectDb();
    const { slug } = await params;

    console.log(slug);

    // Try to find by slug first, then by ObjectId for backward compatibility
    let packageData = await Package.findOne({ slug }).lean();

    if (!packageData) {
      // If not found by slug, try by ObjectId
      packageData = await Package.findById(slug).lean();
    }

    if (!packageData) {
      const error = new Error("Package not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    return NextResponse.json(
      { success: true, data: packageData },
      { status: 200 }
    );
  }
);

export const PUT = asyncHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    await connectDb();
    const { slug } = await params;
    const body: Partial<IPackageRequest> = await request.json();

    // Find package by slug first, then by ObjectId
    let existingPackage = await Package.findOne({ slug });

    if (!existingPackage) {
      existingPackage = await Package.findById(slug);
    }

    if (!existingPackage) {
      const error = new Error("Package not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    // Check for duplicate slug if updated
    if (body.slug && body.slug !== existingPackage.slug) {
      const duplicatePackage = await Package.findOne({
        slug: body.slug,
      });
      if (duplicatePackage) {
        const error = new Error(
          "Package slug already exists"
        ) as ErrorWithStatus;
        error.status = 400;
        throw error;
      }
    }

    const packageData = await Package.findByIdAndUpdate(
      existingPackage._id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!packageData) {
      const error = new Error("Package not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    return NextResponse.json(
      { success: true, data: packageData },
      { status: 200 }
    );
  }
);

export const DELETE = asyncHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    await connectDb();
    const { slug } = await params;

    // Find package by slug first, then by ObjectId
    let existingPackage = await Package.findOne({ slug });

    if (!existingPackage) {
      existingPackage = await Package.findById(slug);
    }

    if (!existingPackage) {
      const error = new Error("Package not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    const packageData = await Package.findByIdAndDelete(existingPackage._id);
    if (!packageData) {
      const error = new Error("Package not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  }
);
