"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TravelCard } from "@/components/ui/Card";
import { BookingModal } from "@/components/sections/BookingModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const internationalDestinations = [
  {
    id: 1,
    destination: "LUXURY BALI",
    duration: "6N | 7D",
    image:
      "https://images.pexels.com/photos/1586205/pexels-photo-1586205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 89990,
    originalPrice: 119990,
    rating: 4.8,
    reviews: 2847,
    features: ["Beach Resort", "All Inclusive", "Spa & Wellness"],
    discount: 25,
    isPopular: true,
  },
  {
    id: 2,
    destination: "MAGICAL TURKEY",
    duration: "7N | 8D",
    image:
      "https://triplinkadventures.com/wp-content/uploads/2025/06/turkey-hot-air-ballooning-over-uchisar-village-cappadocia.jpg",
    price: 124990,
    originalPrice: 149990,
    rating: 4.9,
    reviews: 1924,
    features: ["Hot Air Balloon", "Cappadocia", "Historic Sites"],
    discount: 17,
    isPopular: false,
  },
  {
    id: 3,
    destination: "EXOTIC THAILAND",
    duration: "5N | 6D",
    image:
      "https://images.pexels.com/photos/844167/pexels-photo-844167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 69990,
    originalPrice: 89990,
    rating: 4.7,
    reviews: 3521,
    features: ["Bangkok", "Phuket", "Island Hopping"],
    discount: 22,
    isPopular: false,
  },
  {
    id: 4,
    destination: "AMAZING JAPAN",
    duration: "8N | 9D",
    image:
      "https://images.pexels.com/photos/2902939/pexels-photo-2902939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 189990,
    originalPrice: 229990,
    rating: 4.9,
    reviews: 1647,
    features: ["Tokyo", "Kyoto", "Mount Fuji"],
    discount: 17,
    isPopular: false,
  },
  {
    id: 5,
    destination: "SCENIC ALMÁTY",
    duration: "6N | 7D",
    image:
      "https://images.pexels.com/photos/734102/pexels-photo-734102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 149990,
    originalPrice: 179990,
    rating: 4.6,
    reviews: 892,
    features: ["Mountains", "Lake Tours", "Adventure"],
    discount: 17,
    isPopular: false,
  },
  {
    id: 6,
    destination: "PARADISE MALDIVES",
    duration: "4N | 5D",
    image:
      "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 299990,
    originalPrice: 399990,
    rating: 4.9,
    reviews: 2156,
    features: ["Water Villa", "Private Beach", "Luxury Resort"],
    discount: 25,
    isPopular: true,
  },
];

export function InternationalDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % Math.ceil(internationalDestinations.length / 4)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.ceil(internationalDestinations.length / 4)) %
        Math.ceil(internationalDestinations.length / 4)
    );
  };

  const visibleDestinations = internationalDestinations.slice(
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

  return (
    <section className="py-10 ">
      <Container size="xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <SectionHeader
            align="left"
            eyebrow="Explore the world"
            title="International Destinations"
            subtitle="Explore breathtaking destinations around the world"
            className="mb-0"
          />

          {/* Navigation */}
          <div className="flex gap-2">
            <button
            title="Previous Slide"
              onClick={prevSlide}
              className="p-2 rounded-full border border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
            title="Next Slide"
              onClick={nextSlide}
              className="p-2 rounded-full border border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200">
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
          {visibleDestinations.map((destination) => (
            <TravelCard
              key={destination.id}
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
        <div className="text-center mb-2">
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 border-gray-200 hover:border-yellow-500 hover:bg-yellow-50">
            View All Destinations
          </Button>
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
