import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Admin from "@/models/Admin";
import jwt from "jsonwebtoken";
import connectDb from "@/db/connectDb";

interface JWTPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const GET = asyncHandler(
  async (request: Request) => {
    await connectDb();

    // Get token from cookie
    const cookieHeader = request.headers.get("cookie");
    let token = null;

    if (cookieHeader) {
      const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      token = cookies["admin_token"];
    }

    // Also check Authorization header
    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    try {
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "fallback-secret-key"
      ) as JWTPayload;

      // Find admin
      const admin = await Admin.findById(decoded.id).select("-password");

      if (!admin) {
        return NextResponse.json(
          { success: false, message: "Admin not found" },
          { status: 401 }
        );
      }

      if (!admin.isActive) {
        return NextResponse.json(
          { success: false, message: "Account is deactivated" },
          { status: 401 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: {
            admin: {
              id: admin._id,
              name: admin.name,
              email: admin.email,
              role: admin.role,
            },
          },
        },
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }
);
