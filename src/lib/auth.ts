import jwt from "jsonwebtoken";
import Admin from "@/models/Admin";
import connectDb from "@/db/connectDb";

interface JWTPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthenticatedAdmin {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const verifyAdminToken = async (token: string): Promise<AuthenticatedAdmin | null> => {
  try {
    await connectDb();

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret-key"
    ) as JWTPayload;

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin || !admin.isActive) {
      return null;
    }

    return {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };
  } catch {
    return null;
  }
};

export const getAdminFromRequest = async (request: Request): Promise<AuthenticatedAdmin | null> => {
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
    return null;
  }

  return await verifyAdminToken(token);
};

// Middleware function for protecting API routes
export const requireAdmin = async (request: Request): Promise<{ admin: AuthenticatedAdmin } | { error: string }> => {
  const admin = await getAdminFromRequest(request);

  if (!admin) {
    return { error: "Authentication required" };
  }

  return { admin };
};
