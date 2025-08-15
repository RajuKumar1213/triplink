"use client";
import React from "react";
import Image from "next/image";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { TravelCard } from "@/components/ui/Card";

// Carousel images (celebrity visuals)
const carouselImages = [
  "https://images.mid-day.com/images/images/2023/feb/rannvijay-actor_d.jpg",
  "https://triplinkadventures.com/wp-content/uploads/2025/06/spitivalley.webp",
  "https://triplinkadventures.com/wp-content/uploads/2025/06/kashmir.jpg",
  "https://triplinkadventures.com/wp-content/uploads/2025/06/leh-to-pangong-lake-1.jpg",
];

// Card data
const celebrityTrips = [
  {
    destination: "Ladakh With Rannvijay",
    duration: "7N | 8D",
    image:
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d9krsmqwa8sk4vxpsh2h/Tower%20Bungee%20Jumping%20in%20Pokhara.jpg",
    price: 39999,
    originalPrice: 45999,
    rating: 4.9,
    reviews: 112,
    features: ["Khardung La", "Pangong", "Group Ride"],
  },
  {
    destination: "Spiti Story Run (Bhuvan)",
    duration: "6N | 7D",
    image:
      "https://theexpertcamper.co.uk/wp-content/uploads/2024/06/how-to-make-your-camping-trip-more-comfortable-ZF.jpeg",
    price: 34999,
    originalPrice: 41999,
    rating: 4.8,
    reviews: 87,
    features: ["Monasteries", "Village Chats", "Reels"],
  },
  {
    destination: "Kashmir Wellness (Shikhar)",
    duration: "5N | 6D",
    image:
      "https://i.ytimg.com/vi/z-K93w8wQ7o/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBjRjTztxcS6XRwMy7Qw4tw4p-AwA",
    price: 32999,
    originalPrice: 38999,
    rating: 4.7,
    reviews: 64,
    features: ["Yoga", "Alpine Walks", "Mindset"],
  },
  {
    destination: "Mountain Moto Masterclass",
    duration: "4N | 5D",
    image:
      "https://www.valthorens.com/app/uploads/iris-images/5858/adobestock-235185167-1-1920x1080-f50_50.webp",
    price: 27999,
    originalPrice: 33999,
    rating: 4.9,
    reviews: 143,
    features: ["Riding Tips", "Trail Skills", "Safety"],
  },
  {
    destination: "Mountain Moto Masterclass",
    duration: "4N | 5D",
    image:
      "https://www.valthorens.com/app/uploads/iris-images/5858/adobestock-235185167-1-1920x1080-f50_50.webp",
    price: 27999,
    originalPrice: 33999,
    rating: 4.9,
    reviews: 143,
    features: ["Riding Tips", "Trail Skills", "Safety"],
  },
  {
    destination: "Mountain Moto Masterclass",
    duration: "4N | 5D",
    image:
      "https://www.valthorens.com/app/uploads/iris-images/5858/adobestock-235185167-1-1920x1080-f50_50.webp",
    price: 27999,
    originalPrice: 33999,
    rating: 4.9,
    reviews: 143,
    features: ["Riding Tips", "Trail Skills", "Safety"],
  },
];

export default function CelebrityPage() {
  return (
    <>
      <Header />
      {/* Carousel (destination style) */}
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
                      alt={`Celebrity image ${i + 1}`}
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
                  Celebrity Journeys
                </p>
                <h1 className="text-3xl md:text-4xl font-black leading-tight text-gray-900 tracking-tight">
                  Travel With Your Icons
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
            alt="Backgroundttp"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>
        <Container className="py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {celebrityTrips.map((t) => (
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
                onBookNow={() =>
                  console.log("Book celebrity trip: " + t.destination)
                }
              />
            ))}
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
