"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);

  const destinations = [
    { name: "Chopta", icon: "mountain.png", trending: true },
    { name: "Himachal (Bir)", icon: "hang-gliding.png", trending: false },
    { name: "Jibhi", icon: "bush.png", trending: false },
    { name: "Kasol Manali", icon: "hill.png", trending: true },
    { name: "Rajsthan", icon: "dromedary.png", trending: false },
    { name: "Kashmir", icon: "snow-storm.png", trending: false },
    { name: "Laddakh Leh", icon: "hills1.png", trending: false },
    { name: "Sikkim", icon: "buddha.png", trending: false },
    { name: "Spiti Valley", icon: "mountain.png", trending: true },
    { name: "Turkey", icon: "hot-air-balloon.png", trending: false },
    { name: "Andaman Island", icon: "island.png", trending: false },
    { name: "Andaman Island", icon: "island.png", trending: false },
    { name: "Andaman Island", icon: "island.png", trending: false },
    { name: "Andaman Island", icon: "island.png", trending: false },
    { name: "Andaman Island", icon: "island.png", trending: false },
  ];

  const heroSlides = [
    {
      image:
        "https://www.thomascook.in/images/campaign-pages/2025/april/genric-holiday-1920x545.jpg",
    },

    {
      image: "https://triplinkadventures.com/wp-content/uploads/2025/07/3.svg",
    },
    {
      image: "https://triplinkadventures.com/wp-content/uploads/2025/07/5.svg",
    },
    {
      image: "https://triplinkadventures.com/wp-content/uploads/2025/07/4.svg",
    },
  ];

  // Responsive itemsPerView: 8 on small screens (<640px), 14 on larger screens
  const [itemsPerView, setItemsPerView] = useState(14);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(8);
      } else {
        setItemsPerView(14);
      }
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Clamp current destination index if itemsPerView changes
  useEffect(() => {
    setCurrentDestinationIndex((prev) =>
      Math.min(prev, Math.max(0, destinations.length - itemsPerView))
    );
  }, [itemsPerView, destinations.length]);

  const maxIndex = Math.max(0, destinations.length - itemsPerView);

  const nextDestinations = () => {
    setCurrentDestinationIndex((prev) => Math.min(prev + 3, maxIndex));
  };

  const prevDestinations = () => {
    setCurrentDestinationIndex((prev) => Math.max(prev - 3, 0));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div className="mb-20">
      {/* Destination Slider */}
      <Container size="xl" className="px-2!">
        <div className="relative">
          {currentDestinationIndex > 0 && (
            <button
              onClick={prevDestinations}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-lg rounded-full hover:bg-yellow-50 transition-colors border border-gray-200">
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
          )}

          {/* Destinations Container */}
          <div className="mx-2 py-4 overflow-hidden">
            <div
              className="flex space-x-6 transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentDestinationIndex * (100 / itemsPerView)
                }%)`,
              }}>
              {destinations.map((destination, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 text-center cursor-pointer group relative"
                  style={{ width: `${100 / itemsPerView}%` }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl -mb-3 group-hover:scale-110 transition-transform duration-200 border-2 border-transparent mx-auto">
                    <Image
                      src={`/icons/${destination.icon}`}
                      alt={destination.name}
                      width={40}
                      height={40}
                      className="h-10 w-10"
                    />
                  </div>
                  <p className="text-[12px] font-medium text-gray-700 group-hover:text-yellow-600">
                    {destination.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Chevron */}
          {currentDestinationIndex < maxIndex && (
            <button
              onClick={nextDestinations}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-lg rounded-full hover:bg-yellow-50 transition-colors border border-gray-200">
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          )}
        </div>


      </Container>

      {/* Hero Banner */}

      <section className="relative mx-auto">
        {/* Background Image */}
        <div className="relative w-full aspect-auto h-[150px] md:h-96">
          <Image
            src={heroSlides[currentSlide].image}
            alt="Hero Background"
            fill
            className="md:object-contain object-cover"
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 p-1 md:p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
          <ChevronLeft className="h-6 w-6 text-yellow-500" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 md:p-3 p-1 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
          <ChevronRight className="h-6 w-6 text-yellow-500" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`md:w-3 md:h-3 h-1 w-1 rounded-full transition-colors ${
                index === currentSlide ? "bg-gray-600" : "bg-gray-800/50"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
