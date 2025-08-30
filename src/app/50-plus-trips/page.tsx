"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { TravelCard } from "@/components/ui/Card";
import { BookingModal } from "@/components/sections/BookingModal";
import { backgroundImage } from "@/constant";

// Card item type (returned by /api/package-card)
interface CardItem {
  id: string;
  slug?: string;
  destination: string;
  duration?: string;
  image?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  features?: string[];
  category?: string;
}

export default function SeniorTripsPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [seniorTrips, setSeniorTrips] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const fetchCards = async () => {
      try {
        const res = await fetch(`/api/package-card`);
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const json = await res.json();
        if (mounted && json && json.success && Array.isArray(json.data)) {
          setSeniorTrips(json.data as CardItem[]);
        }
      } catch (err) {
        console.error("Failed to load 50+ packages:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCards();
    return () => {
      mounted = false;
    };
  }, []);

  const handleBookNow = (destination: string) => {
    setSelectedDestination(destination);
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDestination("");
  };

  // Group fetched packages by category
  const groupedByCategory: Record<string, CardItem[]> = useMemo(() => {
    const map: Record<string, CardItem[]> = {};
    seniorTrips.forEach((pkg) => {
      const key = pkg.category || "general";
      if (!map[key]) map[key] = [];
      map[key].push(pkg);
    });
    return map;
  }, [seniorTrips]);

  const formatCategoryName = (category: string) =>
    category
      .replace(/[-_]/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  return (
    <>
      <Header />
      {/* Hero Section (updated to match weekend-trip style) */}
      <section className="relative">
        <div
          className="relative h-[520px] md:h-[560px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://travelnevada.com/wp-content/uploads/2021/03/RoadTrips_Desktop.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50" />

          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
              <div className="max-w-2xl text-center md:text-left">
                <p className="uppercase tracking-widest text-yellow-300 font-semibold mb-3">
                  50+ Trips
                </p>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                  Comfortable Adventures for the Golden Years
                </h1>
                <p className="text-lg text-white/90 mb-6">
                  Specially curated itineraries with a relaxed pace, comfortable
                  stays, and memorable local experiences — designed for
                  travelers aged 50 and above.
                </p>

                <div className="flex gap-3 justify-center md:justify-start">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="inline-block border border-white/30 text-white px-5 py-3 rounded-md hover:bg-white/5"
                  >
                    Plan a Trip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trips Grid */}
      <div className="relative ">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>
        <Container className="py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              View Our Exclusive 50+ Travel Packages
            </h2>
          </div>

          <div>
            {loading ? (
              <div className="col-span-full text-center py-10">Loading...</div>
            ) : seniorTrips.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <div className="max-w-xl text-center">
                  <div className="mx-auto w-full max-w-md h-auto rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="https://orioly.com/wp-content/uploads/2022/08/1600x900-1.png"
                      alt="No travel found illustration"
                      width={800}
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="mt-8 text-3xl font-extrabold text-gray-900">
                    Travel not found
                  </h3>
                  <p className="mt-3 text-gray-600">
                    We couldn&apos;t find any packages right now. Try browsing
                    other categories or come back later.
                  </p>
                </div>
              </div>
            ) : (
              // Group by category and render each category separately
              Object.entries(groupedByCategory).map(([category, items]) => (
                <section key={category} className="mb-10">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    {formatCategoryName(category)}
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((trip) => (
                      <TravelCard
                        slug={trip.slug || ""}
                        key={trip.id || trip.destination}
                        destination={trip.destination}
                        duration={trip.duration || ""}
                        image={trip.image || ""}
                        price={trip.price ?? 0}
                        originalPrice={trip.originalPrice ?? 0}
                        rating={trip.rating ?? 0}
                        reviews={trip.reviews ?? 0}
                        features={trip.features}
                        onBookNow={() => handleBookNow(trip.destination)}
                      />
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </Container>
      </div>

      {/* Special Benefits Section */}
      <Container className="py-12">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Special Benefits for Senior Travelers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer exclusive benefits and considerations for our 50+
              travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎟️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Senior Discounts
              </h3>
              <p className="text-sm text-gray-600">
                Special pricing and early bird discounts for senior citizens
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚐</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Comfortable Transport
              </h3>
              <p className="text-sm text-gray-600">
                AC vehicles with comfortable seating and minimal walking
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👨‍⚕️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Medical Support
              </h3>
              <p className="text-sm text-gray-600">
                24/7 medical assistance and emergency support throughout the
                trip
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⏱️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Flexible Timing
              </h3>
              <p className="text-sm text-gray-600">
                Adjustable departure times and optional rest periods
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🍽️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dietary Care</h3>
              <p className="text-sm text-gray-600">
                Special dietary arrangements and healthy meal options
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📞</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Personal Assistance
              </h3>
              <p className="text-sm text-gray-600">
                Dedicated support staff and personal care assistance
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Footer />

      <BookingModal
        open={isBookingModalOpen}
        onClose={handleCloseModal}
        destination={selectedDestination}
      />
    </>
  );
}
