import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    // Connect with options for better error handling
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error(`Database connection failed: ${error}`);
  }
};

export default connectDb;
