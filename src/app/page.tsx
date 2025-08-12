import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { BookingForm } from "@/components/sections/BookingForm";
import { InternationalDestinations } from "@/components/sections/InternationalDestinations";
import { DomesticDestinations } from "@/components/sections/DomesticDestinations";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/sections/Footer";
import TripLinkAdventures from "@/components/sections/TripLinkAdventures";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <BookingForm />
        {/* <FeaturedDestinations /> */}

        {/* Background Section with Gradient Image */}
        <div className="relative">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="https://i.pinimg.com/originals/9a/f0/d4/9af0d4299c57963724ea1a6b45b8ec0c.jpg"
              alt="Backgroundttp"
              fill
              className="object-cover object-center"
              priority={false}
            />
          </div>

          {/* Components on top of background */}
          <div className="relative">
            <InternationalDestinations />
            <DomesticDestinations />
            <TripLinkAdventures />
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
