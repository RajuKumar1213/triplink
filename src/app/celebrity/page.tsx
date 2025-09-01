"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { BookingModal } from "@/components/sections/BookingModal";
import { Star, Crown, Sparkles, Camera, Users, MapPin, Calendar, Award } from "lucide-react";
import { backgroundImage } from "@/constant";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Celebrity-themed background images
  const backgroundImages = [
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200"
  ];

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

  // Background image slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleBookNow = (destination: string) => {
    setSelectedDestination(destination);
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDestination("");
  };

  const handleViewCelebrities = () => {
    const element = document.getElementById('celebrity-experiences');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Slider navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % backgroundImages.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Header />
      {/* GLAMOROUS CELEBRITY HERO */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Premium Background with Multiple Layers */}
        <div className="absolute inset-0">
          {/* Background Image Slider */}
          <div className="relative w-full h-full overflow-hidden">
            {backgroundImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentImageIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105'
                }`}
              >
                <Image
                  src={image}
                  alt={`Celebrity Background ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-yellow-900/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 backdrop-blur-md text-white p-2 sm:p-3 rounded-full hover:bg-black/50 transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 backdrop-blur-md text-white p-2 sm:p-3 rounded-full hover:bg-black/50 transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'bg-yellow-400 scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Animated Spotlight Effects */}
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-48 h-48 sm:w-96 sm:h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-40 h-40 sm:w-80 sm:h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-[600px] sm:h-[600px] bg-gradient-radial from-white/5 to-transparent rounded-full blur-2xl"></div>

        {/* Red Carpet Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-900/30 to-transparent"></div>

        <div className="relative z-10 min-h-screen flex items-center">
          <Container className="py-12 sm:py-20 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left">
                  {/* Premium Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-full mb-4 sm:mb-6 shadow-2xl border-2 border-yellow-300 text-sm sm:text-base">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
                    CELEBRITY EXCLUSIVE
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  {/* Glamorous Title */}
                  <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                      Travel Like
                    </span>
                    <br />
                    <span className="text-white drop-shadow-2xl">
                      A STAR
                    </span>
                  </h1>

                  {/* Celebrity Description */}
                  <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
                    Join exclusive journeys with <span className="text-yellow-400 font-semibold">celebrities</span>,
                    <span className="text-yellow-500 font-semibold"> influencers</span>, and
                    <span className="text-yellow-600 font-semibold"> icons</span>.
                    Experience VIP treatment, behind-the-scenes access, and unforgettable moments with the stars.
                  </p>

                  {/* Premium Features */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                      <span className="text-white font-medium text-sm sm:text-base">VIP Access</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20">
                      <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                      <span className="text-white font-medium text-sm sm:text-base">Photo Ops</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                      <span className="text-white font-medium text-sm sm:text-base">Exclusive Events</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <button
                      onClick={handleViewCelebrities}
                      className="group px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/50 text-sm sm:text-base"
                    >
                      <span className="flex items-center gap-2">
                        <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
                        Book VIP Experience
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                      </span>
                    </button>
                    <button
                      onClick={handleViewCelebrities}
                      className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                    >
                      View Celebrities
                    </button>
                  </div>
                </div>

                {/* Right Content - Celebrity Showcase */}
                <div className="relative mt-8 lg:mt-0">
                  {/* Floating Cards */}
                  <div className="relative h-80 sm:h-96">
                    {/* Main Celebrity Card */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-56 h-72 sm:w-64 sm:h-80 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden group hover:scale-105 transition-all duration-500">
                      <div className="relative h-40 sm:h-48">
                        <Image
                          src="/Rannvijay-Singha.png"
                          alt="Rannvijay Singha - Actor & Travel Influencer"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-current" />
                        </div>
                      </div>
                      <div className="p-3 sm:p-4">
                        <h3 className="text-white font-bold text-base sm:text-lg">Rannvijay Singha</h3>
                        <p className="text-gray-300 text-xs sm:text-sm">Actor & Travel Influencer</p>
                        <div className="flex items-center gap-1 mt-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-xs font-medium">Available Now</span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-6 left-6 sm:top-8 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400/20 rounded-full flex items-center justify-center animate-bounce">
                      <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                    </div>
                    <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-yellow-400/20 rounded-full flex items-center justify-center animate-bounce delay-300">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                    </div>
                    <div className="absolute top-1/2 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400/20 rounded-full flex items-center justify-center animate-bounce delay-500">
                      <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
      {/* PREMIUM CELEBRITY EXPERIENCES SECTION */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>

        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative z-10">
          {/* Glamorous Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white font-bold rounded-full mb-6 shadow-2xl">
              <Sparkles className="w-5 h-5" />
              CELEBRITY EXPERIENCES
              <Crown className="w-5 h-5" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                World-Class Journeys
              </span>
              <br />
              <span className="text-gray-900">With Global Icons</span>
            </h2>

            <div className="w-24 h-1 sm:w-32 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mb-6 sm:mb-8 rounded-full"></div>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 sm:px-0">
              Experience extraordinary adventures with <span className="text-yellow-600 font-bold">celebrities</span>,
              <span className="text-yellow-500 font-bold"> influencers</span>, and
              <span className="text-yellow-600 font-bold"> industry leaders</span>.
              From exclusive meet-and-greets to behind-the-scenes access, every moment is designed for VIPs.
            </p>

            {/* Premium Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">50+</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Celebrities</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">25+</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Destinations</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">1000+</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Happy Travelers</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">5★</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Celebrity Features Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-12 sm:mb-16 px-4 sm:px-0">
            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl shadow-yellow-100/50 border border-yellow-100 hover:shadow-2xl hover:shadow-yellow-200/50 transition-all duration-300 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">VIP Photo Sessions</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Capture unforgettable moments with celebrities and influencers. Professional photography included with every celebrity journey.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl shadow-yellow-100/50 border border-yellow-100 hover:shadow-2xl hover:shadow-yellow-200/50 transition-all duration-300 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">Exclusive Access</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Get behind-the-scenes access to exclusive events, private tours, and celebrity-only experiences that regular travelers miss.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl shadow-yellow-100/50 border border-yellow-100 hover:shadow-2xl hover:shadow-yellow-200/50 transition-all duration-300 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">Premium Amenities</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Enjoy luxury accommodations, private transportation, gourmet dining, and personalized concierge services throughout your journey.
              </p>
            </div>
          </div>

          {/* Celebrity Trips Grid */}
          <div id="celebrity-experiences" className="mb-8 sm:mb-12 px-4 sm:px-0">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">Available Celebrity Experiences</h3>

            <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {loading ? (
                <div className="col-span-full text-center py-16">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-full">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Loading Exclusive Experiences...
                  </div>
                </div>
              ) : celebrityTrips.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20">
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mb-6">
                    <Crown className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h3>
                  <p className="text-gray-600 text-center max-w-md">
                    We&apos;re curating extraordinary celebrity experiences. Check back soon for exclusive journeys with your favorite stars!
                  </p>
                </div>
              ) : (
                celebrityTrips.map((trip: CardItem) => (
                  <div
                    key={trip.id || trip.destination}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-yellow-200"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={trip.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"}
                        alt={trip.destination}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                        ⭐ VIP
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Celebrity Experience</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                        {trip.destination}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{trip.duration || "7 Days"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>Limited</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">₹{trip.price?.toLocaleString() || "75,000"}</span>
                          {trip.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">₹{trip.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{trip.rating || 4.9}</span>
                        </div>
                      </div>

                      <Link href={`/destinations/${trip.slug || trip.destination.toLowerCase().replace(/\s+/g, '-')}`}>
                        <button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-yellow-700 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25">
                          Book VIP Experience
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* GLAMOROUS CTA SECTION */}
      <section className="relative py-20 bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-700 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-yellow-300 rounded-full animate-ping delay-300"></div>
          <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping delay-700"></div>
          <div className="absolute top-1/3 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-ping delay-500"></div>
        </div>

        <Container className="relative z-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full mb-6 sm:mb-8 text-sm sm:text-base">
              <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
              READY FOR THE RED CARPET?
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
              Your Celebrity Journey
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                Awaits
              </span>
            </h2>

            <p className="text-base sm:text-xl text-gray-200 mb-6 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Don&apos;t miss your chance to travel like a star. Join exclusive celebrity experiences
              that will create memories for a lifetime. Limited spots available!
            </p>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0">
              <button
                onClick={handleViewCelebrities}
                className="group px-6 py-3 sm:px-10 sm:py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-base sm:text-lg rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/50 w-full sm:w-auto"
              >
                <span className="flex items-center gap-2 sm:gap-3">
                  <Star className="w-4 h-4 sm:w-6 sm:h-6" />
                  Book Your VIP Experience
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                </span>
              </button>

              <button
                onClick={handleViewCelebrities}
                className="px-6 py-3 sm:px-10 sm:py-5 border-2 border-white/30 text-white font-semibold text-base sm:text-lg rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
              >
                <span className="flex items-center gap-2">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                  View Gallery
                </span>
              </button>
            </div>

            {/* Urgency Message */}
            <div className="mt-8 sm:mt-12 inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-red-500/20 backdrop-blur-md border border-red-400/30 text-red-300 font-semibold rounded-full text-sm sm:text-base">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full animate-pulse"></div>
              Only 5 VIP spots remaining this month!
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />

      <BookingModal
        open={isBookingModalOpen}
        onClose={handleCloseModal}
        destination={selectedDestination}
      />
    </>
  );
}
