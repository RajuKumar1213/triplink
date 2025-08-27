import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Admin from "@/models/Admin";
import jwt from "jsonwebtoken";
import connectDb from "@/db/connectDb";

interface LoginRequest {
  email: string;
  password: string;
}

export const POST = asyncHandler(
  async (request: Request) => {
    await connectDb();

    const { email, password }: LoginRequest = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if admin is active
    if (!admin.isActive) {
      return NextResponse.json(
        { success: false, message: "Account is deactivated" },
        { status: 401 }
      );
    }

    // Check if account is locked
    if (admin.isLocked) {
      return NextResponse.json(
        {
          success: false,
          message: "Account is temporarily locked due to too many failed login attempts"
        },
        { status: 423 }
      );
    }

    // Compare password
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      // Increment login attempts
      await admin.incLoginAttempts();

      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Reset login attempts on successful login
    await admin.resetLoginAttempts();

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      process.env.JWT_SECRET || "fallback-secret-key",
      {
        expiresIn: "24h",
      }
    );

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
          },
          token,
        },
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: "/",
    });

    return response;
  }
);
