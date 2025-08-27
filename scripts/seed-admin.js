import mongoose from "mongoose";
import Admin from "../src/models/Admin.js";
import connectDb from "../src/db/connectDb.js";

const seedAdmin = async () => {
  try {
    await connectDb();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@triplinkadventures.com" });

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
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

    console.log("✅ Admin user created successfully!");
    console.log("Email: admin@triplinkadventures.com");
    console.log("Password: admin123");
    console.log("⚠️  Please change the password after first login!");

  } catch (error) {
    console.error("Error seeding admin:", error);
  } finally {
    await mongoose.connection.close();
  }
};

// Run the seed function
seedAdmin();
