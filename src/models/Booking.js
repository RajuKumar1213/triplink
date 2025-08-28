import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
  },
  destination: {
    type: String,
    required: [true, "Destination is required"],
    trim: true,
  },
  travellers: {
    type: Number,
    required: [true, "Number of travellers is required"],
    min: [1, "At least 1 traveller is required"],
    max: [20, "Maximum 20 travellers allowed"],
  },
  message: {
    type: String,
    trim: true,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
bookingSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
