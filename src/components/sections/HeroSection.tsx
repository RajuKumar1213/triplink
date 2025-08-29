"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface HeroSlide {
  image?: string;
  video?: string;
  bgColor: string;
  type: "image" | "video";
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides: HeroSlide[] = useMemo(() => [
     {
      video: "https://res.cloudinary.com/vikkyhub/video/upload/3563086-uhd_3840_2160_25fps_lbg4cq.mp4",
      bgColor: "#000000",
      type: "video"
    },
    {
      image:
        "https://www.thomascook.in/images/campaign-pages/2025/april/genric-holiday-1920x545.jpg",
      bgColor: "#122126",
      type: "image"
    },

    {
      image: "https://triplinkadventures.com/wp-content/uploads/2025/07/3.svg",
      bgColor: "#0774b7",
      type: "image"
    },
    {
      image: "https://triplinkadventures.com/wp-content/uploads/2025/07/5.svg",
      bgColor: "#135b98",
      type: "image"
    },
    {
      image: "https://triplinkadventures.com/wp-content/uploads/2025/07/4.svg",
      bgColor: "#84bdc7",
      type: "image"
    },
    {
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop",
      bgColor: "#000000",
      type: "image"
    },
  ], []);

  // Auto-play functionality with different timing for videos and images
  useEffect(() => {
    const interval = heroSlides[currentSlide].type === "video" ? 23000 : 5000; // 60s for videos, 5s for images

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [currentSlide, heroSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <section className="relative w-full my-4">
      <div
        className={`h-[120px] sm:h-[380px] md:h-[400px] lg:h-[358px] overflow-hidden transition-colors duration-700 relative`}
        style={{ backgroundColor: heroSlides[currentSlide].bgColor }}>
        {/* Current Slide Content */}
        {heroSlides[currentSlide].type === "video" ? (
          <video
            key={heroSlides[currentSlide].video}
            src={heroSlides[currentSlide].video}
            autoPlay
            muted
            playsInline
            loop={false}
            preload="metadata"
            className="w-full h-full object-cover select-none"
            onError={(e) => console.error('Video failed to load:', e)}
          />
        ) : (
          <Image
            key={heroSlides[currentSlide].image}
            src={heroSlides[currentSlide].image!}
            alt="Featured travel inspiration"
            fill
            priority
            className="object-contain select-none"
          />
        )}

        {/* Controls */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/25 hover:bg-white/40 backdrop-blur-md rounded-full shadow-md shadow-black/20 text-yellow-700 transition">
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/25 hover:bg-white/40 backdrop-blur-md rounded-full shadow-md shadow-black/20 text-yellow-700 transition">
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ring-1 ring-white/40 ${
                idx === currentSlide
                  ? "bg-white scale-110 shadow"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
