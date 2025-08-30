"use client";

import { useState, useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DestinationBar } from "./DestinationBar";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTripToursOpen, setIsTripToursOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTripToursOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Build destination pills from centralized data; fallback for icon
  const navItems = [
    { label: "Celebrity", href: "/celebrity" },
    { label: "Corporate", href: "/corporate" },
    { 
      label: "Trip Tours", 
      href: "#",
      dropdownItems: [
        { label: "Weekend Trip", href: "/weekend-trip" },
        { label: "50+ Trips", href: "/50-plus-trips" }
      ]
    },
    { label: "About", href: "/about" },
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsTripToursOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsTripToursOpen(false);
    }, 200);
  };

  return (
    <>
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
                    className="md:h-10 h-6 w-auto"
                    width={120}
                    height={40}
                  />
                </Link>
              </div>
            </div>

            {/* Desktop navigation */}

            <div className="hidden md:flex items-center space-x-6">
              <nav className="hidden md:block">
                <div className="ml-6 flex items-baseline space-x-4">
                  {navItems.map((item) => (
                    <div 
                      key={item.label}
                      className="relative"
                      onMouseEnter={item.dropdownItems ? handleMouseEnter : undefined}
                      onMouseLeave={item.dropdownItems ? handleMouseLeave : undefined}
                      ref={item.dropdownItems ? dropdownRef : undefined}
                    >
                      <Link
                        href={item.href}
                        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm transition-colors font-semibold flex items-center"
                      >
                        {item.label}
                        {item.dropdownItems && (
                          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isTripToursOpen ? 'rotate-180' : ''}`} />
                        )}
                      </Link>
                      
                      {/* Dropdown for Trip Tours */}
                      {item.dropdownItems && isTripToursOpen && (
                        <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsTripToursOpen(false)}
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </nav>
              <Link href="/request-invite">
              <Button
                variant="outline"
                size="sm"
                className="hidden lg:inline-flex">
                Request Invite
              </Button>
              </Link>
              <Link href="/payment">
                <Button
                  variant="primary"
                  size="sm"
                  className="hidden lg:inline-flex">
                  Payment
                </Button>
              </Link>
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
                  <div key={item.label}>
                    {item.dropdownItems ? (
                      <div className="mb-2">
                        <button 
                          onClick={() => setIsTripToursOpen(!isTripToursOpen)}
                          className="text-gray-700 hover:text-yellow-500 flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-semibold"
                        >
                          {item.label}
                          <ChevronDown className={`h-4 w-4 transition-transform ${isTripToursOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isTripToursOpen && (
                          <div className="pl-4 mt-1 space-y-1">
                            {item.dropdownItems.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.label}
                                href={dropdownItem.href}
                                className="text-gray-600 hover:text-yellow-500 block px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => {
                                  setIsTripToursOpen(false);
                                  setIsMenuOpen(false);
                                }}
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-gray-700 hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-semibold"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <Link href="/request-invite">
                  <Button variant="primary" size="sm" className="w-full mt-4">
                    Request Invite
                  </Button>
                </Link>
                <Link href="/payment" className="block mt-2">
                  <Button variant="primary" size="sm" className="w-full">
                    Payment
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Container>
      </header>
      <DestinationBar />
    </>
  );
}