'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TravelCard } from '@/components/ui/Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const domesticDestinations = [
  {
    id: 1,
    destination: 'MANALI ADVENTURE',
    duration: '5N | 6D',
    image: 'https://triplinkadventures.com/wp-content/uploads/2025/06/Manali-Kasol-Kheerganga-Package.jpg',
    price: 12999,
    originalPrice: 16999,
    rating: 4.8,
    reviews: 1524,
    features: ['Kasol', 'Kheerganga Trek', 'Adventure'],
    discount: 23,
    isPopular: false
  },
  {
    id: 2,
    destination: 'HEAVENLY KASHMIR',
    duration: '6N | 7D',
    image: 'https://triplinkadventures.com/wp-content/uploads/2025/06/kashmir.jpg',
    price: 18999,
    originalPrice: 24999,
    rating: 4.9,
    reviews: 2847,
    features: ['Srinagar', 'Gulmarg', 'Dal Lake'],
    discount: 24,
    isPopular: true
  },
  {
    id: 3,
    destination: 'ROYAL RAJASTHAN',
    duration: '7N | 8D',
    image: 'https://triplinkadventures.com/wp-content/uploads/2025/06/rajasthan-visit.jpg',
    price: 15999,
    originalPrice: 19999,
    rating: 4.7,
    reviews: 1985,
    features: ['Jaipur', 'Udaipur', 'Heritage'],
    discount: 20,
    isPopular: false
  },
  {
    id: 4,
    destination: 'MYSTICAL LADAKH',
    duration: '8N | 9D',
    image: 'https://triplinkadventures.com/wp-content/uploads/2025/06/leh-to-pangong-lake-1.jpg',
    price: 22999,
    originalPrice: 29999,
    rating: 4.9,
    reviews: 1642,
    features: ['Leh', 'Pangong Lake', 'Nubra Valley'],
    discount: 23,
    isPopular: true
  },
  {
    id: 5,
    destination: 'SPITI VALLEY',
    duration: '6N | 7D',
    image: 'https://triplinkadventures.com/wp-content/uploads/2025/06/spitivalley.webp',
    price: 16999,
    originalPrice: 21999,
    rating: 4.8,
    reviews: 892,
    features: ['High Altitude', 'Monasteries', 'Offbeat'],
    discount: 23,
    isPopular: false
  },
  {
    id: 6,
    destination: 'TROPICAL ANDAMAN',
    duration: '5N | 6D',
    image: 'https://triplinkadventures.com/wp-content/uploads/2025/06/andaman_9183.jpg',
    price: 19999,
    originalPrice: 24999,
    rating: 4.6,
    reviews: 1356,
    features: ['Beach Paradise', 'Water Sports', 'Havelock'],
    discount: 20,
    isPopular: false
  }
];

export function DomesticDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(domesticDestinations.length / 4));
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(domesticDestinations.length / 4)) % Math.ceil(domesticDestinations.length / 4));
  };
  
  const visibleDestinations = domesticDestinations.slice(currentIndex * 4, currentIndex * 4 + 4);

  return (
  <section className="py-10 ">
      <Container size="xl">
        {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <SectionHeader
            align="left"
            eyebrow="Explore India"
            title="Domestic Destinations"
            subtitle="Discover the incredible beauty of India"
            className="mb-0"
          />
          
          {/* Navigation */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Destinations Grid */}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
          {visibleDestinations.map((destination) => (
            <TravelCard
              key={destination.id}
              destination={destination.destination}
              duration={destination.duration}
              image={destination.image}
              price={destination.price}
              originalPrice={destination.originalPrice}
              rating={destination.rating}
              reviews={destination.reviews}
              features={destination.features}
              discount={destination.discount}
              isPopular={destination.isPopular}
              onBookNow={() => console.log(`Booking ${destination.destination}`)}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8 py-3 border-gray-200 hover:border-yellow-500 hover:bg-yellow-50">
            View All Destinations
          </Button>
        </div>
      </Container>
    </section>
  );
}
