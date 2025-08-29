import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  activities: [{ type: String }],
});

const pricingSchema = new mongoose.Schema({
  label: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  includes: [{ type: String }],
  notes: { type: String },
});

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const packageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    region: { type: String },
    shortTagline: { type: String },
    heroImage: { type: String },
    gallery: [{ type: String }],
    duration: { type: String },
    difficulty: { type: String },
    altitude: { type: String },
    bestSeason: { type: String },

    category: { type: String },

    overview: [{ type: String }],
    highlights: [{ type: String }],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],

    itinerary: [itinerarySchema],
    pricing: [pricingSchema],
    faqs: [faqSchema],

    bookingNote: { type: String },
    trending: { type: Boolean, default: false },
    icon: { type: String },
  },
  { timestamps: true }
);

// Note: Slug generation is now handled on the frontend to ensure uniqueness
// before saving to the database

const Package =
  mongoose.models.Package || mongoose.model("Package", packageSchema);

export default Package;
