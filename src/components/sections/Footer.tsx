import { Container } from "@/components/ui/Container";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Celebrity Tours", href: "/celebrity" },
  { label: "Corporate Tours", href: "/corporate" },
  { label: "About Us", href: "/about" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const tourTypes = [
  { label: "Celebrity Tours", href: "/celebrity" },
  { label: "World Tours", href: "/international" },
  { label: "Swadesh Tours", href: "/domestic" },
  { label: "Corporate Tours", href: "/corporate" },
];

export function Footer() {
  return (
    <div className="relative">
      <div className="absolute inset-0 opacity-60">
        <Image
          src="/footer.svg"
          alt="Backgroundttp"
          fill
          className="object-cover absolute object-center"
          priority={false}
        />
      </div>
      <footer className="  text-black ">
        <Container className="mt-10" size="xl">
          <div className="py-16 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  TripLink Adventures
                </h3>
                <h4 className="text-lg font-black text-yellow-600 mb-4">
                  OUR VISION
                </h4>
                <p className="text-black font-bold mb-6 leading-relaxed">
                  Drowning in deadlines while your soul whispers &apos;Himalayas&apos;? We
                  hear you. You hustle hard — let Triplink Adventures craft the
                  escape you&apos;ve earned.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-black text-black mb-4">
                  QUICK LINKS
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-black font-bold hover:text-black transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tours */}
              <div>
                <h4 className="text-lg font-black text-black mb-4">TOURS</h4>
                <ul className="space-y-3">
                  {tourTypes.map((tour) => (
                    <li key={tour.label}>
                      <a
                        href={tour.href}
                        className="text-black font-bold hover:text-black transition-colors">
                        {tour.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-black text-black mb-4">
                  CONTACT WITH US
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 font-bold text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-black font-bold text-sm">
                      OFFICE NO. 406 - 4TH FLOOR, VDS BUILDING, H-159, H BLOCK,
                      SECTOR 63 NOIDA, UTTAR PRADESH 201301
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-yellow-400" />
                    <a
                      href="tel:+917838720559"
                      className="text-black font-bold hover:text-black transition-colors">
                      +91 7838720559
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-yellow-400" />
                    <a
                      href="mailto:contact@triplinkadventures.com"
                      className="text-black font-bold hover:text-black transition-colors">
                      contact@triplinkadventures.com
                    </a>
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="font-black text-black mb-3">SOCIALS:</h5>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-black font-bold hover:text-yellow-400 transition-colors">
                      YouTube
                    </a>
                    <a
                      href="#"
                      className="text-black font-bold hover:text-yellow-400 transition-colors cursor-pointe">
                      LinkedIn
                    </a>
                    <a
                      href="#"
                      className="text-black font-bold hover:text-yellow-400 transition-colors">
                      Facebook
                    </a>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-black-800 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-black-400 text-sm">
                © 2025 Triplink Adventures Pvt. Ltd. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="/terms"
                  className="text-black-400 hover:text-black text-sm transition-colors">
                  Terms & Conditions
                </a>
                <a
                  href="/privacy"
                  className="text-black-400 hover:text-black text-sm transition-colors">
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
