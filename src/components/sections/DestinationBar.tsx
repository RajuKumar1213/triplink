"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface PackageIcon {
  _id: string;
  slug: string;
  icon: string;
  trending?: boolean;
}

export function DestinationBar() {
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(16);
  const [destinations, setDestinations] = useState<PackageIcon[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch package icons from API
  useEffect(() => {
    const fetchPackageIcons = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/pakage/fetch-icon", {
          next: { revalidate: 10 },
        });
        const result = await response.json();

        if (result.success) {
          setDestinations(result.data);
        } else {
          console.error("Failed to fetch package icons:", result.error);
        }
      } catch (error) {
        console.error("Error fetching package icons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageIcons();
  }, []);

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

  if (loading) {
    return (
      <div className="border-t border-gray-200">
        <Container size="xl" className="px-2!">
          <div className="py-4 flex justify-center items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
          </div>
        </Container>
      </div>
    );
  }

  if (destinations.length === 0) return null;

  return (
    <div className="border-t border-gray-200">
      <Container size="xl" className="px-2!">
        <div className="relative">
          {currentDestinationIndex > 0 && (
            <button
              onClick={prevDestinations}
              aria-label="Previous destinations"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow-lg rounded-full hover:bg-yellow-50 transition-colors border border-gray-200"
            >
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
              }}
            >
              {destinations.map((destination) => (
                <div
                  key={destination._id}
                  className="flex-shrink-0 justify-center text-center cursor-pointer group relative"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="block"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center -mb-3 group-hover:scale-110 transition-transform duration-200 mx-auto ">
                      <Image
                        src={destination.icon}
                        alt={destination.slug}
                        width={40}
                        height={40}
                        className="md:h-8 md:w-8 h-6 w-6"
                      />
                    </div>
                  </Link>
                  {destination.trending && (
                    <span className="absolute -top-[1px] right-1 bg-yellow-500 text-white text-[6px] md:text-[8px] font-bold  py-0.5  rounded-bl-lg rounded-tr-lg px-2 shadow-md">
                      Hot
                    </span>
                  )}
                  <p
                    className="md:text-[11px] text-[9px] font-medium text-gray-700 group-hover:text-yellow-600 text-center relative left-1 md:left-0 line-clamp-1"
                    title={destination.slug}
                  >
                    {destination.slug
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {currentDestinationIndex < maxIndex && (
            <button
              onClick={nextDestinations}
              aria-label="Next destinations"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow-lg rounded-full hover:bg-yellow-50 transition-colors border border-gray-200"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          )}
        </div>
      </Container>
    </div>
  );
}
