import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Booking from "@/models/Booking";
import connectDb from "@/db/connectDb";

export const GET = asyncHandler(
  async () => {
    try {
      await connectDb();

      // Fetch all bookings, sorted by creation date (newest first)
      const bookings = await Booking.find({})
        .sort({ createdAt: -1 })
        .lean();

      return NextResponse.json(
        {
          success: true,
          message: "Bookings fetched successfully",
          data: bookings,
          count: bookings.length,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Fetching bookings error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to fetch bookings. Please try again." },
        { status: 500 }
      );
    }
  }
);

export const POST = asyncHandler(
  async (request: Request) => {
    await connectDb();

    const body = await request.json();
    const { name, email, phone, destination, travellers, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !destination || !travellers) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Validate phone number (basic validation)
    if (phone.length < 10) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid phone number" },
        { status: 400 }
      );
    }

    // Validate travellers count
    if (travellers < 1 || travellers > 20) {
      return NextResponse.json(
        { success: false, message: "Number of travellers must be between 1 and 20" },
        { status: 400 }
      );
    }

    try {
      // Create new booking
      const booking = new Booking({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        destination: destination.trim(),
        travellers: parseInt(travellers),
        message: message ? message.trim() : "",
        status: "pending",
      });

      const savedBooking = await booking.save();

      return NextResponse.json(
        {
          success: true,
          message: "Booking submitted successfully! We'll contact you soon.",
          data: {
            id: savedBooking._id,
            destination: savedBooking.destination,
            status: savedBooking.status,
            createdAt: savedBooking.createdAt,
          },
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Booking creation error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to create booking. Please try again." },
        { status: 500 }
      );
    }
  }
);
