import { NextResponse } from "next/server";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const asyncHandler = (
  fn: (request: Request, context?: any) => Promise<NextResponse>
  // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  return async (request: Request, context?: any) => {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      return await fn(request, context);
    } catch (error) {
      const err = error as ErrorWithStatus;
      console.error(`${request.method} ${request.url} error:`, err);

      // Handle specific error cases
      if (err.name === "CastError") {
        return NextResponse.json(
          { success: false, error: "Invalid ID format" },
          { status: 400 }
        );
      }

      if (err.name === "ValidationError") {
        return NextResponse.json(
          { success: false, error: err.message },
          { status: 400 }
        );
      }

      // Default error response
      return NextResponse.json(
        { success: false, error: err.message || "Internal Server Error" },
        { status: err.status || 500 }
      );
    }
  };
};
