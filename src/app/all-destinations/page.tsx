"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TravelCard } from "@/components/ui/Card";
import { BookingModal } from "@/components/sections/BookingModal";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import Image from "next/image";
import { backgroundImage } from "../../constant";

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

export default function AllDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const getTitle = () => {
    if (category === "international-destinations") return "International Destinations";
    if (category === "domestic-destinations") return "Domestic Destinations";
    return "All Destinations";
  };

  const getDescription = () => {
    if (category === "international-destinations") return "Explore amazing destinations around the world";
    if (category === "domestic-destinations") return "Discover the beauty of India";
    return "Explore all our amazing destinations";
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const url = category
          ? `/api/package-card?category=${category}`
          : "/api/package-card";

        const response = await fetch(url);
        const result = await response.json();

        if (result.success) {
          setDestinations(result.data);
        } else {
          setError("Failed to fetch destinations");
        }
      } catch (err) {
        setError("Error fetching destinations");
        console.error("Error fetching destinations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [category]);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDestination("");
  };

  if (loading) {
    return (
      <section className="py-20">
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
      <section className="py-20">
        <Container size="xl">
          <div className="text-center">
            <div className="text-red-500 mb-4">Error: {error}</div>
            <button
              onClick={() => window.location.reload()}
              className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600"
            >
              Try Again
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <div className="bg-white">
      <Header />
      <div className="relative">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>
        <main className="relative">
          <section className="py-20">
            <Container size="xl">
              <SectionHeader
                title={getTitle()}
                subtitle={getDescription()}
              />

              {destinations.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                    No destinations found
                  </h3>
                  <p className="text-gray-500">
                    We&apos;re working on adding more amazing destinations. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                  {destinations.map((destination) => (
                    <TravelCard
                      key={destination.id}
                      destination={destination.destination}
                      slug={destination.slug}
                      duration={destination.duration}
                      image={destination.image}
                      price={destination.price}
                      originalPrice={destination.originalPrice}
                      rating={destination.rating}
                      reviews={destination.reviews}
                      features={destination.features}
                      discount={destination.discount}
                      isPopular={destination.isPopular}
                    />
                  ))}
                </div>
              )}
            </Container>
          </section>
        </main>
      </div>
      <Footer />

      <BookingModal
        open={isBookingModalOpen}
        onClose={handleCloseModal}
        destination={selectedDestination}
      />
    </div>
  );
}
