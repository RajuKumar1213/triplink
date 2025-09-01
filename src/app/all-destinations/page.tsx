"use client";
import { useState, useEffect, Suspense } from "react";
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

function AllDestinationsContent() {
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

  const getHeroImage = () => {
    if (category === "international-destinations") return "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop";
    if (category === "domestic-destinations") return "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=1080&fit=crop";
    return "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop";
  };

  const getHeroTitle = () => {
    if (category === "international-destinations") return "Discover the World";
    if (category === "domestic-destinations") return "Explore Incredible India";
    return "Your Dream Destinations Await";
  };

  const getHeroSubtitle = () => {
    if (category === "international-destinations") return "From European castles to Asian temples, embark on unforgettable international adventures";
    if (category === "domestic-destinations") return "From Himalayan peaks to coastal beaches, experience the diverse beauty of India";
    return "Handpicked destinations that promise extraordinary experiences and lifelong memories";
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
      <>
        {/* Hero Section Skeleton */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-900">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded-full w-48 mx-auto mb-6"></div>
              <div className="h-16 bg-gray-700 rounded-lg w-full max-w-2xl mx-auto mb-6"></div>
              <div className="h-6 bg-gray-700 rounded w-full max-w-xl mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Main Content Loading */}
        <section className="py-20">
          <Container size="xl">
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">Loading destinations...</div>
            </div>
          </Container>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        {/* Hero Section with Error */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-900">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Something went wrong</h1>
            <p className="text-lg text-gray-300 mb-8">We couldn&apos;t load the destinations. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-yellow-500 text-black px-8 py-3 rounded-lg hover:bg-yellow-600 font-semibold"
            >
              Try Again
            </button>
          </div>
        </section>

        {/* Main Content Error */}
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
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getHeroImage()}
            alt="Destinations Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-300 text-sm font-medium border border-yellow-500/30">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              {getTitle()}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {getHeroTitle()}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {getHeroSubtitle()}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-yellow-300">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-sm font-medium">Curated Experiences</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-300">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-sm font-medium">Expert Guides</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-300">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-sm font-medium">Unforgettable Memories</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-8 left-8 w-20 h-20 border-2 border-yellow-400/30 rounded-full animate-spin-slow"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-2 border-yellow-400/30 rounded-full animate-spin-slow animation-delay-1000"></div>
        <div className="absolute bottom-16 right-16 w-12 h-12 border-2 border-yellow-400/30 rounded-full animate-spin-slow animation-delay-2000"></div>
      </section>

      {/* Main Content */}
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

        <BookingModal
          open={isBookingModalOpen}
          onClose={handleCloseModal}
          destination={selectedDestination}
        />
      </section>
    </>
  );
}

export default function AllDestinationsPage() {
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
        <Suspense fallback={
          <main className="relative">
            <section className="py-20">
              <Container size="xl">
                <div className="flex justify-center items-center h-64">
                  <div className="text-gray-500">Loading...</div>
                </div>
              </Container>
            </section>
          </main>
        }>
          <AllDestinationsContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
