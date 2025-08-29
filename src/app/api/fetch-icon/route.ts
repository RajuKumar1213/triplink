import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import connectDb from "@/db/connectDb";
import Package from "@/models/Package";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const GET = asyncHandler(async (request: Request) => {
  await connectDb();

  try {
    // Fetch only icon, slug, and trending fields from all packages
    const packages = await Package.find({})
      .select("icon slug trending")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: packages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching package icons:", error);
    const err = error as ErrorWithStatus;
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to fetch package icons",
      },
      { status: 500 }
    );
  }
});
