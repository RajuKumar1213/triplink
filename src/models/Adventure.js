import mongoose from "mongoose";

const adventureSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    isPopular: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// adding index to improve search performance
adventureSchema.index({
  destination: "text",
  duration: "text",
  features: "text",
});

const Adventure =
  mongoose.models.Adventure || mongoose.model("Adventure", adventureSchema);

export default Adventure;
