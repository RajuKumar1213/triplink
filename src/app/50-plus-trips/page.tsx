"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { TravelCard } from "@/components/ui/Card";
import { BookingModal } from "@/components/sections/BookingModal";
import { backgroundImage } from "@/constant";

// Carousel images (50+ trip visuals)
const seniorCarouselImages = [
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

// Card data for 50+ trips
const seniorTrips = [
  {
    destination: "Golden Temple & Cultural Heritage",
    duration: "3N | 4D",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 15999,
    originalPrice: 19999,
    rating: 4.8,
    reviews: 156,
    features: ["Golden Temple Visit", "Cultural Shows", "Comfortable Stay", "Guided Tours"],
  },
  {
    destination: "Kerala Backwaters Relaxation",
    duration: "4N | 5D",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 24999,
    originalPrice: 29999,
    rating: 4.9,
    reviews: 203,
    features: ["Houseboat Stay", "Ayurvedic Spa", "Cultural Village", "Relaxing Cruise"],
  },
  {
    destination: "Rajasthan Heritage Tour",
    duration: "5N | 6D",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 28999,
    originalPrice: 34999,
    rating: 4.7,
    reviews: 178,
    features: ["Palace Visits", "Cultural Dance", "Comfort Travel", "Local Cuisine"],
  },
  {
    destination: "Goa Beach Relaxation",
    duration: "4N | 5D",
    image: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 21999,
    originalPrice: 26999,
    rating: 4.6,
    reviews: 134,
    features: ["Beach Resorts", "Spa Treatments", "Cultural Tours", "Leisure Activities"],
  },
  {
    destination: "Darjeeling Tea Gardens",
    duration: "3N | 4D",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 18999,
    originalPrice: 22999,
    rating: 4.8,
    reviews: 167,
    features: ["Tea Gardens", "Mountain Views", "Cultural Experience", "Comfortable Stay"],
  },
  {
    destination: "Mysore Palace & Culture",
    duration: "3N | 4D",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 16999,
    originalPrice: 20999,
    rating: 4.7,
    reviews: 145,
    features: ["Palace Tours", "Cultural Shows", "Garden Visits", "Local Markets"],
  },
];

export default function SeniorTripsPage() {
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
      <Container>
        <section className="relative">
          <div className="relative w-full">
            <div className="relative py-6 md:py-4">
              <div className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 md:gap-6 [&::-webkit-scrollbar]:hidden">
                {seniorCarouselImages.map((src, i) => (
                  <div
                    key={src + i}
                    className="relative flex-shrink-0 snap-start w-48 h-48 md:w-80 md:h-80 overflow-hidden shadow-sm shadow-yellow-100/50 ring-1 ring-yellow-200/50"
                  >
                    <Image
                      src={src}
                      alt={`Senior trip visual ${i + 1}`}
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
                  Senior Citizen Journeys
                </p>
                <h1 className="text-3xl md:text-4xl font-black leading-tight text-gray-900 tracking-tight">
                  Comfortable Adventures for the Golden Years
                </h1>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Discover specially curated trips designed for 50+ travelers, featuring comfortable accommodations,
                  relaxed pacing, cultural experiences, and wellness activities. Travel at your own pace with our
                  senior-friendly itineraries.
                </p>
              </div>
            </Container>
          </div>
        </section>
      </Container>

      {/* Features Section */}
      <Container className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our 50+ Trips?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We understand the unique needs of senior travelers and have designed our trips
            with comfort, relaxation, and memorable experiences in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏨</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Comfortable Stays</h3>
            <p className="text-sm text-gray-600">Premium hotels with senior-friendly amenities and easy access</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Relaxed Pace</h3>
            <p className="text-sm text-gray-600">Unhurried itineraries with plenty of rest time and optional activities</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🩺</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Health & Wellness</h3>
            <p className="text-sm text-gray-600">Wellness activities, medical support, and stress-free travel</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎭</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Cultural Immersion</h3>
            <p className="text-sm text-gray-600">Rich cultural experiences and authentic local interactions</p>
          </div>
        </div>
      </Container>

      {/* Trips Grid */}
      <div className="relative mt-8">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>
        <Container className="py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Featured Senior Citizen Trips
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully selected destinations perfect for 50+ travelers,
              combining comfort, culture, and unforgettable experiences.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {seniorTrips.map((trip) => (
              <TravelCard
                key={trip.destination}
                destination={trip.destination}
                duration={trip.duration}
                image={trip.image}
                price={trip.price}
                originalPrice={trip.originalPrice}
                rating={trip.rating}
                reviews={trip.reviews}
                features={trip.features}
                onBookNow={() => handleBookNow(trip.destination)}
              />
            ))}
          </div>
        </Container>
      </div>

      {/* Special Benefits Section */}
      <Container className="py-12">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Special Benefits for Senior Travelers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer exclusive benefits and considerations for our 50+ travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎟️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Senior Discounts</h3>
              <p className="text-sm text-gray-600">Special pricing and early bird discounts for senior citizens</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚐</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Comfortable Transport</h3>
              <p className="text-sm text-gray-600">AC vehicles with comfortable seating and minimal walking</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👨‍⚕️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Medical Support</h3>
              <p className="text-sm text-gray-600">24/7 medical assistance and emergency support throughout the trip</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⏱️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Timing</h3>
              <p className="text-sm text-gray-600">Adjustable departure times and optional rest periods</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🍽️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dietary Care</h3>
              <p className="text-sm text-gray-600">Special dietary arrangements and healthy meal options</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📞</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Personal Assistance</h3>
              <p className="text-sm text-gray-600">Dedicated support staff and personal care assistance</p>
            </div>
          </div>
        </div>
      </Container>

      <Footer />

      <BookingModal
        open={isBookingModalOpen}
        onClose={handleCloseModal}
        destination={selectedDestination}
      />
    </>
  );
}
