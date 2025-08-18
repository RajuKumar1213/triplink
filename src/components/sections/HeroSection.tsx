"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
// NOTE: This hero previously had overlapping issues because the fill Image's parent
// did not have position: relative and an explicit height, causing the section to collapse.
// We wrap the slider in a fixed-height relative container now.

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image:
        "https://www.thomascook.in/images/campaign-pages/2025/april/genric-holiday-1920x545.jpg",
      bgColor: "#122126",
    },

    {
      image: "https://triplinkadventures.com/wp-content/uploads/2025/07/3.svg",
      bgColor: "#0774b7",
    },
    {
      image: "https://triplinkadventures.com/wp-content/uploads/2025/07/5.svg",
      bgColor: "#135b98",
    },
    {
      image: "https://triplinkadventures.com/wp-content/uploads/2025/07/4.svg",
      bgColor: "#84bdc7",
    },
  ];

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
        className={`h-[120px] sm:h-[380px] md:h-[400px] lg:h-[358px] overflow-hidden transition-colors duration-700`}
        style={{ backgroundColor: heroSlides[currentSlide].bgColor }}>
        {/* Current Slide Image */}
        <Image
          key={heroSlides[currentSlide].image}
          src={heroSlides[currentSlide].image}
          alt="Featured travel inspiration"
          fill
          priority
          className="object-contain select-none "
        />

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
