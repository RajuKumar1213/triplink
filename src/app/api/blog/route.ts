import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import connectDb from "@/db/connectDb";
import Blog from "@/models/Blog";
import { IBlog } from "@/types/blog";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const GET = asyncHandler(async () => {
  await connectDb();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ success: true, data: blogs }, { status: 200 });
});

export const POST = asyncHandler(async (request: Request) => {
  await connectDb();
  const body: IBlog = await request.json();

  // Check for duplicate slug
  const existingBlog = await Blog.findOne({ slug: body.slug });
  if (existingBlog) {
    const error = new Error("Blog slug already exists") as ErrorWithStatus;
    error.status = 400;
    throw error;
  }

  const blog = new Blog(body);
  await blog.save();
  return NextResponse.json(
    { success: true, data: blog },
    { status: 201 }
  );
});
