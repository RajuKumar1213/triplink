import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        // Reduce minimum width on very small screens so two cards can sit side by side
        "bg-white/30  rounded-3xl shadow-xl border border-gray-100 overflow-hidden",
        hover &&
          "transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
}

export function CardImage({
  src,
  alt,
  className,
  overlay = true,
}: CardImageProps) {
  return (
    <div className={cn("relative overflow-hidden h-64", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 hover:scale-102"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      )}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("p-3", className)}>{children}</div>;
}

interface TravelCardProps {
  destination: string;
  slug?: string;
  duration: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  features?: string[];
  discount?: number;
  isPopular?: boolean;
  onBookNow?: () => void;
  className?: string;
}

export function TravelCard({
  destination,
  slug,
  duration,
  image,
  price,
  originalPrice,
  rating = 4.8,
  reviews = 324,
  features = [],
  onBookNow,
  className,
}: TravelCardProps) {
  return (
    <Card
      hover={true}
      className={cn(
        // Full width in grid on small screens; constrain at larger breakpoints
        "group w-full sm:max-w-sm sm:mx-auto",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative">
        <CardImage src={image} alt={destination} className="h-56 sm:h-72" />

        {/* Floating Destination Label */}
        <div className="absolute top-0 w-full   bg-black/30 backdrop-blur-sm rounded-t-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg">
          <h3 className="text-base sm:text-xl font-bold text-white mb-0">
            {destination}
          </h3>
          <p className="text-yellow-500 font-semibold text-xs sm:text-sm">
            {duration}
          </p>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-2 right-2 bg-black/30 backdrop-blur-sm rounded-xl px-3 py-1 shadow-lg flex items-center space-x-1">
          <span className="text-yellow-500">⭐</span>
          <span className="text-sm font-bold text-white">{rating}</span>
          <span className="text-xs text-white">({reviews})</span>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="relative">
        {/* Features */}
        {features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-yellow-50 text-gray-700 text-xs rounded-lg font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pricing Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-lg sm:text-2xl font-bold text-gray-900">
                ₹{price.toLocaleString("en-IN")}
              </span>
              {originalPrice && (
                <span className="text-sm sm:text-lg text-gray-500 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>
          <p className="text-yellow-600 font-medium text-xs sm:text-sm">
            Starting price per adult
          </p>
        </div>

        {/* Action Button */}
        <Link href={`destinations/${slug}`}>
          <button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-600 hover:to-yellow-800 text-white font-bold py-2.5 sm:py-4 px-4 sm:px-6 rounded-2xl text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group-hover:shadow-xl">
            BOOK NOW
          </button>
        </Link>
      </CardContent>
    </Card>
  );
}
