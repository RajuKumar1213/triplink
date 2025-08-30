"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { TravelCard } from "@/components/ui/Card";
import { BookingModal } from "@/components/sections/BookingModal";

// Carousel images (celebrity visuals)
const carouselImages = [
  "https://images.mid-day.com/images/images/2023/feb/rannvijay-actor_d.jpg",
  "https://triplinkadventures.com/wp-content/uploads/2025/06/spitivalley.webp",
  "https://triplinkadventures.com/wp-content/uploads/2025/06/kashmir.jpg",
  "https://triplinkadventures.com/wp-content/uploads/2025/06/leh-to-pangong-lake-1.jpg",
];

// Card data will be fetched from API
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

export default function CelebrityPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [celebrityTrips, setCelebrityTrips] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const fetchCards = async () => {
      try {
        const res = await fetch(`/api/package-card?category=celebrity`);
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const json = await res.json();
        if (mounted && json && json.success && Array.isArray(json.data)) {
          setCelebrityTrips(json.data as CardItem[]);
        }
      } catch (err) {
        console.error("Failed to load celebrity packages:", err);
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
    <>
      <Header />
      {/* HERO: polished celebrity look */}
      <section className="relative">
        <div
          className="relative h-[520px] md:h-[560px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/13/63/b4/ca.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/60" />

          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
              <div className="max-w-2xl text-center md:text-left">
                <p className="uppercase tracking-widest text-yellow-300 font-semibold mb-3">
                  Celebrity Journeys
                </p>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                  Travel With Your Icons
                </h1>
                <p className="text-lg text-white/90 mb-6">
                  Join exclusive journeys hosted by creators and icons — limited
                  seats, unforgettable stories.
                </p>

                <div className="flex gap-3 justify-center md:justify-start">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="inline-block border border-white/30 text-white px-5 py-3 rounded-md hover:bg-white/5"
                  >
                    Book a Seat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Card grid */}
      <div className="relative">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://i.pinimg.com/originals/9a/f0/d4/9af0d4299c57963724ea1a6b45b8ec0c.jpg"
            alt="Backgroundttp"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>
        <Container className="py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              <div className="col-span-full text-center py-10">Loading...</div>
            ) : celebrityTrips.length === 0 ? (
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
                    We couldn&apos;t find any celebrity journeys right now. Try
                    exploring other categories or check back later.
                  </p>
                </div>
              </div>
            ) : (
              celebrityTrips.map((t: CardItem) => (
                <TravelCard
                  slug={t.slug || ""}
                  key={t.id || t.destination}
                  destination={t.destination}
                  duration={t.duration || ""}
                  image={t.image || ""}
                  price={t.price ?? 0}
                  originalPrice={t.originalPrice ?? 0}
                  rating={t.rating ?? 0}
                  reviews={t.reviews ?? 0}
                  features={t.features}
                  onBookNow={() => handleBookNow(t.destination)}
                />
              ))
            )}
          </div>
        </Container>
      </div>
      <Footer />

      <BookingModal
        open={isBookingModalOpen}
        onClose={handleCloseModal}
        destination={selectedDestination}
      />
    </>
  );
}
