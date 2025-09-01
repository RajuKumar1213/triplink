import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Mountain, Camera, Star, Clock, Users, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { backgroundImage } from "../../constant";

export default function DomesticPage() {
  const destinations = [
    {
      id: 1,
      name: "Kashmir",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      description: "Experience the paradise on earth with stunning valleys, lakes, and mountains",
      duration: "6 Days",
      groupSize: "6-12 people",
      rating: 4.9,
      price: "₹45,000"
    },
    {
      id: 2,
      name: "Goa",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      description: "Relax on pristine beaches, enjoy water sports, and experience vibrant nightlife",
      duration: "5 Days",
      groupSize: "8-15 people",
      rating: 4.7,
      price: "₹35,000"
    },
    {
      id: 3,
      name: "Rajasthan",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      description: "Explore royal palaces, desert safaris, and rich cultural heritage",
      duration: "8 Days",
      groupSize: "10-16 people",
      rating: 4.8,
      price: "₹55,000"
    },
    {
      id: 4,
      name: "Kerala",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      description: "Cruise through backwaters, visit spice plantations, and enjoy Ayurvedic treatments",
      duration: "7 Days",
      groupSize: "6-12 people",
      rating: 4.6,
      price: "₹42,000"
    }
  ];

  return (
    <>
      <Header />
      <div className="relative">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-yellow-50 to-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Mountain className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                Swadesh Tours
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Discover the incredible diversity of India. From the snow-capped Himalayas to sunny beaches,
                explore India&apos;s most beautiful destinations with Triplink Adventures.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Camera className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-700 font-medium">Cultural Immersion</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-700 font-medium">Heritage Sites</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Users className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-700 font-medium">Local Experts</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Featured Destinations */}
        <section className="py-20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Domestic Destinations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the rich tapestry of India&apos;s culture, history, and natural beauty
                through our carefully curated domestic tours.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-64">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {destination.price}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">{destination.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-600">{destination.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{destination.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{destination.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{destination.groupSize}</span>
                      </div>
                    </div>

                    <Link
                      href="/request-invite"
                      className="w-full bg-yellow-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-yellow-600 transition-colors text-center block"
                    >
                      Request Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Why Choose Domestic Tours */}
        <section className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Choose Our Domestic Tours?
                </h2>
                <p className="text-lg text-gray-600">
                  Discover India&apos;s hidden gems with our expertly crafted domestic adventures
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Authentic Experiences</h3>
                  <p className="text-gray-600">
                    Immerse yourself in local cultures, traditions, and authentic experiences off the beaten path
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Local Expertise</h3>
                  <p className="text-gray-600">
                    Travel with local guides who share insider knowledge and cultural insights
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mountain className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Diverse Landscapes</h3>
                  <p className="text-gray-600">
                    From mountains to beaches, deserts to forests - experience India&apos;s incredible diversity
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
          <Container>
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Explore Incredible India?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join our community of travelers discovering the magic and diversity of India.
                Create memories that will last a lifetime.
              </p>
              <Link
                href="/request-invite"
                className="inline-block bg-white text-yellow-600 font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors text-lg"
              >
                Request Invitation
              </Link>
            </div>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  );
}
