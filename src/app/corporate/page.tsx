"use client";
import React from "react";
import Image from "next/image";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { TravelCard } from "@/components/ui/Card";

// Corporate visuals and program offerings
const carouselImages = [
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3183161/pexels-photo-3183161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const corporatePrograms = [
  {
    destination: "Leadership Retreat - Himachal",
    duration: "3N | 4D",
    image: carouselImages[1],
    price: 69999,
    originalPrice: 89999,
    rating: 4.9,
    reviews: 48,
    features: ["Facilitated Workshops", "Outdoor Challenges", "Strategy Sessions"],
  },
  {
    destination: "Team Offsite - Goa",
    duration: "2N | 3D",
    image: carouselImages[3],
    price: 49999,
    originalPrice: 64999,
    rating: 4.8,
    reviews: 76,
    features: ["Beach Activities", "Team Building", "Evening Gala"],
  },
  {
    destination: "Corporate Wellness - Kerala",
    duration: "4N | 5D",
    image: carouselImages[0],
    price: 79999,
    originalPrice: 94999,
    rating: 4.7,
    reviews: 31,
    features: ["Wellness Sessions", "Meditation", "Ayurvedic Therapies"],
  },
  {
    destination: "Incentive Trip - Maldives",
    duration: "4N | 5D",
    image: carouselImages[2],
    price: 199999,
    originalPrice: 249999,
    rating: 5.0,
    reviews: 12,
    features: ["Luxury Resort", "Seaplane Transfer", "Private Dinners"],
  },
];

export default function CorporatePage() {
  return (
    <>
      <Header />
      <Container>
        <section className="relative">
          <div className="relative w-full">
            <div className="relative py-6 md:py-4">
              <div className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 md:gap-6 [&::-webkit-scrollbar]:hidden">
                {carouselImages.map((src, i) => (
                  <div
                    key={src + i}
                    className="relative flex-shrink-0 snap-start w-48 h-48 md:w-80 md:h-80 overflow-hidden bg-gray-100 shadow-sm shadow-yellow-100/50 ring-1 ring-yellow-200/50">
                    <Image
                      src={src}
                      alt={`Corporate visual ${i + 1}`}
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
            <Container className="mt-4 bg-white/80 backdrop-blur-md border border-yellow-200/60 rounded-2xl p-6 md:p-8 shadow-lg shadow-yellow-100/50">
              <div className="flex flex-col gap-4">
                <p className="uppercase tracking-[0.35em] text-[10px] md:text-xs font-semibold text-yellow-600">
                  Corporate Programs
                </p>
                <h1 className="text-3xl md:text-4xl font-black leading-tight text-gray-900 tracking-tight">
                  Corporate Travel & Retreats
                </h1>
              </div>
            </Container>
          </div>
        </section>
      </Container>

      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {corporatePrograms.map((t) => (
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
              onBookNow={() => console.log("Book corporate program: " + t.destination)}
            />
          ))}
        </div>
      </Container>

      <Footer />
    </>
  );
}
