"use client";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  className?: string;
  height?: number; // mobile height
  heightMd?: number; // md height
}

export function DestinationGalleryCarousel({ images, className = "", height = 140, heightMd = 260 }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={`relative group ${className}`}>
      <div className={`relative w-full h-[${height}px] md:h-[${heightMd}px] overflow-hidden`}>
        <div
          ref={trackRef}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden gap-4"
        >
          {images.map((src, i) => (
            <div key={src + i} className="relative h-full flex-shrink-0 snap-start first:ml-0 last:mr-0" style={{ width: '80%' }}>
              <Image
                src={src}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover select-none pointer-events-none"
                sizes="80vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              <span className="absolute bottom-2 right-3 bg-black/55 text-white text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide">{i + 1}/{images.length}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => scroll('left')}
            aria-label="Previous images"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-white/70 hover:bg-white shadow border border-yellow-200 transition"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Next images"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-white/70 hover:bg-white shadow border border-yellow-200 transition"
          >
            <ChevronRight className="h-4 w-4 text-gray-700" />
          </button>
        </>
      )}
    </div>
  );
}
