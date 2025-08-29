"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TravelCard } from "@/components/ui/Card";
import { BookingModal } from "@/components/sections/BookingModal";
import {
  Star,
  Quote,
  Users,
  Camera,
  Heart,
  Award,
  Shield,
  Clock,
  Zap,
} from "lucide-react";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Adventure {
  id: string;
  slug: string;
  destination: string;
  duration: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  features: string[];
  discount: number;
  isPopular: boolean;
}

const TripLinkAdventures = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAdventures, setLoadingAdventures] = useState(false);

  const handleBookNow = (destination: string) => {
    setSelectedDestination(destination);
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDestination("");
  };

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  console.log(categories);

  // Fetch adventures based on category
  const fetchAdventures = async (categorySlug: string) => {
    setLoadingAdventures(true);
    try {
      const url =
        categorySlug === "all"
          ? "/api/package-card"
          : `/api/package-card?category=${categorySlug}`;

      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        setAdventures(result.data);
      }
    } catch (error) {
      console.error("Error fetching adventures:", error);
      setAdventures([]);
    } finally {
      setLoadingAdventures(false);
    }
  };

  // Handle category change
  const handleCategoryChange = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    fetchAdventures(categorySlug);
  };

  // Fetch all adventures on initial load
  useEffect(() => {
    if (!loading) {
      fetchAdventures("all");
    }
  }, [loading]);

  // Create adventure categories with icons and gradients
  const adventureCategories = [
    {
      id: "all",
      label: "All Adventures",
      gradient: "from-purple-500 to-pink-500",
    },
    ...categories.map((category) => ({
      id: category.slug,
      label: category.name,
    })),
  ];

  // Helper functions for icons and gradients
  // function getCategoryIcon(slug: string): string {
  //   const iconMap: { [key: string]: string } = {
  //     extreme: "🪂",
  //     nature: "🏔️",
  //     water: "🌊",
  //     cultural: "🏛️",
  //     "50+": "👴",
  //     "domestic-destinations": "🏠",
  //     "international-destinations": "✈️",
  //   };
  //   return iconMap[slug] || "�";
  // }

  // function getCategoryGradient(slug: string): string {
  //   const gradientMap: { [key: string]: string } = {
  //     extreme: "from-red-500 to-orange-500",
  //     nature: "from-green-500 to-teal-500",
  //     water: "from-blue-500 to-cyan-500",
  //     cultural: "from-amber-500 to-yellow-500",
  //     "50+": "from-amber-500 to-yellow-500",
  //     "domestic-destinations": "from-indigo-500 to-purple-500",
  //     "international-destinations": "from-emerald-500 to-teal-500",
  //   };
  //   return gradientMap[slug] || "from-purple-500 to-pink-500";
  // }

  const testimonials = [
    {
      name: "Rahul Sharma",
      location: "Mumbai",
      review:
        "The bungee jumping experience was absolutely thrilling! TripLink ensured safety while delivering an adrenaline rush like no other.",
      rating: 5,
      adventure: "Bungee Jumping",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    },
    {
      name: "Priya Mehta",
      location: "Delhi",
      review:
        "Camping in Spiti Valley was magical! The team made everything seamless and the stargazing session was unforgettable.",
      rating: 5,
      adventure: "Camping",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    },
    {
      name: "Vikram Singh",
      location: "Bangalore",
      review:
        "The paragliding experience in Manali exceeded all expectations. Professional instructors and breathtaking views!",
      rating: 5,
      adventure: "Paragliding",
      avatar:
        "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    },
    {
      name: "Sunita Sharma",
      location: "Pune",
      review:
        "At 62, I never thought I'd travel like this! The senior wellness retreat was perfect - comfortable pace, amazing food, and such caring staff. TripLink made me feel young again!",
      rating: 5,
      adventure: "Senior Wellness Retreat",
      avatar:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    },
  ];

  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Happy Adventurers",
      color: "text-blue-600",
    },
    {
      icon: Award,
      value: "4.9/5",
      label: "Average Rating",
      color: "text-yellow-600",
    },
    {
      icon: Shield,
      value: "100%",
      label: "Safety Record",
      color: "text-green-600",
    },
    { icon: Clock, value: "24/7", label: "Support", color: "text-purple-600" },
  ];

  const filteredAdventures = adventures;

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="pb-10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #f59e0b 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #000000 0%, transparent 50%)`,
          }}
        />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Zap className="h-4 w-4 text-yellow-600" />
            <span>Adventures That Transform Lives</span>
            <Heart className="h-4 w-4 text-yellow-600 animate-pulse" />
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
              TripLink
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
              Adventures
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From heart-pounding thrills to soul-soothing escapes, we craft
            extraordinary journeys that push boundaries and create lifelong
            memories.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-500 shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="text-lg md:text-xl font-black text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {loading
            ? // Loading skeleton for categories
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-xl bg-gray-200 animate-pulse"
                >
                  <span className="text-lg mr-2">🌟</span>
                  <span className="text-sm">Loading...</span>
                </div>
              ))
            : adventureCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`group px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                    activeCategory === category.id
                      ? "bg-yellow-500 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200 hover:border-yellow-500 shadow-md"
                  }`}
                >
                  {category.label}
                </button>
              ))}
        </div>

        {/* Adventures Grid with TravelCard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {loadingAdventures ? (
            // Loading skeleton for adventures
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : filteredAdventures.length > 0 ? (
            filteredAdventures.map((adventure) => (
              <TravelCard
                key={adventure.id}
                slug={adventure.slug}
                destination={adventure.destination}
                duration={adventure.duration}
                image={adventure.image}
                price={adventure.price}
                originalPrice={adventure.originalPrice}
                rating={adventure.rating}
                reviews={adventure.reviews}
                features={adventure.features}
                discount={adventure.discount}
                isPopular={adventure.isPopular}
                onBookNow={() => handleBookNow(adventure.destination)}
                className="transform transition-all duration-300 hover:scale-[1.02]"
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg">
                No adventures found for this category.
              </div>
              <button
                onClick={() => handleCategoryChange("all")}
                className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                View All Adventures
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Testimonials */}
        <div className="relative bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl p-6 sm:p-8 shadow-xl mb-12">
          <div className="absolute inset-0 bg-black/5 rounded-2xl" />
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-3xl font-black text-white mb-3">
                Stories from Our Adventurers
              </h3>
              <p className="text-yellow-100 text-sm sm:text-base">
                Real experiences that changed lives forever
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-xl transform transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-yellow-200">
                    <Image
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-bold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {testimonials[currentTestimonial].location}
                    </p>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        )
                      )}
                      <span className="ml-2 text-yellow-600 font-semibold text-sm">
                        {testimonials[currentTestimonial].adventure}
                      </span>
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-yellow-300 ml-4" />
                </div>

                <p className="text-gray-700 text-sm sm:text-base italic leading-relaxed">
                  &quot;{testimonials[currentTestimonial].review}&quot;
                </p>
              </div>

              {/* Testimonial indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    title="Select Testimonial"
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center bg-gradient-to-r from-gray-50 to-yellow-50 rounded-2xl p-6 sm:p-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-3">
              Your Next Adventure Awaits
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
              Join over 50,000 adventurers who have discovered their passion for
              exploration with TripLink Adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl text-sm sm:text-base shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Camera className="h-5 w-5 mr-2" />
                Start Your Adventure
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-bold py-3 px-6 rounded-xl text-sm sm:text-base shadow-md transform hover:scale-105 transition-all duration-300"
              >
                <Users className="h-5 w-5 mr-2" />
                Join Our Community
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Booking Modal */}
      <BookingModal
        open={isBookingModalOpen}
        onClose={handleCloseModal}
        destination={selectedDestination}
      />
    </section>
  );
};

export default TripLinkAdventures;
