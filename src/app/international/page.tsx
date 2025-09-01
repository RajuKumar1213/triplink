import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Plane, Star, Clock, Users, Globe, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { backgroundImage } from "../../constant";

export default function InternationalPage() {
  const destinations = [
    {
      id: 1,
      name: "Switzerland",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      description: "Experience the breathtaking Alps, pristine lakes, and charming villages",
      duration: "8 Days",
      groupSize: "6-12 people",
      rating: 4.9,
      price: "₹2,50,000"
    },
    {
      id: 2,
      name: "Japan",
      image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      description: "Discover ancient temples, modern cities, and unique cultural experiences",
      duration: "10 Days",
      groupSize: "8-15 people",
      rating: 4.8,
      price: "₹3,20,000"
    },
    {
      id: 3,
      name: "Australia",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      description: "Explore the Great Barrier Reef, Sydney Opera House, and vast outback",
      duration: "12 Days",
      groupSize: "10-16 people",
      rating: 4.7,
      price: "₹4,50,000"
    },
    {
      id: 4,
      name: "Thailand",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      description: "Relax on pristine beaches, visit ancient temples, and enjoy street food",
      duration: "7 Days",
      groupSize: "6-12 people",
      rating: 4.6,
      price: "₹85,000"
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
                  <Globe className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                World Tours
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Embark on extraordinary journeys across the globe. From the majestic Alps to the vibrant streets of Tokyo,
                discover the world&apos;s most breathtaking destinations with Triplink Adventures.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Plane className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-700 font-medium">Premium Flights</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-700 font-medium">Luxury Accommodations</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Users className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-700 font-medium">Expert Guides</span>
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
                Featured International Destinations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from our handpicked collection of the world&apos;s most spectacular destinations,
                each offering unique experiences and unforgettable memories.
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

        {/* Why Choose International Tours */}
        <section className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Choose Our International Tours?
                </h2>
                <p className="text-lg text-gray-600">
                  Experience the world like never before with our expertly crafted international adventures
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plane className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Travel</h3>
                  <p className="text-gray-600">
                    Business class flights, luxury accommodations, and VIP experiences at every destination
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Guides</h3>
                  <p className="text-gray-600">
                    Local experts who know every hidden gem and can provide authentic cultural insights
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Safety First</h3>
                  <p className="text-gray-600">
                    Comprehensive travel insurance, 24/7 support, and emergency assistance worldwide
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
                Ready to Explore the World?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join our exclusive community of luxury travelers and discover destinations
                that will create memories for a lifetime.
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
