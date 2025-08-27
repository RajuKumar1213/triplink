import { Container } from "@/components/ui/Container";
import { Phone, Mail, MapPin, Youtube, Linkedin, Facebook } from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Celebrity Tours", href: "/celebrity" },
  { label: "Corporate Tours", href: "/corporate" },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blog" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Admin Login", href: "/admin-login" },
];

const tourTypes = [
  { label: "Celebrity Tours", href: "/celebrity" },
  { label: "World Tours", href: "/international" },
  { label: "Swadesh Tours", href: "/domestic" },
  { label: "Corporate Tours", href: "/corporate" },
];

export function Footer() {
  return (
    <div className="mt-10">
  <Image src="/footer.svg" alt="Footer decorative" width={1920} height={400} className="w-full h-auto border-none" priority />
      <footer className="relative bg-[#fede58] -mt-1 border-none text-black overflow-hidden">
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent)]">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="py-16 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Brand / Vision */}
              <div className="relative">
                
                <h3 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4 drop-shadow-sm">
                  TripLink <span className="text-yellow-800">Adventures</span>
                </h3>
                <h4 className="text-sm font-bold tracking-wider text-yellow-900/80 mb-3">
                  OUR VISION
                </h4>
                <p className="text-sm md:text-base font-medium text-gray-900/90 leading-relaxed">
                  Drowning in deadlines while your soul whispers &apos;Himalayas&apos;? We hear you.
                  You hustle hard — let Triplink Adventures craft the escape you&apos;ve earned.
                </p>
              </div>

              {/* Quick Links */}
              <nav aria-label="Quick Links">
                <h4 className="text-base md:text-lg font-extrabold mb-5 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-10 after:h-1 after:bg-yellow-700/70">
                  Quick Links
                </h4>
                <ul className="space-y-2.5 text-sm md:text-[15px] font-medium">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-gray-800 hover:text-black transition-colors">
                        <span className="h-1 w-1 rounded-full bg-gray-500 group-hover:bg-black transition-colors" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Tours */}
              <nav aria-label="Tours">
                <h4 className="text-base md:text-lg font-extrabold mb-5 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-10 after:h-1 after:bg-yellow-700/70">
                  Tours
                </h4>
                <ul className="space-y-2.5 text-sm md:text-[15px] font-medium">
                  {tourTypes.map((tour) => (
                    <li key={tour.label}>
                      <a
                        href={tour.href}
                        className="group inline-flex items-center gap-2 text-gray-800 hover:text-black transition-colors">
                        <span className="h-1 w-1 rounded-full bg-gray-500 group-hover:bg-black transition-colors" />
                        {tour.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Contact */}
              <div>
                <h4 className="text-base md:text-lg font-extrabold mb-5 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-10 after:h-1 after:bg-yellow-700/70">
                  Contact
                </h4>
                <ul className="space-y-4 text-sm md:text-[15px] font-medium">
                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-yellow-300/60 text-yellow-900 shadow-sm">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <p className="leading-relaxed">
                      OFFICE NO. 406 - 4TH FLOOR, VDS BUILDING, H-159, H BLOCK, SECTOR 63 NOIDA, UTTAR PRADESH 201301
                    </p>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-300/60 text-yellow-900 shadow-sm">
                      <Phone className="h-4 w-4" />
                    </div>
                    <a href="tel:+917838720559" className="hover:text-black font-semibold">
                      +91 7838720559
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-300/60 text-yellow-900 shadow-sm">
                      <Mail className="h-4 w-4" />
                    </div>
                    <a
                      href="mailto:contact@triplinkadventures.com"
                      className="hover:text-black font-semibold">
                      contact@triplinkadventures.com
                    </a>
                  </li>
                </ul>

                {/* Socials */}
                <div className="mt-8">
                  <h5 className="text-xs font-semibold tracking-widest text-yellow-900/80 mb-3">
                    FOLLOW US
                  </h5>
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      aria-label="YouTube"
                      className="group p-2 rounded-full bg-yellow-300/60 text-yellow-900 hover:bg-yellow-800 hover:text-yellow-50 transition-colors shadow-sm">
                      <Youtube className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      aria-label="LinkedIn"
                      className="group p-2 rounded-full bg-yellow-300/60 text-yellow-900 hover:bg-yellow-800 hover:text-yellow-50 transition-colors shadow-sm">
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      aria-label="Facebook"
                      className="group p-2 rounded-full bg-yellow-300/60 text-yellow-900 hover:bg-yellow-800 hover:text-yellow-50 transition-colors shadow-sm">
                      <Facebook className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative border-t border-yellow-800/30 py-6 text-xs md:text-sm font-medium">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-yellow-900/80 text-center">
                © 2025 Triplink Adventures Pvt. Ltd. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="/terms"
                  className="text-yellow-900/80 hover:text-black transition-colors">
                  Terms & Conditions
                </a>
                <a
                  href="/privacy"
                  className="text-yellow-900/80 hover:text-black transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
