"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { TravelCard } from "@/components/ui/Card";
import { BookingModal } from "@/components/sections/BookingModal";
import { backgroundImage } from "@/constant";

// Corporate visuals and program offerings
const carouselImages = [
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3183161/pexels-photo-3183161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

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

export default function CorporatePage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [corporatePrograms, setCorporatePrograms] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const fetchCards = async () => {
      try {
        const res = await fetch(`/api/package-card?category=corporate`);
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const json = await res.json();
        if (mounted && json && json.success && Array.isArray(json.data)) {
          setCorporatePrograms(json.data as CardItem[]);
        }
      } catch (err) {
        console.error("Failed to load corporate packages:", err);
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
      {/* HERO: polished corporate look */}
      <section className="relative">
        <div
          className="relative h-[520px] md:h-[560px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.gotap.id/wp-content/uploads/2023/07/personal-business-trip-and-companies-business-trip-1024x478.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/60" />

          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
              <div className="max-w-2xl text-center md:text-left">
                <p className="uppercase tracking-widest text-yellow-300 font-semibold mb-3">
                  Corporate Programs
                </p>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                  Team Retreats & Corporate Travel
                </h1>
                <p className="text-lg text-white/90 mb-6">
                  Bespoke corporate retreats, leadership offsites and team
                  experiences crafted to align with your company goals.
                </p>

                <div className="flex gap-3 justify-center md:justify-start">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="inline-block border border-white/30 text-white px-5 py-3 rounded-md hover:bg-white/5"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative ">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={backgroundImage}
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
            ) : corporatePrograms.length === 0 ? (
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
                    We couldn&apos;t find any corporate packages right now. Try
                    checking other categories or contact us for a tailored
                    program.
                  </p>
                </div>
              </div>
            ) : (
              corporatePrograms.map((t: CardItem) => (
                <TravelCard
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
