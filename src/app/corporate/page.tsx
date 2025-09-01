"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { TravelCard } from "@/components/ui/Card";
import { backgroundImage } from "@/constant";

// Corporate visuals and program offerings
const carouselImages = [
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3183161/pexels-photo-3183161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

interface CardItem {
  id: string;
  slug?: string;
  destination: string;
  duration?: string;
  image?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  features?: string[];
}

export default function CorporatePage() {
  const [corporatePrograms, setCorporatePrograms] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const fetchCards = async () => {
      try {
        const res = await fetch(`/api/package-card?category=corporate`);
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const json = await res.json();
        if (mounted && json && json.success && Array.isArray(json.data)) {
          setCorporatePrograms(json.data as CardItem[]);
        }
      } catch (err) {
        console.error("Failed to load corporate packages:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCards();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Header />
      {/* HERO: polished corporate look */}
      <section className="relative">
        <div
          className="relative h-[520px] md:h-[560px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.gotap.id/wp-content/uploads/2023/07/personal-business-trip-and-companies-business-trip-1024x478.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/60" />

          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
              <div className="max-w-2xl text-center md:text-left">
                <p className="uppercase tracking-widest text-yellow-300 font-semibold mb-3">
                  Corporate Programs
                </p>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                  Team Retreats & Corporate Travel
                </h1>
                <p className="text-lg text-white/90 mb-6">
                  Bespoke corporate retreats, leadership offsites and team
                  experiences crafted to align with your company goals.
                </p>

                <div className="flex gap-3 justify-center md:justify-start">
                  <button
                    className="inline-block border border-white/30 text-white px-5 py-3 rounded-md hover:bg-white/5"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative ">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={backgroundImage}
            alt="Backgroundttp"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>
        <Container className="py-12">
          {/* Corporate Tours Header */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-yellow-500/10 to-yellow-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-semibold rounded-full shadow-lg">
                  🏢 PREMIUM CORPORATE EXPERIENCES
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent mb-6 leading-tight">
                Exclusive Corporate Retreats
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
                Transform your team&apos;s dynamics with our premium <span className="text-yellow-600 font-bold">corporate retreats</span> and <span className="text-yellow-500 font-bold">team-building experiences</span>.
                Create lasting memories while achieving your business objectives.
              </p>
              <div className="flex justify-center mt-8 space-x-6">
                <div className="flex items-center text-yellow-600">
                  <span className="text-2xl mr-2">🎯</span>
                  <span className="font-semibold">Business Goals</span>
                </div>
                <div className="flex items-center text-yellow-500">
                  <span className="text-2xl mr-2">🤝</span>
                  <span className="font-semibold">Team Bonding</span>
                </div>
                <div className="flex items-center text-yellow-400">
                  <span className="text-2xl mr-2">🌟</span>
                  <span className="font-semibold">Premium Experience</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              <div className="col-span-full text-center py-10">Loading...</div>
            ) : corporatePrograms.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <div className="max-w-xl text-center">
                  <div className="mx-auto w-full max-w-md h-auto rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="https://orioly.com/wp-content/uploads/2022/08/1600x900-1.png"
                      alt="No travel found illustration"
                      width={800}
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="mt-8 text-3xl font-extrabold text-gray-900">
                    Travel not found
                  </h3>
                  <p className="mt-3 text-gray-600">
                    We couldn&apos;t find any corporate packages right now. Try
                    checking other categories or contact us for a tailored
                    program.
                  </p>
                </div>
              </div>
            ) : (
              corporatePrograms.map((t: CardItem) => (
                <TravelCard
                  key={t.id || t.destination}
                  slug={t.slug || ""}
                  destination={t.destination}
                  duration={t.duration || ""}
                  image={t.image || ""}
                  price={t.price ?? 0}
                  originalPrice={t.originalPrice ?? 0}
                  rating={t.rating ?? 0}
                  reviews={t.reviews ?? 0}
                  features={t.features}
                />
              ))
            )}
          </div>
        </Container>
      </div>

      {/* Why Choose TripLink Adventures Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-gray-50">
        <Container size="xl" className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-yellow-600">TripLink Adventures</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why leading companies trust us with their corporate travel and team-building needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Corporate Benefits - Left Side */}
            <div className="space-y-4">
              {/* Expertise & Experience */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="px-6 py-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">1</span>
                    Expertise & Experience
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    Over 10+ years of crafting successful corporate retreats and team building experiences. We know what works and what does not.
                  </p>
                </div>
              </div>

              {/* Customized Solutions */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="px-6 py-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">2</span>
                    Customized Solutions
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    Every company is unique. We design bespoke programs tailored to your specific goals, team size, and corporate culture.
                  </p>
                </div>
              </div>

              {/* End-to-End Management */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="px-6 py-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">3</span>
                    End-to-End Management
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    From initial planning to final execution, we handle every detail so you can focus on what matters most - your team.
                  </p>
                </div>
              </div>

              {/* Proven ROI */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="px-6 py-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">4</span>
                    Proven ROI
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    95% of our corporate clients report improved team cohesion and productivity after our programs. Results that matter.
                  </p>
                </div>
              </div>

              {/* Safety First */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="px-6 py-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">5</span>
                    Safety First
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    Comprehensive safety protocols, insurance coverage, and 24/7 support ensure your teams well-being throughout the journey.
                  </p>
                </div>
              </div>

              {/* Seamless Logistics */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="px-6 py-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">6</span>
                    Seamless Logistics
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    Professional coordination of transportation, accommodation, meals, and activities. Everything runs like clockwork.
                  </p>
                </div>
              </div>
            </div>

            {/* Corporate Images - Right Side */}
            <div className="lg:sticky lg:top-8">
              <div className="relative">
                {/* Main Corporate Image */}
                <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl mb-6">
                  <Image
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Corporate Team Building"
                    fill
                    className="object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Image Label */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                      <h4 className="text-lg font-bold text-gray-900">
                        Corporate Excellence
                      </h4>
                      <p className="text-sm font-semibold text-gray-600">
                        Building stronger teams through unforgettable experiences
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">500+</div>
                    <div className="text-sm font-semibold text-gray-700">Companies Served</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">95%</div>
                    <div className="text-sm font-semibold text-gray-700">Client Satisfaction</div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl transform rotate-12">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center shadow-xl transform -rotate-12">
                  <span className="text-xl">⭐</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-400 rounded-3xl p-12 shadow-2xl relative overflow-hidden mt-16">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Team?
              </h3>
              <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
                Join 500+ companies who have chosen TripLink Adventures for their corporate travel needs.
                Let&apos;s create something extraordinary together.
              </p>
              <button
                className="bg-white text-yellow-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get Your Custom Quote
              </button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />

    </>
  );
}
