"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { destinations as destinationData } from "@/lib/destinations";
import { Container } from "@/components/ui/Container";

// Horizontal destination slider placed below the header.
export function DestinationBar() {
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(16); // 14 desktop, 8 mobile

  const destinations = destinationData.map((d) => ({
    name: d.name.split(" ")[0],
    fullName: d.name,
    icon: d.icon || "mountain.png",
    trending: d.trending || false,
    slug: d.slug,
  }));

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

  useEffect(() => {
    setCurrentDestinationIndex((prev) =>
      Math.min(prev, Math.max(0, destinations.length - itemsPerView))
    );
  }, [itemsPerView, destinations.length]);

  const maxIndex = Math.max(0, destinations.length - itemsPerView);
  const nextDestinations = () =>
    setCurrentDestinationIndex((prev) => Math.min(prev + 3, maxIndex));
  const prevDestinations = () =>
    setCurrentDestinationIndex((prev) => Math.max(prev - 3, 0));

  if (destinations.length === 0) return null;

  return (
    <div className="  border-t border-gray-200">
      <Container size="xl" className="px-2!">
        <div className="relative">
          {currentDestinationIndex > 0 && (
            <button
              onClick={prevDestinations}
              aria-label="Previous destinations"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow-lg rounded-full hover:bg-yellow-50 transition-colors border border-gray-200">
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
          )}
          <div className="mx-2 py-2 overflow-hidden">
            <div
              className="flex space-x-2 transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentDestinationIndex * (100 / itemsPerView)
                }%)`,
              }}>
              {destinations.map((destination, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 justify-center text-center cursor-pointer group relative"
                  style={{ width: `${100 / itemsPerView}%` }}>
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="block">
                    <div className="w-14 h-14 md:w-14 md:h-14 rounded-full flex items-center justify-center -mb-3 group-hover:scale-110 transition-transform duration-200 mx-auto">
                      <Image
                        src={`/icons/${destination.icon}`}
                        alt={destination.fullName}
                        width={40}
                        height={40}
                        className="md:h-8 md:w-8 h-7 w-7"
                      />
                    </div>
                  </Link>
                  {destination.trending && (
                    <span className="absolute top-0 right-2 bg-yellow-500 text-white text-[9px] font-semibold px-1.5 rounded-bl-md rounded-tr-md">
                      Hot
                    </span>
                  )}
                  <p
                    className="md:text-[11px] text-[9px] font-medium text-gray-700 group-hover:text-yellow-600 text-center relative left-1 md:left-0 line-clamp-1"
                    title={destination.fullName}>
                    {destination.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {currentDestinationIndex < maxIndex && (
            <button
              onClick={nextDestinations}
              aria-label="Next destinations"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow-lg rounded-full hover:bg-yellow-50 transition-colors border border-gray-200">
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          )}
        </div>
      </Container>
    </div>
  );
}
