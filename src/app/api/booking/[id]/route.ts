import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Booking from "@/models/Booking";
import connectDb from "@/db/connectDb";

export const PATCH = asyncHandler(
  async (request: Request, { params }: { params: { id: string } }) => {
    try {
      await connectDb();

      const { id } = params;
      const body = await request.json();
      const { status } = body;

      // Validate required fields
      if (!status) {
        return NextResponse.json(
          { success: false, message: "Status is required" },
          { status: 400 }
        );
      }

      // Validate status value
      if (!["pending", "confirmed", "cancelled"].includes(status)) {
        return NextResponse.json(
          { success: false, message: "Invalid status value" },
          { status: 400 }
        );
      }

      // Find and update the booking
      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        {
          status,
          updatedAt: new Date(),
        },
        { new: true }
      );

      if (!updatedBooking) {
        return NextResponse.json(
          { success: false, message: "Booking not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Booking status updated successfully",
          data: updatedBooking,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Booking update error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to update booking. Please try again." },
        { status: 500 }
      );
    }
  }
);
