"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Celebrity", href: "/international-trips" },
    { label: "Corporate", href: "/domestic-trips" },
    { label: "Trip Tours", href: "/celebrity" },
    { label: "About", href: "/corporate" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      {/* Main navigation */}

      <Container size="xl">
  <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <Link href={"/"}>
                <Image
                  src="/triplink-logo.png"
                  alt="TripLink Adventures"
                  className="h-10 w-auto"
                  width={120}
                  height={40}
                />
              </Link>
            </div>
          </div>

          {/* Desktop navigation */}

          <div className="hidden md:flex items-center space-x-4">
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
        {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm transition-colors">
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
      <Button variant="outline" size="sm">
              Request Invite
            </Button>
      <Button variant="primary" size="sm">
              Payment
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-medium">
                  {item.label}
                </a>
              ))}
              <Button variant="primary" size="sm" className="w-full mt-4">
                Request Invite
              </Button>
              <Button variant="primary" size="sm" className="w-full mt-4">
                Payment
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
