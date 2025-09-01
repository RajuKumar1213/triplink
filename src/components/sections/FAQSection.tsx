'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

const faqs = [
  {
    question: "What's included in your tour packages?",
    answer: "Our tour packages include accommodation, meals, transportation, guided tours, entry fees to attractions, and 24/7 customer support. Specific inclusions vary by package."
  },
  {
    question: "How do I book a trip with TripLink Adventures?",
    answer: "You can book through our website, call our booking hotline, or visit our office. We accept online payments, bank transfers, and cash payments at our office."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Free cancellation up to 7 days before departure. 50% refund for cancellations 3-6 days before, and 25% refund for cancellations within 48 hours of departure."
  },
  {
    question: "Do you provide travel insurance?",
    answer: "Yes, we offer comprehensive travel insurance covering medical emergencies, trip cancellations, lost luggage, and other unforeseen circumstances."
  },
  {
    question: "Are your tour guides certified?",
    answer: "All our tour guides are certified professionals with extensive local knowledge, language skills, and first aid training for your safety and enjoyment."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, UPI payments, bank transfers, and cash payments. EMI options are also available for select packages."
  },
  {
    question: "Can I customize my tour itinerary?",
    answer: "Absolutely! We specialize in customized tours tailored to your preferences, budget, and schedule. Contact our team to create your perfect itinerary."
  },
  {
    question: "Do you organize group tours?",
    answer: "Yes, we organize both small group tours (8-15 people) and large group tours. Special discounts available for groups of 10 or more people."
  },
  {
    question: "What safety measures do you follow?",
    answer: "We maintain highest safety standards with experienced drivers, well-maintained vehicles, emergency contacts, first aid kits, and 24/7 support during your trip."
  },
  {
    question: "Are meals included in the packages?",
    answer: "Most packages include breakfast and dinner. Lunch options vary by package. We accommodate dietary restrictions and preferences with advance notice."
  },
  {
    question: "What documents do I need for travel?",
    answer: "For domestic trips: Valid government ID. For international trips: Passport, visa (if required), and any specific documents based on destination requirements."
  },
  {
    question: "Do you provide airport transfers?",
    answer: "Yes, airport/railway station transfers are included in most packages. We ensure comfortable pick-up and drop-off services for hassle-free travel."
  }
];

const animatedImages = [
  {
    src: "https://triplinkadventures.com/wp-content/uploads/2025/06/sa2.svg",
    alt: "Mountain Adventure"
  },
  {
    src: "https://triplinkadventures.com/wp-content/uploads/2025/06/oooo.svg",
    alt: "Beach Paradise"
  },
  {
    src: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    alt: "Cultural Heritage"
  },
  {
    src: "https://images.pexels.com/photos/1822464/pexels-photo-1822464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    alt: "Desert Safari"
  },
  {
    src: "https://images.pexels.com/photos/1457812/pexels-photo-1457812.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    alt: "Wildlife Safari"
  }
];

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('translate-y-0');

  // Auto-change images with animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass('-translate-y-4 opacity-75');
      
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % animatedImages.length);
        setAnimationClass('translate-y-4 opacity-75');
        
        setTimeout(() => {
          setAnimationClass('translate-y-0 opacity-100');
        }, 150);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-10 bg-gradient-to-br from-yellow-50 via-white to-gray-50">
      <Container size="xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
            Frequently Asked <span className="text-yellow-600">Questions</span>
          </h2>
          <p className="text-sm sm:text-lg font-semibold text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about planning your perfect adventure with TripLink
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* FAQ Section - Left Side */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openFAQ === index ? (
                      <ChevronUp className="h-6 w-6 text-yellow-600 font-bold" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </button>
                
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openFAQ === index ? 'max-h-96 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-700 font-medium leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Animated Images - Right Side */}
          <div className="lg:sticky lg:top-8">
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={animatedImages[currentImageIndex].src}
                  alt={animatedImages[currentImageIndex].alt}
                  fill
                  className={`object-cover transition-all duration-500 ${animationClass}`}
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Image Label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                    <h4 className="text-base sm:text-lg font-bold text-gray-900">
                      {animatedImages[currentImageIndex].alt}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-gray-600">
                      Discover amazing destinations with TripLink Adventures
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="md:absolute hidden -top-4 -right-4 w-24 h-32 rounded-2xl overflow-hidden shadow-xl transform rotate-12 hover:rotate-6 transition-transform duration-300">
                <Image
                  src={animatedImages[(currentImageIndex + 1) % animatedImages.length].src}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="md:absolute hidden -bottom-4 -left-4 w-24 h-32 rounded-2xl overflow-hidden shadow-xl transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
                <Image
                  src={animatedImages[(currentImageIndex + 2) % animatedImages.length].src}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {animatedImages.map((_, index) => (
                  <button
                  title='Change Image'
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-yellow-600 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Stats */}
      <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
        <div className="text-xl sm:text-2xl font-black text-yellow-600">50K+</div>
        <div className="text-xs sm:text-sm font-bold text-gray-600">Happy Travelers</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
        <div className="text-xl sm:text-2xl font-black text-yellow-600">4.9★</div>
        <div className="text-xs sm:text-sm font-bold text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl md:text-3xl font-black text-white mb-3 sm:mb-4">
              Still Have Questions?
            </h3>
            <p className="text-yellow-100 font-semibold mb-5 sm:mb-6 text-sm sm:text-lg">
              Our travel experts are here to help you plan the perfect adventure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button title='Call Now' className="bg-white text-yellow-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                📞 Call Now: +91 7838720559
              </button>
              <button title='Email Us' className="bg-yellow-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-yellow-800 transition-colors duration-300 shadow-lg">
                ✉️ Email Us
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
} 