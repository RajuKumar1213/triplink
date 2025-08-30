"use client";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/sections/Header";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { TravelCard } from "@/components/ui/Card";
import { BookingModal } from "@/components/sections/BookingModal";
import Link from "next/link";

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
}

const WeekendTripPage = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [weekendTrips, setWeekendTrips] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const fetchCards = async () => {
      try {
        const res = await fetch(`/api/package-card?category=weekend-trip`);
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const json = await res.json();
        if (mounted && json && json.success && Array.isArray(json.data)) {
          setWeekendTrips(json.data as CardItem[]);
        }
      } catch (err) {
        console.error("Failed to load weekend packages:", err);
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
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section (updated) */}
      <section className="relative">
        <div
          className="relative h-[520px] md:h-[560px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50" />

          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
              <div className="max-w-2xl text-center md:text-left">
                <p className="uppercase tracking-widest text-yellow-300 font-semibold mb-3">
                  Weekend Escapes
                </p>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                  Short trips, big memories
                </h1>
                <p className="text-lg text-white/90 mb-6">
                  Curated weekend getaways for every mood — adventure,
                  relaxation and local experiences packed into 2–3 days.
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

      {/* Weekend Trips Grid */}
      <Container className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Weekend Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our curated collection of weekend trips designed for
            maximum enjoyment and minimum planning. Each trip includes
            accommodation, activities, and local experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-10">Loading...</div>
          ) : weekendTrips.length === 0 ? (
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
                  We couldn&apos;t find any weekend trips right now. Try
                  browsing other categories or come back later.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <Link
                    href="/50-plus-trips"
                    className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                  >
                    Browse all destinations
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            weekendTrips.map((trip: CardItem, index: number) => (
              <TravelCard
                slug={trip.slug || ""}
                key={trip.id || index}
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
            ))
          )}
        </div>
      </Container>

      {/* Why Choose Weekend Trips */}
      <section className="bg-white py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Weekend Trips?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick & Convenient</h3>
              <p className="text-gray-600">
                Perfect for busy schedules with minimal time commitment
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Curated Experiences
              </h3>
              <p className="text-gray-600">
                Handpicked activities and accommodations for memorable trips
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Value</h3>
              <p className="text-gray-600">
                Competitive pricing with all-inclusive packages
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Booking Modal */}
      <BookingModal
        open={isBookingModalOpen}
        onClose={handleCloseModal}
        destination={selectedDestination}
      />

      <Footer />
    </div>
  );
};

export default WeekendTripPage;
