import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Admin from "@/models/Admin";
import connectDb from "@/db/connectDb";

export const POST = asyncHandler(
  async () => {
    await connectDb();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@triplinkadventures.com" });

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin user already exists",
          data: {
            email: existingAdmin.email,
            name: existingAdmin.name,
          }
        },
        { status: 400 }
      );
    }

    // Create new admin
    const admin = new Admin({
      email: "admin@triplinkadventures.com",
      password: "admin123", // This will be hashed by the pre-save middleware
      name: "TripLink Admin",
      role: "super_admin",
      isActive: true,
    });

    await admin.save();

    return NextResponse.json(
      {
        success: true,
        message: "Admin user created successfully",
        data: {
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
        credentials: {
          email: "admin@triplinkadventures.com",
          password: "admin123",
          warning: "Please change the password after first login!"
        }
      },
      { status: 201 }
    );
  }
);
