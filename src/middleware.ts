import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  // Temporarily disabled middleware - just pass through all requests
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
