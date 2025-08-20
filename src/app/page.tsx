import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { BookingForm } from "@/components/sections/BookingForm";
import { InternationalDestinations } from "@/components/sections/InternationalDestinations";
import { DomesticDestinations } from "@/components/sections/DomesticDestinations";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/sections/Footer";
import TripLinkAdventures from "@/components/sections/TripLinkAdventures";
import Image from "next/image";
import { backgroundImage } from "../constant";
import PopUpForm from "@/components/PopUpForm";

export default function Home() {
  return (
    <div className=" bg-white">
      <Header />
      <main>
        <HeroSection />
        <BookingForm />
        <div className="relative">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={backgroundImage}
              alt="Backgroundttp"
              fill
              className="object-cover object-center"
              priority={false}
            />
          </div>
          <div className="relative">
            <InternationalDestinations />
            <DomesticDestinations />
            <TripLinkAdventures />
          </div>
        </div>

        <FAQSection />
      </main>
      <PopUpForm/>
      <Footer />
    </div>
  );
}
