import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Blog from "@/models/Blog";
import { IBlog } from "@/types/blog";
import connectDb from "@/db/connectDb";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const GET = asyncHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    await connectDb();
    const { id } = await params;

    // Try to find by slug first, then by ObjectId for backward compatibility
    let blog = await Blog.findOne({ slug: id }).lean();

    if (!blog) {
      // If not found by slug, try by ObjectId
      blog = await Blog.findById(id).lean();
    }

    if (!blog) {
      const error = new Error("Blog not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  }
);

export const PUT = asyncHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    await connectDb();
    const { id } = await params;
    const body: Partial<IBlog> = await request.json();

    // Find blog by slug first, then by ObjectId
    let existingBlog = await Blog.findOne({ slug: id });

    if (!existingBlog) {
      existingBlog = await Blog.findById(id);
    }

    if (!existingBlog) {
      const error = new Error("Blog not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    // Check for duplicate slug if updated
    if (body.slug && body.slug !== existingBlog.slug) {
      const duplicateBlog = await Blog.findOne({
        slug: body.slug,
      });
      if (duplicateBlog) {
        const error = new Error("Blog slug already exists") as ErrorWithStatus;
        error.status = 400;
        throw error;
      }
    }

    const blog = await Blog.findByIdAndUpdate(
      existingBlog._id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!blog) {
      const error = new Error("Blog not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  }
);

export const DELETE = asyncHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    await connectDb();
    const { id } = await params;

    // Find blog by slug first, then by ObjectId
    let existingBlog = await Blog.findOne({ slug: id });

    if (!existingBlog) {
      existingBlog = await Blog.findById(id);
    }

    if (!existingBlog) {
      const error = new Error("Blog not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    const blog = await Blog.findByIdAndDelete(existingBlog._id);
    if (!blog) {
      const error = new Error("Blog not found") as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  }
);
