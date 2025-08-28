import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  MapPin,
  Star,
  Calendar,
  Heart,
} from "lucide-react";
import Image from "next/image";

const destinations = [
  {
    id: 1,
    name: "Kashmir Paradise",
    location: "Srinagar, Kashmir",
    image:
      "https://triplinkadventures.com/wp-content/uploads/2025/06/kashmir.jpg",
    rating: 4.9,
    reviews: 1547,
    price: 18999,
    originalPrice: 25999,
    duration: "6 Days",
    highlights: ["Dal Lake", "Gulmarg", "Pahalgam"],
    category: "Premium",
  },
  {
    id: 2,
    name: "Ladakh Adventure",
    location: "Leh, Ladakh",
    image:
      "https://triplinkadventures.com/wp-content/uploads/2025/06/leh-to-pangong-lake-1.jpg",
    rating: 4.8,
    reviews: 2134,
    price: 24999,
    originalPrice: 32999,
    duration: "8 Days",
    highlights: ["Pangong Lake", "Nubra Valley", "Khardung La"],
    category: "Adventure",
  },
  {
    id: 3,
    name: "Meghalaya Magic",
    location: "Shillong, Meghalaya",
    image:
      "https://images.pexels.com/photos/1586205/pexels-photo-1586205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.7,
    reviews: 892,
    price: 16999,
    originalPrice: 22999,
    duration: "5 Days",
    highlights: ["Living Root Bridge", "Cherrapunjee", "Dawki"],
    category: "Nature",
  },
  {
    id: 4,
    name: "Rajasthan Royal",
    location: "Jaipur, Rajasthan",
    image:
      "https://triplinkadventures.com/wp-content/uploads/2025/06/rajasthan-visit.jpg",
    rating: 4.6,
    reviews: 1876,
    price: 19999,
    originalPrice: 27999,
    duration: "7 Days",
    highlights: ["Amber Fort", "City Palace", "Hawa Mahal"],
    category: "Heritage",
  },
];

export function FeaturedDestinations() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Light Background with Patterns */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50"></div>
        
        {/* Decorative background image/pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <Image
            src="https://images.pexels.com/photos/1586205/pexels-photo-1586205.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
            alt="Background pattern"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>
        
       
      </div>
      <Container size="xl">
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured <span className="text-yellow-500">Destinations</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Handpicked destinations that promise unforgettable experiences
              </p>
            </div>
            <Button variant="outline" className="mt-6 lg:mt-0">
              View All Destinations
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Featured Card */}
            <div className="lg:row-span-2">
              <div className="relative h-[600px] rounded-3xl overflow-hidden group shadow-xl border border-white/20">
                <Image
                  src={destinations[0].image}
                  alt={destinations[0].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Bookmark Icon */}
                <button title="Bookmark" className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                  <Heart className="h-5 w-5 text-white" />
                </button>

                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                    {destinations[0].category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">
                          {destinations[0].rating}
                        </span>
                        <span className="text-white/80">
                          ({destinations[0].reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/80">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {destinations[0].duration}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {destinations[0].name}
                    </h3>
                    <div className="flex items-center text-white/90 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{destinations[0].location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {destinations[0].highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white/60 text-sm line-through">
                            ₹{destinations[0].originalPrice.toLocaleString()}
                          </span>
                          <span className="text-yellow-400 text-2xl font-bold">
                            ₹{destinations[0].price.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-white/80 text-sm">
                          per person
                        </span>
                      </div>
                      <Button className="bg-yellow-500 text-black hover:bg-yellow-600 font-semibold">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Cards */}
            <div className="space-y-8">
              {destinations.slice(1).map((destination) => (
                <div
                  key={destination.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-white/40">
                  <div className="flex">
                    <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="192px"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white text-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
                          {destination.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                            {destination.name}
                          </h3>
                          <div className="flex items-center text-gray-500 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">
                              {destination.location}
                            </span>
                          </div>
                        </div>
                        <button title="Heart" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                          <Heart className="h-5 w-5 text-gray-400" />
                        </button>
                      </div>

                      <div className="flex items-center mb-3">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold ml-1">
                          {destination.rating}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">
                          ({destination.reviews})
                        </span>
                        <div className="flex items-center ml-auto text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            {destination.duration}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {destination.highlights
                          .slice(0, 2)
                          .map((highlight, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {highlight}
                            </span>
                          ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400 text-sm line-through">
                              ₹{destination.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-xl font-bold text-gray-900">
                              ₹{destination.price.toLocaleString()}
                            </span>
                          </div>
                          <span className="text-gray-500 text-sm">
                            per person
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-yellow-500 text-black hover:bg-yellow-600">
                          Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
