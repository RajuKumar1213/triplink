import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import Package from "@/models/Package";
import connectDb from "@/db/connectDb";

// GET /api/package-card?category=international-destinations
export const GET = asyncHandler(async (request: Request) => {
  await connectDb();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  // If no category provided, return all packages
  if (!category) {
    const packages = await Package.find()
      .select("_id name duration heroImage pricing highlights trending slug category")
      .lean();

    const cards = packages.map((pkg) => {
      const priceObj =
        Array.isArray(pkg.pricing) && pkg.pricing.length > 0
          ? pkg.pricing[0]
          : {};
      const price = priceObj.price || 0;
      const originalPrice = priceObj.originalPrice || price;
      const discount =
        originalPrice > price
          ? Math.round(((originalPrice - price) / originalPrice) * 100)
          : 0;
      return {
        id: pkg._id,
        slug: pkg.slug,
        destination: pkg.name,
        duration: pkg.duration,
        image: pkg.heroImage,
        price,
        originalPrice,
        rating: 4.8,
        reviews: 168,
        features: pkg.highlights || [],
        discount,
        isPopular: !!pkg.trending,
        category: pkg.category || "general",
      };
    });

    return NextResponse.json({ success: true, data: cards }, { status: 200 });
  }

  // Fetch only matching packages
  // Try exact match first
  let packagesQuery = Package.find({ category });

  // If no packages found, try alternative formats
  if ((await packagesQuery.clone().countDocuments()) === 0 && category) {
    // Try converting slug to name (e.g., "celebrity" -> "Celebrity")
    const nameVersion = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    if (nameVersion !== category) {
      packagesQuery = Package.find({ category: nameVersion });
    }

    // If still no packages, try converting name to slug (e.g., "Celebrity" -> "celebrity")
    if ((await packagesQuery.clone().countDocuments()) === 0 && (category.includes(' ') || category !== category.toLowerCase())) {
      const slugVersion = category
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      if (slugVersion !== category) {
        packagesQuery = Package.find({ category: slugVersion });
      }
    }
  }

  const packages = await packagesQuery
    .select("_id name duration heroImage pricing highlights trending slug")
    .lean();

  // Map to card format
  const cards = packages.map((pkg) => {
    // Use first pricing if available
    const priceObj =
      Array.isArray(pkg.pricing) && pkg.pricing.length > 0
        ? pkg.pricing[0]
        : {};
    // Calculate discount
    const price = priceObj.price || 0;
    const originalPrice = priceObj.originalPrice || price;
    const discount =
      originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;
    return {
      id: pkg._id,
      slug: pkg.slug,
      destination: pkg.name,
      duration: pkg.duration,
      image: pkg.heroImage,
      price,
      originalPrice,
      rating: 4.8, // Static or fetch from reviews if available
      reviews: 168, // Static or fetch from reviews if available
      features: pkg.highlights || [],
      discount,
      isPopular: !!pkg.trending,
    };
  });

  return NextResponse.json({ success: true, data: cards }, { status: 200 });
});
