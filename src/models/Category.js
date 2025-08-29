import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Note: Slug generation is now handled on the frontend to ensure uniqueness
// before saving to the database

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
