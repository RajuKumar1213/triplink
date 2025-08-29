"use client";
import React, { useState } from "react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { TravelCard } from "@/components/ui/Card";
import { BookingModal } from "@/components/sections/BookingModal";

// Carousel images (weekend trip visuals)
const weekendCarouselImages = [
  "https://cdn.pixabay.com/photo/2024/07/20/15/52/mountains-8908538_640.jpg",
  "https://cdn.pixabay.com/photo/2017/05/10/13/39/ladakh-2300904_640.jpg",
  "https://cdn.pixabay.com/photo/2019/08/14/09/34/zal-zal-lake-azad-kashmir-4405230_1280.jpg",
  "https://static.toiimg.com/photo/80398554.cms",
];

// Card data for weekend trips
const weekendTrips = [
  {
    destination: "Shimla Weekend Getaway",
    duration: "2N | 3D",
    image:
      "https://cdn.pixabay.com/photo/2019/08/14/09/34/zal-zal-lake-azad-kashmir-4405230_1280.jpg",
    price: 8999,
    originalPrice: 12999,
    rating: 4.6,
    reviews: 145,
    features: ["Mall Road", "Jakhoo Temple", "Scenic Views"],
  },
  {
    destination: "Nainital Lakeside Escape",
    duration: "2N | 3D",
    image:
      "https://cdn.pixabay.com/photo/2017/05/10/13/39/ladakh-2300904_640.jpg",
    price: 7999,
    originalPrice: 10999,
    rating: 4.5,
    reviews: 98,
    features: ["Naini Lake", "Cable Car", "Boating"],
  },
  {
    destination: "Mussoorie Hill Station",
    duration: "2N | 3D",
    image:
      "https://cdn.pixabay.com/photo/2024/07/20/15/52/mountains-8908538_640.jpg",
    price: 6999,
    originalPrice: 9999,
    rating: 4.4,
    reviews: 87,
    features: ["Camel's Back Road", "Kempty Falls", "Gun Hill"],
  },
  {
    destination: "Rishikesh Adventure Weekend",
    duration: "2N | 3D",
    image:
      "https://cdn.pixabay.com/photo/2019/08/14/09/34/zal-zal-lake-azad-kashmir-4405230_1280.jpg",
    price: 9499,
    originalPrice: 13999,
    rating: 4.7,
    reviews: 112,
    features: ["River Rafting", "Ganga Aarti", "Adventure Sports"],
  },
  {
    destination: "Goa Beach Weekend",
    duration: "2N | 3D",
    image:
      "https://cdn.pixabay.com/photo/2017/05/10/13/39/ladakh-2300904_640.jpg",
    price: 11999,
    originalPrice: 15999,
    rating: 4.8,
    reviews: 203,
    features: ["Beach Hopping", "Water Sports", "Nightlife"],
  },
  {
    destination: "Jaipur Heritage Weekend",
    duration: "2N | 3D",
    image:
      "https://cdn.pixabay.com/photo/2024/07/20/15/52/mountains-8908538_640.jpg",
    price: 8499,
    originalPrice: 11999,
    rating: 4.6,
    reviews: 134,
    features: ["City Palace", "Hawa Mahal", "Local Markets"],
  },
];

const WeekendTripPage = () => {
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4">Weekend Getaways</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Perfect short escapes for busy schedules. Discover amazing destinations in just 2-3 days!
          </p>
        </div>
      </section>

      {/* Weekend Trips Grid */}
      <Container className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Weekend Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our curated collection of weekend trips designed for maximum enjoyment
            and minimum planning. Each trip includes accommodation, activities, and local experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weekendTrips.map((trip, index) => (
            <TravelCard
              key={index}
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

      {/* Why Choose Weekend Trips */}
      <section className="bg-white py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Weekend Trips?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick & Convenient</h3>
              <p className="text-gray-600">Perfect for busy schedules with minimal time commitment</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Experiences</h3>
              <p className="text-gray-600">Handpicked activities and accommodations for memorable trips</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Value</h3>
              <p className="text-gray-600">Competitive pricing with all-inclusive packages</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-500 py-16">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready for Your Weekend Escape?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book your perfect weekend getaway today and create unforgettable memories!
            </p>
            <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Planning
            </button>
          </div>
        </Container>
      </section>

      {/* Booking Modal */}
      <BookingModal
        open={isBookingModalOpen}
        onClose={handleCloseModal}
        destination={selectedDestination}
      />

      <Footer />
    </div>
  );
};

export default WeekendTripPage;
