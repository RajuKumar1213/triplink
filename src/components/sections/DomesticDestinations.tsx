"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TravelCard } from "@/components/ui/Card";
import { BookingModal } from "@/components/sections/BookingModal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Destination {
  id: string;
  slug: string;
  destination: string;
  duration: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  features: string[];
  discount: number;
  isPopular: boolean;
}

export function DomesticDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "/api/package-card?category=domestic-destinations"
        );
        const result = await response.json();

        if (result.success) {
          setDestinations(result.data);
        } else {
          setError("Failed to fetch destinations");
        }
      } catch (err) {
        setError("Error fetching destinations");
        console.error("Error fetching domestic destinations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(destinations.length / 4));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.ceil(destinations.length / 4)) %
        Math.ceil(destinations.length / 4)
    );
  };

  const visibleDestinations = destinations.slice(
    currentIndex * 4,
    currentIndex * 4 + 4
  );

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");

  const handleBookNow = (destination: string) => {
    setSelectedDestination(destination);
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDestination("");
  };

  if (loading) {
    return (
      <section className="py-10">
        <Container size="xl">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading destinations...</div>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10">
        <Container size="xl">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500">{error}</div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-10 ">
      <Container size="xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <SectionHeader
            align="left"
            eyebrow="Explore India"
            title="Domestic Destinations"
            subtitle="Discover the incredible beauty of India"
            className="mb-0"
          />

          {/* Navigation */}
          <div className="flex gap-2">
            <button
              title="Previous Slide"
              onClick={prevSlide}
              disabled={destinations.length <= 4}
              className="p-2 rounded-full border border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              title="Next Slide"
              onClick={nextSlide}
              disabled={destinations.length <= 4}
              className="p-2 rounded-full border border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
          {visibleDestinations.map((destination) => (
            <TravelCard
              key={destination.id}
              slug={destination.slug}
              destination={destination.destination}
              duration={destination.duration}
              image={destination.image}
              price={destination.price}
              originalPrice={destination.originalPrice}
              rating={destination.rating}
              reviews={destination.reviews}
              features={destination.features}
              discount={destination.discount}
              isPopular={destination.isPopular}
              onBookNow={() => handleBookNow(destination.destination)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link href="/all-destinations?category=domestic-destinations">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 border-gray-200 hover:border-yellow-500 hover:bg-yellow-50"
            >
              View All Destinations
            </Button>
          </Link>
        </div>
      </Container>

      {/* Booking Modal */}
      <BookingModal
        open={isBookingModalOpen}
        onClose={handleCloseModal}
        destination={selectedDestination}
      />
    </section>
  );
}
