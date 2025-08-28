"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { TravelCard } from "@/components/ui/Card";
import { BookingModal } from "@/components/sections/BookingModal";

// Carousel images (trip visuals)
const tourCarouselImages = [
  "https://cdn.pixabay.com/photo/2024/07/20/15/52/mountains-8908538_640.jpg",
  "https://cdn.pixabay.com/photo/2017/05/10/13/39/ladakh-2300904_640.jpg",
  "https://cdn.pixabay.com/photo/2019/08/14/09/34/zal-zal-lake-azad-kashmir-4405230_1280.jpg",
  "https://static.toiimg.com/photo/80398554.cms",
];

// Card data
const tripTours = [
  {
    destination: "Manali Adventure",
    duration: "4N | 5D",
    image:
      "https://cdn.pixabay.com/photo/2019/08/14/09/34/zal-zal-lake-azad-kashmir-4405230_1280.jpg",
    price: 14999,
    originalPrice: 19999,
    rating: 4.7,
    reviews: 203,
    features: ["River Rafting", "Solang Valley", "Local Culture"],
  },
  {
    destination: "Leh–Ladakh Expedition",
    duration: "6N | 7D",
    image:
      "https://cdn.pixabay.com/photo/2017/05/10/13/39/ladakh-2300904_640.jpg",
    price: 27999,
    originalPrice: 33999,
    rating: 4.9,
    reviews: 156,
    features: ["Nubra Valley", "Magnetic Hill", "Pangong Lake"],
  },
  {
    destination: "Kashmir Paradise",
    duration: "5N | 6D",
    image:
      "https://cdn.pixabay.com/photo/2024/07/20/15/52/mountains-8908538_640.jpg",
    price: 18999,
    originalPrice: 23999,
    rating: 4.8,
    reviews: 98,
    features: ["Shikara Ride", "Gulmarg", "Snow Treks"],
  },
  {
    destination: "Shimla – Kufri Getaway",
    duration: "3N | 4D",
    image: "https://static.toiimg.com/photo/80398554.cms",
    price: 9999,
    originalPrice: 13999,
    rating: 4.6,
    reviews: 121,
    features: ["Mall Road", "Snow Point", "Local Food"],
  },
];

export default function TripToursPage() {
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
    <>
      <Header />
      {/* Carousel (tours) */}
      <Container>
        <section className="relative">
          <div className="relative w-full">
            <div className="relative py-6 md:py-4">
              <div className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 md:gap-6 [&::-webkit-scrollbar]:hidden">
                {tourCarouselImages.map((src, i) => (
                  <div
                    key={src + i}
                    className="relative flex-shrink-0 snap-start w-48 h-48 md:w-80 md:h-80 overflow-hidden bg-gray-100 shadow-sm shadow-yellow-100/50 ring-1 ring-yellow-200/50">
                    <Image
                      src={src}
                      alt={`Tour image ${i + 1}`}
                      fill
                      priority={i === 0}
                      className="object-cover"
                      sizes="(min-width:1024px) 18rem, 12rem"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 hover:opacity-40 transition" />
                  </div>
                ))}
              </div>
              <div className="absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-white to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
            {/* Info strip minimal */}
            <Container className="mt-4 bg-white/80 backdrop-blur-md border border-yellow-200/60 rounded-2xl p-6 md:p-8 shadow-lg shadow-yellow-100/50">
              <div className="flex flex-col gap-4">
                <p className="uppercase tracking-[0.35em] text-[10px] md:text-xs font-semibold text-yellow-600">
                  Curated Tours
                </p>
                <h1 className="text-3xl md:text-4xl font-black leading-tight text-gray-900 tracking-tight">
                  Explore Popular Trips
                </h1>
              </div>
            </Container>
          </div>
        </section>
      </Container>

      {/* Card grid */}
      <div className="relative mt-10">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://i.pinimg.com/originals/9a/f0/d4/9af0d4299c57963724ea1a6b45b8ec0c.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>
        <Container className="py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tripTours.map((t) => (
              <TravelCard
                key={t.destination}
                destination={t.destination}
                duration={t.duration}
                image={t.image}
                price={t.price}
                originalPrice={t.originalPrice}
                rating={t.rating}
                reviews={t.reviews}
                features={t.features}
                onBookNow={() => handleBookNow(t.destination)}
              />
            ))}
          </div>
        </Container>
      </div>

      {/* Booking Modal */}
      <BookingModal
        open={isBookingModalOpen}
        onClose={handleCloseModal}
        destination={selectedDestination}
      />

      <Footer />
    </>
  );
}
