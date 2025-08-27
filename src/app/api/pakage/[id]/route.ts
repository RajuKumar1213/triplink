import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Package from "@/models/Package";
import { IPackage } from "@/types/package";
import connectDb from "@/db/connectDb";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const GET = asyncHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    await connectDb();
    const { id } = await params;
    const packageData = await Package.findById(id).lean();
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
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    await connectDb();
    const { id } = await params;
    const body: Partial<IPackage> = await request.json();

    // Check for duplicate slug if updated
    if (body.slug) {
      const existingPackage = await Package.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });
      if (existingPackage) {
        const error = new Error(
          "Package slug already exists"
        ) as ErrorWithStatus;
        error.status = 400;
        throw error;
      }
    }

    const packageData = await Package.findByIdAndUpdate(
      id,
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
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    await connectDb();
    const { id } = await params;
    const packageData = await Package.findByIdAndDelete(id);
    if (!packageData) {
      const error = new Error("Package not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  }
);
